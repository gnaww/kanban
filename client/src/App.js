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
            user: '',
            nightmode: false
        };
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

    toggleNightMode = () => {
        this.setState({ nightmode: !this.state.nightmode })
    }
    
    componentDidMount = () => {
        this.authenticate();
    }

    render() {
        const pageProps = {
            setNotification: this.setNotification,
            notification: this.state.notification,
            authenticate: this.authenticate,
            nightmode: this.state.nightmode
        };

        const headerProps = {
            auth: this.state.auth,
            setNotification: this.setNotification,
            nightmode: this.state.nightmode,
            toggleNightMode: this.toggleNightMode,
            user: this.state.user
        }
        
        return (
            <Router>
                <div className={this.state.nightmode ? styles.WrapperDark : styles.Wrapper}>
                    <Header {...headerProps} />
                    <div className={styles.Container}>
                        <Switch>
                            {/* <Route path="/" exact render={() => {
                                return this.state.auth ? <Home {...pageProps} /> : <Redirect to="/login" />
                            }} /> */}
                            <Route path="/" exact render={() => <Home {...pageProps} />} />
                            <Route path="/login" render={() => {
                                return this.state.auth ? <Redirect to="/" /> : <Login {...pageProps} />
                            }} />
                            <Route path="/signup" render={() => {
                                return this.state.auth ? <Redirect to="/" /> : <SignUp {...pageProps} />
                            }} />
                            <Route component={BadPage} />
                        </Switch>
                    </div>
                    <Footer nightmode={this.state.nightmode} />
                </div>
            </Router>
        );
    }
}

export default App;
