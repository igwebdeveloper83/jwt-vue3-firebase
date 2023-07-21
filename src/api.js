import axios from 'axios'
import router from './router'
import { useAuthStore } from './stores/auth'

const apiKey = import.meta.env.VITE_API_KEY_FIREBASE

// Creates a new instance of Axios with request/response interceptors.
const axiosApiInstance = axios.create()

// Adds a request interceptor to include the user's authentication token in API requests.
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

// Adds a response interceptor to handle token refresh and error handling for API responses.
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
        // Attempt to refresh the user's authentication token
        const newTokens = await axios.post(
          `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
          {
            grant_type: 'refresh_token',
            refresh_token: JSON.parse(localStorage.getItem('userToken')).refreshToken
          }
        )
        console.log(newTokens.data)
        // Update the user's token and refresh token in the authStore and localStorage
        authStore.userInfo.token = newTokens.data.access_token
        authStore.userInfo.refreshToken = newTokens.data.refresh_token
        localStorage.setItem(
          'userToken',
          JSON.stringify({
            token: newTokens.data.access_token,
            refreshToken: newTokens.data.refresh_token
          })
        )
        return axiosApiInstance(error.config)
      } catch (err) {
        // Handle token refresh failure
        console.log(err)
        localStorage.removeItem('userToken')
        router.push('/signin')
        authStore.userInfo.token = ''
        authStore.userInfo.refreshToken = ''
      }
    }
    console.log(error)
    return Promise.reject(error)
  }
)
export default axiosApiInstance
