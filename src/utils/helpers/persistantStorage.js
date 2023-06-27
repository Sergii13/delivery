export const getItem = (key) => {
  let result = null
  try {
    const data = localStorage.getItem(key)
    result = JSON.parse(data)
  } catch (error) {
    console.log('Error Storage', error)
  }
  return result
}
export const setItem = (key, data) => {
  try {
    const string = JSON.stringify(data)
    localStorage.setItem(key, string)
  } catch (error) {
    console.log('Error Storage', error)
  }
}
