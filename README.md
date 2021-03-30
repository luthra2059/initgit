# InitGit

git init initializes a git repository. However, that is usually one of several steps involved in hooking up a project to Git. There are often more steps involved. Nevertheless, these steps are repetitive. 

`InitGit` provides a command-line interface to create a Git repository in the current folder, create a remote repository and then add it as a remote. Then it will provide a simple interactive “wizard” for creating a .gitignore file, and push it up to the remote repository. 

It might not save you hours, but remove some of the initial friction when starting a new project.

## Installation

Use the node package manager [npm](https://www.npmjs.com/package/npm) to install [initgit](https://www.npmjs.com/package/@luthra2059/initgit).

```bash
npm i @luthra2059/initgit
```

## Usage

Before running the command go to the settings of your github account.

Navigate to `Developer Settings > Personal access token` and click on `Generate new Token`. Enable appropriate permissions and copy the `token`.

Now run the following command on your terminal -


```bash
$ initgit
```
Navigate through and give responses as asked.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)