import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import BoardList from '../components/BoardList';
import styles from './Home.module.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.logout = this.logout.bind(this);
    }

    logout = async (_) => {
        const { setNotification } = this.props;
        const response = await fetch('/api/logout');
        const responseText = await response.json();

        if (responseText === 'success') {
            this.props.history.push("/login");
        }
        else {
            setNotification(responseText);
        }
    }

    componentDidMount = () => {
        const { setNotification, authenticate } = this.props;
        authenticate();
        setNotification('');
    }

    render() {
        const { notification, user } = this.props;
        return (
            <div>
                {user ? <h1>Welcome {user}!</h1> : <h1>Not logged in, go to <Link to="/login">Login</Link> to login</h1>}
                <h1>Your Kanban Boards</h1>
                <button type="button" onClick={this.logout}>Log Out</button>
                { notification && <p>{notification}</p> }
                <BoardList />
            </div>
        );
    }
}

export default withRouter(Home);
