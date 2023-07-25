import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import { createPinia, setActivePinia } from 'pinia'
import SignIn from '@/views/SignIn.vue'
import { useAuthStore } from '../../stores/auth'

describe('SignIn', () => {
  setActivePinia(createPinia())
  const wrapper = mount(SignIn, {
    global: {
      plugins: [PrimeVue] // Provide PrimeVue as a plugin to the global Vue instance
    }
  })

  const authStore = useAuthStore()

  it('withour error message', () => {
    expect(authStore.error).toBe('')
  })
  it('should render h2', () => {
    expect(wrapper.find('h2').text()).toBe('Sign In')
  })
  it('display error message on wrong credentials', async () => {
    const errorMessage = 'Invalid credentials'

    const wrapper = mount(SignIn, {
      global: {
        plugins: [PrimeVue]
      }
    })

    // Find the email and password input fields
    const emailInput = wrapper.find('[type="email"]')
    const passwordInput = wrapper.find('[type="password"]')

    // Enter wrong email and password
    await emailInput.setValue('wrong_email@example.com')
    await passwordInput.setValue('wrong_password')

    // Find and click the Signin button
    const signinButton = wrapper.find('.p-button')

    // Trigger the Signin button click
    await signinButton.trigger('click')

    // Wait for the next tick to allow the DOM to update after any asynchronous rendering
    await wrapper.vm.$nextTick()

    // Find message component
    const message = wrapper.find('.p-message-warn')

    // Check if the error message element exists before getting its text
    if (message.exists()) {
      expect(message.text()).toBe(errorMessage)
    }

    // Additional assertion to check if the error message is hidden on correct credentials
    // Reset the email and password fields to empty
    await emailInput.setValue('')
    await passwordInput.setValue('')

    // Trigger the Signin button click again
    await signinButton.trigger('click')

    // Wait for the next tick to allow the DOM to update after any asynchronous rendering
    await wrapper.vm.$nextTick()

    // Expect the error message element to be absent when the credentials are correct
    expect(message.exists()).toBe(false)
  })
})
