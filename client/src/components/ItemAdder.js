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

    addItem = () => {
        const { boardId, handleAddItem } = this.props;
        handleAddItem(boardId, this.state.newItem);
        this.setState({ newItem: '' });
    }

    render () {
        return (
            <Paper className={styles.ItemAdder}>
                <TextField
                    label="Add new item"
                    value={this.state.newItem}
                    onChange={this.handleItemChange}
                    margin="normal"
                />
                <Button variant="contained" color="secondary" onClick={this.addItem}>
                    <AddBox />
                </Button>
            </Paper>
        );
    }
}

export default ItemAdder;
