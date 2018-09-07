import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import AutorBox from "./components/AutorBox";
import LivroBox from "./components/LivroBox";
import HomeBox from "./components/HomeBox";

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <div id="menu">
                        <div className="nav-scroller bg-white shadow-sm">
                            <nav className="nav nav-underline">
                                <Link className="nav-link active" to="/">Home</Link>
                                <Link className="nav-link" to="/autor">Autor</Link>
                                <Link className="nav-link" to="/livro">Livros</Link>
                            </nav>
                        </div>
                    </div>

                    <main id="main" className="container">
                        <Switch>
                            <Route exact={true} path="/" component={HomeBox} />
                            <Route path="/autor" component={AutorBox}/>
                            <Route path="/livro" component={LivroBox} />
                            <Route component={NoMatch} />
                        </Switch>
                    </main>
                </div>
            </BrowserRouter>
        );
    }
}

const NoMatch = ({ location }) => (
    <div>
        <h3>No match for <code>{location.pathname}</code></h3>
    </div>
)

export default App;
