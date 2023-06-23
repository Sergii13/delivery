const scrollWidth = window.innerWidth - document.documentElement.clientWidth

export const bodyLock = () => {
  document.body.style.overflow = 'hidden'
  document.body.style.paddingRight = scrollWidth + 'px'
}

export const bodyUnLock = () => {
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}
