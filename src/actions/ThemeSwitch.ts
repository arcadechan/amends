'use server'

import { cookies } from 'next/headers'

export default async function handleThemeSwitch(formData: FormData) {
  const selectedTheme = formData.get('theme') as string

  if (selectedTheme) {
    cookies().set({
      name: 'theme',
      value: selectedTheme,
      maxAge: 34560000,
      path: '/',
      httpOnly: false,
      sameSite: 'strict',
      secure: false,
      domain: 'localhost'
    })
  }
}
