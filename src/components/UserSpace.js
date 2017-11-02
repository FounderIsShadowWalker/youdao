import React from 'react';
import ShareInput from '../components/ShareInput';
import ShareContent from '../components/ShareContents';
import DropDown from '../components/Dropdown';
import { Spin, Input } from 'antd';
import { connect } from 'dva';

const Search = Input.Search;
let throttleId = null;

class UserSpace extends React.Component {

    componentDidMount() {
        window.addEventListener('scroll', this.orderScroll)
    };

    orderScroll = () => {
        if (document.documentElement.scrollHeight - document.documentElement.clientHeight - document.documentElement.scrollTop == 0) {
            throttleId != null && (clearTimeout(throttleId), throttleId = null);
            throttleId = setTimeout(() => {
                this.props.dispatch({
                    type: 'post/getPosts',
                    payload: {
                        username: this.props.params.username
                    }
                })
            }, 1000);
            this.props.dispatch({
                type: 'post/setSpin'
            })
        }
    }

    componentWillUnmount() {
        window.removeEventListener(this.orderScroll);
    }

    showDropDown = (e) => {
        this.props.dispatch({
            type: 'qqnumber/fetchUser',
            payload: {
                username: e.target.value
            }
        })
    }


    render() {
        return (
            <div>
                <ShareInput {...this.props.params} />
                <ShareContent {...this.props.params} />
                <div className="searchWrapper">
                    <Search
                        placeholder="输入QQ号"
                        style={{ width: 200 }}
                        onChange={this.showDropDown}
                        onSearch={value => console.log(value)}
                    />
                    <DropDown {...this.props.params} />
                </div>
            </div>
        )
    }
}

export default connect()(UserSpace);