'use client'

import Link from "next/link";
import styles from '../../styles/pages/Error.module.scss'
import '../../styles/main.css'

export default function NotFound(): JSX.Element
{
  return (
    <section className={styles.error}>
      <h1 className={styles.errorH1}>
        <span className={styles.errorCode}>404</span><br/>
        <span className={styles.errorMessage}>PAGE NOT FOUND.</span>  
      </h1>
      <h2 className={styles.text}>This page doesn&apos;t exist.</h2><br/>
      <Link href='/' className={styles.linkToHome}>Back to the homepage.</Link>
    </section>
  )
}