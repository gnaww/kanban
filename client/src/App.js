import React, { Component } from 'react';
import {
    BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import BadPage from './pages/BadPage';
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
                            <Route path="/" exact component={Home} />
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
