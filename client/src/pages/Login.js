import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './Login.module.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            rememberMe: false,
            loading: false
        };

        this.login = this.login.bind(this);
        this.usernameChange = this.usernameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.rememberMeChange = this.rememberMeChange.bind(this);
    }

    login = async (event) => {
        const { setNotification } = this.props;
        event.preventDefault();

        this.setState({ loading: true });
        const { username, password, rememberMe } = this.state;

        if (!username || !password) {
            setNotification('Invalid username or password.');
        }
        else {
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password, rememberMe })
                });
                const responseText = await response.json();
                this.setState({ loading: false });
                if (responseText === 'Successfully logged in!') {
                    this.props.history.push("/");
                }
                else {
                    setNotification(responseText);
                }
            }
            catch (err) {
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

    rememberMeChange = event => {
        this.setState({ rememberMe: event.target.checked });
    }

    componentDidMount = () => {
        const { setNotification, authenticate } = this.props;
        authenticate();
        setNotification('');
    }

    render() {
        const { notification, nightmode } = this.props;
        const { loading } = this.state;

        return (
            <div className={styles.UserForm}>
                <div>
                    <h1>Log In</h1>
                    {notification && <Paper className={nightmode ? styles.NotificationDark : styles.Notification}><span>Error: </span>{notification}</Paper>}
                    <form onSubmit={this.login} >
                        <h3>Username</h3>
                        <input className={styles.InputBox} type="text" onChange={this.usernameChange} />
                        <h3>Password</h3>
                        <input className={styles.InputBox} type="password" onChange={this.passwordChange} />
                        <span>
                            <Checkbox
                                className={styles.RememberMe}
                                checked={this.state.rememberMe}
                                onChange={this.rememberMeChange}
                                value="rememberMe"
                            />
                            Remember me for 1 day
                        </span>
                        {loading ? <p className={styles.Loading}><CircularProgress size={45} /></p> : 
                        <Button type="submit" variant="contained" fullWidth={true} color="primary">
                            Log In
                        </Button>}
                    </form>
                    <p>or <Link to="/signup">Signup</Link></p>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
