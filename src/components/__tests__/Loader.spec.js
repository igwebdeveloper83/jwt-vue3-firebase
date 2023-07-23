import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Loader from '../Loader.vue'
import PrimeVue from 'primevue/config'

describe('Loader', () => {
  const wrapper = mount(Loader, {
    global: {
      plugins: [PrimeVue] // Provide PrimeVue as a plugin to the global Vue instance
    }
  })
  it('should render ProgressSpinner', () => {
    // Find the ProgressSpinner component by class name
    const progressSpinner = wrapper.find('.p-progress-spinner')
    expect(progressSpinner.exists()).toBe(true)
    // You can also assert the presence of specific attributes or content
    // For example, to check if it has the expected role attribute:
    expect(progressSpinner.attributes('role')).toBe('progressbar')
  })
})
