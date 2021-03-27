const inquirer = require('inquirer')
const files = require('./files')

exports.askGithubCredentials = () => {
    const questions = [
        {
            name: 'username',
            type: 'input',
            message: 'Enter your GitHub username or email address : ',
            validate: (value) => {
                if (value.length) 
                    return true
                else return 'Please enter your username or email address.'
            }
        },
        {
            name: 'password',
            type: 'password',
            message: 'Enter your password : ',
            validate: (value) => {
                if (value.length) return true;
                else return 'Please enter your password.'
            }
        }
    ]
    return inquirer.prompt(questions);
}