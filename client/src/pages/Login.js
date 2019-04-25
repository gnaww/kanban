import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.login = this.login.bind(this);
        this.usernameChange = this.usernameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
    }

    login = async (event) => {
        const { setNotification } = this.props;
        event.preventDefault();

        setNotification('');
        let { username, password } = this.state;

        if (!username || !password) {
            setNotification('Invalid username or password.');
        }
        else {
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });
                const responseText = await response.json();
                console.log(responseText);
                if (responseText === 'Successfully logged in!') {
                    this.props.history.push("/");
                }
                else {
                    setNotification(responseText);
                }
            }
            catch (err) {
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

    componentDidMount = () => {
        const { setNotification } = this.props;
        setNotification('');
    }
    
    render() {
        const { notification } = this.props;

        return (
            <div>
                <h1>LOGIN</h1>
                {notification && <p>{notification}</p>}
                <form onSubmit={this.login} >
                    <h3>Username</h3>
                    <input className="InputBox" type="text" onChange={this.usernameChange} />
                    <h3>Password</h3>
                    <input className="InputBox" type="password" onChange={this.passwordChange} />
                    <button className="Button">Log In</button>
                </form>
                <p>or <Link to="/signup">Signup</Link></p>
            </div>
        );
    }
}

export default Login;
