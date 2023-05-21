if (
  localStorage.theme === 'dark' ||
  (!('theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark')
  if (!('theme' in localStorage)) {
    localStorage.setItem('theme', 'dark')
  }
} else {
  document.documentElement.classList.remove('dark')

  if (!('theme' in localStorage)) {
    localStorage.setItem('theme', 'light')
  }
}
