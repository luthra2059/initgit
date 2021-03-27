const octokit = require('@octokit/rest')
const configStore = require('configstore')
const pkg = require('../package.json')
const _ = require('lodash')
const clui = require('clui')
const spinner = clui.Spinner
const chalk = require('chalk')
const inquirer = require('inquirer')

const conf = new configStore(pkg.name)

