import React from 'react';
import Paper from '@material-ui/core/Paper';
import styles from './Item.module.css';

const Item = props => {
    const { id, content } = props;
    return (
        <Paper>
            { `${id}) ${content}` }
        </Paper>
    );
}

export default Item;
