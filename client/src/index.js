import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
import AutorBox from './components/AutorBox';
import LivroBox from './components/LivroBox';

ReactDOM.render(
    (<BrowserRouter >
        <div>
            <Route path="/" component={App} />
            <Route path="/autor" component={AutorBox}/>
            <Route path="/livro" component={LivroBox} />
        </div>
    </BrowserRouter>),
    document.getElementById('root'));
