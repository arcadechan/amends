import { PinkyPromise } from 'components/index'
import Link from 'next/link'

export default function Credits() {
  const credits = [
    {
      type: 'Animations',
      items: [
        {
          creator: {
            name: 'John Kenneth Batoon',
            url: 'https://lottiefiles.com/shbuvyehgp'
          },
          assetName: 'Success',
          locationUsed: '/success'
        },
        {
          creator: {
            name: 'Splash Animation',
            url: 'https://lottiefiles.com/splashanimation'
          },
          assetName: 'Compass Needle',
          locationUsed: '/not-found'
        }
      ]
    },
    {
      type: 'Fonts',
      items: [
        {
          creator: {
            name: 'Chequered Ink',
            url: 'https://chequered.ink/'
          },
          assetName: 'Candy Bean',
          locationUsed: 'Headers & titles'
        },
        {
          creator: {
            name: 'Rasmus Andersson',
            url: 'https://fonts.google.com/?query=Rasmus+Andersson'
          },
          assetName: 'Inter (Google Font)',
          locationUsed: 'Headers, titles, general text, etc.'
        }
      ]
    },
    {
      type: 'Images & Iconography',
      items: [
        {
          creator: {
            name: 'Stockio',
            url: 'https://www.flaticon.com/free-icons/heartbeat'
          },
          assetName: 'Heartbeat',
          locationUsed: 'The Amends logo'
        },
        {
          creator: {
            name: 'Freepik',
            url: 'https://www.flaticon.com/free-icons/spotify'
          },
          assetName: 'Spotify icon',
          locationUsed: 'Footer & Audio Player component'
        },
        {
          creator: {
            name: 'Pixel perfect',
            url: 'https://www.flaticon.com/free-icons/github'
          },
          assetName: 'Github icon',
          locationUsed: 'Footer'
        },
        {
          creator: {
            name: 'Sasha Sash',
            url: 'https://thenounproject.com/sgurkova/'
          },
          assetName: 'Pinky promise (modified)',
          locationUsed: 'Blog posts & page signatures'
        },
        {
          creator: {
            name: 'Victor Winnhed',
            url: 'https://lottiefiles.com/victorw'
          },
          assetName: 'Menu icon',
          locationUsed: 'Navbar'
        }
      ]
    }
  ]

  return (
    <section className='max-w-screen-2xl mx-auto my-5 px-12 py-4'>
      <h1 className='text-8xl font-candy text-center'>Credits</h1>
      <p>
        Although it&apos;s a small site, there are a lot of assets throughout the site
        that I&apos;ve borrowed from other individuals. Take some time to look through
        them and make sure to check their stuff out!
      </p>
      {credits.map((credit: any, i: number) => (
        <div key={i}>
          <h2 className='text-xl font-inter font-bold'>{credit.type}</h2>
          <ul className='mb-8'>
            {credit.items.map((item: any, j: number) => (
              <li key={j}>
                <b>{item.assetName}</b> by{' '}
                <Link
                  href={item.creator.url}
                  prefetch={false}
                  target='_blank'
                >
                  <b>{item.creator.name}</b>
                </Link>
                <br />
                <small>Location(s) used: {item.locationUsed}</small>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className='mt-5'>
        <PinkyPromise />
      </div>
    </section>
  )
}
