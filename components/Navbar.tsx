import React from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';
import Image from 'next/image'; // Import Image from next/image

interface NavbarProps {
  setView: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setView }) => {
  return (
    <nav className={styles.navbar}>
      <Image
        src="/solar_link-circle-bold.svg"
        alt="Solar Link Circle"
        width={24}
        height={24}
        className={styles.devs}
      />
      <Image
        src="/ph_link-bold.svg"
        alt="Link Icon"
        width={24}
        height={24}
        className={styles.link}
        onClick={() => setView('links')}
      />
      <Image
        src="/ph_user-circle-bold.svg"
        alt="User Circle Icon"
        width={24}
        height={24}
        className={styles.profiles}
        onClick={() => setView('profile')}
      />
      <Link href='/preview'>
        <Image
          src="/ph_eye-bold.svg"
          alt="Preview Icon"
          width={24}
          height={24}
          className={styles.preview}
        />
      </Link>
    </nav>
  );
};

export default Navbar;
