import { notFound } from 'next/navigation';

export const dynamic = 'force-static'
export const metadata = {
  title: '404 | Amends',
  description: 'Uh oh. There\'s nothing here. Was there supposed to be?'
}

export default function NotFoundCatchAll() {
  notFound()
}