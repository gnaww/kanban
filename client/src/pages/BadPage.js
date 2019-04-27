import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BadPage.module.css';

const BadPage = () => {
    return (
        <div className={styles.BadPage}>
            <div>
                <h1>Oops!</h1>
                <p>We can't seem to find the page you're looking for.</p>
                <p>You should return <Link to="/">home</Link>.</p>
            </div>
        </div>
    );
}

export default BadPage;