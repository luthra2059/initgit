const octokit = require("@octokit/rest");
const configStore = require("configstore");
const pkg = require("../package.json");
const _ = require("lodash");
const clui = require("clui");
const Spinner = clui.Spinner;
const chalk = require("chalk");
const inquirer = require("./inquirer");

const conf = new configStore(pkg.name);

exports.getInstance = () => {
  return octokit;
};

exports.getStoredGithubToken = () => {
  return conf.get("github.token");
};

exports.setGithubCredentials = async () => {
  const credentials = await inquirer.askGithubCredentials();
  octokit.authenticate(_.extend({ type: "basic" }, credentials));
};

exports.registerNewToken = async () => {
  const status = new Spinner("Authenticating you, please wait....");
  status.start();
  try {
    const res = await octokit.authorization.create({
      scopes: ["user", "public_repo", "repo", "repo:status"],
      note: "intigit, the command line tool for initializing Git repositories",
    });
    const token = res.data.token;
    if (token) {
      conf.set("github.token", token);
      return token;
    } else {
      throw new Error("Missing Token", "GitHub Token not found");
    }
  } catch (err) {
    throw err;
  } finally {
    status.stop();
  }
};

exports.githubAuth = (token) => {
    octokit.authenticate({
        type: 'oauth',
        token: token
    })
}

exports.getStoredGithubToken = () => {
    return conf.get('github.token')
}
