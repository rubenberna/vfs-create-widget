#!/usr/bin/env node
'use strict'

const path = require('path')
const chalk = require('chalk')
const program = require('commander')
const { version } = require('../package')

const getDefaultLibraryParams = require('./get-default-library-params')
const createLibrary = require('./create-library')
const promptLibraryParams = require('./prompt-library-params')
const { connectToFeed } = require('./connect-to-feed')

module.exports = async () => {
  const defaults = await getDefaultLibraryParams()

  program
    .name('create-react-library')
    .version(version)
    .usage('[options] [package-name]')
    .option('-d, --desc <string>', 'package description')
    .option('-l, --license <string>', 'package license', defaults.license)
    .option('-g, --no-git', 'generate without git init')
    .option(
      '-m, --manager <npm|yarn>',
      'package manager to use',
      /^(npm|yarn)$/,
      defaults.manager
    )
    .option(
      '-s, --skip-prompts',
      'skip all prompts (must provide package-name via cli)'
    )
    .parse(process.argv)

  const opts = {
    description: program.desc,
    license: program.license,
    manager: program.manager,
    template: program.template,
    templatePath: program.templatePath,
    skipPrompts: program.skipPrompts,
    git: program.git
  }

  Object.keys(opts).forEach((key) => {
    if (!opts[key] && defaults[key]) {
      opts[key] = defaults[key]
    }
  })

  if (program.args.length === 1) {
    opts.name = program.args[0]
  } else if (program.args.length > 1) {
    console.error('invalid arguments')
    program.help()
    process.exit(1)
  }

  const params = await promptLibraryParams(opts)
  const dest = await createLibrary(params)
  await connectToFeed()

  console.log(`
Your module has been created at ${dest}.

To get started, in one tab, run:
$ ${chalk.cyan(`cd ${params.shortName} && ${params.manager} install && ${params.manager} start`)}

And in another tab, run the create-react-app dev server:
$ ${chalk.cyan(
    `cd ${path.join(params.shortName, 'example')} && ${params.manager} install && ${params.manager} start`
  )}
`)

  return dest
}

module.exports().catch((err) => {
  console.error(err)
  process.exit(1)
})
