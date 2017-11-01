import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { login, register } from '../services/index'
import { hashHistory } from 'dva/router';
import socket from '../socket';
import './LoginForm.scss'

const FormItem = Form.Item;

class LoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //登录
                login({
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                })
                    .then((result) => {
                        console.log('登录结果', result);
                        if (result.data.result === "登录成功") {
                            hashHistory.push(`/UserPage/${values.username}`);
                            socket.emit('login', values.username, () => {
                                message.info(`${values.username} 上线了`);
                            })
                            // hashHistory.push(`/UserPage/welcome`)
                        } else {
                            this.props.form.resetFields();
                            message.error('登录失败');
                        }
                    })

                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='loginWrapper'>
                <Form onSubmit={this.handleSubmit} className='loginForm'>
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                            )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                            )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>Remember me</Checkbox>
                            )}
                        <a className='loginFormForgot' href="">Forgot password</a>
                        <Button type="primary" htmlType="submit" className='loginFormButton'>
                            Log in
          </Button>
                        Or <a href="">register now!</a>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const WrappedLoginForm = Form.create()(LoginForm);
export default WrappedLoginForm;