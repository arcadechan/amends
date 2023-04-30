import dynamic from 'next/dynamic'

const DynamicLottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => <div className='w-72 h-72 mx-auto'/>
})

export default DynamicLottie