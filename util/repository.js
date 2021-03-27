const _ = require('lodash')
const fs = require('fs')
const git = require('simple-git')
const clui = require('clui')
const Spinner = clui.Spinner
const inquirer = require('inquirer')
const gh = require('./github')

exports.createRemoteRepository = async () => {
    const github = gh.getInstance()
    const answers = await inquirer.askRepositoryDetails()
    const data = {
        name: answers.name,
        description: answers.description,
        private: (answers.visibility === 'private')
    }
    const status = new Spinner('Creating remote repository....')
    status.start();
    try {
        const response = await github.repos.create(data)
        return response.data.ssh_url
    } catch (err) {
        throw err;
    } finally {
        status.stop()
    }
}