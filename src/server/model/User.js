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
    //posts : [{type: Schema.Types.ObjectId, ref:'Post'}]
})


UserSchema.statics = {

    async loginModel({ username, password }) {
        return await db.model('User').count({ username, password });
    },

    async checkModel({ username, password }) {
        return await db.model('User').count({ username });
    },

    async saveModel({ username, password, phone, email }) {
        let value = await this.checkModel({ username, password });
        if (value == 0) {
            let result = await db.model('User').create({ username, password, phone, email });
            return result ? { result: '注册成功' } : { result: '注册失败' };
        }

        return { result: '被占用了' }
    },

    async saveMessage({ username, text, imgs, time }) {
        let message = { text, imgs, time };
        return await db.model('User').update({ username }, { $push: { messages: message } }, (err, doc) => {
            if (err) {
                console.log(err);
            }
        })
    },

    async getMessage(username, index, size) {
        let result = await db.model('User')
            .find({ username }, (err, doc) => {
                if (err) {
                    console.log(err);
                }
            })


        result[0].messages.reverse();
        result[0].messages = result[0].messages.slice(index, index + size);
        return result;
    },

    async getLatestPost(username) {
        let result = await db.model('User')
            .find({ username }, (err, doc) => {
                if (err) {
                    console.log(err);
                }
            })

        result[0].messages.reverse();
        result[0].messages = result[0].messages.slice(0, 1);

        return result;
    },

    async getUsers(username) {
        let result = await db.model('User')
            .find({ username: JSON.parse(username).username }, { _id: 0, messages: 0, _v: 0, password: 0, friendList: 0 },
            (err, doc) => {
                if (err) {
                    console.log(err);
                }
            });

        return result;
    },

    async checkFriend(username, addFirend) {
        return await db.model('User').find({ username }).find({ 'friendList': [addFirend] });
    },

    async saveUser({ username, addFirend }) {
        let exist = await this.checkFriend(username, addFirend);
        if (exist.length == 0) {
            await db.model('User')
                .update({ username }, { $push: { friendList: addFirend } }, (err, doc) => {
                    if (err, doc) {
                        console.log(doc);
                    }
                })

        }
        return exist.length == 0 ? { data: '添加好友成功' } : { data: '好友已存在好友列表中' };
    }
};


module.exports = db.model('User', UserSchema);



