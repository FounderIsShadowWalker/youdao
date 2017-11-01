const User = require('./model/User');

const onlineUsers = (() => {
    const users = [];
    return {
        addUser(socket, username) {
            socket.username = username;
            users.push(socket);
            console.log(`用户登录: ${socket.username}`);
            console.log(`当前用户数量: ${users.length}`);
        },
        getUser(username) {
            for (let user of users) {
                if (user.username === username) {
                    return user;
                }
            }
        },
        broadcastExcept(username, friendList) {
            let ret = [];
            for (let user of users) {
                if (user.username !== username && friendList.indexOf(user.username) >= 0) {
                    ret.push(user);
                }
            }
            return ret;
        },
        broadcast() {
            return users;
        }
    }
})()


module.exports = function socketHandler(socket) {
    socket.on('login', async (username, cb) => {
        onlineUsers.addUser(socket, username);
        cb();
    })

    socket.on('message', async (username, cb) => {
        console.log(`${username}发送了消息`);
        //给所有人发送 username 新发送的消息

        //先找到username的最新一条消息
        let userPost = await User.getLatestPost(username);

        //发给其他的好友
        let users = onlineUsers.broadcastExcept(username, userPost[0].friendList);

        for (let user of users) {
            console.log(user.username);
            user.emit('clientMessage', username, userPost);
        }
        //socket.broadcast.emit('message', `${username}发送了消息，看看是不是你丫的好友`);
    });

    socket.on('message Test', (data) => {
        console.log(data);
    });


    socket.on('disconnect', () => {
        console.log('用户失联了');
        socket.emit('user disconnected');
    })

}