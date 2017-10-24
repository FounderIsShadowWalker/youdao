var mongoose = require('mongoose');
var User = require('../model/User');
var db = require('../utils/mongodb');

const sleep = async (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true)
        }, ms)
    })
}

module.exports = {
    async login(ctx, next) {
        console.log('登陆 ------');
        console.log('参数:', ctx.request.body);

        let result = await User.loginModel({ userName, password } = ctx.request.body);

        ctx.body = result === 1 ? { result: '登录成功' } : { result: '登录失败' };
    },

    async resiter(ctx, next) {

        console.log('注册 ------');
        console.log('参数:', ctx.request.body);

        let result = await User.saveModel({ userName, password, email, phone } = ctx.request.body);


        ctx.body = result;
    }
}