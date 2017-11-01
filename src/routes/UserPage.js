import React from 'react';
import Header from '../components/Header';
import UserMenu from '../components/UserMenu';
import ShareInput from '../components/ShareInput';
import ShareContent from '../components/ShareContents';
import { connect } from 'dva';
import { Spin, Input } from 'antd';
import DropDown from '../components/Dropdown';
import UserSpace from '../components/UserSpace';
import './UserPage.scss';

const Search = Input.Search;
let throttleId = null;

class UserPage extends React.Component {

    render() {
        const { spin } = this.props;
        return (
            <div>
                <Header tags={['首页', '云笔记', '云协作', '下载', '会员', '企业版']} >
                    <a className='headerItem' href="javascript:void (0)">{this.props.params.username}</a>
                </Header>
                <Spin tip="Loading..." spinning={spin}>
                    <div className='content'>
                        <div className='left'>
                            <UserMenu />
                        </div>
                        <div className='right'>
                            {this.props.children}
                        </div>
                    </div>
                </Spin>


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
