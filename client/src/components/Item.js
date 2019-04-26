import React from 'react';
import styles from './Item.module.css';

const Item = props => {
    const { id, content } = props;
    return (
        <div>
            { `${id}) ${content}` }
        </div>
    );
}

export default Item;
