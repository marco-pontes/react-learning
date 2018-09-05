import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render(
    (<BrowserRouter >
        <div>
            <Route path="/" component={App} />
            <Route path="/autor" />
            <Route path="/livro" />
        </div>
    </BrowserRouter>),
    document.getElementById('root'));
