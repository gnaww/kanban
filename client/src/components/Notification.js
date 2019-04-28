import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Paper from '@material-ui/core/Paper';
import styles from './Notification.module.css';

const Notification = props => {
    const { notification, nightmode, setNotification } = props;

    const onClose = () => {
        setNotification('');
    };

    return (
        <Paper className={nightmode ? styles.NotificationDark : styles.Notification}>
            <span><span className={styles.Error}>Error: </span> {notification}</span>
            <IconButton className={styles.CloseButton} onClick={onClose}>
                <Close />
            </IconButton>
        </Paper>
    );
}

export default Notification;