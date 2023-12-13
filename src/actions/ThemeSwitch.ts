'use server'

import { cookies } from 'next/headers'

export default async function handleThemeSwitch(formData: FormData) {
  const selectedTheme = formData.get('theme') as string

  console.log({
    DOMAIN: process.env.DOMAIN,
    VERCEL_URL: process.env.VERCEL_URL,
    VERCEL_BRANCH_URL: process.env.VERCEL_BRANCH_URL
  })

  if (selectedTheme) {
    cookies().set({
      name: 'theme',
      value: selectedTheme,
      maxAge: 34560000,
      path: '/',
      httpOnly: false,
      sameSite: 'strict',
      secure: false,
      domain:
        process.env.DOMAIN ||
        process.env.VERCEL_URL ||
        process.env.VERCEL_BRANCH_URL ||
        'localhost'
    })
  }
}
