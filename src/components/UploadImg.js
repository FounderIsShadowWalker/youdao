import React from 'react';
import Upload from './Upload';
import UploadAvator from './UploadAvator';

export default class UploadImg extends React.Component {

    render() {
        return (
            <Upload>
                <UploadAvator pic="camera" />
            </Upload>
        )
    }
}