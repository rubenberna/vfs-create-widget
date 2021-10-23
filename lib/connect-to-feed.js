const execa = require('execa')
const ora = require('ora')
const chalk = require('chalk')

async function installVstsAuth () {
  await execa('npm', ['install', '-g', 'vsts-npm-auth', '--registry', 'https://registry.npmjs.com', '--always-auth', 'false'])
}

module.exports.connectToFeed = async () => {
  const spinner = ora('Connecting to VFS Azure feed').start()
  const os = process.platform
  if (os === 'win32') {
    try {
      await installVstsAuth()
      spinner.succeed()
    } catch (e) {
      console.log(e)
      spinner.fail(e)
    }
  } else {
    spinner.warn(chalk.yellow('You are not a Windows user. Please check how to connect to the Azure feed here: https://docs.microsoft.com/en-us/azure/devops/artifacts/npm/npmrc?view=azure-devops#set-up-authentication-on-your-dev-box'))
  }
}
