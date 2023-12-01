import { notFound, redirect } from 'next/navigation'

export const metadata = {
  title: '404 | Amends',
  description: "Uh oh. There's nothing here. Was there supposed to be?"
}

export default function NotFoundCatchAll(props: any) {
  // Redirect /posts to /posts/1
  if (props.params.other.length === 1 && props.params.other[0] === 'posts') {
    redirect('/posts/1')
  }

  notFound()
}
