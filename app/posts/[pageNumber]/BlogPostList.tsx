import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ButtonLink from '../../../components/ButtonLink'
import { GetPostsQueryQuery, Post } from '../../../.tina/__generated__/types'
import { PageSearchParamProps } from './page'
import { getPlaiceholder } from 'plaiceholder'

const getCardUrl = (card: Post, pageNumber: string = '1'): string => {
  const backParam = `?back=${pageNumber}`
  let url = ''

  if (card?._sys?.filename?.length) {
    url = `/post/${card._sys.filename}`
  }

  return `${url}${backParam}`
}

const getAriaLabel = (card: Post): string => {
  const { title, subTitle } = card

  if (title && subTitle) return `${title}: ${subTitle}`
  if (title && !subTitle) return title
  if (!title && subTitle) return subTitle

  return ''
}

const CardImage = async ({ cardImage }: any): Promise<JSX.Element> => {
  if (cardImage) {
    const { base64 } = await getPlaiceholder(cardImage).catch(() => ({
      base64:
        'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
    }))

    return (
      <div className='absolute h-full w-full z-0'>
        <Image
          className='rounded-3xl object-cover'
          src={cardImage}
          alt=''
          fill
          sizes='100vw, (min-width: 768px) 50vw'
          placeholder='blur'
          blurDataURL={base64 || ''}
        />
      </div>
    )
  } else {
    return (
      <div className='h-full w-full absolute bg-gray left-0 top-0 z-0 rounded-3xl'></div>
    )
  }
}

const BlogPostList = ({
  componentProps,
  params
}: {
  componentProps: GetPostsQueryQuery['postConnection'] | null
  params: PageSearchParamProps['params']
}): JSX.Element => {
  let pageInfo = null
  let posts: Array<any> = []
  if (componentProps) {
    pageInfo = componentProps.pageInfo
    posts = componentProps.edges ? componentProps.edges.map((post) => post?.node) : []
  }

  return (
    <section className='px-12 pt-12 pb-4 max-w-screen-lg mx-auto grid gap-8'>
      {posts.length > 0 ? (
        <>
          {/* MAP POSTS */}
          {posts.map((post: any, i: number) => (
            <article
              key={i}
              className={`relative rounded-3xl ${
                post?.heroImage ? 'min-h-[300px] lg:min-h-[400px]' : 'min-h-[200px]'
              }`}
            >
              <Link
                href={getCardUrl(post, params?.pageNumber)}
                aria-label={getAriaLabel(post)}
                className='group block h-full rounded-3xl focus:outline focus:outline-[5px] focus:outline-offset-[-1px] outline-black'
                prefetch={false}
              >
                {/* @ts-expect-error Server Component */}
                <CardImage cardImage={post?.heroImage} />
                <div
                  className={`flex flex-col justify-end p-6 absolute bottom-0 left-0 z-0 w-full text-white bg-gradient-to-r from-black rounded-b-3xl ${
                    !post?.heroImage ? 'h-full rounded-t-3xl' : ''
                  }`}
                >
                  {post?.title && (
                    <h2
                      className='font-inter text-2xl font-bold group-hover:underline group-focus:underline'
                      aria-hidden
                    >
                      {post?.title}
                    </h2>
                  )}
                  {post?.subTitle && (
                    <h3
                      className='font-inter text-lg italic group-hover:underline group-focus:underline'
                      aria-hidden
                    >
                      {post?.subTitle}
                    </h3>
                  )}
                </div>
              </Link>
            </article>
          ))}

          {/* PAGINATION */}
          {pageInfo && (
            <div className='flex justify-center my-3'>
              {params?.pageNumber && params.pageNumber !== '1' && (
                <ButtonLink
                  href={`/posts/${parseInt(params?.pageNumber) - 1}`}
                  prefetch={false}
                >
                  &larr; Newer Posts
                </ButtonLink>
              )}
              {params && componentProps?.pageInfo?.hasPreviousPage && (
                <ButtonLink
                  href={`/posts/${
                    params?.pageNumber && params.pageNumber !== '1'
                      ? parseInt(params.pageNumber) + 1
                      : 2
                  }`}
                  prefetch={false}
                >
                  Older Posts &rarr;
                </ButtonLink>
              )}
            </div>
          )}
        </>
      ) : (
        <>
          <h1 className='text-4xl font-candy text-center'>No posts found!</h1>
          <ButtonLink href='/'>Back to home</ButtonLink>
        </>
      )}
    </section>
  )
}

export default BlogPostList
