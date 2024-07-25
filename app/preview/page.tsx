import React from 'react'
import Nav from './Nav'
import Previewmain from './Previewmain'
import styles from './page.module.css'

const Preview = () => {
  return (
    <div className={styles.maincontainer}>
      <Nav />
      <Previewmain />
    </div>
  )
}

export default Preview
