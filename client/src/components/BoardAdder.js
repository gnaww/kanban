import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CustomTextField from './CustomTextField';
import AddBox from '@material-ui/icons/AddBox';
import styles from './BoardAdder.module.css';

class BoardAdder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newBoardName: ''
        };
    }

    handleBoardNameChange = event => {
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
            <form className={this.props.nightmode ? styles.BoardAdderDark : styles.BoardAdder} onSubmit={this.addBoard}>
                <CustomTextField inputValue={this.state.newBoardName} handleInputValueChange={this.handleBoardNameChange} formType="board" nightmode={this.props.nightmode} />
                <Button type="submit" variant="contained" color="secondary">
                    Add Board
                    <AddBox />
                </Button>
            </form>
        );
    }
}
        
export default BoardAdder;