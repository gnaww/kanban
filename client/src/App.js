import React, { Component } from 'react';
import {
    BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import BoardList from './components/BoardList';
import Login from './components/Login';
import SignUp from './components/Signup';
import BadPage from './components/BadPage';
import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/signup">Signup</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="Container">
                        <Switch>
                            <Route path="/" exact component={BoardList} />
                            <Route path="/login" component={Login} />
                            <Route path="/signup" component={SignUp} />
                            <Route component={BadPage} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
