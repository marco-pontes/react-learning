import React, { Component } from 'react';
import AutorService from '../services/AutorService';
import InputCustom from './InputCustom';
import SubmitCustom from './SubmitCustom';
import PubSub from 'pubsub-js';

class FormularioAutor extends Component {

    constructor() {
        super();
        this.state = { autor: { nome: '', email: '', senha: '' } };
        this.autorService = new AutorService();
        this.cadastra = this.cadastra.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    cadastra(event) {
        event.preventDefault();
        this.autorService.salva(this.state.autor)
            .then(autores => {
                PubSub.publish('atualiza-listagem-autores', autores);
                this.setState({ autor: { nome: '', email: '', senha: '' } });
            })
            .catch(erro => {
            });
    }

    onFieldChange(prop, event) {
        let autor = { ...this.state.autor };
        autor[prop] = event.target.value;
        this.setState({ autor: autor });
    }

    isBlank (prop) {
        return this.state.autor[prop] === '';
    }

    onClick () {
        this.setState({ ...this.state});
    }

    render() {
        return (
            <form  onSubmit={this.cadastra}>
                <InputCustom label="Nome" invalid={this.isBlank('nome')} id="nome" type="text" name="nome" value={ this.state.autor.nome } onChange={ this.onFieldChange } />
                <InputCustom label="Email" invalid={this.isBlank('email')} id="email" type="email" name="email" value={ this.state.autor.email } onChange={ this.onFieldChange } />
                <InputCustom label="Senha" invalid={this.isBlank('senha')} id="senha" type="password" name="senha" value={ this.state.autor.senha } onChange={ this.onFieldChange } />
                <SubmitCustom label="Gravar" onClick={this.onClick} />
            </form>
        );
    }

}

class TabelaAutores extends Component {

    render() {
        return (
            <div className="my-3 p-3 ">
                <table className="table table-hover table-striped table-sm">
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.lista.map((autor) =>  (
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

class AutorBox extends Component {

    constructor() {
        super();
        this.state = { lista: [] };
        this.autorService = new AutorService();
        this.atualizaListagem = this.atualizaListagem.bind(this);
    }

    componentDidMount() {
        this.autorService.lista()
            .then(autores => this.setState({ lista: autores }))
            .catch(erro => console.log(erro));
        PubSub.subscribe('atualiza-listagem-autores', this.atualizaListagem)
    }

    atualizaListagem(topico, autores) {
        this.setState({ lista: autores })
    }

    render () {
        return (
            <div>
                <FormularioAutor />
                <TabelaAutores lista={this.state.lista}  />
            </div>
        );
    }
}

export default AutorBox;