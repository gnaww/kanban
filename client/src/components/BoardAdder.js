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

    addBoard = event => {
        event.preventDefault();

        const { handleAddBoard } = this.props;
        handleAddBoard(this.state.newBoardName);
        this.setState({ newBoardName: '' });
    }

    render() {
        return (
            <form className={styles.BoardAdder} onSubmit={this.addBoard}>
                <TextField
                    label="New board name"
                    value={this.state.newBoardName}
                    onChange={this.handleBoardNameChange}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="secondary">
                    Add Board
                    <AddBox />
                </Button>
            </form>
        );
    }
}
        
export default BoardAdder;