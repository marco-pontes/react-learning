import React, { Component } from 'react';

class SelectCustom extends Component {

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
                    <select className={"form-control " + (this.props.valid ? '' : 'is-invalid')}
                           id={ this.props.id }
                           name={ this.props.name }
                           value={ this.props.value }
                           onChange={(e) => { this.props.onChange(this.props.name, e) } }>
                        <Option value="" key={0} text="Selecionar" />
                        {this.props.lista.map((item) => <Option key={item.key} value={item.value} text={item.text}/>)}
                    </select>
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

function Option(props) {
    return (
        <option value={props.value}>
            {props.text}
        </option>
    );
}

export default SelectCustom;