const _ = require("lodash");
const fs = require("fs");
const git = require("simple-git/promise")();
const clui = require("clui");
const Spinner = clui.Spinner;
const inquirer = require("./inquirer");
const gh = require("./github");
const touch = require("touch");

exports.createRemoteRepository = async () => {
  const github = gh.getInstance();
  const answers = await inquirer.askRepositoryDetails();
  const data = {
    name: answers.name,
    description: answers.description,
    private: answers.visibility === "private",
  };
  const status = new Spinner("Creating remote repository....");
  status.start();
  try {
    const response = await github.repos.create(data);
    return response.data.ssh_url;
  } catch (err) {
    throw err;
  } finally {
    status.stop();
  }
};

exports.createGitIgnore = async () => {
  const fileList = _.without(fs.readdirSync("."), ".git", ".gitignore");
  if (fileList.length) {
    const answers = await inquirer.askIgnoreFiles(fileList);
    if (answers.ignore.length) {
      fs.writeFileSync(".gitignore", answers.ignore.join("\n"));
    } else {
      touch(".gitignore");
    }
  } else {
    touch(".gitignore");
  }
};

exports.setupRepository = async (url) => {
  const status = new Spinner(
    "Initializing local repository and pushing to remote...."
  );
  status.start();
  try {
    //await git.init().add('.gitignore').add('./*').commit('Initial Commit').addRemote('origin', url).push('origin', 'master')
    return git
      .init()
      .then(git.add(".gitignore"))
      .then(git.add("./*"))
      .then(git.commit("Initial Commit"))
      .then(git.addRemote("origin", url))
      .then(git.push("origin", "master"));
  } catch (err) {
    throw err;
  } finally {
    status.stop();
  }
};
