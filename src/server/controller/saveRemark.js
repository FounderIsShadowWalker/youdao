var User = require('../model/User');

module.exports = {
    /**
     * 
     * @param {*} username   发post的 qq
     * @param {*} rusername  评论的qq
     * @param {*} text       评论的文字
     * @param {*} time       发post的时间为 uuid
     */
    async saveRemark(ctx, next) {
        let result = await User.saveRemark({ username, rusername, text, time } = ctx.request.body)

        result ? ctx.body = { data: '评论成功' } : ctx.body = { data: '评论失败' };

    }
}