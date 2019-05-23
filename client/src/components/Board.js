import React, { Component } from 'react';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Save from '@material-ui/icons/Save';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import styles from './Board.module.css';
import Item from './Item';
import ItemAdder from './ItemAdder';
import CustomTextField from './CustomTextField';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            newBoardName: props.name
        };
    }

    handleBoardNameChange = event => {
        this.setState({ newBoardName: event.target.value });
    }

    deleteBoard = () => {
        const { id, handleDeleteBoard } = this.props;
        handleDeleteBoard(id);
    }

    moveBoardLeft = () => {
        const { id, handleMoveBoard } = this.props;
        handleMoveBoard('left', id);
    }

    moveBoardRight = () => {
        const { id, handleMoveBoard } = this.props;
        handleMoveBoard('right', id);
    }
    
    editBoard = event => {
        event.preventDefault();
        
        const { id, handleEditBoard } = this.props;
        handleEditBoard(this.state.newBoardName, id);
        this.toggleEdit();
    }

    toggleEdit = () => {
        this.setState(prevState => ({
            editing: !prevState.editing
        }));
    }
    
    render() {
        const { id, name, items, boardsLength, handleAddItem, handleDeleteItem, handleReorderItem, handleMoveItem, handleEditItem, nightmode, color } = this.props;

        const editItemFunctions = {
            handleDeleteItem, handleReorderItem, handleMoveItem, handleEditItem
        }

        return (
            <div className={nightmode ? styles.BoardDark : styles.Board} style={{borderTop: `4px solid ${color}`}}>
                <div className={styles.BoardHeader}>
                    { 
                        this.state.editing ?
                        <form onSubmit={this.editBoard}>
                            <CustomTextField inputValue={this.state.newBoardName} handleInputValueChange={this.handleBoardNameChange} formType="editBoard" nightmode={this.props.nightmode} />
                            <button type="submit" className={nightmode ? styles.EditButtonDark : styles.EditButton}>
                                <Save />
                            </button>
                        </form>
                        :
                        <>
                            <div>
                                <h1>{ name }</h1>
                                <button className={nightmode ? styles.EditButtonDark : styles.EditButton} onClick={this.toggleEdit}>
                                    <Edit />
                                </button>
                            </div>
                            <div>
                                <div className={nightmode ? styles.LeftRightButtonsDark : styles.LeftRightButtons}>
                                    <button disabled={id === 0} onClick={this.moveBoardLeft}>
                                        <KeyboardArrowLeft />
                                    </button>
                                    <button disabled={id === boardsLength - 1} onClick={this.moveBoardRight}>
                                        <KeyboardArrowRight />
                                    </button>
                                </div>
                                <button className={nightmode ? styles.DeleteButtonDark : styles.DeleteButton} onClick={this.deleteBoard}>
                                    <Delete />
                                </button>
                            </div>
                        </>
                    }
                </div>
                <div className={styles.ItemsList}>
                    <div>
                        { items.map((item, idx) => <Item key={idx} boardId={id} id={idx} content={item} itemsLength={items.length} boardsLength={boardsLength} {...editItemFunctions} nightmode={nightmode} />) }
                    </div>
                    <ItemAdder boardId={id} handleAddItem={handleAddItem} nightmode={nightmode} />
                </div>
            </div>
        );
    }
} 
        
export default Board;