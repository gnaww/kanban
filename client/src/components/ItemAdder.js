import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddBox from '@material-ui/icons/AddBox';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import styles from './ItemAdder.module.css';

class ItemAdder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newItem: ''
        };
    }

    handleItemChange = (event) => {
        this.setState({ newItem: event.target.value });
    }

    addItem = event => {
        event.preventDefault();

        const { boardId, handleAddItem } = this.props;
        handleAddItem(boardId, this.state.newItem);
        this.setState({ newItem: '' });
    }

    render () {
        return (
            <form onSubmit={this.addItem}>
                <Paper className={styles.ItemAdder}>
                    <TextField
                        label="Add new item"
                        value={this.state.newItem}
                        onChange={this.handleItemChange}
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="secondary">
                        <AddBox />
                    </Button>
                </Paper>
            </form>
        );
    }
}

export default ItemAdder;
