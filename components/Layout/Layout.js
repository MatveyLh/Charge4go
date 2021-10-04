import React from 'react';
import NavBar from '../Navbar/Navbar';
import styles from './Layout.module.scss';

function Layout({ children }) {
    return (
        <div className={styles.layout}>
            <NavBar />
            <div className={styles.main}>{children}</div>
        </div>
    );
}

export default Layout;
