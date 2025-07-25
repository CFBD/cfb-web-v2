<template>
  <Card class="text-center m-3">
    <template #title> Predicted Win Probability </template>
    <template #subtitle>
      Select a game to generate predicted win probabilities.
    </template>
    <template #content>
      <GameSearch
        v-model="gameId"
        @selection="updateData"
        clear-on-selection
      ></GameSearch>
      <Divider></Divider>
      <h2>{{ formattedScore() }}</h2>
      <div v-if="gameId">
        <Button link @click="gotoBoxScore">View Advanced Box Score</Button>
      </div>
      <div class="grid justify-content-center pt-5">
        <Chart
          type="line"
          :options="chartOptions"
          :data="chartData"
          class="w-10"
        ></Chart>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
definePageMeta({
  validate: async (route) => {
    // Check if the id is made up of digits
    return (
      !route.params.gameId ||
      (typeof route.params.gameId === 'string' &&
        /^\d+$/.test(route.params.gameId))
    );
  },
});

const route = useRoute();
const config = useRuntimeConfig();

import GameSearch from '~/components/GameSearch.vue';

import { useMainStore } from '~/stores/main';
const mainStore = useMainStore();

const title = ref('');
const gameId: Ref<number | undefined> = ref(
  route.params.gameId ? Number(route.params.gameId) : undefined,
);
const plays: Ref<
  {
    home: string;
    homeId: number;
    homeScore: number;
    away: string;
    awayId: number;
    awayScore: number;
    playNumber: number;
    playText: string;
    homeWinProbability: number;
  }[]
> = ref([]);
const tooltips: Ref<string[]> = ref([]);
const chartData = ref({
  datasets: [],
});

const chartOptions = ref({
  plugins: {
    legend: {
      display: true,
    },
    title: {
      display: true,
      text: '',
    },
    tooltip: {
      callbacks: {
        label: function (context: {
          dataIndex: number;
          dataset: { labels: string[] };
        }) {
          return context.dataset.labels[context.dataIndex];
        },
      },
    },
  },
  scales: {
    y: {
      min: 0,
      max: 100,
      title: {
        display: true,
        text: 'Win Percentage',
      },
      grid: {
        color: mainStore.darkMode ? '#ffffff' : '#000000',
      },
    },
    x: {
      type: 'linear',
      ticks: {
        min: 0,
        max: 1,
        stepSize: 1,
      },
      grid: {
        color: mainStore.darkMode ? '#ffffff' : '#000000',
      },
      title: {
        display: true,
        text: 'Play Number',
      },
    },
  },
});

const formattedScore = () => {
  if (plays.value.length) {
    const last = plays.value[plays.value.length - 1];
    return `${last.home} ${last.homeScore}, ${last.away} ${last.awayScore}`;
  }

  return '';
};

const updateData = () => {
  loadChartData();
};

const loadChartData = () => {
  if (gameId.value) {
    $fetch<
      {
        home: string;
        homeId: number;
        homeScore: number;
        away: string;
        awayId: number;
        awayScore: number;
        playNumber: number;
        playText: string;
        homeWinProbability: number;
      }[]
    >('/metrics/wp', {
      method: 'GET',
      baseURL: config.public.apiBaseUrl,
      params: {
        gameId: gameId.value,
      },
    }).then((results) => {
      plays.value = results;

      if (plays.value && plays.value.length) {
        const home = plays.value[0].home;
        const away = plays.value[0].away;

        const homeTeam = mainStore.teams.find(
          (t) => t.id == plays.value[0].homeId,
        );
        const awayTeam = mainStore.teams.find(
          (t) => t.id == plays.value[0].awayId,
        );

        let last = plays.value[plays.value.length - 1];

        title.value = `${away} ${last.awayScore}, ${home} ${last.homeScore}`;
        // this.$ga.event('visualization', 'generation', 'wp-chart');
        chartOptions.value.plugins.title.text = `Predicted Win Probability`;

        let ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
        let gradient;

        if (ctx) {
          gradient = ctx.createLinearGradient(
            0,
            ctx.canvas.clientHeight * 0.0,
            0,
            ctx.canvas.clientHeight,
          );
          gradient.addColorStop(0.4, homeTeam?.color ?? '#000000');
          gradient.addColorStop(0.59, awayTeam?.color ?? '#ffffff');
        }

        tooltips.value = plays.value.map((p) => p.playText);

        chartData.value = {
          // @ts-ignore
          datasets: [
            {
              labels: tooltips.value,
              pointRadius: 0,
              pointHitRadius: 10,
              borderColor: gradient,
              fill: false,
              label: `${homeTeam?.school} %`,
              data: plays.value.map((r) => ({
                x: r.playNumber,
                y: r.homeWinProbability * 100,
                tooltips: tooltips.value,
              })),
            },
          ],
        };

        chartOptions.value = {
          plugins: {
            legend: {
              display: true,
            },
            title: {
              display: true,
              text: '',
            },
            tooltip: {
              callbacks: {
                label: function (context: {
                  dataIndex: number;
                  dataset: { labels: string[] };
                }) {
                  return context.dataset.labels[context.dataIndex];
                },
              },
            },
          },
          scales: {
            y: {
              min: 0,
              max: 100,
              title: {
                display: true,
                text: 'Win Percentage',
              },
              grid: {
                color: mainStore.darkMode ? '#888888' : '#aaaaaa',
              },
            },
            x: {
              type: 'linear',
              ticks: {
                min: 0,
                max: plays.value.length + 1,
                stepSize: 1,
              },
              grid: {
                color: mainStore.darkMode ? '#888888' : '#aaaaaa',
              },
              title: {
                display: true,
                text: 'Play Number',
              },
            },
          },
        };
      }
    });
  }
};

const gotoBoxScore = () => {
  navigateTo({
    path: `/boxscore/${gameId.value}`,
  });
};

onBeforeMount(async () => {
  if (gameId.value) {
    loadChartData();
  }
});
</script>

<style scoped></style>
