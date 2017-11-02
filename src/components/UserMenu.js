import { Menu, Icon, Button } from 'antd';
import { hashHistory } from 'dva/router';
import { connect } from 'dva';

const SubMenu = Menu.SubMenu;

class UserMenu extends React.Component {

    componentDidMount() {
        console.log(this.props.params);
    }

    userSpace = () => {
        this.props.dispatch({
            type: 'post/clearInsert'
        });

        this.props.dispatch({
            type: 'post/getPosts',
            payload: {
                username: this.props.username,
                reload: true
            }
        });

    }


    modifyUserInfo = () => {
        hashHistory.push(`/UserPage/${this.props.username}/userInfo`);
    }

    render() {
        return (
            <div style={{ width: 240 }}>

                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    <Menu.Item key="1">
                        <Icon type="pie-chart" />
                        <span onClick={this.userSpace}>好友动态</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="desktop" />
                        <span>特别关心</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="inbox" />
                        <span>与我相关</span>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Icon type="mail" />
                        <span>那年今日</span>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Icon type="setting" />
                        <span onClick={this.modifyUserInfo}>个人设置</span>
                    </Menu.Item>
                    <SubMenu key="sub2" title={<span><Icon type="appstore" /><span> 游戏应用</span></span>}>
                        <Menu.Item key="9"> LOL </Menu.Item>
                        <Menu.Item key="10"> Dota </Menu.Item>
                        <SubMenu key="sub3" title="主机游戏">
                            <Menu.Item key="11"> 绝地求生 </Menu.Item>
                            <Menu.Item key="12">黎明杀机</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}


export default connect()(UserMenu);