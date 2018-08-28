import React, { Component } from 'react';
import './App.css';
import { FormularioAutor, TabelaAutores } from './components/Autor';

class App extends Component {

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
                        <FormularioAutor />
                        <TabelaAutores />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
