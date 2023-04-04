'use client'
import styles from '../../styles/pages/Contact.module.scss'
import Link from 'next/link';

export default function Contact() {
  const req = <span className={styles.required}>*</span>

  return (
    <>
      <section className={styles.headerSection}>
        <h1 className={styles.header}>Contact</h1>
      </section>
      <section className={styles.formSection}>
        <form className={styles.form} name='contact-us' method='POST' action='/success' data-netlify='true' netlify-honeypot='bot-field'>
          {/* BEGIN: Hidden Fields */}
          <p style={{display: 'none'}}>Leave blank if you&apos;re human: <input name='bot-field'/></p>
          <input type='hidden' name='form-name' value='contact-us'/>
          {/* END: Hidden Fields */}
          <label htmlFor="email">Email {req}</label>
          <input type="email" id='email' name='email' required={true}/>
          <label htmlFor="message">Message {req}</label>
          <textarea name="message" id="message" rows={7} required={true}></textarea>
          <div id='contact-form-submit--container'>
            <button id='contact-form-submit--button' type='submit'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}
