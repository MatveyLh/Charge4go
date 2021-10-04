import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './Navbar.module.scss';
import DashboardIcon from '../../public/dashboard.svg';
import CustomersIcon from '../../public/customers.svg';
import SessionIcon from '../../public/session.svg';
import MapIcon from '../../public/map.svg';
import logo from '../../src/images/logo.png';

const MENU_ITEMS = [
    {
        icon: <DashboardIcon />,
        title: 'Dashboard',
        link: '/dashboard',
    },
    {
        icon: <CustomersIcon />,
        title: 'Customers',
        link: '/customers',
    },
    {
        icon: <SessionIcon />,
        title: 'Sessions',
        link: '/sessions',
    },
    {
        icon: <MapIcon />,
        title: 'Map',
        link: '/map',
    },
];

function Navbar() {
    const router = useRouter();
    const [activeNavbarItem, setActiveNavbarItem] = useState(router.asPath);

    function handleClick(link) {
        setActiveNavbarItem(link);
    }

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <Image src={logo} alt={'charge4go'} />
            </div>
            <div className={styles.inner}>
                {MENU_ITEMS.map((menuItem, index) => (
                    <Link href={menuItem.link}
                        key={index}>
                        <a onClick={() => handleClick(menuItem.link)} className={menuItem.link === activeNavbarItem
                            ? styles.activeNavbarMenuItem
                            : styles.navbarMenuItem}>
                            <div className={styles.icon}>
                                {menuItem.icon}
                            </div>

                            <span className={styles.title}>{menuItem.title}</span>
                        </a>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default Navbar;
