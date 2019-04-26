import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import BoardList from '../components/BoardList';
import styles from './Home.module.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boards: [
                {
                    name: "Todo",
                    items: [
                        "lorem ipsum",
                        "foo bar"
                    ]
                },
                {
                    name: "In Progress",
                    items: [
                        "in progress 1",
                        "in progress 2"
                    ]
                },
                {
                    name: "Completed",
                    items: [
                        "completed 1",
                        "completed 2",
                        "completed 3"
                    ]
                }
            ]
        };
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
                { notification && <p>{notification}</p> }
                <BoardList boards={this.state.boards}/>
            </div>
        );
    }
}

export default withRouter(Home);
