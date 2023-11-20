'use client'

import { createContext, useState } from 'react'
import styles from '@/styles/pages/main/BlogPost.module.css'
import LineBreak from '@/components/LineBreak'
import PinkyPromise from '@/components/PinkyPromise'
import ButtonLink from '@/components/ButtonLink'
import AudioPlayer from '@/components/AudioPlayer'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { useTina } from 'tinacms/dist/react'
import { TinaQueryResponse } from '@/types/tinacms-custom'
import Link from 'next/link'
import { PostQuery } from 'tina/__generated__/types'

export const BlogPostContext = createContext({
  playingTrack: '',
  setPlayingTrack: (trackName: string) => {}
})
export const BlogPostProvider = BlogPostContext.Provider

type BlogPostProps = {
  imageBlurDataURL: string
} & TinaQueryResponse

type AttributionProps = {
  heroImageAttribution: PostQuery['post']['heroImageAttribution']
}

const Attribution = ({ heroImageAttribution }: AttributionProps) => {
  if (heroImageAttribution?.link && heroImageAttribution.link.length > 0) {
    return (
      <Link
        href={heroImageAttribution.link}
        target='_blank'
        className='text-black !font-normal underline'
      >
        <small>Image credit: {heroImageAttribution.creator}</small>
      </Link>
    )
  } else {
    return <small>Image credit: {heroImageAttribution?.creator}</small>
  }
}

export default function BlogPost(props: BlogPostProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data
  })

  const imageBlurDataURL = props.imageBlurDataURL

  const { publishDate, heroImage, title, subTitle, body, heroImageAttribution } =
    data.post

  const formattedDate = new Date(publishDate).toLocaleString('default', {
    dateStyle: 'long'
  })
  const searchParams = useSearchParams()
  const router = useRouter()

  let backUrl = '/posts'
  let backPage = searchParams?.get('back')

  if (backPage) {
    backUrl = `/posts/${backPage}`
  }

  const [playingTrack, setPlayingTrack] = useState('')

  return (
    <>
      <section className='bg-yellow dark:bg-black text-center relative'>
        {heroImage && (
          <div className='py-10 px-12 w-full h-auto max-h-[520px] max-w-[985px] mx-auto'>
            <Image
              className='mx-auto rounded-3xl w-full h-auto max-h-[440px] max-w-[985px] object-cover'
              src={heroImage}
              alt=''
              height={460}
              width={985}
              placeholder='blur'
              blurDataURL={imageBlurDataURL}
            />
            {heroImageAttribution?.creator &&
              heroImageAttribution.creator?.length > 0 && (
                <div className='text-right pr-6'>
                  <Attribution heroImageAttribution={heroImageAttribution} />
                </div>
              )}
          </div>
        )}
        <div className='mt-[45px] px-12 max-w-5xl mx-auto font-candy'>
          <h1 className={`${styles.blogPostTitle} text-4xl lg:text-6xl dark:black`}>
            {title}
          </h1>
          {subTitle && (
            <h2 className={`${styles.blogPostSubtitle} mt-3 text-2xl lg:text-4xl italic`}>
              {subTitle}
            </h2>
          )}
        </div>
        <LineBreak className='my-4' />
      </section>
      <section className='px-4 py-4 max-w-5xl mx-auto mb-8 font-inter md:px-12'>
        <h3 className='italic mb-5 text-center text-sm dark:text-lace'>
          Published: {formattedDate}
        </h3>
        <BlogPostProvider value={{ playingTrack, setPlayingTrack }}>
          <div
            className={`${styles.blogPostContent} prose prose-light dark:prose-dark lg:prose-lg max-w-none`}
          >
            <TinaMarkdown
              content={body}
              components={{ songEmbed: AudioPlayer }}
            />
          </div>
        </BlogPostProvider>
        <PinkyPromise className='mt-10' />
        <div className='text-center'>
          {backPage ? (
            <ButtonLink href={backUrl}>&larr; Back to Posts</ButtonLink>
          ) : (
            <ButtonLink
              button
              onClick={() => router.back()}
            >
              &larr; Back to Posts
            </ButtonLink>
          )}
        </div>
      </section>
    </>
  )
}
