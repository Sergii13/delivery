import axios from '@/api/axios'

export const getToken = async () => {
  const payload = JSON.stringify({
    username: 'getorder',
    password: '987410'
  })
  return await axios.post('get_token', payload)
}
