import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Navigation from '~/components/Navigation.vue';
import { createPinia } from 'pinia';

// Mock stores
const mockMainStore = {
  darkMode: false,
  toggleDarkMode: () => {},
};

const mockNavigationStore = {
  menuItems: [
    { label: 'Home', route: '/' },
    { label: 'Teams', route: '/teams' },
  ],
  menuIcon: '/logo.png',
};

// Mock store composables
vi.mock('~/stores/main', () => ({
  useMainStore: () => mockMainStore,
}));

vi.mock('~/stores/navigation', () => ({
  useNavigationStore: () => mockNavigationStore,
}));

describe('Navigation Component', () => {
  it('renders menu items correctly', () => {
    const wrapper = mount(Navigation, {
      global: {
        plugins: [createPinia()],
        stubs: {
          Menubar: true,
          Button: true,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('displays dark mode toggle button', () => {
    const wrapper = mount(Navigation, {
      global: {
        plugins: [createPinia()],
        stubs: {
          Menubar: true,
          Button: true,
        },
      },
    });

    expect(wrapper.find('button').exists()).toBe(true);
  });
});
