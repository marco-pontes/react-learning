import React, { Component } from 'react';
import AutorService from '../services/AutorService';
import InputCustom from './InputCustom';
import SubmitCustom from './SubmitCustom';
import PubSub from 'pubsub-js';

class FormularioAutor extends Component {

    constructor() {
        super();
        this.fields = ['nome', 'email', 'senha'];
        let autor = {};
        this.fields.forEach(prop => autor[prop] = { value: '', edited: false, blank: true, valid: true });
        this.state = { autor: autor };
        this.autorService = new AutorService();
        this.cadastra = this.cadastra.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
    }

    cadastra(event) {
        event.preventDefault();
        this.autorService.salva(this.getDado())
            .then(autores => {
                PubSub.publish('atualiza-listagem-autores', autores);
                let state = { ...this.state };
                this.fields.forEach(prop => state.autor[prop] = { value: '', edited: false, blank: false, valid: true });
                this.setState(state);
            })
            .catch(erro => {
            });
    }

    getDado() {
        let dado = {};
        this.fields.forEach(prop => dado[prop] = this.state.autor[prop].value );
        return dado;
    }

    onFieldChange(prop, event) {
        let state = { ...this.state };
        let isBlank = event.target.value === '';
        state.autor[prop].value = event.target.value;
        state.autor[prop].edited = true;
        state.autor[prop].blank = isBlank;
        state.autor[prop].valid = !isBlank;
        this.setState(state);
    }

    render() {
        return (
            <div>
                Livro
            <form  onSubmit={this.cadastra}>
                <InputCustom
                    label="Nome"
                    id="nome"
                    type="text"
                    name="nome"
                    invalidMessage="O campo nome não pode ser deixado em branco"
                    valid={this.state.autor.nome.valid}
                    value={ this.state.autor.nome.value }
                    onChange={ this.onFieldChange }
                />

                <InputCustom
                    label="Email"
                    id="email"
                    type="email"
                    name="email"
                    invalidMessage="O campo email não pode ser deixado em branco"
                    valid={this.state.autor.email.valid}
                    value={ this.state.autor.email.value }
                    onChange={ this.onFieldChange }
                />

                <InputCustom
                    label="Senha"
                    id="senha"
                    type="password"
                    name="senha"
                    invalidMessage="O campo senha não pode ser deixado em branco"
                    valid={this.state.autor.senha.valid}
                    value={ this.state.autor.senha.value }
                    onChange={ this.onFieldChange }
                />

                <SubmitCustom label="Gravar" />
            </form>
            </div>
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

class LivroBox extends Component {

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

export default LivroBox;