import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const apiKey = import.meta.env.VITE_API_KEY_FIREBASE

const error = ref('')
const loader = ref(false)

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref({
    token: '',
    email: '',
    userId: '',
    refreshToken: '',
    expiresIn: ''
  })
  const auth = async (payload, type) => {
    const strUrl = type === 'signup' ? 'signUp' : 'signInWithPassword'
    error.value = ''
    loader.value = true
    try {
      let response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${strUrl}?key=${apiKey}`,
        {
          ...payload,
          returnSecureToken: true
        }
      )
      console.log(response.data)
      userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn
      }
      localStorage.setItem(
        'userToken',
        JSON.stringify({
          token: userInfo.value.token,
          refreshToken: userInfo.value.refreshToken,
          expiresIn: userInfo.value.expiresIn
        })
      )
    } catch (err) {
      switch (err.response.data.error.message) {
        case 'EMAIL_EXISTS':
          error.value = 'Email exists'
          break
        case 'OPERATION_NOT_ALLOWED':
          error.value = 'Operation not allowed'
          break
        case 'WEAK_PASSWORD : Password should be at least 6 characters':
          error.value = 'Password should be at least 6 characters'
          break
        case 'EMAIL_NOT_FOUND':
          error.value = 'Email not found'
          break
        case 'INVALID_PASSWORD':
          error.value = 'Invalid password'
          break
        default:
          error.value = 'Error'
          console.log(err.response)
          break
      }
      throw error.value
    } finally {
      loader.value = false
    }
  }
  return { auth, userInfo, loader, error }
})
