type LineBreakProps = {
  children?: React.ReactNode
  className?: string
}

export default function LineBreak({ children, className }: LineBreakProps): JSX.Element
{
  return (
    <div className={`relative ${className || 'my-20'}`}>
      <div className='bg-yellow border-b-white border-b-[16px] border-solid min-h-[50px] h-auto'/>
      <div className='bg-white border-t-yellow border-t-[16px] border-solid min-h-[50px] h-auto'/>
      {children && (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          {children}
        </div>
      )}
    </div>
  )
}