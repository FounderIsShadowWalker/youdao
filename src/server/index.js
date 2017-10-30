'use strict';
var koa = require('koa');
var koaBody = require('koa-body');
var path = require('path');
var staticServer = require("koa-static");
var router = require('./router');
var cors = require('koa2-cors');
var app = new koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);



io.on('connect', (socket) => {
    socket.emit('message', { hello: 'world' });
    socket.on('chat message', (data) => {
        console.log(data);
    });

    socket.on('disconnect', () => {
        console.log('user gg');
        socket.emit('user disconnected');
    })
});



app.use(cors({
    origins: ['http://localhost:8000/'],
    credentials: true,
    maxAge: 5,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

app.use(staticServer(path.join(__dirname + '/img')));
app.use(koaBody());

app
    .use(router.routes())
    .use(router.allowedMethods());

server.listen(3000, () => {
    console.log('server is listening 3000');
}); 