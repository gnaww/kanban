import React from 'react';
import styles from './BoardList.module.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Board from './Board';

const BoardList = props => {
    const { boards, loading, handleDeleteBoard, handleAddItem, handleDeleteItem, handleReorderItem, handleMoveItem } = props;

    const editBoardFunctions = {
        handleDeleteBoard, handleAddItem, handleDeleteItem, handleReorderItem, handleMoveItem
    }

    if (loading) {
        return (
            <div className={`${styles.BoardList} ${styles.Loading}`}>
                <CircularProgress size={55} />
            </div>
        );
    }
    else {
        return (
            <div className={styles.BoardList}>
                { 
                    boards.length !== 0 ? 
                        boards.map((board, idx) => {
                            return <Board key={idx} id={idx} name={board.name} items={board.items} boardsLength={boards.length} {...editBoardFunctions} />
                        }) 
                    : <h2>Add a new board to get started!</h2> 
                }
            </div>
        );
    }
}

export default BoardList;