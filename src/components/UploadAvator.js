import React from 'react';
import { connect } from 'dva';
import { message } from 'antd';
class UploadAvator extends React.Component {

    checkFileList = () => {
        const { fileList } = this.props;
        if (fileList.length >= 4) {
            throw new Error('最多上传4张图片');
        }
        return true;
    }

    checkFile = (file) => () => {
        if (!/image\/\w+/.test(file.type)) {
            throw new Error('只允许上传图片');
        }
        if (file.size / 1024 / 1024 > 3) {
            throw new Error('不允许上传超过3M的图片');
        }
        return true;
    }


    readPic = () => {

        var file = this.refs.uploadImg.files[0];
        var reader = new FileReader();
        var fileType = file.type.match(/image\/(\w+)/)[1];
        console.log(fileType);

        //可以compose 先简单写一下
        try {
            [this.checkFile(file), this.checkFileList].map((fun, index) => {
                fun();
            })
        } catch (err) {
            message.error(err.message);
            return false;
        }

        reader.readAsDataURL(file);
        reader.onload = function (e) {

            this.props.dispatch({
                type: 'upload/addPic',
                payload: {
                    fileList: {
                        name: file.name,
                        src: reader.result
                    }
                }
            })
        }.bind(this);
    }

    render() {
        return (
            <div className="camera" style={{ background: "url('../../camera.png')" }}>
                <input ref='uploadImg' type='file' onChange={this.readPic} />
            </div>

        )
    }
}

function mapStateToProps(state) {
    const { fileList } = state.upload;
    return {
        fileList: fileList
    };
}


export default connect(mapStateToProps)(UploadAvator);