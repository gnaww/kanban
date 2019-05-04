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
            ],
            loading: true,
            syncing: false
        };
    }

    sync = () => {
        // called whenever this.state.boards changes somehow
        // call backend api to update users boards in db
        // while awaiting backend api response display syncing animated icon
        // if call responds with success message, display sync done icon
        // if call reponds with error message, display sync error icon and show a notification that says Error: There was a problem with syncing your kanban boards to the cloud. (link)Retry
        // retry calls this function again to try syncing again
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

    handleDeleteBoard = idx => {
        const { setNotification } = this.props;
        setNotification('');

        if (idx >= this.state.boards.length || idx < 0) {
            setNotification('Tried deleting a nonexistent board.');
        }
        else {
            const newBoards = this.state.boards.filter((_, i) => idx !== i);
            this.setState({ boards: newBoards });
        }
    }

    handleAddItem = (boardId, newItem) => {
        const { setNotification } = this.props;
        setNotification('');

        if (boardId >= this.state.boards.length || boardId < 0) {
            setNotification('Tried adding to a nonexistent board.');
        }
        else if (!newItem) {
            setNotification('You must add a new item with content.');
        }
        else {
            const newBoards = this.state.boards.map((board, idx) => {
                if (idx === boardId) {
                    return { name: board.name, items: [...board.items, newItem] };
                }
                else {
                    return board;
                }
            });
            this.setState({ boards: newBoards });
        }
    }

    componentDidMount = () => {
        const { setNotification, authenticate } = this.props;
        authenticate();
        setNotification('');
    }

    render() {
        const { notification, nightmode, setNotification } = this.props;
        const boardFunctions = {
            handleAddBoard: this.handleAddBoard,
            handleDeleteBoard: this.handleDeleteBoard,
            handleAddItem: this.handleAddItem
        }

        return (
            <div className={styles.Home}>
                <h1>Your Kanban Boards</h1>
                { notification && <Notification {...{ notification,nightmode, setNotification }} /> }
                <BoardList boards={this.state.boards} {...boardFunctions} />
            </div>
        );
    }
}

export default withRouter(Home);
