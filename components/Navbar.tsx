import { ConnectWallet } from '@thirdweb-dev/react';
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <Link href="/">
                <p className={styles.gradientText1}>Sanat's Contract Base</p>
            </Link>
                <ConnectWallet btnTitle='Sign In' modalTitle='Select Sign in method'/>
        </div>
    )
}

export default Navbar;