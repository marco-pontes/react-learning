import React, { Component } from 'react';

class InputCustom extends Component {

    constructor() {
        super();
        this.state = {
            edited: false
        }
    }

    render() {
        return (
            <div className="form-group row">
                <label className="col-sm-2 col-form-label" htmlFor={ this.props.id }>{ this.props.label }</label>
                <div className="col-sm-10">
                    <input { ...this.props }
                           className={"form-control " + (this.props.valid ? '' : 'is-invalid')}
                           onChange={(e) => { this.props.onChange(this.props.name, e) } }
                    />
                    <InvalidFeedBack valid={this.props.valid} invalidMessage={this.props.invalidMessage} />
                </div>
            </div>
        );
    }

}

function InvalidFeedBack(props) {
    const valid = props.valid;
    if (!valid) {
        return (
            <div className="invalid-feedback">
                {props.invalidMessage}
            </div>
        );
    }
    else {
        return null;
    }
}

export default InputCustom;