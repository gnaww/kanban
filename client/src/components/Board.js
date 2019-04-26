import React from 'react';
import styles from './Board.module.css';
import Item from './Item';

const Board = props => {
    const { name, items } = props;

    return (
        <div>
            <h1>{ name }</h1>
            <div>
                { items.map((item, idx) => <Item key={idx} id={idx} content={item} />) }
            </div>
        </div>
    );
}
        
export default Board;