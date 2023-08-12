<template>
    <Card class="text-center m-2">
        <template #title>
            QB Passing Trends
        </template>
        <template #subtitle>
            Select a QB to start generating passing efficiency charts
        </template>
        <template #content>
            <div class="formgrid grid justify-content-center">
                <div class="field col-12 sm:col-6 lg:col-3">
                    <label>Year</label>
                    <Dropdown v-model="year" :options="mainStore.yearRanges" class="w-full" @change="resetData"></Dropdown>
                </div>
                <div class="field col-12 sm:col-6 lg:col-3">
                    <label>Rolling Plays</label>
                    <InputNumber v-model="rollingPlays" :min="5" :max="500" class="w-full"
                        @update:model-value="updateRollingPlays">
                    </InputNumber>
                </div>
            </div>
            <div class="formgrid grid justify-content-center">
                <div class="field col-12 sm:col-6 lg:col-3">
                    <label>Add a player</label>
                    <PlayerSearch position="QB" :year="year" @selection="addPlayer" show-team clear-on-selection>
                    </PlayerSearch>
                </div>
            </div>
            <div class="flex flex-wrap gap-2">
                <Chip v-for="player in players" :key="player.id" :label="player.displayName" removable
                    @remove="removePlayer(player)"></Chip>
            </div>
            <Divider></Divider>
            <div class="grid justify-content-center pt-5">
                <Chart type="line" :data="chartData" :options="chartOptions" class="w-10"></Chart>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import Chart from 'primevue/chart';
import Chip from 'primevue/chip';
import Divider from 'primevue/divider';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import PlayerSearch from '@/components/PlayerSearch.vue';

import { ref, type Ref } from 'vue';

import http from '@/helpers/http';

import { useMainStore } from '@/stores/main';
const mainStore = useMainStore();

const year = ref(mainStore.defaultYear);
const rollingPlays: Ref<number | null> = ref(null);
const players: Ref<{ id: number, displayName: string, teamColor: string }[]> = ref([]);

const lineStyles = [
    [],
    [5],
    [5, 3],
    [5, 5, 10],
    [5, 10],
    [10, 5],
    [5, 1, 5],
    [10, 5, 10],
    [10, 1, 10],
    [5, 10, 5],
    [5, 10, 10],
    [5, 10, 15]
];
const chartData = ref({
    datasets: []
});
const chartOptions = ref({
    plugins: {
        options: {
            title: {
                display: true,
                text: 'Cumulative Mean Passing PPA'
            },
        }
    },
    scales: {
        y: {
            title: {
                display: true,
                text: 'Cumulative Average PPA'
            }
        },
        x: {
            type: 'linear',
            ticks: {
                min: 0,
                stepSize: 1
            },
            title: {
                display: true,
                text: 'Dropback Number'
            }
        }
    }
});

const loadPlayer = (player: { id: number, displayName: string, teamColor: string }) => {
    http.get('/player/ppa/passing', {
        params: {
            id: player.id,
            rollingPlays: rollingPlays.value,
            year: year.value
        }
    }).then(results => {
        let data = Object.assign({}, chartData.value);
        // eslint-disable-next-line
        // @ts-ignore
        data.datasets.push({
            pointRadius: 0,
            borderDash: lineStyles[players.value.indexOf(player) % 12],
            borderColor: player.teamColor,
            fill: false,
            label: player.displayName,
            data: results.data.map((r: { playNumber: number, avgPPA: number }) => ({
                x: r.playNumber,
                y: r.avgPPA
            }))
        });

        chartData.value = data;
    });
};

const addPlayer = (player: { id: number, displayName: string, teamColor: string }) => {
    if (!players.value.find(p => p.id == player.id)) {
        players.value.push(player);
        loadPlayer(player);
    }
};

const removePlayer = (player: { id: number, displayName: string, teamColor: string }) => {
    let data = Object.assign({}, chartData.value);
    data.datasets = data.datasets.filter((d: { label: string }) => d.label != player.displayName);
    players.value = players.value.filter(p => p.id != player.id);

    for (let i = 0; i < players.value.length; i++) {
        // eslint-disable-next-line
        // @ts-ignore
        data.datasets[i].borderDash = lineStyles[i];
    }
    chartData.value = data;
};

const updateRollingPlays = () => {
    chartData.value.datasets = [];

    for (let player of players.value) {
        loadPlayer(player);
    }
};

const resetData = () => {
    chartData.value = { datasets: [] };
    players.value = [];
};
</script>

<style scoped></style>