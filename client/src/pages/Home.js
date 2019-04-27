import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
        const { notification } = this.props;
        return (
            <div className={styles.Home}>
                <h1>Your Kanban Boards</h1>
                { notification && <p>{notification}</p> }
                <BoardList boards={this.state.boards}/>
            </div>
        );
    }
}

export default withRouter(Home);
