'use client'

import BlogPostList from '../../../components/BlogPostList'

const Posts = (props: any): JSX.Element => {
    const { posts } = props

    return <BlogPostList componentProps={posts}/>
}

export default Posts