/*
 * @Descripttion:
 * @Author: yhy
 * @LastEditTime: 2020-06-30 17:55:35
 */

module.exports = (url = "") => {
    const arr = url.split("/");
    if (arr.length <= 1) return "";
    const repoName = arr[arr.length - 1].replace(/.git/, "");
    return repoName;
};
