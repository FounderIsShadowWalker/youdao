var mongoose = require('mongoose');

const connectMongoDB = (function () {

    const db = mongoose.connect('mongodb://localhost/youdao', function (err) {
        if (err) throw err;
    })

    return function () {
        return db;
    };
}());

module.exports = connectMongoDB();