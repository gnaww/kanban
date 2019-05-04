import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Add from '@material-ui/icons/Add';
import styles from './BoardAdder.module.css';

class BoardAdder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newBoardName: ''
        };
    }

    handleBoardNameChange = (event) => {
        this.setState({ newBoardName: event.target.value });
    }

    addBoard = () => {
        const { handleAddBoard } = this.props;
        handleAddBoard(this.state.newBoardName);
    }

    render() {
        return (
            <div className={styles.BoardAdder}>
                <h2>Add a new board</h2>
                <IconButton onClick={this.addBoard}>
                    <Add />
                </IconButton>
                <TextField
                    label="New board name"
                    value={this.state.newBoardname}
                    onChange={this.handleBoardNameChange}
                    margin="normal"
                />
            </div>
        );
    }
}
        
export default BoardAdder;