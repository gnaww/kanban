import React from 'react';
import styles from './BoardList.module.css';
import Board from './Board';
import BoardAdder from './BoardAdder';

const BoardList = props => {
    const { boards, handleAddBoard, handleDeleteBoard, handleAddItem } = props;
    return (
        <div className={styles.BoardList}>
            <BoardAdder handleAddBoard={handleAddBoard} />
            { boards.map((board, idx) => {
                return <Board key={idx} id={idx} name={board.name} items={board.items} {...{handleDeleteBoard, handleAddItem}} />
            }) }
        </div>
    );
}

export default BoardList;