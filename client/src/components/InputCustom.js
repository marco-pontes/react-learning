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
                    <input className={"form-control " + (this.props.invalid && this.state.edited ? 'is-invalid' : '')}
                           id={ this.props.id } type={ this.props.type }
                           name={ this.props.name }
                           value={ this.props.value }
                           onChange={(e) => { this.props.onChange(this.props.name, e); this.setState({ edited: true }) } }
                    />
                    <InvalidFeedBack invalid={this.props.invalid && this.state.edited} />
                </div>
            </div>
        );
    }

}

function InvalidFeedBack(props) {
    const invalid = props.invalid;
    if (invalid) {
        return (
            <div className="invalid-feedback">
                Please provide a valid city.
            </div>
        );
    }
    else {
        return null;
    }
}

export default InputCustom;