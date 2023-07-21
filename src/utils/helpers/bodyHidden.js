export let bodyLockStatus = true
export const bodyLock = (delay = 500) => {
  let body = document.querySelector('body')
  if (bodyLockStatus) {
    body.style.paddingRight = window.innerWidth - document.querySelector('#app').offsetWidth + 'px'
    document.documentElement.classList.add('lock')

    bodyLockStatus = false
    setTimeout(function () {
      bodyLockStatus = true
    }, delay)
  }
}

export const bodyUnLock = (delay = 500) => {
  let body = document.querySelector('body')
  if (bodyLockStatus) {
    setTimeout(() => {
      body.style.paddingRight = '0px'
      document.documentElement.classList.remove('lock')
    }, delay)
    bodyLockStatus = false
    setTimeout(function () {
      bodyLockStatus = true
    }, delay)
  }
}
