import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Login.css';

class SignUp extends Component {
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
                <h1>SIGNUP</h1>
                <form>
                    <h3>Username</h3>
                    <input className="InputBox" type="text" />
                    <h3>Password</h3>
                    <input className="InputBox" type="text" />
                    <h3>Confirm Password</h3>
                    <input className="InputBox" type="text" />
                    <button type="submit" className="Button">Sign Up!</button>
                </form>
                <p>or <Link to="/login">Login</Link></p>
            </div>
        );
    }
}

export default SignUp;