import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom'

class App extends Component {

    render() {
        return (
            <div>

                <div id="menu">
                    <div className="nav-scroller bg-white shadow-sm">
                        <nav className="nav nav-underline">
                            <Link className="nav-link active" to="/">Home</Link>
                            <Link className="nav-link" to="/autor">Autor</Link>
                            <Link className="nav-link" to="/livros">Livros</Link>
                        </nav>
                    </div>
                </div>

                <main id="main" className="container">
                    <div className="my-3 p-3 bg-white rounded shadow-sm">
                        <h6 className="border-bottom border-gray pb-2 mb-0">Cadastro de Autores</h6>
                        <div className="pt-3">
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default App;
