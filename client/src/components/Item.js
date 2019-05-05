import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import Paper from '@material-ui/core/Paper';
import styles from './Item.module.css';

const Item = props => {
    const { boardId, id, content, itemsLength, boardsLength, handleDeleteItem, handleReorderItem } = props;

    const deleteItem = () => {
        handleDeleteItem(boardId, id);
    }

    const moveItemUp = () => {
        handleReorderItem('up', boardId, id);
    }

    const moveItemDown = () => {
        handleReorderItem('down', boardId, id);
    }

    return (
        <Paper className={styles.Item}>
            { `${id}) ${content}` }
            <IconButton onClick={deleteItem}>
                <Delete fontSize="small" />
            </IconButton>
            <IconButton disabled={id === 0} onClick={moveItemUp}>
                <KeyboardArrowUp fontSize="small" />
            </IconButton>
            <IconButton disabled={id === itemsLength - 1} onClick={moveItemDown}>
                <KeyboardArrowDown fontSize="small" />
            </IconButton>
            <IconButton disabled={boardId === 0} onClick={deleteItem}>
                <KeyboardArrowLeft fontSize="small" />
            </IconButton>
            <IconButton disabled={boardId === boardsLength - 1} onClick={deleteItem}>
                <KeyboardArrowRight fontSize="small" />
            </IconButton>
        </Paper>
    );
}

export default Item;
