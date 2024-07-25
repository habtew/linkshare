// app/components/Navbar.tsx
// import React from 'react';
// import styles from './Navbar.module.css';

// const Navbar = () => {
//   return (
//     <nav className={styles.navbar}>
//       <img src="/solar_link-circle-bold.svg" alt=""className={styles.devs} />
//       <img src="/ph_link-bold.svg" alt="" className={styles.link}/>
//       <img src="/ph_user-circle-bold.svg" alt="" className={styles.profiles}/>
//       <img src="/ph_eye-bold.svg" alt="" className={styles.preview}/>
//     </nav>
//   );
// };

// export default Navbar;

// app/components/Navbar.tsx
import React from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';

interface NavbarProps {
  setView: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setView }) => {
  return (
    <nav className={styles.navbar}>
      <img src="/solar_link-circle-bold.svg" alt="" className={styles.devs} />
      <img
        src="/ph_link-bold.svg"
        alt=""
        className={styles.link}
        onClick={() => setView('links')}
      />
      <img
        src="/ph_user-circle-bold.svg"
        alt=""
        className={styles.profiles}
        onClick={() => setView('profile')}
      />
      <a href='/preview'>
        <img
          src="/ph_eye-bold.svg"
          alt=""
          className={styles.preview}
        />
      
      </a>
    </nav>
  );
};

export default Navbar;

