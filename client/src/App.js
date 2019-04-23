import React, { Component } from 'react';
import {
    BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import BoardList from './components/BoardList';
import Login from './components/Login';
import Signup from './components/Signup';
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
                                <Link to="/about/">About</Link>
                            </li>
                            <li>
                                <Link to="/users/">Users</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="Container">
                        <Switch>
                            <Route path="/" exact component={BoardList} />
                            <Route path="/login/" component={Login} />
                            <Route path="/signup/" component={Signup} />
                            <Route component={BadPage} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
