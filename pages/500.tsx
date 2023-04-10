import Link from "next/link";
import Head from "next/head";
import { Layout } from "../components/layout";
import { client } from '../.tina/__generated__/client'
import styles from '../styles/pages/Error.module.scss'

export const getStaticProps = async (ctx: any) =>
{
  const siteMetaQuery = await client.queries.meta({ relativePath: 'meta.mdx' })
  const siteMeta = siteMetaQuery?.data?.meta || null
  
  return {
    props: {
      siteMeta: siteMeta
    }
  }
}

const Custom500 = (props: any): JSX.Element =>
{
  const { siteMeta } = props

  return (
    <Layout siteMeta={siteMeta} className={styles.error}>
      <Head>
        <title>500 | Amends</title>
      </Head>
      <style jsx global>
        {`
          html {
            background-color: #ffdc8b;
          }
        `}
      </style>
      <section>
        <h1>
          <span className={styles.errorCode}>500</span><br/>
          <span className={styles.errorMessage}>Something went wrong.</span>  
        </h1>
        <h2 className={styles.text}>Sorry about that!</h2><br/>
        <Link href='/' className={styles.linkToHome}>Back to the homepage.</Link>
      </section>
    </Layout>
  )
}

export default Custom500