import React, { Component } from 'react';
import './App.css';
import AutorBox  from './components/AutorBox';

class App extends Component {

    render() {
        return (
            <div>

                <div id="menu">
                    <div className="nav-scroller bg-white shadow-sm">
                        <nav className="nav nav-underline">
                            <a className="nav-link active" href="home">Home</a>
                            <a className="nav-link" href="autor">Autor</a>
                            <a className="nav-link" href="livros">Livros</a>
                        </nav>
                    </div>
                </div>

                <main id="main" className="container">
                    <div className="my-3 p-3 bg-white rounded shadow-sm">
                        <h6 className="border-bottom border-gray pb-2 mb-0">Cadastro de Autores</h6>
                        <div className="pt-3">
                            <AutorBox />
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default App;
