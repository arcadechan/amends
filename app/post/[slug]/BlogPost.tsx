'use client'

import styles from '../../../styles/pages/BlogPost.module.scss'
import { LineBreak, PinkyPromise } from '../../../components'
import Image from 'next/image'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTina } from 'tinacms/dist/react'
import { TinaQueryResponse } from '../../../@types/tinacms-custom'
import Link from 'next/link'
import Spotify from '../../../components/spotify'

export default function BlogPost(props: TinaQueryResponse)
{
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data
  })

  const {
    publishDate,
    heroImage,
    imageBlurDataURL,
    title,
    subTitle,
    body
  } = data.post

  const formattedDate = new Date(publishDate).toLocaleString('default', { dateStyle: 'long' })
  const searchParams = useSearchParams()
  const router = useRouter()

  let backUrl = '/posts'
  let backPage = searchParams?.get('back')

  if(backPage)
  {
    backUrl = `/posts/${backPage}`
  }

  return (
    <div className={styles.blogPost}>
      <section className={styles.blogPostHero}>
        {heroImage && (
          <div className={styles.blogPostImageContainer}>
            <Image
              className={styles.blogPostImage}
              src={heroImage}
              alt=''
              height={460}
              width={985}
              blurDataURL={imageBlurDataURL || undefined}
            />
          </div>
        )}
        <div className={styles.blogPostInfo}>
          <h1 className={styles.blogPostTitle}>{title}</h1>
          {subTitle && <h2 className={styles.blogPostSubtitle}>{subTitle}</h2>}
        </div>
        <LineBreak className={styles.blogPostLineBreak}/>
      </section>
      <section className={styles.blogPostContent}>
        <h3 className={styles.blogPostPublishDate}>Published: {formattedDate}</h3>
        <div>
          <TinaMarkdown content={body} components={{ 'songEmbed': Spotify }}/>
        </div>
        {backPage ? (
          <Link
            href={backUrl}
            className={styles.blogPostBackButton}
          >
            &larr; Back to Posts
          </Link>
        ) : (
          <button
            type='button'
            className={styles.blogPostBackButton}
            onClick={() => router.back()}
          >
            &larr; Back to Posts
          </button>
        )}
      </section>
      <PinkyPromise/>
    </div>
  )
}