import axios from 'axios'

const BASE_URL = 'https://api.getorder.biz/api/v1/'

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
    'X-GETORDER-AUTH': 'Wm1NeU1EQXhZemRsWVdJeU56VmlOQT09OkxjaXFheXprZk9PZnNRb2g3ZjZ5NGc9PQ=='
  }
})
export default instance
