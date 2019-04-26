import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Brightness5 from '@material-ui/icons/Brightness5';
import Brightness3 from '@material-ui/icons/Brightness3';
import CloudDoneOutlined from '@material-ui/icons/CloudDoneOutlined';
import Sync from '@material-ui/icons/Sync';
import SyncProblem from '@material-ui/icons/SyncProblem';
import logo from '../logo.png';
import styles from './Header.module.css';

const Header = props => {
    const { auth } = props;

    const logout = async (_) => {
        const { setNotification } = props;
        const response = await fetch('/api/logout');
        const responseText = await response.json();

        if (responseText === 'success') {
            props.history.push("/login");
        }
        else {
            setNotification(responseText);
        }
    }

    return (
        <header className={styles.Header}>
            <Link to="/">
                <img className={styles.Logo} src={logo} alt="logo" />
                <span className={styles.LogoText}>Kanban Lite</span>
            </Link>
            
            {/* {auth && <Button type="submit" variant="contained" color="primary" onClick={logout}>
                Log Out
            </Button>} */}
            <IconButton>
                <Brightness3 />
            </IconButton>
            <IconButton>
                <Brightness5 />
            </IconButton>
            <CloudDoneOutlined />
            <Sync />
            <SyncProblem />
            <Button type="submit" variant="contained" color="primary" onClick={logout}>
                Log Out
            </Button>
        </header>
    );
}

export default withRouter(Header);