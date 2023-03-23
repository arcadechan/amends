'use-client'

import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/components/BlogPostList.module.scss'
import { PostConnection, Post } from "../../.tina/__generated__/types";
import { PageSearchParamProps } from './page'

const getCardUrl = (card: Post ): string =>
{
  if(card?._sys?.breadcrumbs?.length)
  {
    return `/posts/${card._sys.breadcrumbs.join('/')}`
  }

  return ''
}

const getAriaLabel = (card: Post): string =>
{
  const { title, subTitle } = card

  if(title && subTitle) return `${title}: ${subTitle}`
  if(title && !subTitle) return title
  if(!title && subTitle) return subTitle

  return ''
}

const CardImage = ({ cardImage }: any): JSX.Element =>
{
  if(cardImage)
  {
    return (
      <div className={styles.postImageContainer}>
        <Image
          src={cardImage}
          alt=''
          fill
          style={{ objectFit: 'cover' }}
          sizes='100vw, (min-width: 768px) 50vw'
          className={styles.postImage}
        />
      </div>
    )
  }
  else
  {
    return <div className={styles.postNoImage}></div>
  }
}

const BlogPostList = ({ componentProps, searchParams }: { componentProps: PostConnection | null, searchParams: PageSearchParamProps['searchParams'] }): JSX.Element =>
{
  if(!componentProps?.pageInfo)
  {
    return (
      <section>
        <h2>Loading...</h2>
      </section>
    )
  }

  const { pageInfo } = componentProps
  const posts = componentProps?.edges && componentProps.edges.map(post => post?.node) || []

  console.log({searchParams});

  return (
    <section className={styles.postList}>
      {posts?.length && posts.map((post: any, i: number) => {
        return (
          <article className={`${styles.post} ${ post?.heroImage ? styles.postHasImage : styles.postHasNoImage }`} key={i}>
            <Link
              href={getCardUrl(post)}
              aria-label={getAriaLabel(post)}
              className={styles.postAnchor}
            >
              <CardImage cardImage={post?.heroImage}/>
              <div className={styles.postTextLabels}>
                {post?.title && <h2 className={styles.postTitle} aria-hidden>{post?.title}</h2>}
                {post?.subTitle && <h3 className={styles.postSubTitle} aria-hidden>{post?.subTitle}</h3>}
              </div>
            </Link>
          </article>
        )
      })}
      {posts?.length && pageInfo && (
        <>
          {searchParams?.prevCursor === '' && <Link href='/posts'>Newer Posts</Link>}
          {!!searchParams?.prevCursor?.length && <Link href={`/posts?endCursor=${searchParams.prevCursor}&prevCursor=${''}`}>Newer Posts</Link>}
          {pageInfo?.hasPreviousPage && <Link href={`/posts?endCursor=${pageInfo.endCursor}&prevCursor=${ searchParams?.endCursor || '' }`}>Older Posts</Link>}
        </>
      )}
    </section>
  )
}

export default BlogPostList