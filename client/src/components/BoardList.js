import React from 'react';
import styles from './BoardList.module.css';
import Board from './Board';
import BoardAdder from './BoardAdder';

const BoardList = props => {
    const { boards, handleAddBoard, handleDeleteBoard, handleAddItem, handleDeleteItem, handleReorderItem } = props;
    return (
        <div className={styles.BoardList}>
            <BoardAdder handleAddBoard={handleAddBoard} />
            { boards.map((board, idx) => {
                return <Board key={idx} id={idx} name={board.name} items={board.items} boardsLength={boards.length} {...{handleDeleteBoard, handleAddItem, handleDeleteItem, handleReorderItem}} />
            }) }
        </div>
    );
}

export default BoardList;