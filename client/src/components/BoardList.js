import React from 'react';
import styles from './BoardList.module.css';
import Board from './Board';

const BoardList = props => {
    const { boards } = props;
    return (
        <div>
            { boards.map((board, idx) => <Board key={idx} id={idx} name={board.name} items={board.items} />) }
        </div>
    );
}

export default BoardList;