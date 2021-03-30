const _ = require("lodash");
const fs = require("fs");
const simplegit = require("simple-git");
const clui = require("clui");
const Spinner = clui.Spinner;
const inquirer = require("./inquirer");
const gh = require("./github");
const touch = require("touch");
const git = simplegit();
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
    const response = await github.repos.createForAuthenticatedUser(data);
    return response.data.clone_url;
  } catch (err) {
      console.log(err);
  } finally {
    status.stop();
  }
};

exports.createGitIgnore = async () => {
    const fileList = _.without(fs.readdirSync("."), ".git", ".gitignore");
    let answers;
  if (fileList.length) {
    answers = await inquirer.askIgnoreFiles(fileList);
    if (answers.ignore.length) {
      fs.writeFileSync(".gitignore", answers.ignore.join("\n"));
    } else {
        touch(".gitignore");
        fs.writeFileSync(".gitignore", answers.ignore.join("\n"));
    }
  } else {
      touch(".gitignore");
      fs.writeFileSync(".gitignore", answers.ignore.join("\n"));
    }
    //console.log(answers.ignore.default);
};

exports.setupRepository = async (url) => {
  const status = new Spinner(
    "Initializing local repository and pushing to remote...."
  );
  status.start();
  try {
    await git.init().add('.gitignore').add('./*').commit('Initial Commit').addRemote('origin', url).push('origin', 'master')
    // return await git
    //   .init()
    //   .then(git.add(".gitignore"))
    //   .then(git.add("."))
    //   .then(git.commit("Initial Commit"))
    //   .then(git.addRemote("origin", url))
    //     .then(git.push("origin", "master")).catch(err => {
    //         console.log(err);
    //   });
      return true;
  } catch (err) {
      console.log(err);
  } finally {
    status.stop();
  }
};
