import React from 'react';
import { connect } from 'dva';
import { Avatar } from 'antd';
import './ShareContents.scss';

class ShareContent extends React.Component {

    componentDidMount() {
        console.log('getPost', this.props.username);
        this.props.dispatch({
            type: 'post/getPosts',
            payload: {
                username: this.props.username
            }
        })
    }

    render() {
        const { data } = this.props.data;
        const { username } = this.props;

        console.log(data);

        const postItems = data.map((item, index) => {
            return <div className="postWrapper" key={index}>
                <div className='title'>
                    <Avatar size="large" icon="user" />
                    <div className='textWrapper'>
                        <p className='username'> {username} </p>
                        <p className='time'> {item.time}</p>
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
                    postItems
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.post
    };
}

export default connect(mapStateToProps)(ShareContent);