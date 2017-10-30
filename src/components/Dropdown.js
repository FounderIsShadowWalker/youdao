import React from 'react';
import { Menu, Dropdown, Button, Icon, message } from 'antd';
import { connect } from 'dva';
import { throttle } from 'lodash';
import classNames from 'classnames';
import { addFriend } from '../services/index'
import './Dropdown.scss';


class DropDownCom extends React.Component {

    showAdd = (user) => {
        addFriend({
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.props.username,
                addFirend: user
            })
        }).then((result) => {
            let { data } = result.data;
            message.info(data);
        })
    }

    render() {
        const { userList, username } = this.props;

        const menu = userList && userList.map((item, index) => {
            let itemClassName = classNames({
                'item': true,
                'disabled': username === item.username
            })
            return <div className={itemClassName} key={index}>
                {item.username}
                <Icon type="user-add"
                    onClick={username === item.username ? null : this.showAdd.bind(this, item.username)}
                    style={{ fontSize: 16, color: '#08c' }}
                />
            </div>
        })

        return (
            <div id="dropDown">
                {menu}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { userList } = state.qqnumber;
    return {
        userList
    };
}

export default connect(mapStateToProps)(DropDownCom);