import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import BoardList from '../components/BoardList';
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        };

        this.logout = this.logout.bind(this);
    }

    logout = async (_) => {
        const { setNotification } = this.props;
        const response = await fetch('/api/logout');
        const responseText = await response.json();
        console.log(responseText);

        if (responseText === 'success') {
            this.props.history.push("/login");
        }
        else {
            setNotification(responseText);
        }
    }

    render() {
        const { notification } = this.props;
        return (
            <div>
                <h1>Welcome user!</h1>
                <h1>Your Kanban Boards</h1>
                <button type="button" onClick={this.logout}>Log Out</button>
                { notification && <p>{notification}</p> }
                <BoardList />
            </div>
        );
    }
}

export default withRouter(Home);
