'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import useWeb3Forms from '@web3forms/react'
import dynamic from 'next/dynamic'

const ContactSuccessMessage = dynamic(() => import('./ContactSuccessMessage'), {
  ssr: false
})

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitSuccessful, isSubmitting, isSubmitted }
  } = useForm({
    mode: 'onTouched'
  })

  const [isSuccess, setIsSuccess] = useState(false)
  const [message, setMessage] = useState('')
  const [isFilledOut, setIsFilledOut] = useState(false)

  const NEXT_PUBLIC_WEB3_KEY = process.env.NEXT_PUBLIC_WEB3_KEY!

  const { submit: onSubmit } = useWeb3Forms({
    access_key: NEXT_PUBLIC_WEB3_KEY,
    settings: {
      from_name: 'Amends',
      subject: 'New message from amends.blog'
    },
    onSuccess: (msg: string) => {
      setIsSuccess(true)
      setMessage(msg)
      reset()
    },
    onError: (msg: string) => {
      setIsSuccess(false)
      setMessage(msg)
    }
  })

  const handleProgress = () => {
    const values = getValues(['email', 'message'])

    if (values.length === values.filter((val) => val.length).length) {
      setIsFilledOut(true)
    } else {
      setIsFilledOut(false)
    }
  }

  return (
    <div className='mx-auto pt-10 pb-4 px-12'>
      {!isSubmitted && (
        <>
          <section className='text-center'>
            <h1 className='font-candy text-6xl md:text-8xl'>Contact</h1>
            <p className='font-inter text-xl'>
              Uh, surely something&apos;s on your mind if you&apos;re here? 😮
              <br />
            </p>
          </section>
          <section>
            <form
              className='max-w-screen-md rounded-xl bg-yellow mx-auto p-5'
              name='contact-us'
              onSubmit={handleSubmit(onSubmit)}
              onChange={handleProgress}
            >
              {/* BEGIN: Hidden Fields */}
              <p style={{ display: 'none' }}>
                Leave blank if you&apos;re human:
                <input
                  type='text'
                  id=''
                  {...register('botcheck')}
                />
              </p>
              {/* END: Hidden Fields */}
              <label
                htmlFor='email'
                className='sr-only'
              >
                Email *
              </label>
              <input
                id='email'
                className={`bg-white block w-full mb-3 rounded-lg py-1 px-2
                  ${errors.email ? '!mb-0 border-2 border-red focus:border-red' : ''}
                  ${isSubmitting ? '!bg-lace text-gray' : ''}
                `}
                type='email'
                placeholder='Email *'
                autoComplete='false'
                required={true}
                disabled={isSubmitting}
                {...register('email', {
                  required: 'Enter your email',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Please enter a valid email'
                  }
                })}
              />
              {errors?.email && (
                <div className='mt-0.5 mb-3 text-red font-bold'>
                  {/* @ts-ignore */}
                  <small>{errors.email.message}</small>
                </div>
              )}
              <label
                htmlFor='message'
                className='sr-only'
              >
                Message *
              </label>
              <textarea
                id='message'
                className={`bg-white block w-full mb-3 rounded-lg py-1 px-2
                  ${errors.message ? '!mb-0 border-2 border-red focus:border-red' : ''}
                  ${isSubmitting ? '!bg-lace text-gray' : ''}
                `}
                rows={7}
                required={true}
                placeholder='Message *'
                disabled={isSubmitting}
                {...register('message', {
                  required: 'Please type out a message'
                })}
              />
              {errors.message && (
                <div className='mt-0.5 mb-3 text-red font-bold'>
                  {/* @ts-ignore */}
                  <small>{errors.message.message}</small>
                </div>
              )}
              <div className='text-center'>
                {isSubmitting ? (
                  <button
                    className='bg-black text-yellow px-3 py-2 text-lg font-inter rounded-lg mx-5'
                    type='button'
                    disabled={true}
                  >
                    <svg
                      className='w-14 h-7 mx-auto text-white dark:text-black animate-spin'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75 fill-yellow'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                  </button>
                ) : (
                  <button
                    className='bg-black text-yellow px-3 py-2 text-lg font-inter rounded-lg mx-5 hover:bg-lace hover:text-black hover:underline disabled:bg-gray disabled:text-white disabled:cursor-not-allowed disabled:no-underline'
                    type='submit'
                    disabled={!isFilledOut}
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          </section>
        </>
      )}

      {isSubmitSuccessful && isSuccess && <ContactSuccessMessage />}

      {isSubmitSuccessful && !isSuccess && (
        <section className='max-w-screen-md text-center bg-black py-1 px-4 text-white rounded-xl text-lg mx-auto my-10'>
          {message ? (
            <p>{message}</p>
          ) : (
            <p>
              Something went wrong.
              <br />
              Please try submitting the form or try again later. 😢
            </p>
          )}
        </section>
      )}
    </div>
  )
}
