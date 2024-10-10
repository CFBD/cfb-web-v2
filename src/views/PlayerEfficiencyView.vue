<template>
    <Card class="text-center m-3">
        <template #title>
            Player Efficiency
        </template>
        <template #subtitle>
            PPA and Usage
        </template>
        <template #content>
            <div class="formgrid grid justify-content-center">
                <div class="field col-12 sm:col-6 lg:col-3">
                    <label>Year</label>
                    <Dropdown :options="mainStore.yearRanges" v-model="year" class="w-full" @change="reloadData"></Dropdown>
                </div>
            </div>
            <div class="formgrid grid justify-content-center">
                <div class="field col-12 sm:col-6 lg:col-3">
                    <label>Position</label>
                    <Dropdown :options="positions" v-model="playerPosition" class="w-full" @change="reloadData"></Dropdown>
                </div>
                <div class="field col-12 sm:col-6 lg:col-3">
                    <label>Minimum Plays</label>
                    <InputNumber v-model="minimumPlays" :min="1" :max="1000" class="w-full"
                        @update:model-value="reloadData"></InputNumber>
                </div>
                <div class="field col-12 sm:col-6 lg:col-3">
                    <label>Conference</label>
                    <Dropdown :options="mainStore.fbsConferences" optionLabel="text" optionValue="value"
                        v-model="conference" class="w-full" @change="reloadData">
                    </Dropdown>
                </div>
            </div>
            <Divider></Divider>
            <div class="grid justify-content-center pt-5">
                <ProgressSpinner v-if="loading"></ProgressSpinner>
                <Chart v-else type="scatter" :data="scatterData" :options="scatterOptions" class="w-10">
                </Chart>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import Chart from 'primevue/chart';
import Divider from 'primevue/divider';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import ProgressSpinner from 'primevue/progressspinner';
import { onMounted, ref } from 'vue';

import { useMainStore } from '@/stores/main';
const mainStore = useMainStore();

import http from "@/helpers/http";

const positions = ref([
    'QB',
    'RB',
    'WR',
    'TE',
    'FB'
]);

const year = ref(mainStore.defaultYear);
const conference = ref("All");
const playerPosition = ref("QB");
const minimumPlays = ref(100);
const loading = ref(false);

const tooltips = ref([]);
const scatterData = ref([]);
const scatterOptions = ref({
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: 'Player Usage vs PPA'
        },
        tooltip: {
            callbacks: {
                label: function (context: { dataIndex: number, dataset: { labels: string[] } }) {
                    return context.dataset.labels[context.dataIndex];
                }
            }
        }
    },
    scales: {
        y: {
            title: {
                display: true,
                text: 'Usage'
            }
        },
        x: {
            title: {
                display: true,
                text: 'PPA/play'
            }
        }
    }
});

const reloadData = () => {
    loading.value = true
    http.get('/player/usage', {
        params: {
            year: year.value,
            conference: conference.value == 'All' ? '' : conference.value,
            position: playerPosition.value,
            excludeGarbageTime: true
        }
    }).then(usageResults => {
        http.get('/ppa/players/season', {
            params: {
                year: year.value,
                conference: conference.value == 'All' ? '' : conference.value,
                position: playerPosition.value,
                threshold: minimumPlays.value,
                excludeGarbageTime: true
            }
        }).then(ppaResults => {
            const usageData = usageResults.data;
            const ppaData = ppaResults.data;
            const playerData = usageData.map((r: { id: number, team: string, name: string, usage: { overall: number } }) => {
                let playerPPA = ppaData.find((p: { id: number }) => p.id == r.id);
                let team = mainStore.teams.find(t => t.classification == 'fbs' && t.school == r.team);

                if (!playerPPA || !team) {
                    return null;
                }

                return {
                    id: r.id,
                    name: r.name,
                    team: team,
                    usage: r.usage.overall,
                    ppa: playerPPA.averagePPA.all
                };
                // eslint-disable-next-line
                // @ts-ignore
            }).filter(p => p);

            tooltips.value = playerData.map((p: { name: string, team: { school: string } }) => `${p.name} (${p.team.school})`);

            scatterData.value = {
                // eslint-disable-next-line
                // @ts-ignore
                datasets: [{
                    labels: tooltips.value,
                    pointRadius: 5,
                    pointBorderWidth: 3,
                    pointBorderColor: playerData.map((r: { team: { color: string } }) => r
                        .team.color),
                    pointBackgroundColor: playerData.map((r: { team: { alt_color: string } }) => r.team.alt_color),
                    data: playerData.map((r: { ppa: number, usage: number }) => ({
                        x: r.ppa,
                        y: r.usage,
                        tooltips: tooltips.value
                    }))
                }]
            };

            loading.value = false;
        });
    });
}

onMounted(() => {
    reloadData();
});

</script>

<style scoped></style>