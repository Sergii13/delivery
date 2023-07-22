export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function auditInstance(newInstance = null) {
  if (newInstance) {
    localStorage.setItem('instance', newInstance)
  } else {
    if (localStorage.getItem('instance')) {
      return localStorage.getItem('instance')
    } else {
      const uuid = newInstance ? newInstance : generateUUID()
      localStorage.setItem('instance', uuid)
      return uuid
    }
  }
}
