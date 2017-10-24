'use strict';
var koa = require('koa');
var koaBody = require('koa-body');
var path = require('path');
var server = require("koa-static");
var router = require('./router');
var cors = require('koa2-cors');
var app = new koa();




app.use(cors({
    origins: ['http://localhost:8000/'],
    credentials: true,
    maxAge: 5,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

app.use(server(path.join(__dirname + '/img')));
app.use(koaBody());

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000, () => {
    console.log('server is listening 3000');
}); 