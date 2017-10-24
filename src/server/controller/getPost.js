var User = require('../model/User');
module.exports = {
    async getPost(ctx, next) {
        let { username } = JSON.parse(ctx.request.body);
        let result = await User.getMessage(username);
        ctx.body = result;
    }
}