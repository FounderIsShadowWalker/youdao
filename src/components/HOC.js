import React from 'react';

const Enhance = (ComposedCompoennt) => class extends React.Component {
    constructor() {
        super();
    }

    getWrappedInstance = () => {
        if (this.props.withRef) {
            return this.wrappedInstance;
        }
    }

    setWrappedInstance = (ref) => {
        this.wrappedInstance = ref;
    }

    render() {

        let props = {
            ...this.props
        };

        if (this.props.withRef) {
            props.ref = this.setWrappedInstance.bind(this);
        }

        return (
            <ComposedCompoennt {...props} >
                {this.props.children}
            </ComposedCompoennt>);
    }
}

export default Enhance;

