import React from 'react';
import './Header.scss';
import { connect } from 'dva';
import classNames from 'classnames';
class Header extends React.Component {

    activeIndex = (activeIndex) => {
        this.props.dispatch({
            type: 'header/activeIndex',
            payload: {
                activeIndex: activeIndex
            }
        })
    }

    render() {
        const { activeIndex, tags } = this.props;
        const CataGory = tags.map((item, index) => {
            const headerClass = classNames({
                'headerItem': true,
                'headerSelectd': index === activeIndex
            });

            return <span
                key={index}
                onClick={this.activeIndex.bind(this, index)}
                className={headerClass}
            >
                {item}
            </span>
        });


        return (
            <div className='wrapper'>
                {CataGory}
                {this.props.children}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { activeIndex } = state.header;
    return {
        activeIndex
    };
}


export default connect(mapStateToProps)(Header);