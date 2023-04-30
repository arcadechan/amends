'use client'

export default function Contact() {
  const labelClasses = 'font-inter font-bold text-base block'
  const inputClasses = 'bg-white block w-full mb-3 rounded-lg py-1 px-2'

  return (
    <>
      <section className='text-center'>
        <h1 className='font-candy text-8xl'>Contact</h1>
        <p className='font-inter text-xl'>
          Uh, surely something&apos;s on your mind if you&apos;re here? 😮<br/>
        </p>
      </section>
      <section className='px-5'>
        <form
          className='max-w-screen-md rounded-xl bg-yellow mx-auto p-5'
          name='contact-us'
          method='POST'
          action='/success'
          data-netlify='true'
          netlify-honeypot='bot-field'
        >
          {/* BEGIN: Hidden Fields */}
          <p style={{display: 'none'}}>Leave blank if you&apos;re human: <input name='bot-field'/></p>
          <input
            className={inputClasses}
            type='hidden'
            name='form-name'
            value='contact-us'
          />
          {/* END: Hidden Fields */}
          <label 
            className={labelClasses}
            htmlFor="email"
          >
            Email *
          </label>
          <input
            id='email'
            className={inputClasses}
            type="email"
            name='email'
            required={true}
          />
          <label
            className={labelClasses}
            htmlFor="message"
          >
            Message *
          </label>
          <textarea
            id="message"
            className={inputClasses}
            name="message"
            rows={7}
            required={true}
          />
          <div className='text-center'>
            <button
              className='bg-black text-yellow px-3 py-2 text-lg font-inter rounded-lg mx-5 hover:bg-lace hover:text-black hover:underline'
              type='submit'
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}
