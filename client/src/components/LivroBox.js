import React, { Component } from 'react';

class LivroBox extends Component {

    constructor() {
        super();
    }

    render () {
        return (
            <div className="my-3 p-3 bg-white rounded shadow-sm">
                <h6 className="border-bottom border-gray pb-2 mb-0">Cadastro de Livros</h6>
                <div className="pt-3">
                </div>
            </div>
        );
    }
}

export default LivroBox;