<script setup lang="ts">
import { useBlogStore } from '~/stores/blog';

const blogStore = useBlogStore();

interface CtaItem {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonIcon: string;
  href: string;
  external: boolean;
  severity:
    | 'primary'
    | 'success'
    | 'info'
    | 'warn'
    | 'danger'
    | 'help'
    | 'secondary'
    | 'contrast'
    | undefined;
  ariaLabel: string;
}

const primaryCtas: CtaItem[] = [
  {
    id: 'starter-pack',
    title: 'Get the Starter Pack',
    subtitle:
      'Pre-built datasets & 12 Jupyter notebooks to jumpstart your CFB analytics',
    buttonText: 'Download Now',
    buttonIcon: 'pi pi-download',
    href: 'https://collegefootballdata.gumroad.com/l/starter-pack',
    external: true,
    severity: 'success',
    ariaLabel: 'Download the CFBD Starter Pack from Gumroad',
  },
  {
    id: 'training-pack',
    title: 'Get the Model Training Pack',
    subtitle:
      'Pre-built training data (week 5+) & 7 Jupyter notebooks with prebuilt models to jumpstart your predictive modeling',
    buttonText: 'Download Now',
    buttonIcon: 'pi pi-download',
    href: 'https://collegefootballdata.gumroad.com/l/model-training-pack',
    external: true,
    severity: 'success',
    ariaLabel: 'Download the CFBD Model Training Pack from Gumroad',
  },
  {
    id: 'api-access',
    title: 'Unlock API Access',
    subtitle:
      'Choose from free tier to premium GraphQL with live data subscriptions',
    buttonText: 'View Tiers',
    buttonIcon: 'pi pi-key',
    href: '/api-tiers',
    external: false,
    severity: 'primary',
    ariaLabel: 'View API access tiers and pricing',
  },
  {
    id: 'pickem-contest',
    title: "Join Pick'em Contest",
    subtitle:
      'Test your computer models against the community in weekly predictions',
    buttonText: 'Join Contest',
    buttonIcon: 'pi pi-trophy',
    href: 'https://predictions.collegefootballdata.com',
    external: true,
    severity: 'warn',
    ariaLabel: "Join the computer model pick'em contest",
  },
];

await blogStore.getPosts();
</script>

<template>
  <div class="homepage-container">
    <!-- Hero Section -->
    <section class="hero-section" role="banner">
      <div class="hero-content">
        <header class="hero-header text-center mb-6">
          <h1 class="hero-title mb-3">
            Build College Football Models in a Weekend
          </h1>
          <p class="hero-subtitle text-lg md:text-xl mb-4">
            Clean, structured CFB data via API and prebuilt packs. No scraping.
            No cleanup. Just plug in and start building.
          </p>
          <div class="trust-indicators text-sm md:text-base">
            <div class="flex flex-wrap justify-center gap-4 md:gap-6">
              <span class="trust-item"> <strong>5,000+</strong> users </span>
              <span class="trust-item">
                <strong>50M+</strong> API calls/season
              </span>
              <span class="trust-item">
                <strong>500+</strong> Patreon supporters
              </span>
            </div>
          </div>
        </header>

        <!-- Primary CTAs Grid -->
        <div class="cta-grid grid">
          <div v-for="cta in primaryCtas" :key="cta.id" class="col-12 md:col-6">
            <Card class="cta-card h-full">
              <template #header>
                <div class="cta-card-header p-4 pb-0">
                  <h3 class="cta-title text-xl font-semibold mb-2">
                    {{ cta.title }}
                  </h3>
                </div>
              </template>

              <template #content>
                <div class="cta-content p-4 pt-0">
                  <p class="cta-subtitle text-sm md:text-base mb-4">
                    {{ cta.subtitle }}
                  </p>

                  <NuxtLink
                    v-if="!cta.external"
                    :to="cta.href"
                    class="cta-link"
                  >
                    <Button
                      :label="cta.buttonText"
                      :icon="cta.buttonIcon"
                      :severity="cta.severity"
                      size="large"
                      class="w-full"
                      :aria-label="cta.ariaLabel"
                    />
                  </NuxtLink>

                  <a
                    v-else
                    :href="cta.href"
                    :target="cta.external ? '_blank' : undefined"
                    :rel="cta.external ? 'noopener noreferrer' : undefined"
                    class="cta-link"
                  >
                    <Button
                      :label="cta.buttonText"
                      :icon="cta.buttonIcon"
                      :severity="cta.severity"
                      size="large"
                      class="w-full"
                      :aria-label="cta.ariaLabel"
                    />
                  </a>
                </div>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </section>

    <!-- Secondary Content Section -->
    <section class="secondary-section mt-4" role="complementary">
      <div class="grid">
        <!-- Quick Links / Community -->
        <div class="col-12 md:col-6">
          <Card class="h-full">
            <template #header>
              <div class="p-4 pb-0">
                <h2 class="text-xl font-semibold">Community & Resources</h2>
                <p class="text-sm text-muted">
                  Connect with the CFB analytics community
                </p>
              </div>
            </template>

            <template #content>
              <div class="p-4 pt-0">
                <div class="resource-links space-y-3">
                  <div class="resource-item">
                    <NuxtLink to="/key" class="resource-link">
                      <i class="pi pi-key mr-2"></i>
                      Get Your Free API Key
                    </NuxtLink>
                  </div>

                  <div class="resource-item">
                    <a
                      href="https://api.collegefootballdata.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="resource-link"
                    >
                      <i class="pi pi-book mr-2"></i>
                      API Documentation
                    </a>
                  </div>

                  <div class="resource-item">
                    <a
                      href="https://twitter.com/cfb_data"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="resource-link"
                    >
                      <i class="pi pi-twitter mr-2"></i>
                      Follow on Twitter
                    </a>
                  </div>

                  <div class="resource-item">
                    <a
                      href="https://bsky.app/profile/collegefootballdata.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="resource-link"
                      aria-label="Follow CollegeFootballData on Bluesky"
                    >
                      <i class="pi pi-at mr-2"></i>
                      Follow on Bluesky
                    </a>
                  </div>

                  <div class="resource-item">
                    <a
                      href="https://discord.gg/Eb3ex5a"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="resource-link"
                      aria-label="Join the CFBD Discord community"
                    >
                      <i class="pi pi-discord mr-2"></i>
                      Join Discord Community
                    </a>
                  </div>

                  <div class="resource-item">
                    <NuxtLink to="/about" class="resource-link">
                      <i class="pi pi-info-circle mr-2"></i>
                      About the Project
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </template>
          </Card>
        </div>
        <!-- Recent Blog Posts -->
        <div class="col-12 md:col-6">
          <Card class="h-full">
            <template #header>
              <div class="p-4 pb-0">
                <h2 class="text-xl font-semibold">Latest from the Blog</h2>
                <p class="text-sm text-muted">
                  Insights, tutorials, and updates on CFB analytics
                </p>
              </div>
            </template>

            <template #content>
              <div class="p-4 pt-0">
                <div v-if="blogStore.posts.length > 0" class="blog-preview">
                  <div
                    v-for="(post, index) in blogStore.posts.slice(0, 3)"
                    :key="post.id"
                    class="blog-item"
                    :class="{ 'mb-3': index < 2 }"
                  >
                    <h4 class="blog-title text-sm font-medium mb-1">
                      {{ post.title }}
                    </h4>
                    <a
                      :href="post.href"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="blog-link text-xs"
                      :aria-label="`Read blog post: ${post.title}`"
                    >
                      Read more →
                    </a>
                    <Divider v-if="index < 2" class="mt-2" />
                  </div>
                </div>

                <div v-else class="text-center py-4">
                  <i class="pi pi-spin pi-spinner text-2xl"></i>
                  <p class="mt-2 text-sm">Loading latest posts...</p>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </section>

    <!-- API Status Notice (if needed) -->
    <section class="notices-section mt-3" role="alert" aria-live="polite">
      <Message severity="info" :closable="false" class="mb-4">
        <strong>New:</strong> College Basketball API now available! Use your
        same CFBD API key to access basketball data.
        <a
          href="https://api.collegebasketballdata.com"
          target="_blank"
          rel="noopener noreferrer"
          class="ml-2"
        >
          Check it out →
        </a>
      </Message>
    </section>
  </div>
</template>

<style scoped>
/**
 * Design Rationale:
 * - Mobile-first responsive design using PrimeFlex grid system
 * - Clear visual hierarchy with hero section and 3 equal CTA cards
 * - Consistent spacing and typography scale
 * - Accessible color contrasts and focus states
 * - Semantic HTML structure with proper ARIA labels
 */

.homepage-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.hero-section {
  padding: 2rem 0 3rem;
}

.hero-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  line-height: 1.2;
  color: var(--p-text-color);
}

.hero-subtitle {
  color: var(--p-text-muted-color);
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

.trust-indicators {
  color: var(--p-text-muted-color);
  margin-top: 1.5rem;
}

.trust-item {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.trust-item strong {
  color: var(--p-primary-color);
}

.cta-grid {
  margin-top: 3rem;
}

.cta-card {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.cta-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.cta-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cta-title {
  color: var(--p-text-color);
}

.cta-subtitle {
  color: var(--p-text-muted-color);
  line-height: 1.5;
  flex: 1;
}

.cta-link {
  text-decoration: none;
  margin-top: auto;
}

.secondary-section {
  padding: 2rem 0;
}

.blog-item {
  padding: 0.5rem 0;
}

.blog-title {
  color: var(--p-text-color);
  line-height: 1.4;
}

.blog-link {
  color: var(--p-primary-color);
  text-decoration: none;
  font-weight: 500;
}

.blog-link:hover {
  text-decoration: underline;
}

.resource-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.resource-link {
  display: flex;
  align-items: center;
  color: var(--p-text-color);
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease;
}

.resource-link:hover {
  background-color: var(--p-content-hover-background);
  text-decoration: none;
}

.notices-section {
  padding-bottom: 2rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .homepage-container {
    padding: 0.75rem;
  }

  .hero-section {
    padding: 1.5rem 0 2rem;
  }

  .cta-grid {
    margin-top: 2rem;
  }

  .trust-indicators .flex {
    flex-direction: column;
    gap: 0.5rem;
  }
}

/* Focus states for accessibility */
.cta-link:focus-within {
  outline: 2px solid var(--p-primary-color);
  outline-offset: 2px;
  border-radius: 0.375rem;
}

.resource-link:focus {
  outline: 2px solid var(--p-primary-color);
  outline-offset: 2px;
}

/* Dark mode considerations */
.dark-mode .cta-card:hover {
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.1);
}

/**
 * Improvement Opportunities:
 *
 * 1. A/B Testing:
 *    - Test different CTA button colors and text
 *    - Experiment with card layouts (horizontal vs vertical)
 *    - Test hero section length and messaging
 *
 * 2. Performance Optimizations:
 *    - Lazy load secondary content below the fold
 *    - Preload critical CTA destinations
 *    - Optimize images if hero background is added
 *
 * 3. Analytics & Conversion Tracking:
 *    - Add click tracking for each CTA
 *    - Heat mapping for user interaction patterns
 *    - Conversion funnel analysis
 *
 * 4. Enhanced Personalization:
 *    - Show different CTAs based on user segment
 *    - Returning vs new user experiences
 *    - Geographic or device-based variations
 *
 * 5. Content Enhancements:
 *    - Add testimonials or success stories
 *    - Include preview data or sample visualizations
 *    - Show real-time usage statistics
 *
 * 6. Accessibility Improvements:
 *    - Add skip navigation links
 *    - Ensure proper heading hierarchy
 *    - Test with screen readers
 *    - Add reduced motion preferences
 */
</style>
