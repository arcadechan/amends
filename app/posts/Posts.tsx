'use client'

// import { CardGrid } from '../../components/CardGrid'

const Posts = (props: any): JSX.Element => {
    const { posts } = props

    console.log({posts});

    return (
        <section>
            {posts?.length && posts.map((post :any, i: number) => {
                <article key={i}>
                    {post.name}
                </article>
            })}
        </section>
    )
}

export default Posts