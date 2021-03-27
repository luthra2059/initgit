const inquirer = require("inquirer");
const files = require("./files");

exports.askGithubCredentials = () => {
  const questions = [
    {
      name: "username",
      type: "input",
      message: "Enter your GitHub username or email address : ",
      validate: (value) => {
        if (value.length) return true;
        else return "Please enter your username or email address.";
      },
    },
    {
      name: "password",
      type: "password",
      message: "Enter your password : ",
      validate: (value) => {
        if (value.length) return true;
        else return "Please enter your password.";
      },
    },
  ];
  return inquirer.prompt(questions);
};

exports.askRepositoryDetails = () => {
  const argv = require("minimist")(process.argv.slice(2));
  const questions = [
    {
      type: "input",
      name: "name",
      message: "Enter a name for the repository",
      default: argv._[0] || files.getCurrentDirectoryBase(),
      validate: (value) => {
        if (value.length) {
          return true;
        } else {
          return "Please enter a name for the repository";
        }
      },
    },
    {
      type: "input",
      name: "description",
      default: argv._[1] || null,
      message: "Optionally enter a description of the repository",
    },
    {
      type: "list",
      name: "visibility",
      message: "public or private : ",
      choices: ["public", "private"],
      default: "public",
    },
  ];
  return inquirer.prompt(questions);
};


