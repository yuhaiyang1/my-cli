/*
 * @Descripttion:
 * @Author: yhy
 * @LastEditTime: 2020-07-14 19:48:00
 */

module.exports = {
    projectList: {
        name: "projectType",
        type: "list", //有序列表
        choices: ["spa", "h5", "electron"],
        message: "请选择想要生成的项目类型",
    },
    // 要去现在的仓库列表
    repo: {
        spa: "",
        h5: "",
        electron: "",
    },
    description: {
        name: "description",
        message: "请输入项目描述",
    },
    author: {
        name: "author",
        message: "请输入作者名称",
    },
};
