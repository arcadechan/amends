'use-client'

import Image from 'next/image'
import Link from 'next/link'
import styles from '../../../styles/components/BlogPostList.module.scss'
import { GetPostsQueryQuery, Post } from "../../../.tina/__generated__/types";
import { PageSearchParamProps } from './page'

const getCardUrl = (card: Post, pageNumber: string = '1'): string =>
{
  const backParam = `?back=${pageNumber}`
  let url = ''

  if(card?._sys?.filename?.length)
  {
    url = `/post/${card._sys.filename}`
  }

  return `${url}${backParam}`
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
      <div className='absolute h-full w-full z-0'>
        <Image
          className='rounded-[20px]'
          src={cardImage}
          alt=''
          fill
          style={{ objectFit: 'cover' }}
          sizes='100vw, (min-width: 768px) 50vw'
        />
      </div>
    )
  }
  else
  {
    return <div className='h-full w-full absolute bg-[#808080] left-0 top-0 z-0 rounded-[20px]'></div>
  }
}

const BlogPostList = ({ componentProps, params }: { componentProps: GetPostsQueryQuery['postConnection'] | null, params: PageSearchParamProps['params'] }): JSX.Element =>
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
  const posts = componentProps.edges ? componentProps.edges.map(post => post?.node) : []

  return (
    <section className='px-12 pt-12 pb-4 max-w-screen-lg mx-auto grid gap-8'>
      {posts.length > 0 ? (
        <>
          {/* MAP POSTS */}
          {posts.map((post: any, i: number) => (
              <article
                key={i}
                className={`relative rounded-[20px] ${ post?.heroImage ? 'min-h-[300px] lg:min-h-[400px]' : 'min-h-[200px]' }`}
              >
                <Link
                  href={getCardUrl(post, params?.pageNumber)}
                  aria-label={getAriaLabel(post)}
                  className='group block h-full rounded-[20px] focus:outline focus:outline-[5px] focus:outline-offset-[-1px] outline-black'
                >
                  <CardImage cardImage={post?.heroImage}/>
                  <div className={
                    `flex flex-col justify-end p-6 absolute bottom-0 left-0 z-0 w-full text-[#fff] bg-gradient-to-r from-black rounded-b-[20px] ${!post?.heroImage ? 'h-full rounded-t-[20px]' : ''}`
                  }>
                    {post?.title && (
                      <h2
                        className='font-inter text-2xl font-bold group-hover:underline group-focus:underline'
                        aria-hidden
                      >
                        {post?.title}
                      </h2>
                    )}
                    {post?.subTitle && (
                      <h3 className='font-inter text-lg italic group-hover:underline group-focus:underline' aria-hidden>{post?.subTitle}</h3>
                    )}
                  </div>
                </Link>
              </article>
          ))}

          {/* PAGINATION */}
          {pageInfo && (
              <div className='flex justify-center my-3'>
                {(params?.pageNumber && params.pageNumber !== '1') && (
                  <Link
                    className='bg-yellow text-black px-3 py-2 text-lg font-inter rounded-lg mx-5 hover:shadow-md'
                    href={`/posts/${ parseInt(params?.pageNumber) - 1 }`}
                    prefetch={false}
                  >
                    &larr; Newer Posts
                  </Link>
                )}
                {params && componentProps?.pageInfo?.hasPreviousPage && (
                  <Link
                    className='bg-yellow text-black px-3 py-2 text-lg font-inter rounded-lg mx-5 hover:shadow-md'
                    href={`/posts/${ params?.pageNumber && params.pageNumber !== '1' ? (parseInt(params.pageNumber) + 1) : 2 }`}
                    prefetch={false}
                  >
                    Older Posts &rarr;
                  </Link>
                )}
              </div>
          )}
        </>
      ) : (
        <>
          <h1 className='text-4xl font-candy text-center'>No posts found!</h1>
          <Link href='/' className='underline font-inter font-bold text-center'>Back to home</Link>
        </>
      )}
    </section>
  )
}

export default BlogPostList