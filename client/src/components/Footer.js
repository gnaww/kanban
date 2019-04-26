import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.Credits}>
            <p>Made with <span>&#9829;</span> by <a href="https://github.com/gnaww/" target="_blank" rel="noopener noreferrer" class="bold">Will</a></p>
            <a href="https://github.com/gnaww/kanban" target="_blank" rel="noopener noreferrer">GitHub Repo</a>
        </footer>
    );
}

export default Footer;