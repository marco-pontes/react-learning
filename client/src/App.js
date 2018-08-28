import React, { Component } from 'react';
import InputCustom from './components/InputCustom'
import SubmitCustom from './components/SubmitCustom'
import './App.css';
import AutorService from './services/AutorService';

class App extends Component {

    constructor() {
        super();
        this.state = { lista: [], autor: { nome: '', email: '', senha: '' } };
        this.autorService = new AutorService();
        this.cadastra = this.cadastra.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

    componentDidMount() {
        this.autorService.lista()
            .then(autores => this.setState({ lista: autores }))
            .catch(erro => console.log(erro));
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
            <div id="layout">
                <a href="#menu" id="menuLink" className="menu-link">

                    <span></span>
                </a>

                <div id="menu">
                    <div className="pure-menu">
                        <a className="pure-menu-heading" href="home">Company</a>

                        <ul className="pure-menu-list">
                            <li className="pure-menu-item"><a href="home" className="pure-menu-link">Home</a></li>
                            <li className="pure-menu-item"><a href="autor" className="pure-menu-link">Autor</a></li>
                            <li className="pure-menu-item"><a href="livros" className="pure-menu-link">Livros</a></li>
                        </ul>
                    </div>
                </div>

                <div id="main">
                    <div className="header">
                        <h1>Cadastro de Autores</h1>
                    </div>

                    <div className="content" id="content">
                        <div className="pure-form pure-form-aligned">
                            <form className="pure-form pure-form-aligned" onSubmit={this.cadastra}>
                                <InputCustom label="Nome" id="nome" type="text" name="nome" value={ this.state.autor.nome } onChange={ this.setNome } />
                                <InputCustom label="Email" id="email" type="email" name="email" value={ this.state.autor.email } onChange={ this.setEmail } />
                                <InputCustom label="Senha" id="senha" type="password" name="senha" value={ this.state.autor.senha } onChange={ this.setSenha } />
                                <SubmitCustom label="Gravar" />
                            </form>

                        </div>
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
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
