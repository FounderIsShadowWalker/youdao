const inspect = require('util').inspect
const path = require('path')
const os = require('os')
const fs = require('fs')
const http = require('http');
const moment = require('moment');
const fileMethod = require('../utils/file');
/**
 * 同步创建文件目录
 * @param  {string} dirname 目录绝对地址
 * @return {boolean}        创建目录结果
 */

function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        fs.mkdirSync(dirname);
        return true;
    }
}

/**
 * 获取上传文件的后缀名
 * @param  {string} fileName 获取上传文件的后缀名
 * @return {string}          文件后缀名
 */

function getSuffixName(fileName) {
    let nameList = fileName.split('.')
    return nameList[nameList.length - 1];
}

/**
 * 上传文件
 * @param  {object} ctx     koa上下文
 * @param  {object} options 文件上传参数 fileType文件类型， path文件存放路径
 * @return {promise}         
 */

function uploadFile(ctx, options) {
    let req = ctx.req;
    let res = ctx.res;
    let chunks = [];
    let size = 0;
    let fileType = options.fileType;

    mkdirsSync(path.join(__dirname, `../${fileType}`));
    fileMethod.clearFormData();

    return new Promise((resolve, reject) => {
        console.log('文件上传中...');
        let result = {
            success: false,
            message: '',
            data: null
        }

        req.on('data', (chunk) => {
            chunks.push(chunk);
            size += chunk.length;
        })

        req.on('end', () => {
            let buffer = Buffer.concat(chunks, size);
            let message = {
                text: {},
                imgs: [],
                time: moment().format('YYYY/MM/DD h:mm:ss'),
                success: true
            };
            let set = buffer.toString().split(/------WebKitFormBoundary(?:.+)?\r\n/), length = set.length;
            set = set.slice(1, length - 1);

            set.forEach(function (item) {
                if (/data:/.test(item)) {
                    message.imgs.push(fileMethod.dealFormDataFile(item));
                }
                else {
                    message = Object.assign({}, message, fileMethod.dealFormDataValue(item));
                }
            })

            console.log('文件上传结束');
            resolve(message);
        })
    })
}

module.exports = {
    uploadFile
}