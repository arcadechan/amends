import styles from '../styles/components/LineBreak.module.scss';

type LineBreakProps = {
  children?: React.ReactNode
  className?: string
}

export default function LineBreak({ children, className }: LineBreakProps): JSX.Element
{
  return (
    <div className={`${styles.lineBreak} ${className}`}>
      <div className={styles.lineBreakTop}></div>
      <div className={styles.lineBreakBottom}></div>
      {children && (
        <div className={styles.lineBreakChildren}>
          {children}
        </div>
      )}
      {/* <hr className={`${styles.lineBreak} ${styles.lineBreakWhite}`}/>
      <hr className={`${styles.lineBreak} ${styles.lineBreakYellow}`}/> */}
    </div>
  )
}