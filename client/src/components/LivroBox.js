import React, { Component } from 'react';
import AutorService from "../services/AutorService";
import LivroService from "../services/LivroService";
import PubSub from "pubsub-js";
import InputCustom from "./InputCustom";
import SubmitCustom from "./SubmitCustom";
import SelectCustom from "./SelectCustom";

class FormularioLivro extends Component {

    constructor() {
        super();
        this.fields = ['titulo', 'preco', 'autor'];
        let livro = {};
        this.fields.forEach(prop => livro[prop] = { value: '', edited: false, blank: true, valid: true });
        this.state = { livro: livro, autores:[] };
        this.autorService = new AutorService();
        this.livroService = new LivroService();
        this.cadastra = this.cadastra.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
    }

    componentDidMount() {
        this.autorService.lista()
            .then(autores => this.setState({ autores: autores }))
            .catch(erro => console.log(erro));
    }

    cadastra(event) {
        event.preventDefault();
        this.livroService.salva(this.getDado())
            .then(livros => {
                PubSub.publish('atualiza-listagem-livros', livros);
                let state = { ...this.state };
                this.fields.forEach(prop => state.livro[prop] = { value: '', edited: false, blank: false, valid: true });
                this.setState(state);
            })
            .catch(erro => {
            });
    }

    getDado() {
        let dado = {};
        dado.titulo = this.state.livro.titulo.value;
        dado.preco = this.state.livro.preco.value;
        dado.autorId = this.state.livro.autor.value;
        return dado;
    }

    onFieldChange(prop, event) {
        let state = { ...this.state };
        let isBlank = event.target.value === '';
        state.livro[prop].value = event.target.value;
        state.livro[prop].edited = true;
        state.livro[prop].blank = isBlank;
        state.livro[prop].valid = !isBlank;
        this.setState(state);
    }

    render() {
        return (
            <form  onSubmit={this.cadastra}>
                <InputCustom
                    label="Título"
                    id="titulo"
                    type="text"
                    name="titulo"
                    invalidMessage="O campo título não pode ser deixado em branco"
                    valid={this.state.livro.titulo.valid}
                    value={ this.state.livro.titulo.value }
                    onChange={ this.onFieldChange }
                />

                <InputCustom
                    label="Preço"
                    id="preco"
                    type="number"
                    name="preco"
                    invalidMessage="O campo preço não pode ser deixado em branco"
                    valid={this.state.livro.preco.valid}
                    value={ this.state.livro.preco.value }
                    onChange={ this.onFieldChange }
                />

                <SelectCustom
                    label="Autor"
                    id="autor"
                    name="autor"
                    invalidMessage="O campo autor não pode ser deixado em branco"
                    valid={this.state.livro.autor.valid}
                    value={ this.state.livro.autor.value }
                    lista={ this.state.autores.map((autor) => {
                       return { key:autor.id, value: autor.id, text: autor.nome };
                    }) }
                    onChange={ this.onFieldChange }
                />

                <SubmitCustom label="Gravar" />
            </form>
        );
    }

}

class TabelaLivros extends Component {

    render() {
        return (
            <div className="my-3 p-3 ">
                <table className="table table-hover table-striped table-sm">
                    <thead>
                    <tr>
                        <th>Título</th>
                        <th>Preço</th>
                        <th>Autor</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.lista.map((livro) =>  (
                                <tr key={livro.id}>
                                    <td>{livro.titulo}</td>
                                    <td>{livro.preco}</td>
                                    <td>{livro.autor.nome}</td>
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
        this.livroService = new LivroService();
        this.atualizaListagem = this.atualizaListagem.bind(this);
    }

    componentDidMount() {
        this.livroService.lista()
            .then(livros => this.setState({ lista: livros }))
            .catch(erro => console.log(erro));
        PubSub.subscribe('atualiza-listagem-livros', this.atualizaListagem)
    }

    atualizaListagem(topico, livros) {
        this.setState({ lista: livros })
    }

    render () {
        return (
            <div className="my-3 p-3 bg-white rounded shadow-sm">
                <h6 className="border-bottom border-gray pb-2 mb-0">Cadastro de Livros</h6>
                <div className="pt-3">
                    <FormularioLivro />
                    <TabelaLivros lista={this.state.lista}  />
                </div>
            </div>
        );
    }
}

export default LivroBox;