#!/usr/bin/env node
const fs = require("fs");
const { program } = require("commander");
const inquirer = require("inquirer");
const ora = require("ora");
const chalk = require("chalk");
const symbols = require("log-symbols");
const figlet = require("figlet");
const sh = require("../src/shell");
const config = require("../src/config");
const getRepoName = require("../src/getRepoName");
const buildProject = require("../src/buildProject");
const fileName = process.argv[3];
const filePath = process.cwd();
console.log(fileName, filePath, "aa");
program
    .version("0.0.1", "-v, --version")
    .command("init <name>")
    .action((name) => {
        if (!fs.existsSync(name)) {
            inquirer
                .prompt([config.projectList, config.description, config.author])
                .then(async (answers) => {
                    let spinner = ora("正在生成项目中...");
                    spinner.start();
                    try {
                        //获取要下载的仓库地址
                        const url = config.repo[answers.projectType];
                        if (!url) {
                            spinner.fail();
                            return console.log(
                                symbols.error,
                                chalk.green("模版正在开发中--")
                            );
                        }
                        const repoName = getRepoName(url);
                        // 获取下载下来的仓库名字
                        spinner.text = "正在下载新的的模版";
                        // 下载之前无脑删除
                        await sh(`rm -rf ${repoName}`);
                        // 然后开始下载模版
                        await sh("git clone " + url);
                        // 开始构建新的目录
                        buildProject({
                            ...answers,
                            fileName,
                            filePath,
                            repoName,
                        });
                        // 正在生成项目
                        spinner.text = "生成完成";
                        spinner.succeed();
                        // 生成图标
                        figlet("REACT CLI", function (err, data) {
                            if (err) {
                                console.log("Something went wrong...");
                                console.dir(err);
                                return;
                            }
                            console.log(data);
                        });
                        // 转移文件夹
                    } catch (error) {
                        spinner.fail();
                        console.log(symbols.error, chalk.red(error));
                    }
                });
        } else {
            // 错误提示项目已存在，避免覆盖原有项目
            console.log(symbols.error, chalk.red("项目已存在"));
        }
    });
program.parse(process.argv);
