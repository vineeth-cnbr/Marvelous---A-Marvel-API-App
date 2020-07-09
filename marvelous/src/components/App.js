import React from 'react';
import { Router, Switch, Route } from "react-router-dom";
import Navbar from './Navbar';
import './App.css';
import history from '../history';
import Characters from './CharacterComponents/Characters';
import Events from './EventComponents/Events';
import Quiz from './QuizComponents/Quiz';

const App = () => {
    return (
        <div>
            <Router history={history}>
                <Route path="/" component={Navbar} />
                <div className="content ui container ">
                    <Switch>
                        <Route path="/" exact component={Characters} />
                        <Route path="/characters" component={Characters} />
                        <Route path="/events" component={Events} />
                        <Route path="/quiz" component={Quiz} />
                    </Switch>
                </div>
            </Router>
        </div >
    )
}

export default App;