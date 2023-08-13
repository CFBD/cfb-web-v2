<template>
    <div>
        <div>
            <h4>Game Search</h4>
        </div>
        <div class="formgrid grid justify-content-center">
            <div class="field col">
                <label>Year</label>
                <Dropdown :options="mainStore.yearRanges" v-model="selectedYear" class="w-full"></Dropdown>
            </div>
            <div class="field col">
                <label>Week</label>
                <InputNumber v-model="selectedWeek" class="w-full"></InputNumber>
            </div>
            <div class="field col-3">
                <label>Team</label>
                <Dropdown :options="mainStore.teams" v-model="selectedTeam" option-label="school" option-value="school"
                    placeholder="Select a team..." filter show-clear class="w-full"></Dropdown>
            </div>
            <div class="field col">
                <label>Conference</label>
                <Dropdown v-model="selectedConference" :options="mainStore.fbsConferences" optionLabel="text"
                    optionValue="value" class="w-full">
                </Dropdown>
            </div>
            <div class="field col">
                <label>Season Type</label>
                <Dropdown v-model="selectedSeasonType" :options="mainStore.seasonTypes" optionLabel="text"
                    optionValue="value" class="w-full">
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
            <Button class="game-selector-link" @click="selectGame(game)" link>{{ game.homeTeam }} {{ game.homeScore }}, {{
                game.awayTeam }} {{ game.awayScore
    }}</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';

import { ref, type Ref } from 'vue';

import http from "@/helpers/http";

import { useMainStore } from '@/stores/main';
const mainStore = useMainStore();

const props = defineProps({
    modelValue: Number,
    clearOnSelection: Boolean,
    onlyCompleted: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(["update:modelValue", "selection"]);

const selectedYear = ref(mainStore.defaultYear);
const selectedWeek = ref(1);
const selectedTeam = ref();
const selectedConference = ref("All");
const selectedSeasonType = ref("regular");
const games: Ref<{ id: number, homeTeam: string, homeScore: number, awayTeam: string, awayScore: number }[]> = ref([]);

const searchGames = () => {
    http.get('/games', {
        params: {
            year: selectedYear.value,
            week: selectedWeek.value,
            seasonType: selectedSeasonType.value,
            conference: selectedConference.value === 'All' ? null : selectedConference.value,
            team: selectedTeam.value,
            division: "fbs"
        }
    }).then(result => {
        games.value = result.data.map((r: { id: number, home_team: string, home_points: number, away_team: string, away_points: number }) => ({
            id: r.id,
            homeTeam: r.home_team,
            homeScore: r.home_points,
            awayTeam: r.away_team,
            awayScore: r.away_points
        })).filter((g: { homeScore: number | null | undefined, awayScore: number | null | undefined }) => !props.onlyCompleted || g.homeScore || g.awayScore);
    });
}

const selectGame = (game: { id: number }) => {
    emit("update:modelValue", game.id);
    emit("selection", game);
    if (props.clearOnSelection) {
        games.value = [];
    }
}

</script>

<style scoped></style>