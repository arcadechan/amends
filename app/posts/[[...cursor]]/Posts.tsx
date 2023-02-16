'use client'

import BlogPostList from '../../../components/BlogPostList'

const Posts = (props: any): JSX.Element => {
    const { posts, searchParams } = props

    return <BlogPostList componentProps={posts} searchParams={searchParams}/>
}

export default Posts