import React from 'react';
import { Modal, Button } from 'antd';
import HOC from './HOC';
import { connect } from 'dva';

class ModalBase extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    static defaultProps = {
        visible: false
    }

    showModal = () => {
        this.props.dispatch({
            type: 'modal/show',
            payload: {
                modalVisible: this.props.modalVisible
            }
        })
    }

    handleOk = (e) => {
        this.props.dispatch({
            type: 'modal/hide'
        })

    }

    handleCancel = (e) => {
        this.props.dispatch({
            type: 'modal/hide'
        })

    }

    render() {
        const { visible } = this.props;
        const modalVisible = visible[this.props.modalVisible];
        return (
            <Modal
                title={this.props.title}
                visible={modalVisible}
                onOk={this.handleOk}
                width={this.props.width}
                footer={this.props.footer}
                onCancel={this.handleCancel}>

                {this.props.children}

            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        visible: state.modal
    };
}


export default connect(mapStateToProps)(ModalBase);