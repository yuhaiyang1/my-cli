/*
 * @Descripttion:
 * @Author: yhy
 * @LastEditTime: 2020-06-30 16:10:19
 */
const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk");
const symbols = require("log-symbols");
const git = ".git";
module.exports = async ({
    fileName,
    repoName,
    filePath,
    description,
    author,
}) => {
    try {
        const targetPath = path.resolve(filePath, fileName);
        const gitPath = path.resolve(targetPath, git);
        const packageJsonPath = path.resolve(targetPath, "package.json");
        const meta = {
            name: fileName,
            description,
            author,
        };
        await fs.copy(repoName, fileName);
        // 移除git源文件
        await fs.remove(gitPath);
        const oldJson = await fs.readJSON(packageJsonPath);
        const newJson = Object.assign({}, oldJson, meta);
        await fs.outputJson(packageJsonPath, newJson, { spaces: "\t" });
    } catch (error) {
        console.log(symbols.error, chalk.red("抱歉出错了"));
    }
};
