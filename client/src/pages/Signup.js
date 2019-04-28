import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Notification from '../components/Notification';
import styles from './Login.module.css';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordConfirm: '',
            loading: false
        };

        this.signUp = this.signUp.bind(this);
        this.usernameChange = this.usernameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.passwordConfirmChange = this.passwordConfirmChange.bind(this);
    }

    signUp = async (event) => {
        const { setNotification } = this.props;
        event.preventDefault();

        this.setState({ loading: true });
        let { username, password, passwordConfirm } = this.state;
        username = username.trim();
        let valid = true;
        
        if (!username) {
            valid = false;
            this.setState({ loading: false });
            setNotification('Invalid or empty username.');
        }
        else if (!password || !passwordConfirm || password !== passwordConfirm) {
            valid = false;
            this.setState({ loading: false });
            setNotification('Must enter a password and the passwords must match.');
        }
        
        if (valid) {
            try {
                const response = await fetch('/api/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });
                const responseText = await response.json();
                this.setState({ loading: false });
                if (responseText === 'Successfully signed up!') {
                    this.props.history.push("/");
                }
                else {
                    setNotification(responseText);
                }
            }
            catch(err) {
                console.log(err);
                this.setState({ loading: false });
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
        const { notification, nightmode, setNotification } = this.props;
        const { loading } = this.state;

        return (
            <div className={styles.UserForm}>
                <div>
                    <h1>Sign Up</h1>
                    { notification && <Notification {...{ notification,nightmode, setNotification }} /> }
                    <form onSubmit={this.signUp}>
                        <h3>Username</h3>
                        <input className={styles.InputBox} type="text" onChange={this.usernameChange} required />
                        <h3>Password</h3>
                        <input className={styles.InputBox} type="password" onChange={this.passwordChange} required />
                        <h3>Confirm Password</h3>
                        <input className={styles.InputBox} type="password" onChange={this.passwordConfirmChange} required />
                        {loading ? <div className={styles.Loading}><CircularProgress size={45} /></div> : 
                        <Button type="submit" variant="contained" fullWidth={true} color="primary">
                            Sign Up
                        </Button>}
                    </form>
                    <p>or <Link to="/login">Login</Link></p>
                </div>
            </div>
        );
    }
}

export default withRouter(SignUp);
