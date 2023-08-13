<template>
    <Card class="text-center m-3">
        <template #title>
            Predicted Win Probability
        </template>
        <template #subtitle>
            Select a game to generate predicted win probabilities.
        </template>
        <template #content>
            <GameSearch v-model="gameId" @selection="updateData"></GameSearch>
            <Divider></Divider>
            <div class="grid justify-content-center pt-5">
                <Chart type="line" :options="chartOptions" :data="chartData" class="w-10"></Chart>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from 'vue';
import { onBeforeRouteUpdate, useRouter } from 'vue-router';

import Card from 'primevue/card';
import Chart from 'primevue/chart';
import Divider from 'primevue/divider';

import GameSearch from '@/components/GameSearch.vue';

import http from "@/helpers/http";

import { useMainStore } from '@/stores/main';
const mainStore = useMainStore();

const router = useRouter();

const title = ref("");
const gameId: Ref<number | undefined> = ref();
const plays: Ref<{ home: string, homeId: number, homeScore: number, away: string, awayId: number, awayScore: number, playNumber: number, playText: string, homeWinProb: number }[]> = ref([]);
const tooltips: Ref<string[]> = ref([]);
const chartData = ref({
    datasets: []
});

const chartOptions = ref({
    plugins: {
        legend: {
            display: true
        },
        title: {
            display: true,
            text: ''
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
            ticks: {
                min: 0,
                max: 100
            },
            title: {
                display: true,
                text: 'Win Percentage'
            },
        },
        x: {
            type: 'linear',
            ticks: {
                min: 0,
                max: 1,
                stepSize: 1,
            },
            title: {
                display: true,
                text: 'Play Number'
            }
        }
    },
});

const updateData = (game: { id: number }) => {
    router.push({ name: "wp", params: { id: game.id } });
    loadChartData();
};

const loadChartData = () => {
    if (gameId.value) {
        http.get('/metrics/wp', {
            params: {
                gameId: gameId.value
            }
        }).then(results => {
            plays.value = results.data;

            if (plays.value && plays.value.length) {
                const home = plays.value[0].home;
                const away = plays.value[0].away;

                const homeTeam = mainStore.teams.find(t => t.id == plays.value[0].homeId);
                const awayTeam = mainStore.teams.find(t => t.id == plays.value[0].awayId);

                let last = plays.value[plays.value.length - 1];

                title.value = `${away} ${last.awayScore}, ${home} ${last.homeScore}`;
                // this.$ga.event('visualization', 'generation', 'wp-chart');
                chartOptions.value.plugins.title.text = `Predicted Win Probability`;

                let ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
                let gradient;

                if (ctx) {
                    gradient = ctx.createLinearGradient(0, (ctx.canvas.clientHeight * .0), 0, (ctx.canvas
                        .clientHeight));
                    gradient.addColorStop(.4, homeTeam?.color ?? "#000000");
                    gradient.addColorStop(.59, awayTeam?.color ?? "#ffffff");
                }

                tooltips.value = plays.value.map(p => p.playText);

                chartData.value = {
                    // eslint-disable-next-line
                    // @ts-ignore
                    datasets: [{
                        labels: tooltips.value,
                        pointRadius: 0,
                        pointHitRadius: 10,
                        borderColor: gradient,
                        fill: false,
                        label: `${homeTeam?.school} %`,
                        data: plays.value.map(r => ({
                            x: r.playNumber,
                            y: r.homeWinProb * 100,
                            tooltips: tooltips.value
                        }))
                    }]
                };

                chartOptions.value = {
                    plugins: {
                        legend: {
                            display: true
                        },
                        title: {
                            display: true,
                            text: ''
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
                            ticks: {
                                min: 0,
                                max: 100
                            },
                            title: {
                                display: true,
                                text: 'Win Percentage'
                            }
                        },
                        x: {
                            type: 'linear',
                            ticks: {
                                min: 0,
                                max: (plays.value.length + 1),
                                stepSize: 1
                            },
                            title: {
                                display: true,
                                text: 'Play Number'
                            }
                        }
                    }
                };
            }
        });
    }
}

onBeforeMount(async () => {
    if (router.currentRoute.value.params.id) {
        // eslint-disable-next-line
        // @ts-ignore
        gameId.value = router.currentRoute.value.params.id;

        if (mainStore.teams.length === 0) {
            await mainStore.loadTeams();
        }
        loadChartData();
    }
});

onBeforeRouteUpdate((to) => {
    // eslint-disable-next-line
    // @ts-ignore
    if (to.name === "wp" && to.params.id && to.params.id != gameId.value) {
        // eslint-disable-next-line
        // @ts-ignore
        gameId.value = to.params.id;
        loadChartData();
    }
})

</script>

<style scoped></style>