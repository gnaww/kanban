import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import BoardList from '../components/BoardList';
import Notification from '../components/Notification';
import BoardAdder from '../components/BoardAdder';
import styles from './Home.module.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boards: [],
            loading: true,
        };
    }

    sync = async () => {
        const { boards } = this.state;
        const { setNotification, startSyncing, errorSyncing, doneSyncing } = this.props;
        setNotification('');

        try {
            startSyncing();
            const response = await fetch('/api/boards', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ boards })
            });
            const responseText = await response.json();
            if (responseText === 'successfully updated boards') {
                doneSyncing();
            }
            else {
                errorSyncing();
                setNotification(responseText);
            }
        }
        catch (err) {
            console.log(err);
            errorSyncing();
            setNotification('There was a problem with syncing your boards to the cloud, please try again.');
        }
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

    handleDeleteItem = (boardId, itemId) => {
        const { setNotification } = this.props;
        setNotification('');

        if (boardId >= this.state.boards.length || boardId < 0) {
            setNotification('Tried deleting from a nonexistent board.');
        }
        else if (itemId >= this.state.boards[boardId].items.length || itemId < 0) {
            setNotification('Tried deleting a nonexistent item.');
        }
        else {
            const newBoards = this.state.boards.map((board, idx) => {
                if (idx === boardId) {
                    const newItems = board.items.filter((_, i) => i !== itemId);
                    return { name: board.name, items: newItems };
                }
                else {
                    return board;
                }
            });
            this.setState({ boards: newBoards });
        }
    }

    handleReorderItem = (direction, boardId, itemId) => {
        const { setNotification } = this.props;
        setNotification('');
        
        let newBoards = this.state.boards.map(board => ({...board}));
        let newItems = newBoards[boardId].items;

        if (direction === 'down') {
            const newItemIdx = itemId + 1;
            if (newItemIdx >= newItems.length) {
                setNotification('Could not reorder item.');
            }
            else {
                let temp = newItems[itemId];
                newItems[itemId] = newItems[newItemIdx];
                newItems[newItemIdx] = temp;
                newBoards[boardId].items = newItems;
                this.setState({ boards: newBoards });
            }
        }
        else if (direction === 'up') {
            const newItemIdx = itemId - 1;
            if (newItemIdx < 0) {
                setNotification('Could not reorder item.');
            }
            else {
                let temp = newItems[itemId];
                newItems[itemId] = newItems[newItemIdx];
                newItems[newItemIdx] = temp;
                newBoards[boardId].items = newItems;
                this.setState({ boards: newBoards });
            }
        }
        else {
            setNotification('Could not reorder item.');
        }
    }
    
    handleMoveItem = (direction, boardId, itemId) => {
        const { setNotification } = this.props;
        setNotification('');
        
        let newBoards = this.state.boards.map(board => ({...board}));
        const item = newBoards[boardId].items[itemId];

        if (direction === 'right') {
            const newBoardIdx = boardId + 1;
            if (newBoardIdx >= newBoards.length) {
                setNotification('Could not move item to different board.');
            }
            else {
                newBoards[boardId].items.splice(itemId, 1);
                newBoards[newBoardIdx].items.push(item);
                this.setState({ boards: newBoards });
            }
        }
        else if (direction === 'left') {
            const newBoardIdx = boardId - 1;
            if (newBoardIdx < 0) {
                setNotification('Could not move item to different board.');
            }
            else {
                newBoards[boardId].items.splice(itemId, 1);
                newBoards[newBoardIdx].items.push(item);
                this.setState({ boards: newBoards });
            }
        }
        else {
            setNotification('Could not move item to different board.');
        }
    }

    componentDidMount = () => {
        const { setNotification, authenticate } = this.props;
        authenticate();
        setNotification('');

        fetch('/api/boards')
            .then(res => res.json())
            .then(resJSON => {
                console.log(resJSON);
                if (typeof resJSON === "object") {
                    this.setState({ boards: resJSON, loading: false });
                }
                else {
                    setNotification(resJSON);
                }
            })
            .catch(err => setNotification('Something went wrong while fetching your boards. Please refresh the page.'));
    }

    componentDidUpdate = (_, prevState) => {
        if (this.state.boards !== prevState.boards) {
            this.sync();
        }
    }

    render() {
        const { notification, nightmode, setNotification } = this.props;
        const boardFunctions = {
            handleDeleteBoard: this.handleDeleteBoard,
            handleAddItem: this.handleAddItem,
            handleDeleteItem: this.handleDeleteItem,
            handleReorderItem: this.handleReorderItem,
            handleMoveItem: this.handleMoveItem
        }

        return (
            <div className={styles.Home}>
                <h1>Your Kanban Boards</h1>
                { notification && <Notification {...{ notification,nightmode, setNotification }} /> }
                <div className={styles.Boards}>
                    <BoardList boards={this.state.boards} {...boardFunctions} loading={this.state.loading} />
                    <BoardAdder handleAddBoard={this.handleAddBoard} />
                </div>
            </div>
        );
    }
}

export default withRouter(Home);
