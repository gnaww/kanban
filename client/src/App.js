import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import BadPage from './pages/BadPage';
import Header from './components/Header';
import Footer from './components/Footer';
import styles from './App.module.css';
import 'typeface-roboto';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notification: '',
            auth: false,
            user: ''
        };

        this.setNotification = this.setNotification.bind(this);
        this.authenticate = this.authenticate.bind(this);
    }

    setNotification = notification => {
        this.setState({ notification });
    }

    authenticate = async () => {
        fetch('/api/isloggedin')
            .then(res => res.json())
            .then(resJSON => {
                this.setState({ auth: resJSON !== 'not logged in' })
                this.setState({ user: resJSON !== 'not logged in' ? resJSON : '' })
            })
            .catch(err => this.setNotification('Something went wrong.'));
    }

    componentDidMount = () => {
        this.authenticate();
    }

    render() {
        return (
            <Router>
                <div className={styles.Wrapper}>
                    <Header auth={this.state.auth} setNotification={this.setNotification} />
                    <div className={styles.Container}>
                        <Switch>
                            <Route path="/" exact render={() => {
                                return this.state.auth ? <Home setNotification={this.setNotification} notification={this.state.notification} authenticate={this.authenticate} user={this.state.user} /> : <Redirect to="/login" />
                            }} />
                            <Route path="/login" render={() => {
                                return this.state.auth ? <Redirect to="/" /> : <Login setNotification={this.setNotification} notification={this.state.notification} authenticate={this.authenticate} />
                            }} />
                            <Route path="/signup" render={() => {
                                return this.state.auth ? <Redirect to="/" /> : <SignUp setNotification={this.setNotification} notification={this.state.notification} authenticate={this.authenticate} />
                            }} />
                            <Route component={BadPage} />
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;
