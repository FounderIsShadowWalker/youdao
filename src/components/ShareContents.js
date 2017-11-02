import React from 'react';
import { connect } from 'dva';
import { Avatar } from 'antd';
import './ShareContents.scss';

class ShareContent extends React.Component {

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
    }

    render() {
        const { data } = this.props.data;
        const { username, insert } = this.props;

        //insert tag

        const insertTag = insert && <div className="insertTag">有人发来了新消息</div>


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