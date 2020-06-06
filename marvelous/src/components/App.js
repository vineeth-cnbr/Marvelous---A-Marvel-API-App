import React from 'react';
import { Router, Switch, Route } from "react-router-dom";
import Navbar from './navbar';
import './App.css';
import history from '../history';
import Characters from './Characters';
import Movies from './Movies';

const App = () => {
    return (
        <div>
            <Router history={history}>
                <Navbar />
                <div className="content ui container ">
                    <Switch>
                        <Route path="/" exact component={Characters} />
                        <Route path="/characters" component={Characters} />
                        <Route path="/movies" component={Movies} />
                    </Switch>
                </div>
            </Router>
        </div >
    )
}

export default App;