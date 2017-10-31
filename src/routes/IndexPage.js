import React from 'react';
import { connect } from 'dva';
import { HOCModal } from '../components/HOCComponent';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import IndexContent from '../components/IndexContent';
import socket from '../socket';

import Header from '../components/Header';
import styles from './IndexPage.css';

class IndexPage extends React.Component {

  componentDidMount() {
    // socket.on('message', (data) => {
    //   console.log(data);
    // })

    // socket.emit('chat message', { name: 'shadow' });
  };

  showLogin = () => {
    this.props.dispatch({
      type: 'modal/show',
      payload: {
        modalVisible: 'loginVisible'
      }
    })
  }

  showRegister = () => {
    this.props.dispatch({
      type: 'modal/show',
      payload: {
        modalVisible: 'registerVisible'
      }
    })
  }

  render() {

    return (
      <div className={styles.normal}>
        <Header tags={['首页', '云笔记', '云协作', '下载', '会员', '企业版']} >
          <a className='headerItem' href="javascript:void (0)" onClick={this.showLogin}>登录</a>
          <a className='headerItem' href="javascript:void (0)" onClick={this.showRegister}>注册</a>
        </Header>
        <HOCModal
          ref='login'
          width='400'
          title='登录'
          modalVisible='loginVisible'
          footer={null}
          withRef
        >
          <LoginForm />
        </HOCModal>

        <HOCModal
          ref='register'
          width='500'
          title='注册'
          modalVisible='registerVisible'
          footer={null}
          withRef
        >
          <RegisterForm />
        </HOCModal>
        <IndexContent />
      </div >
    )
  }
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
