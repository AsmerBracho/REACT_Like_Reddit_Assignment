import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Links } from './pages/links';
import { Header } from './components/header/header';

ReactDOM.render(
    // Our application will be surronded by the Router Component 
    <BrowserRouter> 
        <div>
            <Header /> 
            <div className = "container">
                <Switch> 
                    <Route path="/" component={Links} />
                </Switch>
            </div>>
    </div>
    </BrowserRouter>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
