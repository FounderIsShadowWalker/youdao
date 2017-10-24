import React from 'react';
import { Carousel } from 'antd';
import './IndexContent.scss';

export default class Content extends React.Component {
    render() {
        return (
            <div id='IndexContentWrapper'>
                <Carousel autoplay>
                    <div><h3>1</h3></div>
                    <div><h3>2</h3></div>
                    <div><h3>3</h3></div>
                    <div><h3>4</h3></div>
                </Carousel>
            </div>
        )
    }
}