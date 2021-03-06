#!/usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const files = require("./util/files");
const repository = require("./util/repository");
const github = require("./util/github");
const inquirer = require('./util/inquirer')

clear();
console.log(
  chalk.yellow(
    figlet.textSync("InitGit", {
      horizontalLayout: "full",
    })
  )
);

if (files.directoryExists(".git")) {
  console.log(chalk.red("Already a git repository!!"));
  process.exit();
}

const getGithubToken = async () => {
    
    let token = github.getStoredGithubToken();
    //console.log(token)
    if (token) return token;
    
  //await github.setGithubCredentials();
    let ans = await inquirer.askToken();
    token = ans.token;
    github.setToken(token);
 // token = await github.getPersonalAccessToken();
  return token;
};

const run = async () => {
  try {
      const token = await getGithubToken();
      
    github.githubAuth(token);
      const url = await repository.createRemoteRepository();
      console.log(url);
    await repository.createGitIgnore();
   
    const done = await repository.setupRepository(url);

    if (done) console.log(chalk.green("All set up!!!!"));
  } catch (err) {
    if (err) {
      switch (err.status) {
        case 401:
          console.log(
            chalk.red(
              "Couldn't log you in. Please provide correct credentials/token."
            )
          );
          break;
        case 422:
          console.log(
            chalk.red(
              "There already exists a remote repository with the same name"
            )
          );
          break;
        default:
          console.log(err);
      }
    }
  }
};

run();
