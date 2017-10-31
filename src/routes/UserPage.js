import React from 'react';
import Header from '../components/Header';
import UserMenu from '../components/UserMenu';
import ShareInput from '../components/ShareInput';
import ShareContent from '../components/ShareContents';
import { connect } from 'dva';
import { Spin, Input } from 'antd';
import DropDown from '../components/Dropdown';
import './UserPage.scss';

const Search = Input.Search;
let throttleId = null;

class UserPage extends React.Component {

    componentDidMount() {
        console.log(this.props.params, '来自router的参数');
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
        const { spin } = this.props;
        return (
            <div>
                {this.props.children}
                <Header tags={['首页', '云笔记', '云协作', '下载', '会员', '企业版']} >
                    <a className='headerItem' href="javascript:void (0)">{this.props.params.username}</a>
                </Header>
                <Spin tip="Loading..." spinning={spin}>
                    <div className='content'>
                        <div className='left'>
                            <UserMenu />
                        </div>
                        <div className='right'>
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
                    </div>
                </Spin>

                {this.props.children}
            </div>
        )

    }
}

function mapStateToProps(state) {
    const { spin } = state.post;
    return {
        spin
    };
}

export default connect(mapStateToProps)(UserPage);
