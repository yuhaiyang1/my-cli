// /*
//  * @Descripttion:
//  * @Author: yhy
//  * @LastEditTime: 2020-06-30 10:57:49
//  */

// const fs = require("fs");
// const config = require("./src/config");
// const { program } = require("commander");
// const handlebars = require("handlebars");
// const inquirer = require("inquirer");
// const ora = require("ora");
// const chalk = require("chalk");
// const symbols = require("log-symbols");
// const sh = require("./src/download");
// const fileName = process.argv[2];
// const filePath = process.cwd();
// console.log(fileName, filePath);
// program
//     .version("0.0.1", "-v, --version")
//     .command("init <name>")
//     .action((name) => {
//         if (!fs.existsSync(name)) {
//             inquirer
//                 .prompt([config.projectList, config.description, config.author])
//                 .then(async (answers) => {
//                     const spinner = ora("正在下载模板...");
//                     spinner.start();
//                     try {
//                         // 下载仓库
//                         const res = await sh(
//                             "git clone " + config.repo[answers.projectType]
//                         );
//                         spinner.succeed();
//                         const fileName = `${name}/package.json`;
//                         const meta = {
//                             name,
//                             description: answers.description,
//                             author: answers.author,
//                         };
//                         if (fs.existsSync(fileName)) {
//                             console.log(meta, "meta");
//                             const content = fs
//                                 .readFileSync(fileName)
//                                 .toString();
//                             const result = handlebars.compile(content)(meta);
//                             fs.writeFileSync(fileName, result);
//                         }
//                         console.log(
//                             symbols.success,
//                             chalk.green("项目初始化完成")
//                         );
//                         // 转移文件夹
//                     } catch (error) {
//                         spinner.fail();
//                         console.log(symbols.error, chalk.red(error));
//                     }
//                 });
//         } else {
//             // 错误提示项目已存在，避免覆盖原有项目
//             console.log(symbols.error, chalk.red("项目已存在"));
//         }
//     });
// program.parse(process.argv);
