import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import BadPage from './pages/BadPage';
import styles from './App.module.css';
import 'typeface-roboto';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notification: ''
        };

        this.setNotification = this.setNotification.bind(this);
    }

    setNotification = notification => {
        this.setState({ notification });
    }

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
                    <div className={styles.Container}>
                        <Switch>
                            <Route path="/" exact render={() => <Home setNotification={this.setNotification} notification={this.state.notification} />}  />
                            <Route path="/login" render={() => <Login setNotification={this.setNotification} notification={this.state.notification} />} />
                            <Route path="/signup" render={() => <SignUp setNotification={this.setNotification} notification={this.state.notification} />} />
                            <Route component={BadPage} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
