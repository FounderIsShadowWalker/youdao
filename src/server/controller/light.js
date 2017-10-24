const { uploadFile } = require('../utils/upload');
const User = require('../model/User');

module.exports = {
    async upload(ctx, next) {

        let result = JSON.stringify({ success: false });
        let serverFilePath = __dirname;

        result = await uploadFile(ctx, {
            fileType: 'img',
            path: serverFilePath
        })

        //上传成功  Message写入数据库
        if (result.success) {
            await User.saveMessage(result);
        }

        ctx.body = result;
    }
}