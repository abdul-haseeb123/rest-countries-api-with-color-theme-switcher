import React from 'react'
import styles from './page.module.css'

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>Where in the world?</div>
      <div className={styles.right}>
        <button className={styles.moon}>moon</button>
        <button className={styles.mode}>Dark Mode</button>
      </div>
    </nav>
  )
}

export default Navbar