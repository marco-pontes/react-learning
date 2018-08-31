import React, { Component } from 'react';

class SubmitCustom extends Component {

    render() {
        return (
            <div className="pure-control-group">
                <label></label>
                <button type="submit" onClick={ this.props.onClick } className="btn btn-primary">{this.props.label}</button>
            </div>
        );
    }

}

export default SubmitCustom;