import React from 'react';
import styles from './Footer.module.css';

const Footer = props => {
    const { nightmode } = props;

    return (
        <footer className={nightmode ? styles.CreditsDark : styles.Credits}>
            <p>Made with <span>&#9829;</span> by <a href="https://github.com/gnaww/" target="_blank" rel="noopener noreferrer">Will</a></p>
            <a href="https://github.com/gnaww/kanban" target="_blank" rel="noopener noreferrer">GitHub Repo</a>
        </footer>
    );
}

export default Footer;