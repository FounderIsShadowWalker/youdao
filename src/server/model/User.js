var mongoose = require('mongoose');
var db = require('../utils/mongodb');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    // email : {type: String, unique: true},
    username: { type: String, unique: true },
    password: String,
    phone: String,
    email: String,
    friendList: [],
    messages: []
    // posts : [{type: Schema.Types.ObjectId, ref:'Post'}]
})


UserSchema.statics = {

    async loginModel({ username, password }) {
        return await db.model('User').count({ username, password });
    },

    async checkModel({ username, password }) {
        return await db.model('User').count({ username });
    },

    async saveModel({ username, password, phone, email }) {
        let value = await UserSchema.statics.checkModel({ username, password });
        if (value == 0) {
            let result = await db.model('User').create({ username, password, phone, email });
            return result ? { result: '注册成功' } : { result: '注册失败' };
        }

        return { result: '被占用了' }
    },

    async saveMessage({ username, text, imgs, time }) {
        let message = { text, imgs, time };

        db.model('User').update({ username }, { $push: { messages: message } }, (err, doc) => {
            if (err) {
                console.log(err);
            }
        })
    },

    async getMessage({ username }) {
        let result = await db.model('User').find({}, (err, doc) => {
            if (err) {
                console.log(err);
            }
            return doc[0];
        })
        return result;
    }
};


module.exports = db.model('User', UserSchema);



