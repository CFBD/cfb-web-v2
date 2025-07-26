<template>
  <div class="navigation-container">
    <!-- Desktop Navigation -->
    <div class="desktop-nav hidden lg:block">
      <Menubar :model="navigationStore.menuItems" class="desktop-menubar">
        <template #start>
          <NuxtLink to="/" class="logo-link">
            <img
              alt="CFBD Logo"
              :src="navigationStore.menuIcon"
              height="40"
              class="logo-image"
            />
          </NuxtLink>
        </template>
        <template #item="{ item, props, hasSubmenu }">
          <router-link
            v-if="item.route"
            v-slot="{ href, navigate }"
            :to="item.route"
            custom
          >
            <a
              v-ripple
              :href="href"
              v-bind="props.action"
              @click="navigate"
              class="menu-item"
            >
              <span v-if="item.icon" :class="item.icon" class="menu-icon" />
              <span class="menu-label">{{ item.label }}</span>
            </a>
          </router-link>
          <a
            v-else
            v-ripple
            :href="item.url"
            :target="item.target"
            v-bind="props.action"
            class="menu-item"
          >
            <span v-if="item.icon" :class="item.icon" class="menu-icon" />
            <span class="menu-label">{{ item.label }}</span>
            <span
              v-if="hasSubmenu"
              class="pi pi-fw pi-angle-down submenu-icon"
            />
          </a>
        </template>
        <template #end>
          <div class="desktop-nav-actions">
            <!-- Get API Key CTA -->
            <NuxtLink to="/key" class="api-key-cta-link">
              <Button
                label="Get API Key"
                icon="pi pi-key"
                class="api-key-cta"
                severity="primary"
                :aria-label="'Get your free API key to access CFBD data'"
              />
            </NuxtLink>

            <!-- Theme Toggle -->
            <Button
              @click="mainStore.toggleDarkMode"
              text
              :aria-label="`Switch to ${mainStore.darkMode ? 'light' : 'dark'} mode`"
              class="theme-toggle"
            >
              <i :class="`pi pi-${mainStore.darkMode ? 'sun' : 'moon'}`"></i>
            </Button>
          </div>
        </template>
      </Menubar>
    </div>

    <!-- Mobile Navigation -->
    <div class="mobile-nav lg:hidden">
      <div class="mobile-header">
        <!-- Logo -->
        <NuxtLink to="/" class="mobile-logo-link">
          <img
            alt="CFBD Logo"
            :src="navigationStore.menuIcon"
            height="32"
            class="mobile-logo"
          />
        </NuxtLink>

        <!-- Mobile Actions -->
        <div class="mobile-actions">
          <!-- Theme Toggle -->
          <Button
            @click="mainStore.toggleDarkMode"
            text
            size="small"
            :aria-label="`Switch to ${mainStore.darkMode ? 'light' : 'dark'} mode`"
            class="mobile-theme-toggle"
          >
            <i :class="`pi pi-${mainStore.darkMode ? 'sun' : 'moon'}`"></i>
          </Button>

          <!-- Hamburger Menu -->
          <Button
            @click="toggleMobileMenu"
            text
            size="small"
            aria-label="Toggle navigation menu"
            class="hamburger-button"
          >
            <i :class="`pi pi-${mobileMenuOpen ? 'times' : 'bars'}`"></i>
          </Button>
        </div>
      </div>

      <!-- Mobile Menu Overlay -->
      <div
        v-if="mobileMenuOpen"
        class="mobile-menu-overlay"
        @click="closeMobileMenu"
      >
        <div class="mobile-menu-content" @click.stop>
          <div class="mobile-menu-header">
            <h2 class="mobile-menu-title">Navigation</h2>
            <Button
              @click="closeMobileMenu"
              text
              size="small"
              aria-label="Close navigation menu"
              class="mobile-close-button"
            >
              <i class="pi pi-times"></i>
            </Button>
          </div>

          <div class="mobile-menu-items">
            <!-- Prominent CTA at top of mobile menu -->
            <div class="mobile-cta-section">
              <NuxtLink
                to="/key"
                class="mobile-api-key-cta-link"
                @click="closeMobileMenu"
              >
                <Button
                  label="Get Free API Key"
                  icon="pi pi-key"
                  class="mobile-api-key-cta"
                  severity="primary"
                  size="large"
                  :aria-label="'Get your free API key to access CFBD data'"
                />
              </NuxtLink>
            </div>

            <!-- Separator -->
            <div class="mobile-cta-separator"></div>

            <template
              v-for="item in navigationStore.menuItems"
              :key="item.label"
            >
              <!-- Top-level item without submenu -->
              <NuxtLink
                v-if="item.route && !item.items"
                :to="item.route"
                class="mobile-menu-item"
                @click="closeMobileMenu"
              >
                <span
                  v-if="item.icon"
                  :class="item.icon"
                  class="mobile-item-icon"
                ></span>
                <span class="mobile-item-label">{{ item.label }}</span>
              </NuxtLink>

              <!-- External link without submenu -->
              <a
                v-else-if="item.url && !item.items"
                :href="item.url"
                :target="item.target"
                class="mobile-menu-item"
                @click="closeMobileMenu"
              >
                <span
                  v-if="item.icon"
                  :class="item.icon"
                  class="mobile-item-icon"
                ></span>
                <span class="mobile-item-label">{{ item.label }}</span>
                <span class="pi pi-external-link mobile-external-icon"></span>
              </a>

              <!-- Item with submenu -->
              <div v-else class="mobile-menu-section">
                <button
                  @click="toggleMobileSection(String(item.label ?? ''))"
                  class="mobile-section-header"
                  :aria-expanded="
                    openSections.includes(String(item.label ?? ''))
                  "
                >
                  <div class="mobile-section-title">
                    <span
                      v-if="item.icon"
                      :class="item.icon"
                      class="mobile-section-icon"
                    ></span>
                    <span class="mobile-section-label">{{ item.label }}</span>
                  </div>
                  <i
                    :class="`pi pi-chevron-${openSections.includes(String(item.label ?? '')) ? 'up' : 'down'}`"
                    class="mobile-section-chevron"
                  ></i>
                </button>

                <div
                  v-if="openSections.includes(String(item.label ?? ''))"
                  class="mobile-submenu"
                >
                  <template v-for="subItem in item.items" :key="subItem.label">
                    <!-- Separator -->
                    <div
                      v-if="subItem.separator"
                      class="mobile-submenu-separator"
                    >
                      <span class="mobile-separator-text">{{
                        subItem.label
                      }}</span>
                    </div>

                    <!-- Internal link -->
                    <NuxtLink
                      v-else-if="subItem.route"
                      :to="subItem.route"
                      class="mobile-submenu-item"
                      @click="closeMobileMenu"
                    >
                      <span
                        v-if="subItem.icon"
                        :class="subItem.icon"
                        class="mobile-subitem-icon"
                      ></span>
                      <span class="mobile-subitem-label">{{
                        subItem.label
                      }}</span>
                    </NuxtLink>

                    <!-- External link -->
                    <a
                      v-else-if="subItem.url"
                      :href="subItem.url"
                      :target="subItem.target"
                      class="mobile-submenu-item"
                      @click="closeMobileMenu"
                    >
                      <span
                        v-if="subItem.icon"
                        :class="subItem.icon"
                        class="mobile-subitem-icon"
                      ></span>
                      <span class="mobile-subitem-label">{{
                        subItem.label
                      }}</span>
                      <span
                        class="pi pi-external-link mobile-external-icon"
                      ></span>
                    </a>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useMainStore } from '~/stores/main';
import { useNavigationStore } from '~/stores/navigation';
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';

const mainStore = useMainStore();
const navigationStore = useNavigationStore();
const route = useRoute();

// Mobile menu state
const mobileMenuOpen = ref(false);
const openSections = ref<string[]>([]);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
  document.body.style.overflow = '';
  openSections.value = [];
};

const toggleMobileSection = (sectionLabel: string) => {
  const index = openSections.value.indexOf(sectionLabel);
  if (index > -1) {
    openSections.value.splice(index, 1);
  } else {
    openSections.value.push(sectionLabel);
  }
};

// Close mobile menu when route changes
watch(route, () => {
  closeMobileMenu();
});

// Clean up when component unmounts
onUnmounted(() => {
  document.body.style.overflow = '';
});
</script>

<style scoped>
.navigation-container {
  position: relative;
  z-index: 1000;
}

/* Desktop Navigation Styles */
.desktop-nav {
  width: 100%;
}

.desktop-menubar {
  border: none;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.desktop-nav-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.api-key-cta-link {
  text-decoration: none;
}

.api-key-cta {
  font-weight: 600;
  padding: 0.625rem 1.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  border-radius: 0.5rem;
}

.api-key-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.api-key-cta:active {
  transform: translateY(0);
}

.theme-toggle {
  margin-left: 0.25rem;
}

.desktop-menubar {
  border: none;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-right: 1rem;
}

.logo-image {
  transition: transform 0.2s ease;
}

.logo-image:hover {
  transform: scale(1.05);
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: var(--p-text-color);
  transition: all 0.2s ease;
  border-radius: 0.375rem;
}

.menu-item:hover {
  background-color: var(--p-highlight-bg);
  color: var(--p-highlight-text-color);
}

.menu-icon {
  font-size: 0.875rem;
  opacity: 0.8;
}

.menu-label {
  font-weight: 500;
}

.submenu-icon {
  margin-left: auto;
  font-size: 0.75rem;
  opacity: 0.6;
}

.theme-toggle {
  margin-left: 0.5rem;
}

/* Mobile Navigation Styles */
.mobile-nav {
  width: 100%;
}

.mobile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--p-content-background);
  border-bottom: 1px solid var(--p-surface-border);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.mobile-logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.mobile-logo {
  transition: transform 0.2s ease;
}

.mobile-logo:active {
  transform: scale(0.95);
}

.mobile-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.mobile-theme-toggle,
.hamburger-button {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
}

.hamburger-button {
  transition: transform 0.2s ease;
}

.hamburger-button:active {
  transform: scale(0.95);
}

/* Mobile Menu Overlay */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  animation: fadeIn 0.2s ease;
}

.mobile-menu-content {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 320px;
  height: 100vh;
  background: var(--p-content-background);
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.15);
  animation: slideInRight 0.3s ease;
  overflow-y: auto;
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--p-surface-border);
  background: var(--p-surface-50);
}

.mobile-menu-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--p-text-color);
}

.mobile-close-button {
  width: 2rem;
  height: 2rem;
}

.mobile-menu-items {
  padding: 0;
}

/* Mobile CTA Section */
.mobile-cta-section {
  padding: 1rem;
  background: linear-gradient(
    135deg,
    var(--p-primary-50),
    var(--p-primary-100)
  );
}

.mobile-api-key-cta-link {
  text-decoration: none;
  display: block;
}

.mobile-api-key-cta {
  width: 100%;
  font-weight: 600;
  padding: 0.875rem 1.5rem;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  border-radius: 0.75rem;
}

.mobile-api-key-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.mobile-api-key-cta:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.mobile-cta-separator {
  height: 1px;
  background: var(--p-surface-200);
  margin: 0.5rem 1rem 1rem;
  opacity: 0.5;
}

/* Mobile Menu Items */
.mobile-menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  text-decoration: none;
  color: var(--p-text-color);
  transition: background-color 0.2s ease;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
}

.mobile-menu-item:hover,
.mobile-menu-item:focus {
  background-color: var(--p-highlight-bg);
  color: var(--p-highlight-text-color);
}

.mobile-menu-item:active {
  background-color: var(--p-highlight-bg);
  transform: scale(0.98);
}

.mobile-item-icon {
  font-size: 1rem;
  opacity: 0.8;
  width: 1.25rem;
  text-align: center;
}

.mobile-item-label {
  font-weight: 500;
  flex: 1;
}

.mobile-external-icon {
  font-size: 0.75rem;
  opacity: 0.6;
}

/* Mobile Menu Sections */
.mobile-menu-section {
  margin: 0.5rem 0;
}

.mobile-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.875rem 1rem;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  color: var(--p-text-color);
  transition: background-color 0.2s ease;
  cursor: pointer;
}

.mobile-section-header:hover,
.mobile-section-header:focus {
  background-color: var(--p-surface-100);
}

.mobile-section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.mobile-section-icon {
  font-size: 1rem;
  opacity: 0.8;
  width: 1.25rem;
  text-align: center;
}

.mobile-section-label {
  font-weight: 600;
  font-size: 0.95rem;
}

.mobile-section-chevron {
  font-size: 0.75rem;
  opacity: 0.6;
  transition: transform 0.2s ease;
}

/* Mobile Submenu */
.mobile-submenu {
  background: var(--p-surface-50);
  border-left: 3px solid var(--p-primary-color);
  margin-left: 1rem;
  animation: expandDown 0.2s ease;
}

.mobile-submenu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: var(--p-text-muted-color);
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.mobile-submenu-item:hover,
.mobile-submenu-item:focus {
  background-color: var(--p-highlight-bg);
  color: var(--p-highlight-text-color);
}

.mobile-subitem-icon {
  font-size: 0.875rem;
  opacity: 0.7;
  width: 1rem;
  text-align: center;
}

.mobile-subitem-label {
  flex: 1;
}

.mobile-submenu-separator {
  padding: 0.5rem 1rem 0.25rem;
  border-bottom: 1px solid var(--p-surface-200);
  margin: 0.5rem 0;
}

.mobile-separator-text {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--p-text-muted-color);
  opacity: 0.7;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes expandDown {
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 500px;
  }
}

/* Dark mode adjustments */
.dark-mode .mobile-menu-overlay {
  background: rgba(0, 0, 0, 0.7);
}

.dark-mode .mobile-menu-content {
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.3);
}

.dark-mode .mobile-cta-section {
  background: linear-gradient(
    135deg,
    var(--p-primary-900),
    var(--p-primary-800)
  );
}

.dark-mode .api-key-cta {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.dark-mode .api-key-cta:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.dark-mode .mobile-api-key-cta {
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.3);
}

.dark-mode .mobile-api-key-cta:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .mobile-menu-content {
    max-width: 100%;
    width: 100%;
  }
}

/* Focus styles for accessibility */
.mobile-menu-item:focus,
.mobile-section-header:focus,
.mobile-submenu-item:focus {
  outline: 2px solid var(--p-primary-color);
  outline-offset: -2px;
}

/* Active route highlighting */
.router-link-active.mobile-menu-item,
.router-link-active.mobile-submenu-item {
  background-color: var(--p-primary-50);
  color: var(--p-primary-color);
  font-weight: 600;
}

.router-link-active.mobile-menu-item .mobile-item-icon,
.router-link-active.mobile-submenu-item .mobile-subitem-icon {
  color: var(--p-primary-color);
  opacity: 1;
}
</style>
