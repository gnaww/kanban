import React from 'react';
import styles from './BoardList.module.css';
import Board from './Board';
import BoardAdder from './BoardAdder';

const BoardList = props => {
    const { boards, handleAddBoard, handleDeleteBoard, handleAddItem, handleDeleteItem, handleReorderItem, handleMoveItem } = props;

    const editBoardFunctions = {
        handleDeleteBoard, handleAddItem, handleDeleteItem, handleReorderItem, handleMoveItem
    }

    return (
        <div className={styles.BoardList}>
            <BoardAdder handleAddBoard={handleAddBoard} />
            { boards.map((board, idx) => {
                return <Board key={idx} id={idx} name={board.name} items={board.items} boardsLength={boards.length} {...editBoardFunctions} />
            }) }
        </div>
    );
}

export default BoardList;