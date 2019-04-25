import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import styles from './Login.module.css';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordConfirm: ''
        };

        this.signUp = this.signUp.bind(this);
        this.usernameChange = this.usernameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.passwordConfirmChange = this.passwordConfirmChange.bind(this);
    }

    signUp = async (event) => {
        const { setNotification } = this.props;
        event.preventDefault();

        setNotification('');
        let { username, password, passwordConfirm } = this.state;
        username = username.trim();
        let valid = true;
        
        if (!username) {
            valid = false;
            setNotification('Invalid username.');
        }
        else if (!password || !passwordConfirm || password !== passwordConfirm) {
            valid = false;
            setNotification('Must enter a password and the passwords must match.');
        }
        
        if (valid) {
            try {
                setNotification('Loading...');
                const response = await fetch('/api/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });
                const responseText = await response.json();
                if (responseText === 'Successfully signed up!') {
                    this.props.history.push("/");
                }
                else {
                    setNotification(responseText);
                }
            }
            catch(err) {
                console.log(err);
                setNotification('An error occurred, please try again.');
            }
        }

    }

    usernameChange = event => {
        this.setState({ username: event.target.value });
    }

    passwordChange = event => {
        this.setState({ password: event.target.value });
    }

    passwordConfirmChange = event => {
        this.setState({ passwordConfirm: event.target.value });
    }

    componentDidMount = () => {
        const { setNotification, authenticate } = this.props;
        authenticate();
        setNotification('');
    }

    render() {
        const { notification } = this.props;

        return (
            <div>
                <h1>SIGNUP</h1>
                { notification && <p>{notification}</p> }
                <form onSubmit={this.signUp}>
                    <h3>Username</h3>
                    <input className={styles.InputBox} type="text" onChange={this.usernameChange} />
                    <h3>Password</h3>
                    <input className={styles.InputBox}type="password" onChange={this.passwordChange} />
                    <h3>Confirm Password</h3>
                    <input className={styles.InputBox}type="password" onChange={this.passwordConfirmChange} />
                    <button className={styles.Button}>Sign Up!</button>
                </form>
                <p>or <Link to="/login">Login</Link></p>
            </div>
        );
    }
}

export default withRouter(SignUp);
