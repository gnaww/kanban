import React, { Component } from 'react';
import './BoardList.css';
import Board from './Board';

class BoardList extends Component {
    render() {
        const { boards } = this.props
        return (
            <div>
                { boards.map((board, idx) => <Board key={idx} id={idx} name={board.name} items={board.items} />) }
            </div>
        );
    }
}

export default BoardList;
