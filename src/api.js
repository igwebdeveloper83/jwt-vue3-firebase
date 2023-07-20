import axios from 'axios'
import router from './router'
import { useAuthStore } from './stores/auth'

const apiKey = import.meta.env.VITE_API_KEY_FIREBASE

const axiosApiInstance = axios.create()

axiosApiInstance.interceptors.request.use((config) => {
  const url = config.url
  if (!url.includes('signInWithPassword') && !url.includes('signUp')) {
    const authStore = useAuthStore()
    let params = new URLSearchParams()
    params.append('auth', authStore.userInfo.token)
    config.params = params
  }
  return config
})

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const authStore = useAuthStore()
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const newTokens = await axios.post(
          `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
          {
            grant_type: 'refresh_token',
            refresh_token: JSON.parse(localStorage.getItem('userToken')).refreshToken
          }
        )
        console.log(newTokens.data)
        authStore.userInfo.token = newTokens.data.access_token
        authStore.userInfo.refreshToken = newTokens.data.refresh_token
        localStorage.setItem(
          'userToken',
          JSON.stringify({
            token: newTokens.data.access_token,
            refreshToken: newTokens.data.refresh_token
          })
        )
      } catch (err) {
        console.log(err)
        localStorage.removeItem('userToken')
        router.push('/signin')
        authStore.userInfo.token = ''
        authStore.userInfo.refreshToken = ''
      }
    }
    console.log(error)
  }
)

export default axiosApiInstance
