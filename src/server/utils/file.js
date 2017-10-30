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

    console.log(result[1], '文件名');

    field.files.push({
        filename: result[1],
        path: result[2]
    })

    field.files.forEach(function (file) {
        var ext = ".";
        var base64Data = file.path.replace(/data:(?:\w+)?\/(\w+)?;base64,/, function (str, str1) {
            return '';
        });

        var filePath = './img/' + file.filename;
        var dataBuffer = new Buffer(base64Data, 'base64');

        fs.writeFileSync(filePath, dataBuffer);
    })

    return result[1];
};

function clearFormData() {
    field = {
        formDataValue: {},
        files: []
    };
};

module.exports = {
    dealFormDataValue,
    dealFormDataFile,
    clearFormData,
}