import React from 'react';
import styles from './BoardList.module.css';
import Board from './Board';

const BoardList = props => {
    const { boards, handleDeleteBoard, handleAddItem, handleDeleteItem, handleReorderItem, handleMoveItem } = props;

    const editBoardFunctions = {
        handleDeleteBoard, handleAddItem, handleDeleteItem, handleReorderItem, handleMoveItem
    }

    return (
        <div className={styles.BoardList}>
            { boards.map((board, idx) => {
                return <Board key={idx} id={idx} name={board.name} items={board.items} boardsLength={boards.length} {...editBoardFunctions} />
            }) }
        </div>
    );
}

export default BoardList;