import React, { Component } from 'react';
import AutorService from '../services/AutorService';
import InputCustom from './InputCustom';
import SubmitCustom from './SubmitCustom';

class FormularioAutor extends Component {

    constructor() {
        super();
        this.state = { autor: { nome: '', email: '', senha: '' } };
        this.autorService = new AutorService();
        this.cadastra = this.cadastra.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

    cadastra(event) {
        event.preventDefault();
        this.autorService.salva(this.state.autor)
            .then(autores => this.setState({ lista: autores }))
            .catch(erro => console.log(erro));
    }

    setNome(event) {
        this.setState({ autor: { ...this.state.autor, nome: event.target.value } });
    }

    setEmail(event) {
        this.setState({ autor: { ...this.state.autor, email: event.target.value } });
    }

    setSenha(event) {
        this.setState({ autor: { ...this.state.autor, senha: event.target.value } });
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.cadastra}>
                    <InputCustom label="Nome" id="nome" type="text" name="nome" value={ this.state.autor.nome } onChange={ this.setNome } />
                    <InputCustom label="Email" id="email" type="email" name="email" value={ this.state.autor.email } onChange={ this.setEmail } />
                    <InputCustom label="Senha" id="senha" type="password" name="senha" value={ this.state.autor.senha } onChange={ this.setSenha } />
                    <SubmitCustom label="Gravar" />
                </form>

            </div>
        );
    }

}

class TabelaAutores extends Component {

    constructor() {
        super();
        this.state = { lista: [] };
        this.autorService = new AutorService();
    }

    componentDidMount() {
        this.autorService.lista()
            .then(autores => this.setState({ lista: autores }))
            .catch(erro => console.log(erro));
    }

    render() {
        return (
            <div>
                <table className="pure-table">
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.lista.map((autor) =>  (
                                <tr key={autor.id}>
                                    <td>{autor.nome}</td>
                                    <td>{autor.email}</td>
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </table>
            </div>
        );
    }

}

export {
    FormularioAutor,
    TabelaAutores,
}