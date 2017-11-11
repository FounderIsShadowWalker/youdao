import React from 'react';
import { connect } from 'dva';
import { Avatar } from 'antd';
import { Input, Button } from 'antd';
import { findDOMNode } from 'react-dom';
import { saveRemark } from '../services/index';
import socket from '../socket';
import './ShareContents.scss';

const { TextArea } = Input;

class ShareContent extends React.Component {

    state = {
        isTextArea: false,
        itemNum: null,
        textAreaText: ''
    }

    showTextArea = (num, e) => {
        this.setState({
            itemNum: num
        })
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        return false;
    }

    saveTextArea = (e) => {
        this.setState({
            textAreaText: e.target.value
        })
    }

    reset = () => {
        this.setState({
            textAreaText: ''
        })
        this.hideTextArea();
    }

    saveRemark = ({ username, time }, e) => {
        new Promise((resolve, reject) => {
            this.props.dispatch({
                type: 'post/saveRemark',
                payload: {
                    username: username,
                    rusername: this.props.username,
                    time,
                    text: this.state.textAreaText,
                    resolve,
                }
            })
        }).then(() => {
            if (username != this.props.username) {
                socket.emit('remark', username, this.props.username, () => {
                    message.info(`收到新评论`);
                });
            }
            this.reset();
        });
    }

    hideTextArea = (e) => {
        this.setState({
            itemNum: null
        })
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'post/clearInsert'
        })

        this.props.dispatch({
            type: 'post/getPosts',
            payload: {
                username: this.props.username,
            }
        })


        document.addEventListener('click', (e) => {
            if (!e.target.closest('div.remarkInput')) {
                this.hideTextArea();
            }
        });


    }

    render() {
        const { data } = this.props.data;
        const { username, insert } = this.props;

        //insert tag

        const insertTag = insert && <div className="insertTag">有新动态</div>


        const postItems = data.map((item, index) => {
            return <div className="postWrapper" key={index}>
                <div className='title'>
                    <Avatar size="large" icon="user" />
                    <div className='textWrapper'>
                        <p className='username'> {item.username} </p>
                        <p className='time'>
                            {item.time.replace(/T/, ' ').replace(/\..+/, '')}</p>
                    </div>
                </div>
                <div className="text">
                    <span>{item.text}</span>
                </div>
                <div className="imgsWrapper">
                    {
                        item.imgs.map((img, index) => {
                            return <img key={index} style={{ backgroundImage: `url(http://localhost:3000/${img})` }} />
                        })
                    }
                </div>
                <div className="remarkWrapper">
                    <div className="iconsWrapper">
                        <span></span>
                        <span onClick={this.showTextArea.bind(this, index)}></span>
                        <span></span>
                    </div>
                    <span className="scanText">正在浏览</span>
                </div>
                <div className="remarkPanel">
                    {
                        item.remarks && item.remarks.map((remark, index) => {
                            return <div className="remarkTexts" key={index}>
                                <Avatar icon="user" />
                                <div className="spanWrapper">
                                    <span className="rusername">{remark.rusername}  :</span>
                                    <span className="text"> {remark.text}</span>
                                    <p className="time"> {remark.time}</p>
                                </div>
                            </div>
                        })
                    }

                </div>
                <div className="remarkInput">
                    {
                        (() => {
                            return this.state.itemNum === index ?
                                <div className="textAreaWrapper">
                                    <TextArea rows={4}
                                        ref={(node) => {
                                            if (node) { findDOMNode(node).focus() }
                                        }
                                        }
                                        onChange={this.saveTextArea}
                                    />
                                    <div>
                                        <Button size="default"
                                            onClick={this.saveRemark.bind(this, item)}>
                                            提交
                                        </Button>
                                    </div>
                                </div>
                                :
                                <Input
                                    placeholder='评论'
                                    onClick={this.showTextArea.bind(this, index)}
                                />
                        })()
                    }
                </div>
            </div>
        })
        return (
            <div id='posts'>
                {
                    insertTag
                }
                {
                    postItems
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.post,
        insert: state.post.insert
    };
}

export default connect(mapStateToProps)(ShareContent);