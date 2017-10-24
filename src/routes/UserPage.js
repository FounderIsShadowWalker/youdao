import React from 'react';
import Header from '../components/Header';
import UserMenu from '../components/UserMenu';
import ShareInput from '../components/ShareInput';
import ShareContent from '../components/ShareContents';
import './UserPage.scss';

export default class UserPage extends React.Component {
    componentDidMount() {
        console.log(this.props.params, '来自router的参数');
    };

    render() {
        return (
            <div>
                <Header tags={['首页', '云笔记', '云协作', '下载', '会员', '企业版']} >
                    <a className='headerItem' href="javascript:void (0)">{this.props.params.username}</a>
                </Header>
                <div className='content'>
                    <div className='left'>
                        <UserMenu />
                    </div>
                    <div className='right'>
                        <ShareInput {...this.props.params} />
                        <ShareContent />
                    </div>
                </div>
            </div>
        )

    }
}
