import React from 'react';
import { connect } from 'dva';
import './ShareContents.scss';

class ShareContent extends React.Component {

    render() {
        const { data } = this.props.data;
        console.log(data);

        return (
            <div id='posts'>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.post
    };
}

export default connect(mapStateToProps)(ShareContent);