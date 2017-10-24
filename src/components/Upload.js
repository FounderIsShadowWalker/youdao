import React from 'react';
import './Upload.scss';

export default class Upload extends React.Component {
    render() {
        return (
            <div id="specialUpload">
                {this.props.children}
            </div>
        )
    }
}