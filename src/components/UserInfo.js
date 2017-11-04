import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Radio } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';

import './UserInfo.scss';

const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const dateFormat = 'YYYY-MM-DD';

class UserInfo extends React.Component {

    state = {
        value: 1,
    }

    onChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
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
                    <span> 编辑个人信息 </span>
                </div>
                <div className='contentWrapper'>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem
                            {...formItemLayout}
                            label="用户名"
                            hasFeedback
                        >
                            {getFieldDecorator('username', {
                            })(
                                <Input disabled value={this.props.username} />
                                )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="介绍"
                            hasFeedback
                        >
                            {getFieldDecorator('introduce', {
                            })(
                                <TextArea placeholder={this.props.introduce} autosize={{ minRows: 3, maxRows: 6 }} disabled />
                                )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="性别"
                            hasFeedback
                        >
                            {getFieldDecorator('sex', {
                            })(
                                <RadioGroup onChange={this.onChange} value={this.state.value} disabled>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={2}>女</Radio>
                                    <Radio value={3}>保密</Radio>
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
                                <DatePicker value={this.props.birthday} disabled />
                                )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="生日"
                            hasFeedback
                        >
                            {getFieldDecorator('birthday', {
                            })(
                                <DatePicker value={this.props.birthday} disabled />
                                )}
                        </FormItem>
                    </Form>

                    <div className="buttonGroup">
                        <Button type="primary" className="confirm" disabled>确认</Button>
                    </div>

                    <div className="avator" style={{ backgroundImage: `url(./she.jpg)` }}>
                        <Button type="primary" disabled>确认</Button>
                    </div>
                </div>
            </div >
        )
    }
}

export default Form.create({
    mapPropsToFields(props) {
        return {
            username: {
                value: 'shadowWalker'
            },
            introduce: {
                value: '我是风是自由的风'
            },
            sex: {
                value: 1
            },
            birthday: {
                value: moment('2015-06-06', dateFormat)
            }
        }
    }
})(UserInfo);