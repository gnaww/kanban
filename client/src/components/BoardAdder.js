import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddBox from '@material-ui/icons/AddBox';
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
                <TextField
                    label="New board name"
                    value={this.state.newBoardname}
                    onChange={this.handleBoardNameChange}
                    margin="normal"
                />
                <Button variant="contained" color="secondary" onClick={this.addBoard}>
                    Add Board
                    <AddBox />
                </Button>
            </div>
        );
    }
}
        
export default BoardAdder;