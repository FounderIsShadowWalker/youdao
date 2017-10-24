const fs = require('fs');

//处理formdata 字符串 键值对
var field = {
    formDataValue: {},
    files: []
};

function dealFormDataValue(str) {
    var result = str.match(/name=\"(.*)?\"(?:[\r\n]+)?(.*)?(?:[\r\n]+)?/);

    field.formDataValue[result[1]] = result[2];
    return field.formDataValue;
}

//处理formdata 文件
function dealFormDataFile(str) {
    var result = str.match(/name=\"(.*)?\"(?:[\r\n]+)?(.*)?(?:[\r\n]+)?/);
    field.files.push({
        filename: result[1],
        path: result[2]
    })

    field.files.forEach(function (file) {
        var ext = ".";
        var base64Data = file.path.replace(/data:(?:\w+)?\/(\w+)?;base64,/, function (str, str1) {
            ext += str1;
            return '';
        });

        var filePath = './img/' + file.filename + ext;
        var dataBuffer = new Buffer(base64Data, 'base64');

        fs.writeFileSync(filePath, dataBuffer);
    })

    return field.files[0].filename;
};


module.exports = {
    dealFormDataValue,
    dealFormDataFile
}