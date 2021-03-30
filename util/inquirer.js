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

exports.askIgnoreFiles = (fileList) => {
  const questions = [
    {
      type: "checkbox",
      name: "ignore",
      message: "Select the files and/or folders you wish to ignore : ",
      choices: fileList,
      default: [
        "logs",
        "npm-debug.log*",
        "yarn-debug.log*",
        "yarn-error.log*",
        "lerna-debug.log*",
        "report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json",
        "pids",
        "*.pid",
        "*.seed",
        "*.pid.lock",
        "lib-cov",
        "coverage",
        "*.lcov",
        ".nyc_output",
        ".grunt",
        "bower_components",
        ".lock-wscript",
        "build/Release",
        "node_modules/",
        "jspm_packages/",
        "typings/",
        "*.tsbuildinfo",
        ".npm",
        ".eslintcache",
        ".stylelintcache",
        ".rpt2_cache/",
        ".rts2_cache_cjs/",
        ".rts2_cache_es/",
        ".rts2_cache_umd/",
        ".node_repl_history",
        "*.tgz",
        ".yarn-integrity",
        ".env",
        ".env.test",
        ".env*.local",
        ".cache",
        ".parcel-cache",
        ".next",
        ".nuxt",
        "dist",
        ".out",
        ".storybook-out",
        "storybook-static",
        "dist/",
        ".cache/",
        ".vuepress/dist",
        ".serverless/",
        ".fusebox/",
        ".dynamodb/",
        ".tern-port",
        "*.log",
        ".vscode-test",
        "tmp/",
        "temp/",
      ],
    },
  ];
  return inquirer.prompt(questions);
};

exports.getTwoFactorAuthenticationCode = () => {
  return inquirer.prompt({
    name: "twoFactorAuthenticationCode",
    type: "input",
    message: "Enter you two-factor authentication code : ",
    validate: function (value) {
      if (value.length) {
        return true;
      } else {
        return "Please enter your two-factor authentication code.";
      }
    },
  });
};
