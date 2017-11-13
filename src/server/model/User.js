var mongoose = require('mongoose');
var db = require('../utils/mongodb');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    // email : {type: String, unique: true},
    username: { type: String, unique: true },
    password: String,
    phone: String,
    email: String,
    introduce: String,
    birthday: String,
    sex: String,
    friendList: [],
    messages: [],
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

    async saveMessage({ username, text, imgs, time, remarks }) {
        let message = { text, imgs, username, time, remarks };
        return await db.model('User').update({ username }, { $push: { messages: message } }, (err, doc) => {
            if (err) {
                console.log(err);
            }
        })
    },


    async getMessage(username, index, size) {
        let users = await db.model('User').find({ username });
        let friendList = users[0].friendList;
        let userMessage = users[0].messages;

        await new Promise((resolve, reject) => {
            friendList.map(async (username, index) => {

                let friend = await db.model('User').find({ username });
                let friendMessage = friend[0].messages;

                userMessage = userMessage.concat(friendMessage);

                if (index === friendList.length - 1) {
                    resolve();
                }
            })
        })



        let sortBy = (field) => (a, b) => { return new Date(b[field]) - new Date(a[field]) }

        userMessage = userMessage.sort(sortBy('time'));

        users[0].messages = userMessage.slice(index, index + size);

        return users;
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
            .find({ username: username.username || JSON.parse(username).username }, { _id: 0, messages: 0, _v: 0, password: 0, friendList: 0 },
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
                    if (err) {
                        console.log(err);
                    }
                })

        }
        return exist.length == 0 ? { data: '添加好友成功' } : { data: '好友已存在好友列表中' };
    },

    async saveRemark({ username, rusername, text, time }) {
        let users = await db.model('User').find({ username });
        let index = 0;
        let userMessage = users[0].messages;
        userMessage.map((message, i) => {
            if (message.time === time) {
                index = i;
            }
        })

        userMessage[index].remarks.push({
            username,
            rusername,
            text,
            time: new Date().toLocaleString()
        })

        let result = await new Promise((resolve, reject) => {
            db.model('User').update({ username }, { $set: { messages: userMessage } }, (err, doc) => {
                if (err) {
                    console.log(err);
                } else {
                    resolve('true')
                }
            })
        });

        return result;
    },

    async saveUserInfo({ username, introduce, sex, birthday }) {

        let result = await new Promise((resolve, reject) => {
            db.model('User').update({ username }, { $set: { introduce, sex, birthday } }, (err, doc) => {
                if (err) {
                    console.log(err);
                } else {
                    resolve('true')
                }
            })
        });
        return { data: 'success' };
    }
};


module.exports = db.model('User', UserSchema);



