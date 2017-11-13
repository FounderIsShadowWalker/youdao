import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { Radio } from 'antd';
import { DatePicker } from 'antd';
import { saveUserInfo, getUserInfo } from '../services/index'
import moment from 'moment';

import './UserInfo.scss';

const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const dateFormat = 'YYYY-MM-DD';

class UserInfo extends React.Component {

    state = {
        birthday: '',
        introduce: '',
    }

    componentDidMount() {
        // this.props.form.setFieldsValue({
        //     'username': this.props.params.username
        // })

        getUserInfo({
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: this.props.params.username })
        }).then((value) => {

            value.data.birthday = moment(value.data.birthday);
            this.props.form.setFieldsValue({
                ...value.data
            })
        });
    }

    onChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
            if (!err) {
                console.log('Received values of form: ', values);
                saveUserInfo({
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                }).then((value) => {
                    if (value.data.data == "success") {
                        message.info('修改成功');
                    }
                })
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;


        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };

        return (
            <div id="userInfo">
                <div className="spanWrapper">
                    <span> 设置个人信息 </span>
                </div>
                <div className='contentWrapper'>
                    <Form className="login-form">
                        <FormItem
                            {...formItemLayout}
                            label="用户名"
                            hasFeedback
                        >
                            {getFieldDecorator('username', {
                            })(
                                <Input disabled />
                                )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="介绍"
                            hasFeedback
                        >
                            {getFieldDecorator('introduce', {
                            })(
                                <TextArea autosize={{ minRows: 3, maxRows: 6 }} />
                                )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="性别"
                            hasFeedback
                        >
                            {getFieldDecorator('sex', {
                            })(
                                <RadioGroup onChange={this.onChange} >
                                    <Radio value={'1'}>男</Radio>
                                    <Radio value={'2'}>女</Radio>
                                    <Radio value={'3'}>保密</Radio>
                                </RadioGroup>
                                )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="生日"
                            hasFeedback
                        >
                            {getFieldDecorator('birthday', {
                            })(
                                <DatePicker value={this.state.birthday} />
                                )}
                        </FormItem>
                    </Form>

                    <div className="buttonGroup">
                        <Button type="primary" className="confirm" onClick={this.handleSubmit}>确认</Button>
                    </div>

                    <div className="avator" style={{ backgroundImage: `url(./she.jpg)` }}>
                        <Button type="primary">确认</Button>
                    </div>
                </div>
            </div >
        )
    }
}

export default Form.create({
    // mapPropsToFields(props) {
    //     console.log(props);
    //     return {
    //         username: {
    //             value: props.username
    //         }
    //     }
    // }
})(UserInfo);