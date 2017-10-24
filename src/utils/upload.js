export default {
    upload: function ({ text, fileList, username }, path) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            let formData = new FormData();
            formData.append('username', username);
            formData.append('text', text);
            for (let i = 0; i < fileList.length; i++) {
                formData.append(fileList[i].name, fileList[i].src);
            }
            xhr.open('post', `http://localhost:3000/${path}`);
            xhr.timeout = 3000;
            xhr.ontimeout = () => {
                alert('请求超时');
            }
            xhr.send(formData);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    resolve('上传完成');
                }
            }
        })
    }
}