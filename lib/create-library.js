'use strict'

const handlebars = require('handlebars')
const fs = require('fs')
const globby = require('globby')
const mkdirp = require('make-dir')
const ora = require('ora')
const path = require('path')
const pEachSeries = require('p-each-series')

const defaultTemplate = 'widget'

const templateBlacklist = new Set([
  'example/public/favicon.ico',
  'example/public/.gitignore',
  '.git'
])

module.exports = async (info) => {
  const { name } = info
  // handle scoped package names
  const parts = name.split('/')
  info.shortName = parts[parts.length - 1]

  const dest = path.join(process.cwd(), info.shortName)
  info.dest = dest
  await mkdirp(dest)

  const source = path.join(__dirname, '..', 'template', defaultTemplate)
  const files = await globby(source.replace(/\\/g, '/'), {
    dot: true
  })

  {
    const promise = pEachSeries(files, async (file) => {
      return module.exports.copyTemplateFile({
        file,
        source,
        dest,
        info
      })
    })
    ora.promise(promise, `Copying ${defaultTemplate} template to ${dest}`)
    console.log()
    await promise
  }

  return dest
}

module.exports.copyTemplateFile = async (opts) => {
  const { file, source, dest, info } = opts

  const fileRelativePath = path.relative(source, file).replace(/\\/g, '/')
  if (fileRelativePath.startsWith('.git')) {
    return
  }

  const destFilePath = path.join(dest, fileRelativePath)
  const destFileDir = path.parse(destFilePath).dir
  console.log(fileRelativePath)

  await mkdirp(destFileDir)

  const isAFontFile = (fileRelativePath) => {
    const array = fileRelativePath.split('/')
    return array.includes('fonts')
  }

  if (templateBlacklist.has(fileRelativePath) || isAFontFile(fileRelativePath)) {
    const content = fs.readFileSync(file)
    fs.writeFileSync(destFilePath, content)
  } else {
    const template = handlebars.compile(fs.readFileSync(file, 'utf8'))
    const content = template({
      ...info,
      yarn: info.manager === 'yarn'
    })

    fs.writeFileSync(destFilePath, content, 'utf8')
  }

  return fileRelativePath
}
