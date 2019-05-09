import React from 'react';
import Delete from '@material-ui/icons/Delete';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import Paper from '@material-ui/core/Paper';
import styles from './Item.module.css';

const Item = props => {
    const { boardId, id, content, itemsLength, boardsLength, handleDeleteItem, handleReorderItem, handleMoveItem } = props;

    const deleteItem = () => {
        handleDeleteItem(boardId, id);
    }

    const moveItemUp = () => {
        handleReorderItem('up', boardId, id);
    }

    const moveItemDown = () => {
        handleReorderItem('down', boardId, id);
    }

    const moveItemLeft = () => {
        handleMoveItem('left', boardId, id);
    }

    const moveItemRight = () => {
        handleMoveItem('right', boardId, id);
    }

    return (
        <Paper className={styles.Item}>
            <div className={styles.Row}>
                <div className={styles.UpDownButtons}>
                    <button className={styles.ArrowButton} disabled={id === 0} onClick={moveItemUp}>
                        <KeyboardArrowUp />
                    </button>
                    <button className={styles.ArrowButton} disabled={id === itemsLength - 1} onClick={moveItemDown}>
                        <KeyboardArrowDown />
                    </button>
                </div>
                <p>{ content }</p>
                <div className={styles.DeleteButton}>
                    <button onClick={deleteItem}>
                        <Delete fontSize="small" />
                    </button>
                </div>
            </div>
            <div className={`${styles.Row} ${styles.LeftRightButtons}`}>
                <button className={styles.ArrowButton} disabled={boardId === 0} onClick={moveItemLeft}>
                    <KeyboardArrowLeft />
                </button>
                <button className={styles.ArrowButton} disabled={boardId === boardsLength - 1} onClick={moveItemRight}>
                    <KeyboardArrowRight />
                </button>
            </div>
        </Paper>
    );
}

export default Item;
