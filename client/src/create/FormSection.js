import React, { Component } from 'react';

class FormSection extends Component {
    render() {
        return <div className={"form-section"}>
                <h1 className={"mb-3"}>{this.props.name}</h1>

                <div className={"form-section-element"}>
                    {this.props.children}
                </div>
            </div>;
    }
}

export default FormSection;