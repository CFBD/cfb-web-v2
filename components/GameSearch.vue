<template>
  <div>
    <div>
      <h4>Game Search</h4>
    </div>
    <div class="formgrid grid justify-content-center">
      <div class="field col">
        <label>Year</label>
        <Dropdown
          :options="mainStore.yearRanges"
          v-model="selectedYear"
          class="w-full"
        ></Dropdown>
      </div>
      <div class="field col">
        <label>Week</label>
        <InputNumber v-model="selectedWeek" class="w-full"></InputNumber>
      </div>
      <div class="field col-3">
        <label>Team</label>
        <Dropdown
          :options="mainStore.teams"
          v-model="selectedTeam"
          option-label="school"
          option-value="school"
          placeholder="Select a team..."
          filter
          show-clear
          class="w-full"
        ></Dropdown>
      </div>
      <div class="field col">
        <label>Conference</label>
        <Dropdown
          v-model="selectedConference"
          :options="mainStore.fbsConferences"
          optionLabel="text"
          optionValue="value"
          class="w-full"
        >
        </Dropdown>
      </div>
      <div class="field col">
        <label>Season Type</label>
        <Dropdown
          v-model="selectedSeasonType"
          :options="mainStore.seasonTypes"
          optionLabel="text"
          optionValue="value"
          class="w-full"
        >
        </Dropdown>
      </div>
    </div>
    <div class="grid justify-content-center">
      <div class="col">
        <Button label="Search" @click="searchGames"></Button>
      </div>
    </div>
  </div>
  <Divider v-if="games.length > 0"></Divider>
  <div class="grid">
    <div v-for="game in games" :key="game.id" class="col-3">
      <Button class="game-selector-link" @click="selectGame(game)" link
        >{{ game.homeTeam }} {{ game.homeScore }}, {{ game.awayTeam }}
        {{ game.awayScore }}</Button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

import { useMainStore } from '~/stores/main';
const mainStore = useMainStore();

const props = defineProps({
  modelValue: Number,
  clearOnSelection: Boolean,
  onlyCompleted: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['update:modelValue', 'selection']);

const selectedYear = ref(mainStore.defaultYear);
const selectedWeek = ref(1);
const selectedTeam = ref();
const selectedConference = ref('All');
const selectedSeasonType = ref('regular');
const games: Ref<
  {
    id: number;
    homeTeam: string;
    homeScore: number;
    awayTeam: string;
    awayScore: number;
  }[]
> = ref([]);

const searchGames = () => {
  $fetch<
    {
      id: number;
      homeTeam: string;
      homePoints: number;
      awayTeam: string;
      awayPoints: number;
    }[]
  >('/games', {
    method: 'GET',
    baseURL: config.public.apiBaseUrl,
    params: {
      year: selectedYear.value ?? undefined,
      week: selectedWeek.value ?? undefined,
      seasonType: selectedSeasonType.value ?? undefined,
      conference:
        selectedConference.value === 'All'
          ? undefined
          : selectedConference.value,
      team: selectedTeam.value,
      classification: 'fbs',
    },
  }).then((result) => {
    games.value = result
      .map((r) => ({
        id: r.id,
        homeTeam: r.homeTeam,
        homeScore: r.homePoints,
        awayTeam: r.awayTeam,
        awayScore: r.awayPoints,
      }))
      .filter(
        (g: {
          homeScore: number | null | undefined;
          awayScore: number | null | undefined;
        }) => !props.onlyCompleted || g.homeScore || g.awayScore,
      );
  });
};

const selectGame = (game: { id: number }) => {
  emit('update:modelValue', game.id);
  emit('selection', game);
  if (props.clearOnSelection) {
    games.value = [];
  }
};
</script>

<style scoped></style>
