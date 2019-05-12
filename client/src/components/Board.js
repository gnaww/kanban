import React from 'react';
import Delete from '@material-ui/icons/Delete';
import styles from './Board.module.css';
import Item from './Item';
import ItemAdder from './ItemAdder';

const Board = props => {
    const { id, name, items, boardsLength, handleDeleteBoard, handleAddItem, handleDeleteItem, handleReorderItem, handleMoveItem, nightmode } = props;

    const editItemFunctions = {
        handleDeleteItem, handleReorderItem, handleMoveItem
    }
    
    const deleteBoard = () => {
        handleDeleteBoard(id);
    }

    return (
        <div className={nightmode ? styles.BoardDark : styles.Board}>
            <div className={styles.BoardHeader}>
                <h1>{ name }</h1>
                <button className={nightmode ? styles.DeleteButtonDark : styles.DeleteButton} onClick={deleteBoard}>
                    <Delete />
                </button>
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
        
export default Board;