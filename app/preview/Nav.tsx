import React from 'react'
import styles from './nav.module.css'
const Nav = () => {
  return (
    <nav className={styles.nav}>
      <a href='/'>Back to editor</a>
      <button>share link</button>
    </nav>
  )
}

export default Nav
