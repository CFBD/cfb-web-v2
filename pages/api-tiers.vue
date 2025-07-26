<script setup lang="ts">
import { useSeoMeta } from '#imports';
import { onUnmounted } from 'vue';
/**
 * API Tier Comparison Page
 *
 * Data Structure Design:
 * - Tier data could be abstracted to a composable or external API
 * - Features are categorized for better organization
 * - Pricing and limits are clearly separated for easy updates
 */

// Type definitions for tier data structure
interface TierFeature {
  id: string;
  name: string;
  description?: string;
  category: 'basic' | 'advanced' | 'premium';
}

interface ApiTier {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  priceUnit: string;
  monthlyCallLimit: number | 'unlimited';
  isPopular?: boolean;
  isRecommended?: boolean;
  patreonUrl?: string;
  features: string[]; // Feature IDs that this tier includes
  badge?: {
    text: string;
    severity: 'success' | 'info' | 'warn' | 'danger';
  };
  specialNote?: {
    text: string;
    severity: 'info' | 'warn' | 'success';
  };
}

// Feature definitions - could be moved to a separate composable/service
const availableFeatures: TierFeature[] = [
  {
    id: 'basic_endpoints',
    name: 'Basic API Endpoints',
    category: 'basic',
    description: 'Games, teams, conferences, etc.',
  },
  {
    id: 'historical_data',
    name: 'Historical Data',
    category: 'basic',
    description: 'Access to past seasons data',
  },
  {
    id: 'team_stats',
    name: 'Team Statistics',
    category: 'basic',
    description: 'Season and game-level team stats',
  },
  {
    id: 'player_stats',
    name: 'Player Statistics',
    category: 'basic',
    description: 'Individual player performance data',
  },
  {
    id: 'recruiting_data',
    name: 'Recruiting Data',
    category: 'basic',
    description: 'Player recruiting information',
  },
  {
    id: 'betting_lines',
    name: 'Betting Lines',
    category: 'basic',
    description: 'Historical betting odds and spreads',
  },
  {
    id: 'advanced_metrics',
    name: 'Advanced Metrics',
    category: 'basic',
    description: 'EPA, PPA, Win Probability, etc.',
  },
  {
    id: 'opponent_adjusted_metrics',
    name: 'Opponent Adjusted Metrics',
    category: 'advanced',
    description: 'Metrics adjusted for opponent strength',
  },
  {
    id: 'weather_data',
    name: 'Weather Data',
    category: 'advanced',
    description: 'Game weather conditions',
  },
  {
    id: 'live_scoreboard',
    name: 'Live Scoreboard',
    category: 'advanced',
    description: 'Real-time game scores and updates',
  },
  {
    id: 'live_plays',
    name: 'Live Play-by-Play',
    category: 'premium',
    description: 'Real-time play data during games',
  },
  {
    id: 'open_office_hours',
    name: 'Open Office Hours',
    category: 'premium',
    description: 'Monthly live chats',
  },
  {
    id: 'graphql_access',
    name: 'GraphQL API',
    category: 'premium',
    description: 'Advanced query capabilities with subscriptions',
  },
];

// Tier definitions - could be loaded from API or CMS in the future
const apiTiers: ApiTier[] = [
  {
    id: 'free',
    name: 'Free',
    subtitle: 'Perfect for getting started',
    price: 0,
    priceUnit: '/month',
    monthlyCallLimit: 1000,
    features: [
      'basic_endpoints',
      'historical_data',
      'team_stats',
      'player_stats',
      'recruiting_data',
      'betting_lines',
      'advanced_metrics',
    ],
    badge: { text: 'Start Here', severity: 'info' },
  },
  {
    id: 'academic',
    name: 'Academic',
    subtitle: 'For students and researchers',
    price: 0,
    priceUnit: '/month',
    monthlyCallLimit: 3000,
    features: [
      'basic_endpoints',
      'historical_data',
      'team_stats',
      'player_stats',
      'recruiting_data',
      'betting_lines',
      'advanced_metrics',
    ],
    badge: { text: 'Student Discount', severity: 'success' },
    specialNote: {
      text: 'Requires registration with a .edu email address',
      severity: 'info',
    },
  },
  {
    id: 'tier1',
    name: 'Tier 1',
    subtitle: 'For hobbyists and small projects',
    price: 1,
    priceUnit: '/month',
    monthlyCallLimit: 5000,
    features: [
      'basic_endpoints',
      'historical_data',
      'team_stats',
      'player_stats',
      'recruiting_data',
      'betting_lines',
      'advanced_metrics',
      'opponent_adjusted_metrics',
      'live_scoreboard',
      'weather_data',
    ],
    patreonUrl: 'https://www.patreon.com/collegefootballdata',
  },
  {
    id: 'tier2',
    name: 'Tier 2',
    subtitle: 'Most popular for analytics',
    price: 5,
    priceUnit: '/month',
    monthlyCallLimit: 30000,
    isPopular: true,
    features: [
      'basic_endpoints',
      'historical_data',
      'team_stats',
      'player_stats',
      'recruiting_data',
      'betting_lines',
      'advanced_metrics',
      'opponent_adjusted_metrics',
      'live_scoreboard',
      'weather_data',
      'live_plays',
      'open_office_hours',
    ],
    patreonUrl: 'https://www.patreon.com/collegefootballdata',
    badge: { text: 'Most Popular', severity: 'warn' },
  },
  {
    id: 'tier3',
    name: 'Tier 3',
    subtitle: 'Dynamic data access',
    price: 10,
    priceUnit: '/month',
    monthlyCallLimit: 75000,
    features: [
      'basic_endpoints',
      'historical_data',
      'team_stats',
      'player_stats',
      'recruiting_data',
      'betting_lines',
      'advanced_metrics',
      'opponent_adjusted_metrics',
      'live_scoreboard',
      'weather_data',
      'live_plays',
      'graphql_access',
      'open_office_hours',
    ],
    patreonUrl: 'https://www.patreon.com/collegefootballdata',
  },
  {
    id: 'tier4',
    name: 'Tier 4',
    subtitle: 'High-volume applications',
    price: 15,
    priceUnit: '/month',
    monthlyCallLimit: 125000,
    features: [
      'basic_endpoints',
      'historical_data',
      'team_stats',
      'player_stats',
      'recruiting_data',
      'betting_lines',
      'advanced_metrics',
      'opponent_adjusted_metrics',
      'live_scoreboard',
      'weather_data',
      'live_plays',
      'graphql_access',
      'open_office_hours',
    ],
    patreonUrl: 'https://www.patreon.com/collegefootballdata',
  },
  {
    id: 'tier5',
    name: 'Tier 5',
    subtitle: 'High-volume applications',
    price: 20,
    priceUnit: '/month',
    monthlyCallLimit: 200000,
    isRecommended: true,
    features: [
      'basic_endpoints',
      'historical_data',
      'team_stats',
      'player_stats',
      'recruiting_data',
      'betting_lines',
      'advanced_metrics',
      'opponent_adjusted_metrics',
      'live_scoreboard',
      'weather_data',
      'live_plays',
      'graphql_access',
      'open_office_hours',
    ],
  },
  {
    id: 'tier6',
    name: 'Tier 6',
    subtitle: 'Very high-volume applications',
    price: 30,
    priceUnit: '/month',
    monthlyCallLimit: 500000,
    isRecommended: true,
    features: [
      'basic_endpoints',
      'historical_data',
      'team_stats',
      'player_stats',
      'recruiting_data',
      'betting_lines',
      'advanced_metrics',
      'opponent_adjusted_metrics',
      'live_scoreboard',
      'weather_data',
      'live_plays',
      'graphql_access',
      'open_office_hours',
    ],
  },
];

// Helper functions for tier management
const getTierFeatures = (tier: ApiTier): TierFeature[] => {
  return availableFeatures.filter((feature) =>
    tier.features.includes(feature.id),
  );
};

const formatCallLimit = (limit: number | 'unlimited'): string => {
  if (limit === 'unlimited') return 'Unlimited';
  if (limit >= 1000) return `${(limit / 1000).toLocaleString()}k`;
  return limit.toLocaleString();
};

const formatPrice = (tier: ApiTier): string => {
  if (tier.priceUnit === 'Contact us') return 'Contact us';
  if (tier.price === 0) return 'Free';
  return `$${tier.price}${tier.priceUnit}`;
};

// Set page meta for SEO
useSeoMeta({
  title: 'API Access Tiers - CollegeFootballData.com',
  description:
    'Compare CFBD API access tiers from free to premium. Choose the right plan for your college football data needs.',
  ogTitle: 'CFBD API Access Tiers',
  ogDescription:
    'Compare API access tiers and find the right plan for your college football analytics project.',
});

// Scroll functionality for mobile tier cards
const scrollContainer = ref<HTMLElement>();
const activeIndicator = ref(0);

const updateActiveIndicator = () => {
  if (!scrollContainer.value) return;

  const container = scrollContainer.value;
  const scrollLeft = container.scrollLeft;
  const cardWidth = 280; // Match CSS flex-basis
  const gap = 16; // 1rem gap
  const index = Math.round(scrollLeft / (cardWidth + gap));

  activeIndicator.value = Math.min(index, apiTiers.length - 1);
};

const scrollToTier = (index: number) => {
  if (!scrollContainer.value) return;

  const container = scrollContainer.value;
  const cardWidth = 280;
  const gap = 16;
  const scrollLeft = index * (cardWidth + gap);

  container.scrollTo({
    left: scrollLeft,
    behavior: 'smooth',
  });

  activeIndicator.value = index;
};

onMounted(() => {
  const container = document.querySelector('.tier-scroll-container');
  if (container) {
    scrollContainer.value = container as HTMLElement;
    container.addEventListener('scroll', updateActiveIndicator);
  }
});

onUnmounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener('scroll', updateActiveIndicator);
  }
});
</script>

<template>
  <div class="api-tiers-page">
    <!-- Page Header -->
    <section class="page-header text-center mb-8">
      <div class="max-w-4xl mx-auto px-4">
        <h1 class="text-3xl md:text-4xl font-bold mb-4">API Access Tiers</h1>
        <p class="text-lg md:text-xl text-muted mb-6">
          Choose the right access level for your college football analytics
          needs. From free exploration to premium solutions.
        </p>
        <div class="flex flex-wrap justify-center gap-4 text-sm">
          <div class="flex items-center gap-2">
            <i class="pi pi-check-circle text-green-500"></i>
            <span>No setup fees</span>
          </div>
          <div class="flex items-center gap-2">
            <i class="pi pi-check-circle text-green-500"></i>
            <span>Cancel anytime</span>
          </div>
          <div class="flex items-center gap-2">
            <i class="pi pi-check-circle text-green-500"></i>
            <span>Academic tier available</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Tier Comparison Cards -->
    <section class="tier-cards-section mb-8">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Desktop: Horizontal Scroll Layout -->
        <div class="hidden lg:block">
          <!-- Scroll Instructions -->
          <div class="text-center mb-6">
            <p class="text-muted flex items-center justify-center gap-3">
              <i class="pi pi-arrow-left"></i>
              Scroll to view all tiers
              <i class="pi pi-arrow-right"></i>
            </p>
          </div>

          <!-- Desktop Scrollable Container -->
          <div class="tier-scroll-container-desktop">
            <div class="tier-scroll-content-desktop">
              <div
                v-for="tier in apiTiers"
                :key="`desktop-${tier.id}`"
                class="tier-scroll-item-desktop"
                :class="{ 'popular-tier': tier.isPopular }"
              >
                <Card
                  class="tier-card h-full"
                  :class="{ 'border-primary': tier.isPopular }"
                >
                  <template #header>
                    <div class="tier-header p-6 pb-4 text-center">
                      <!-- Badge -->
                      <div v-if="tier.badge" class="mb-3">
                        <Badge
                          :value="tier.badge.text"
                          :severity="tier.badge.severity"
                          class="tier-badge"
                        />
                      </div>

                      <!-- Tier Name & Subtitle -->
                      <h3 class="tier-name text-xl font-bold mb-2">
                        {{ tier.name }}
                      </h3>
                      <p class="tier-subtitle text-sm text-muted mb-4">
                        {{ tier.subtitle }}
                      </p>

                      <!-- Price -->
                      <div class="tier-price mb-4">
                        <span class="price-amount text-3xl font-bold">
                          {{ formatPrice(tier) }}
                        </span>
                      </div>

                      <!-- Call Limit -->
                      <div class="call-limit text-sm">
                        <strong>{{
                          formatCallLimit(tier.monthlyCallLimit)
                        }}</strong>
                        <span class="text-muted"> API calls/month</span>
                      </div>
                    </div>
                  </template>

                  <template #content>
                    <div class="tier-content p-6 pt-0">
                      <!-- Features List -->
                      <div class="features-section mb-6">
                        <h4
                          class="features-title text-sm font-semibold mb-3 text-muted uppercase tracking-wide"
                        >
                          What's Included
                        </h4>
                        <ul class="features-list space-y-2">
                          <li
                            v-for="feature in getTierFeatures(tier)"
                            :key="feature.id"
                            class="feature-item flex items-start gap-2 text-sm"
                          >
                            <i
                              class="pi pi-check text-green-500 text-xs mt-1 flex-shrink-0"
                            ></i>
                            <div>
                              <span class="feature-name">{{
                                feature.name
                              }}</span>
                              <div
                                v-if="feature.description"
                                class="feature-description text-xs text-muted mt-1"
                              >
                                {{ feature.description }}
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>

                      <!-- Special Note (if applicable) -->
                      <div v-if="tier.specialNote" class="special-note mb-4">
                        <Message
                          :severity="tier.specialNote.severity"
                          :closable="false"
                          class="text-xs"
                        >
                          <i class="pi pi-info-circle mr-2"></i>
                          {{ tier.specialNote.text }}
                        </Message>
                      </div>

                      <!-- CTA Button -->
                      <div class="tier-cta">
                        <template
                          v-if="tier.id === 'free' || tier.id === 'academic'"
                        >
                          <NuxtLink to="/key">
                            <Button
                              label="Get Free API Key"
                              icon="pi pi-key"
                              class="w-full"
                              severity="secondary"
                              :aria-label="`Get free API key for ${tier.name} tier`"
                            />
                          </NuxtLink>
                        </template>

                        <template v-else>
                          <a
                            :href="tier.patreonUrl"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="block"
                          >
                            <Button
                              :label="`Subscribe - ${formatPrice(tier)}`"
                              icon="pi pi-external-link"
                              class="w-full"
                              :severity="tier.isPopular ? 'warn' : 'primary'"
                              :aria-label="`Subscribe to ${tier.name} tier on Patreon for ${formatPrice(tier)}`"
                            />
                          </a>
                        </template>
                      </div>
                    </div>
                  </template>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile/Tablet: Horizontal Scroll Layout -->
        <div class="lg:hidden">
          <!-- Scroll Instructions -->
          <div class="text-center mb-4">
            <p
              class="text-sm text-muted flex items-center justify-center gap-2"
            >
              <i class="pi pi-arrow-right"></i>
              Swipe to view all tiers
              <i class="pi pi-arrow-left"></i>
            </p>
          </div>

          <!-- Scrollable Container -->
          <div class="tier-scroll-container">
            <div class="tier-scroll-content">
              <div
                v-for="tier in apiTiers"
                :key="`mobile-${tier.id}`"
                class="tier-scroll-item"
                :class="{ 'popular-tier': tier.isPopular }"
              >
                <Card
                  class="tier-card h-full"
                  :class="{ 'border-primary': tier.isPopular }"
                >
                  <!-- Same card content as desktop -->
                  <template #header>
                    <div class="tier-header p-4 pb-3 text-center">
                      <!-- Badge -->
                      <div v-if="tier.badge" class="mb-2">
                        <Badge
                          :value="tier.badge.text"
                          :severity="tier.badge.severity"
                          class="tier-badge text-xs"
                        />
                      </div>

                      <!-- Tier Name & Subtitle -->
                      <h3 class="tier-name text-lg font-bold mb-2">
                        {{ tier.name }}
                      </h3>
                      <p class="tier-subtitle text-xs text-muted mb-3">
                        {{ tier.subtitle }}
                      </p>

                      <!-- Price -->
                      <div class="tier-price mb-3">
                        <span class="price-amount text-2xl font-bold">
                          {{ formatPrice(tier) }}
                        </span>
                      </div>

                      <!-- Call Limit -->
                      <div class="call-limit text-xs">
                        <strong>{{
                          formatCallLimit(tier.monthlyCallLimit)
                        }}</strong>
                        <span class="text-muted"> calls/mo</span>
                      </div>
                    </div>
                  </template>

                  <template #content>
                    <div class="tier-content p-4 pt-0">
                      <!-- Compact Features List -->
                      <div class="features-section mb-4">
                        <h4
                          class="features-title text-xs font-semibold mb-2 text-muted uppercase tracking-wide"
                        >
                          Included
                        </h4>
                        <ul class="features-list space-y-1">
                          <li
                            v-for="feature in getTierFeatures(tier).slice(0, 4)"
                            :key="feature.id"
                            class="feature-item flex items-center gap-2 text-xs"
                          >
                            <i
                              class="pi pi-check text-green-500 text-xs flex-shrink-0"
                            ></i>
                            <span class="feature-name">{{ feature.name }}</span>
                          </li>
                          <li
                            v-if="getTierFeatures(tier).length > 4"
                            class="text-xs text-muted"
                          >
                            +{{ getTierFeatures(tier).length - 4 }} more
                            features
                          </li>
                        </ul>
                      </div>

                      <!-- Special Note (if applicable) -->
                      <div v-if="tier.specialNote" class="special-note mb-3">
                        <div
                          class="text-xs p-2 bg-blue-50 border border-blue-200 rounded text-blue-700"
                        >
                          <i class="pi pi-info-circle mr-1"></i>
                          {{ tier.specialNote.text }}
                        </div>
                      </div>

                      <!-- CTA Button -->
                      <div class="tier-cta">
                        <template
                          v-if="tier.id === 'free' || tier.id === 'academic'"
                        >
                          <NuxtLink to="/key">
                            <Button
                              label="Get Key"
                              icon="pi pi-key"
                              class="w-full"
                              severity="secondary"
                              size="small"
                              :aria-label="`Get free API key for ${tier.name} tier`"
                            />
                          </NuxtLink>
                        </template>

                        <template v-else>
                          <a
                            :href="tier.patreonUrl"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="block"
                          >
                            <Button
                              :label="`${formatPrice(tier)}`"
                              icon="pi pi-external-link"
                              class="w-full"
                              :severity="tier.isPopular ? 'warn' : 'primary'"
                              size="small"
                              :aria-label="`Subscribe to ${tier.name} tier on Patreon for ${formatPrice(tier)}`"
                            />
                          </a>
                        </template>
                      </div>
                    </div>
                  </template>
                </Card>
              </div>
            </div>
          </div>

          <!-- Scroll Indicators -->
          <div class="flex justify-center mt-4 gap-2">
            <button
              v-for="(tier, index) in apiTiers"
              :key="`indicator-${tier.id}`"
              class="scroll-indicator"
              :class="{ active: index === activeIndicator }"
              @click="scrollToTier(index)"
              :aria-label="`View ${tier.name} tier`"
            ></button>
          </div>
        </div>
      </div>
    </section>
    <!-- Feature Comparison Table (Desktop) -->
    <section class="feature-table-section mb-8 hidden lg:block">
      <div class="max-w-7xl mx-auto px-4">
        <Card>
          <template #header>
            <div class="p-6 pb-4">
              <h2 class="text-2xl font-bold mb-2">
                Detailed Feature Comparison
              </h2>
              <p class="text-muted">
                Complete breakdown of features available in each tier
              </p>
            </div>
          </template>

          <template #content>
            <div class="p-6 pt-0">
              <DataTable
                :value="availableFeatures"
                responsiveLayout="scroll"
                class="feature-comparison-table"
              >
                <Column
                  field="name"
                  header="Feature"
                  class="font-medium"
                  headerClass="text-left"
                  bodyClass="text-left"
                >
                  <template #body="{ data }">
                    <div>
                      <div class="font-medium">{{ data.name }}</div>
                      <div
                        v-if="data.description"
                        class="text-xs text-muted mt-1"
                      >
                        {{ data.description }}
                      </div>
                    </div>
                  </template>
                </Column>

                <Column
                  v-for="tier in apiTiers.slice(0, 8)"
                  :key="tier.id"
                  :header="tier.name"
                  headerClass="text-center"
                  bodyClass="text-center"
                >
                  <template #body="{ data }">
                    <i
                      v-if="tier.features.includes(data.id)"
                      class="pi pi-check-circle feature-included"
                      :aria-label="'Included'"
                    ></i>
                    <i
                      v-else
                      class="pi pi-times-circle feature-not-included"
                      :aria-label="'Not included'"
                    ></i>
                  </template>
                </Column>
              </DataTable>
            </div>
          </template>
        </Card>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section mb-8">
      <div class="max-w-4xl mx-auto px-4">
        <Card>
          <template #header>
            <div class="p-6 pb-4 text-center">
              <h2 class="text-2xl font-bold mb-2">
                Frequently Asked Questions
              </h2>
              <p class="text-muted">
                Common questions about CFBD API access tiers
              </p>
            </div>
          </template>

          <template #content>
            <div class="p-6 pt-0">
              <Accordion>
                <AccordionTab
                  header="What happens if I exceed my monthly call limit?"
                >
                  <p class="text-sm leading-relaxed">
                    If you exceed your monthly call limit, your API key will be
                    temporarily disabled until the next month. You can upgrade
                    to a higher tier at any time to increase your limit
                    immediately.
                  </p>
                </AccordionTab>

                <AccordionTab header="Can I change tiers anytime?">
                  <p class="text-sm leading-relaxed">
                    Yes! You can upgrade your Patreon subscription at any time.
                    Changes take effect immediately, and your new call limits
                    will be available within a few minutes. Downgrades will take
                    effect at the start of the next billing cycle.
                  </p>
                </AccordionTab>

                <AccordionTab
                  header="What's the difference between REST API and GraphQL?"
                >
                  <p class="text-sm leading-relaxed">
                    The REST API provides traditional endpoint-based access to
                    our data. GraphQL (available in Tier 3+) allows you to
                    request exactly the data you need in a single query and
                    includes real-time subscriptions for live game data.
                  </p>
                </AccordionTab>

                <AccordionTab header="Do you offer academic discounts?">
                  <p class="text-sm leading-relaxed">
                    Yes! We offer a special Academic tier with increased limits
                    at no cost for verified students and researchers. Register
                    with your .edu email address to get started.
                  </p>
                </AccordionTab>
              </Accordion>
            </div>
          </template>
        </Card>
      </div>
    </section>

    <!-- Bottom CTA -->
    <section class="bottom-cta text-center mb-8">
      <div class="max-w-2xl mx-auto px-4">
        <Card class="border-primary">
          <template #content>
            <div class="p-6">
              <h3 class="text-xl font-bold mb-2">Ready to Get Started?</h3>
              <p class="text-muted mb-4">
                Start with our free tier and upgrade as your needs grow.
              </p>
              <div class="flex flex-col sm:flex-row gap-3 justify-center">
                <NuxtLink to="/key">
                  <Button
                    label="Get Free API Key"
                    icon="pi pi-key"
                    class="w-full sm:w-auto"
                    severity="primary"
                  />
                </NuxtLink>
                <a
                  href="https://api.collegefootballdata.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    label="View Documentation"
                    icon="pi pi-book"
                    class="w-full sm:w-auto"
                    severity="secondary"
                  />
                </a>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </section>
  </div>
</template>

<style scoped>
/**
 * Design System & Layout Considerations:
 * - Mobile-first responsive grid that adapts from 1 to 4 columns
 * - Consistent card heights using flexbox
 * - Color-coded tier badges for quick identification
 * - Popular tier gets visual emphasis with border highlighting
 * - Feature lists use semantic HTML for accessibility
 */

.api-tiers-page {
  max-width: 100%;
  margin: 0 auto;
  padding: 2rem 0;
}

.page-header {
  margin-bottom: 3rem;
}

.tier-card-wrapper {
  position: relative;
}

.tier-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.tier-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.popular-tier .tier-card {
  border: 2px solid var(--p-primary-color);
  position: relative;
}

.popular-tier::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(
    45deg,
    var(--p-primary-color),
    var(--p-primary-300)
  );
  border-radius: 0.5rem;
  z-index: -1;
}

.tier-header {
  text-align: center;
}

.tier-badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
}

.tier-name {
  color: var(--p-text-color);
}

.tier-subtitle {
  color: var(--p-text-muted-color);
}

.price-amount {
  color: var(--p-primary-color);
}

.call-limit {
  color: var(--p-text-muted-color);
}

.tier-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.features-section {
  flex: 1;
}

.features-title {
  color: var(--p-text-muted-color);
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-item {
  padding: 0.25rem 0;
}

.feature-name {
  color: var(--p-text-color);
}

.feature-description {
  color: var(--p-text-muted-color);
}

.tier-cta {
  margin-top: auto;
}

.special-note {
  font-size: 0.75rem;
}

.special-note :deep(.p-message) {
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
}

.special-note :deep(.p-message-text) {
  display: flex;
  align-items: center;
}

.feature-comparison-table {
  font-size: 0.875rem;
}

.feature-comparison-table :deep(.p-datatable-thead) {
  background: var(--p-content-background);
}

.feature-comparison-table :deep(.p-datatable-thead > tr > th) {
  border-bottom: 2px solid var(--p-surface-200);
  font-weight: 600;
  padding: 1rem 0.75rem;
}

.feature-comparison-table :deep(.p-datatable-tbody > tr > td) {
  padding: 0.75rem;
  border-bottom: 1px solid var(--p-surface-100);
}

/* Fix PrimeVue header flex layout for center alignment */
.feature-comparison-table :deep(.p-datatable-column-header-content) {
  display: block !important;
  text-align: inherit;
}

/* Center align tier column headers */
.feature-comparison-table
  :deep(.p-datatable-thead > tr > th:not(:first-child)) {
  text-align: center !important;
}

/* Keep Feature column header left-aligned */
.feature-comparison-table :deep(.p-datatable-thead > tr > th:first-child) {
  text-align: left !important;
}

/* Simple icon styling without complex alignment */
.feature-included {
  color: #10b981;
  font-size: 1.125rem;
  transition: all 0.2s ease;
}

.feature-included:hover {
  color: #059669;
  transform: scale(1.1);
}

.feature-not-included {
  color: #9ca3af;
  font-size: 1rem;
  opacity: 0.6;
  transition: all 0.2s ease;
}

.feature-not-included:hover {
  opacity: 0.8;
}

/* Dark mode adjustments */
.dark-mode .feature-included {
  color: #34d399;
}

.dark-mode .feature-included:hover {
  color: #10b981;
}

.dark-mode .feature-not-included {
  color: #6b7280;
}

.feature-comparison-table :deep(.p-datatable-thead) {
  background: var(--p-content-background);
}

.feature-comparison-table :deep(.p-datatable-thead > tr > th) {
  border-bottom: 2px solid var(--p-surface-200);
  font-weight: 600;
  padding: 1rem 0.75rem;
}

.feature-comparison-table :deep(.p-datatable-tbody > tr > td) {
  padding: 0.75rem;
  border-bottom: 1px solid var(--p-surface-100);
}

/* Force center alignment for tier column headers */
.feature-comparison-table
  :deep(.p-datatable-thead > tr > th:not(:first-child)) {
  text-align: center !important;
}

/* Keep first column (Feature) left-aligned */
.feature-comparison-table :deep(.p-datatable-thead > tr > th:first-child) {
  text-align: left !important;
}

/* Force center alignment for tier column cells */
.feature-comparison-table
  :deep(.p-datatable-tbody > tr > td:not(:first-child)) {
  text-align: center !important;
}

/* Enhanced feature comparison icons */
.feature-included,
.feature-not-included {
  display: block;
  width: 100%;
  text-align: center;
  transition: all 0.2s ease;
}

.feature-included {
  color: #10b981; /* Green-500 */
  font-size: 1.125rem;
}

.feature-included:hover {
  color: #059669; /* Green-600 */
  transform: scale(1.1);
}

.feature-not-included {
  color: #9ca3af; /* Gray-400 */
  font-size: 1rem;
  opacity: 0.6;
}

.feature-not-included:hover {
  opacity: 0.8;
}

/* Force complete center alignment for all tier columns */
.feature-comparison-table
  :deep(.p-datatable-tbody > tr > td:not(:first-child)) {
  text-align: center !important;
  vertical-align: middle !important;
  padding: 0.75rem 0.5rem !important;
}

.feature-comparison-table
  :deep(.p-datatable-thead > tr > th:not(:first-child)) {
  text-align: center !important;
  vertical-align: middle !important;
}

/* Dark mode adjustments for feature icons */
.dark-mode .feature-included {
  color: #34d399; /* Green-400 for dark mode */
}

.dark-mode .feature-included:hover {
  color: #10b981; /* Green-500 for dark mode hover */
}

.dark-mode .feature-not-included {
  color: #6b7280; /* Gray-500 for dark mode */
}

.bottom-cta .p-card {
  background: linear-gradient(
    135deg,
    var(--p-primary-50),
    var(--p-primary-100)
  );
}

/* Desktop horizontal scroll implementation */
.tier-scroll-container-desktop {
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: thin; /* Firefox - show thin scrollbar */
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  padding-bottom: 1rem; /* Space for scrollbar */
}

.tier-scroll-container-desktop::-webkit-scrollbar {
  height: 8px; /* Chrome/Safari - show thin scrollbar */
}

.tier-scroll-container-desktop::-webkit-scrollbar-track {
  background: var(--p-surface-100);
  border-radius: 4px;
}

.tier-scroll-container-desktop::-webkit-scrollbar-thumb {
  background: var(--p-surface-400);
  border-radius: 4px;
}

.tier-scroll-container-desktop::-webkit-scrollbar-thumb:hover {
  background: var(--p-surface-500);
}

.tier-scroll-content-desktop {
  display: flex;
  gap: 1.5rem;
  padding: 0 2rem;
  min-width: min-content;
}

.tier-scroll-item-desktop {
  flex: 0 0 400px; /* Fixed width for desktop cards */
  scroll-snap-align: start;
  scroll-snap-stop: normal;
}

.tier-scroll-item-desktop .tier-card {
  height: 500px; /* Taller for desktop to accommodate more content */
  display: flex;
  flex-direction: column;
}

/* Force PrimeVue Card internal structure to be flex */
.tier-scroll-item-desktop .tier-card :deep(.p-card) {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tier-scroll-item-desktop .tier-card :deep(.p-card-body) {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
}

.tier-scroll-item-desktop .tier-card :deep(.p-card-content) {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
}

.tier-scroll-item-desktop .tier-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0; /* Ensure flex children can shrink */
}

.tier-scroll-item-desktop .features-section {
  flex: 1;
  min-height: 0; /* Allow content to be flexible */
}

.tier-scroll-item-desktop .tier-cta {
  margin-top: auto;
  flex-shrink: 0; /* Prevent button area from shrinking */
}

.tier-scroll-item-desktop .special-note {
  flex-shrink: 0; /* Keep special notes at consistent size */
  margin-bottom: 1rem;
}

/* Popular tier styling for desktop scroll version */
.tier-scroll-item-desktop.popular-tier .tier-card {
  border: 2px solid var(--p-primary-color);
  position: relative;
}

.tier-scroll-item-desktop.popular-tier::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(
    45deg,
    var(--p-primary-color),
    var(--p-primary-300)
  );
  border-radius: 0.5rem;
  z-index: -1;
}

/* Horizontal scroll implementation for mobile/tablet */
.tier-scroll-container {
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch; /* iOS momentum scrolling */
}

.tier-scroll-container::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

.tier-scroll-content {
  display: flex;
  gap: 1rem;
  padding: 0 1rem;
  min-width: min-content;
}

.tier-scroll-item {
  flex: 0 0 280px; /* Fixed width for consistent cards */
  scroll-snap-align: center;
  scroll-snap-stop: always;
}

.tier-scroll-item .tier-card {
  height: 400px; /* Fixed height for mobile */
  display: flex;
  flex-direction: column;
}

/* Force PrimeVue Card internal structure to be flex for mobile */
.tier-scroll-item .tier-card :deep(.p-card) {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tier-scroll-item .tier-card :deep(.p-card-body) {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
}

.tier-scroll-item .tier-card :deep(.p-card-content) {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
}

.tier-scroll-item .tier-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0; /* Ensure flex children can shrink */
}

.tier-scroll-item .features-section {
  flex: 1;
  min-height: 0; /* Allow content to be flexible */
}

.tier-scroll-item .tier-cta {
  margin-top: auto;
  flex-shrink: 0; /* Prevent button area from shrinking */
}

.tier-scroll-item .special-note {
  flex-shrink: 0; /* Keep special notes at consistent size */
  margin-bottom: 1rem;
}

/* Scroll indicators */
.scroll-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--p-surface-400);
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.scroll-indicator.active {
  background: var(--p-primary-color);
}

/* Popular tier styling for scroll version */
.tier-scroll-item.popular-tier .tier-card {
  border: 2px solid var(--p-primary-color);
  position: relative;
}

.tier-scroll-item.popular-tier::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(
    45deg,
    var(--p-primary-color),
    var(--p-primary-300)
  );
  border-radius: 0.5rem;
  z-index: -1;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .tier-scroll-item {
    flex: 0 0 260px; /* Slightly smaller on very small screens */
  }

  .tier-scroll-item .tier-card {
    height: 380px;
  }

  .tier-scroll-content {
    padding: 0 0.5rem;
    gap: 0.75rem;
  }
}

@media (max-width: 480px) {
  .tier-scroll-item {
    flex: 0 0 240px; /* Even smaller for phones */
  }

  .tier-scroll-item .tier-card {
    height: 360px;
  }
}
@media (max-width: 768px) {
  .api-tiers-page {
    padding: 1rem 0;
  }

  .page-header {
    margin-bottom: 2rem;
  }

  .tier-card {
    margin-bottom: 1rem;
  }

  .grid {
    gap: 1rem;
  }
}

/* Dark mode considerations */
.dark-mode .tier-card:hover {
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.1);
}

.dark-mode .bottom-cta .p-card {
  background: linear-gradient(
    135deg,
    var(--p-primary-900),
    var(--p-primary-800)
  );
}

/**
 * Future Enhancement Opportunities:
 *
 * 1. Dynamic Tier Loading:
 *    - Move tier data to a composable or API endpoint
 *    - Allow for real-time pricing updates
 *    - A/B testing different tier structures
 *
 * 2. Interactive Features:
 *    - Tier recommendation quiz based on usage patterns
 *    - Cost calculator for estimated monthly usage
 *    - Feature filtering/search within the comparison table
 *
 * 3. Enhanced Analytics:
 *    - Track which tiers users view most
 *    - Monitor conversion rates from page to signup
 *    - Heat mapping for optimal CTA placement
 *
 * 4. Personalization:
 *    - Show current user's tier if logged in
 *    - Highlight upgrade path from current tier
 *    - Usage-based recommendations
 *
 * 5. Social Proof:
 *    - Testimonials for each tier
 *    - "X users currently on this tier"
 *    - Case studies for enterprise tier
 */
</style>
