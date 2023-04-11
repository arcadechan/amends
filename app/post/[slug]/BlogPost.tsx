'use client'

import styles from '../../../styles/pages/BlogPost.module.scss'
import { LineBreak, PinkyPromise } from '../../../components'
import Image from 'next/image'
import { PostQuery } from '../../../.tina/__generated__/types'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { useRouter } from 'next/navigation'

export default function BlogPost({ componentProps }: { componentProps: PostQuery['post'] })
{
  const {
    publishDate,
    heroImage,
    imageBlurDataURL,
    title,
    subTitle,
    body
  } = componentProps

  const formattedDate = new Date(publishDate).toLocaleString('default', { dateStyle: 'long' })

  const router = useRouter()

  return (
    <div className={styles.blogPost}>
      <section className={styles.blogPostHero}>
        {heroImage && (
          <Image
            src={ heroImage }
            width={500}
            height={500}
            alt=''
            className={styles.blogPostImage}
            blurDataURL={imageBlurDataURL || undefined}
          />
        )}
        <div className={styles.blogPostInfo}>
          <h1 className={styles.blogPostTitle}>{title} there! Welcome to the very first post!</h1>
          {subTitle && <h2 className={styles.blogPostSubtitle}>{subTitle}</h2>}
          <h3 className={styles.blogPostPublishDate}>{formattedDate}</h3>
        </div>
        <LineBreak className={styles.blogPostLineBreak}/>
      </section>
      <section className={styles.blogPostContent}>
        <TinaMarkdown content={body}/>
        <button
          type='button'
          onClick={() => router.back()}
          className={styles.blogPostBackButton}
        >
          &larr; Back to Posts
        </button>
      </section>
      <PinkyPromise/>
    </div>
  )
}