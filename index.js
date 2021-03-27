const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const files = require('./util/files')

clear()
console.log(chalk.yellow(figlet.textSync('InitGit', {
    horizontalLayout: 'full'
})))

if (files.directoryExists('.git')) {
    console.log(chalk.red('Already a git repository!!'))
    process.exit()
}
