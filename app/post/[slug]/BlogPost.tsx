'use client'

import styles from '../../../styles/pages/BlogPost.module.css'
import { LineBreak, PinkyPromise } from '../../../components'
import Image from 'next/image'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTina } from 'tinacms/dist/react'
import { TinaQueryResponse } from '../../../@types/tinacms-custom'
import ButtonLink from '../../../components/ButtonLink'
import AudioPlayer from '../../../components/AudioPlayer'
import { createContext, useState } from 'react'

export const BlogPostContext = createContext({
  playingTrack: '',
  setPlayingTrack: (trackName: string) => {}
})
export const BlogPostProvider = BlogPostContext.Provider

type BlogPostProps = {
  imageBlurDataURL: string
} & TinaQueryResponse

export default function BlogPost(props: BlogPostProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data
  })

  const imageBlurDataURL = props.imageBlurDataURL

  const { publishDate, heroImage, title, subTitle, body } = data.post

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
      <section className='bg-yellow text-center relative'>
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
          </div>
        )}
        <div className='mt-[45px] px-12 max-w-5xl mx-auto font-candy'>
          <h1 className={`${styles.blogPostTitle} text-4xl lg:text-6xl`}>{title}</h1>
          {subTitle && (
            <h2 className={`${styles.blogPostSubtitle} mt-3 text-2xl lg:text-4xl italic`}>
              {subTitle}
            </h2>
          )}
        </div>
        <LineBreak className='my-4' />
      </section>
      <section className='px-4 py-4 max-w-5xl mx-auto mb-8 font-inter md:px-12'>
        <h3 className='italic mb-5 text-center text-sm'>Published: {formattedDate}</h3>
        <BlogPostProvider value={{ playingTrack, setPlayingTrack }}>
          <div className='prose lg:prose-lg max-w-none'>
            <TinaMarkdown content={body} components={{ songEmbed: AudioPlayer }} />
          </div>
        </BlogPostProvider>
        <PinkyPromise className='mt-10' />
        <div className='text-center'>
          {backPage ? (
            <ButtonLink href={backUrl}>&larr; Back to Posts</ButtonLink>
          ) : (
            <ButtonLink button onClick={() => router.back()}>
              &larr; Back to Posts
            </ButtonLink>
          )}
        </div>
      </section>
    </>
  )
}
