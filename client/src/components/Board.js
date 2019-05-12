import React from 'react';
import Delete from '@material-ui/icons/Delete';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import styles from './Board.module.css';
import Item from './Item';
import ItemAdder from './ItemAdder';

const Board = props => {
    const { id, name, items, boardsLength, handleDeleteBoard, handleMoveBoard, handleAddItem, handleDeleteItem, handleReorderItem, handleMoveItem, nightmode, color } = props;

    const editItemFunctions = {
        handleDeleteItem, handleReorderItem, handleMoveItem
    }
    
    const deleteBoard = () => {
        handleDeleteBoard(id);
    }

    const moveBoardLeft = () => {
        handleMoveBoard('left', id);
    }

    const moveBoardRight = () => {
        handleMoveBoard('right', id);
    }
    
    return (
        <div className={nightmode ? styles.BoardDark : styles.Board} style={{borderTop: `4px solid ${color}`}}>
            <div className={styles.BoardHeader}>
                <h1>{ name }</h1>
                <div>
                    <div className={nightmode ? styles.LeftRightButtonsDark : styles.LeftRightButtons}>
                        <button disabled={id === 0} onClick={moveBoardLeft}>
                            <KeyboardArrowLeft />
                        </button>
                        <button disabled={id === boardsLength - 1} onClick={moveBoardRight}>
                            <KeyboardArrowRight />
                        </button>
                    </div>
                    <button className={nightmode ? styles.DeleteButtonDark : styles.DeleteButton} onClick={deleteBoard}>
                        <Delete />
                    </button>
                </div>
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