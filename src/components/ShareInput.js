import React from 'react';
import { Input } from 'antd';
import UploadImg from './UploadImg';
import { connect } from 'dva';
import { Icon, Button } from 'antd';
import classNames from 'classnames';
import './ShareInput.scss';

class ShareInput extends React.Component {
    static defaultProps = {
        text: ''
    }

    deleteImg = (index) => {
        this.props.dispatch({
            type: 'upload/deletePic',
            payload: {
                index: index
            }
        })
    }

    postNote = () => {
        this.props.dispatch({
            type: 'upload/postNote',
            payload: {
                username: this.props.username,
                text: this.props.text,
                fileList: this.props.fileList
            }
        })
    }

    sendText = (e) => {
        this.props.dispatch({
            type: 'upload/sendText',
            payload: {
                text: e.target.value
            }
        })
    }

    render() {
        const { fileList, text } = this.props;

        const imgs = fileList.map((file, index) => {
            return <span key={index} style={{ backgroundImage: `url(${file.src})` }} >
                <Icon type="close" onClick={this.deleteImg.bind(this, index)} />
            </span>
        })

        const imgContentClass = classNames({
            'contentBorder': fileList.length > 0
        })

        return (
            <div id='shareInputWrapper'>
                <div>
                    <Input
                        type="textarea"
                        rows={4}
                        placeholder="说点什么吧"
                        value={text}
                        onChange={this.sendText} />
                    < div className="imgWrapper">
                        <UploadImg />
                    </div>
                </div>
                <div className={imgContentClass}>
                    <div className='imgContent'>
                        {imgs}
                    </div>
                    <div className='postButton'>
                        {
                            (fileList.length > 0 || text.length > 0) && <Button type="primary"
                                onClick={this.postNote}>发表</Button>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { fileList, text } = state.upload;
    return {
        fileList: fileList,
        text: text
    };
}

export default connect(mapStateToProps)(ShareInput);