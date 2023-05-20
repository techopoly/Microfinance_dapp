import { useRouter } from 'next/router'
import styles from '../styles/nav.module.css';

const Navbar = () => {
    const router = useRouter();

    const isActive = (pathname) => router.pathname === pathname;

    return (
        <nav className={styles.navbar}>
            <div onClick={() => router.push('/')} className={styles.navbar_brand}>
                MicroLoan
            </div>

            <div className={styles.navbar_items}>
                <div onClick={() => router.push('/home')} className={isActive('/home') ? styles.active : styles.navbar_item}>
                    Home
                </div>
                <div onClick={() => router.push('/about')} className={isActive('/about') ? styles.active : styles.navbar_item}>
                    About
                </div>
                <div onClick={() => router.push('/services')} className={isActive('/services') ? styles.active : styles.navbar_item}>
                    Services
                </div>
                <div onClick={() => router.push('/contact')} className={isActive('/contact') ? styles.active : styles.navbar_item}>
                    Contact
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
