import React, { Component } from 'react';
import Delete from '@material-ui/icons/Delete';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import Edit from '@material-ui/icons/Edit';
import Save from '@material-ui/icons/Save';
import Paper from '@material-ui/core/Paper';
import CustomTextField from './CustomTextField';
import styles from './Item.module.css';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            newItem: props.content
        };
    }

    handleItemChange = event => {
        this.setState({ newItem: event.target.value });
    }

    deleteItem = () => {
        const { handleDeleteItem, boardId, id } = this.props;
        handleDeleteItem(boardId, id);
    }

    editItem = event => {
        event.preventDefault();

        const { handleEditItem, boardId, id } = this.props;
        handleEditItem(boardId, id, this.state.newItem);
        this.toggleEdit();
    }

    toggleEdit = () => {
        this.setState(prevState => ({
            editing: !prevState.editing
        }));
    }

    moveItemUp = () => {
        const { handleReorderItem, boardId, id } = this.props;
        handleReorderItem('up', boardId, id);
    }

    moveItemDown = () => {
        const { handleReorderItem, boardId, id } = this.props;
        handleReorderItem('down', boardId, id);
    }

    moveItemLeft = () => {
        const { handleMoveItem, boardId, id } = this.props;
        handleMoveItem('left', boardId, id);
    }

    moveItemRight = () => {
        const { handleMoveItem, boardId, id } = this.props;
        handleMoveItem('right', boardId, id);
    }

    render() {
        const { boardId, id, content, itemsLength, boardsLength, nightmode } = this.props;

        return (
            <Paper className={nightmode ? styles.ItemDark : styles.Item}>
                { 
                    this.state.editing ?
                    <form className={styles.EditItem} onSubmit={this.editItem}>
                        <CustomTextField inputValue={this.state.newItem} handleInputValueChange={this.handleItemChange} formType="editItem" nightmode={this.props.nightmode} />
                        <button type="submit" className={nightmode ? styles.EditButtonDark : styles.EditButton}>
                            <Save />
                        </button>
                    </form>
                    :
                    <>
                        <div className={styles.Row}>
                            <div className={nightmode ? styles.UpDownButtonsDark : styles.UpDownButtons}>
                                <button disabled={id === 0} onClick={this.moveItemUp}>
                                    <KeyboardArrowUp />
                                </button>
                                <button disabled={id === itemsLength - 1} onClick={this.moveItemDown}>
                                    <KeyboardArrowDown />
                                </button>
                            </div>
                            <p>{ content }</p>
                            <div className={nightmode ? styles.DeleteButtonDark : styles.DeleteButton}>
                                <button className={nightmode ? styles.EditButtonDark : styles.EditButton} onClick={this.toggleEdit}>
                                    <Edit fontSize="small" />
                                </button>
                                <button onClick={this.deleteItem}>
                                    <Delete fontSize="small" />
                                </button>
                            </div>
                        </div>
                        <div className={nightmode ? `${styles.Row} ${styles.LeftRightButtonsDark}` : `${styles.Row} ${styles.LeftRightButtons}`}>
                            <button disabled={boardId === 0} onClick={this.moveItemLeft}>
                                <KeyboardArrowLeft />
                            </button>
                            <button disabled={boardId === boardsLength - 1} onClick={this.moveItemRight}>
                                <KeyboardArrowRight />
                            </button>
                        </div>
                    </>
                }
            </Paper>
        );
    }
}

export default Item;
