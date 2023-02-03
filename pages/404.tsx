import Link from "next/link";
import { Head, Layout } from "../components/layout";
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

const Custom404 = (props: any): JSX.Element =>
{
  const { siteMeta } = props

  return (
    <Layout siteMeta={siteMeta} className={styles.error}>
      <Head>
        <title>404 | Amends</title>
      </Head>
      <section>
        <h1>Yo WTF. This page doesn't exist 😖.</h1>
        <Link href='/'>Back to the homepage.</Link>
      </section>
    </Layout>
  )
}

export default Custom404