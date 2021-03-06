var User = require('../model/User');
module.exports = {
    async getPost(ctx, next) {
        let { username, index, size } = JSON.parse(ctx.request.body);
        let result = await User.getMessage(username, index, size);
        ctx.body = result;
    },

    async getLatestPost(ctx, next) {
        let { username } = JSON.parse(ctx.request.body);
        let result = await User.getLatestPost(username);
        ctx.body = result;
    }
}