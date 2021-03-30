const Octokit = require("@octokit/rest");
const configStore = require("configstore");
const pkg = require("../package.json");
const _ = require("lodash");
const clui = require("clui");
const Spinner = clui.Spinner;
const { createBasicAuth } = require('@octokit/auth-basic');
const inquirer = require("./inquirer");

const conf = new configStore(pkg.name);
let octokit
exports.getInstance = () => {
  return octokit;
};

// exports.getStoredGithubToken = () => {
//   return conf.get("github.token");
// };

// exports.setGithubCredentials = async () => {
//   const credentials = await inquirer.askGithubCredentials();
//   octokit.authenticate(_.extend({ type: "basic" }, credentials));
// };

// exports.registerNewToken = async () => {
//   const status = new Spinner("Authenticating you, please wait....");
//   status.start();
//   try {
//     const res = await octokit.authorization.create({
//       scopes: ["user", "public_repo", "repo", "repo:status"],
//       note: "intigit, the command line tool for initializing Git repositories",
//     });
//     const token = res.data.token;
//     if (token) {
//       conf.set("github.token", token);
//       return token;
//     } else {
//       throw new Error("Missing Token", "GitHub Token not found");
//     }
//   } catch (err) {
//     throw err;
//   } finally {
//     status.stop();
//   }
// };

exports.githubAuth = (token) => {
  octokit = new Octokit({
      auth: token
    })
}

exports.getStoredGithubToken = () => {
    return conf.get('github.token')
}

exports.getPersonalAccessToken = async () => {
  const credentials = await inquirer.askGithubCredentials();
  const status = new Spinner('Authenticating you, Please wait....');
  status.start();
  const auth = createBasicAuth({
    username: credentials.username,
    password: credentials.password,
    async on2Fa() {
      status.stop();
      const res = await inquirer.getTwoFactorAuthenticationCode();
      status.start();
      return res.getTwoFactorAuthenticationCode;
    },
    token: {
      scopes: ['user', 'public_repo', 'repo', 'repo:status'],
      note: 'initgit, the command-line tool for initializing git repositories in node projects'
    }
  })
  try {
    const res = await auth();
    if (res.token) {
      conf.set('github.token', res.token);
      return res.token;
    } else {
      throw new Error("GitHub token was not found in response");
    }
  } finally {
    status.stop();
  }
}
