const User = require('../model/User');

module.exports = {
    async addFriend(ctx, next) {
        let result = await User.saveUser(ctx.request.body);
        ctx.body = result;
    }
}