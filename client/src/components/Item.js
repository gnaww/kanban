import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import styles from './Item.module.css';

const Item = props => {
    const { boardId, id, content, handleDeleteItem } = props;

    const deleteItem = () => {
        handleDeleteItem(boardId, id);
    }
    
    return (
        <Paper className={styles.Item}>
            <IconButton onClick={deleteItem}>
                <Delete fontSize="small" />
            </IconButton>
            { `${id}) ${content}` }
        </Paper>
    );
}

export default Item;
