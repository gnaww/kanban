import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import BoardList from '../components/BoardList';
import Notification from '../components/Notification';
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

    handleAddBoard = boardName => {
        const { setNotification } = this.props;
        setNotification('');

        let valid = true;

        if (!boardName) {
            valid = false;
            setNotification('You must give the new board a name.');
        }
        else if (this.state.boards.some(board => board.name === boardName)) {
            valid = false;
            setNotification('You must give the new board a unique name.');
        }

        if (valid) {
            this.setState({ boards: [...this.state.boards, { name: boardName, items: [] }]})
        }
    }

    componentDidMount = () => {
        const { setNotification, authenticate } = this.props;
        authenticate();
        setNotification('');
    }

    render() {
        const { notification, nightmode, setNotification } = this.props;
        return (
            <div className={styles.Home}>
                <h1>Your Kanban Boards</h1>
                { notification && <Notification {...{ notification,nightmode, setNotification }} /> }
                <BoardList boards={this.state.boards} handleAddBoard={this.handleAddBoard} />
            </div>
        );
    }
}

export default withRouter(Home);
