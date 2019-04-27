import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Brightness5 from '@material-ui/icons/Brightness5';
import Brightness3 from '@material-ui/icons/Brightness3';
import CloudDoneOutlined from '@material-ui/icons/CloudDoneOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import SyncProblem from '@material-ui/icons/SyncProblem';
import logo from '../logo.png';
import styles from './Header.module.css';

const Header = props => {
    const { auth, nightmode, toggleNightMode, setNotification } = props;

    const logout = async (_) => {
        const response = await fetch('/api/logout');
        const responseText = await response.json();

        if (responseText === 'success') {
            props.history.push("/login");
        }
        else {
            setNotification(responseText);
        }
    };

    return (
        <header className={styles.Header}>
            <Link to="/">
                <img className={styles.Logo} src={logo} alt="logo" />
                <span className={styles.LogoText}>Kanban Lite</span>
            </Link>
            
            <div className={styles.Status}>
                <CloudDoneOutlined className={`${styles.Icon} ${styles.Sync}`} />
                <CircularProgress className={`${styles.Icon} ${styles.Sync}`} color="inherit" size={24} thickness={4} />
                <SyncProblem className={`${styles.Icon} ${styles.Sync}`} />
                <IconButton onClick={toggleNightMode}>
                    {nightmode ? <Brightness5 className={styles.Icon} /> : <Brightness3 className={styles.Icon} />}
                </IconButton>
                {auth && <Button className={styles.Logout} type="submit" variant="contained" color="primary" onClick={logout}>
                    Log Out
                </Button>}
            </div>
        </header>
    );
}

export default withRouter(Header);