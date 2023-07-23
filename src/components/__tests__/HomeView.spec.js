import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'

describe('HomeView', () => {
  it('should render the correct h2 text', () => {
    // Mount the HomeView
    const wrapper = mount(HomeView)
    // Perform assertions on the rendered output
    expect(wrapper.find('main').text()).toBe('Home View') // Replace with the actual text in your H2 element
  })
})
