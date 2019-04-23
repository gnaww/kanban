import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount = async () => {
    }

    render() {
        return (
            <div>
                <h1>LOGIN</h1>
                <form>
                    <h3>Username</h3>
                    <input className="InputBox" type="text" />
                    <h3>Password</h3>
                    <input className="InputBox" type="text" />
                    <button type="submit" className="Button">Log In</button>
                </form>
                <p>or <Link to="/signup">Signup</Link></p>
            </div>
        );
    }
}

export default Login;
