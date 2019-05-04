import React from 'react';
import styles from './BoardList.module.css';
import Board from './Board';
import BoardAdder from './BoardAdder';

const BoardList = props => {
    const { boards, handleAddBoard } = props;
    return (
        <div className={styles.BoardList}>
            <BoardAdder handleAddBoard={handleAddBoard} />
            { boards.map((board, idx) => <Board key={idx} id={idx} name={board.name} items={board.items} />) }
        </div>
    );
}

export default BoardList;