<template>
  <Card class="text-center m-3">
    <template #title> Historical Matchups </template>
    <template #subtitle>
      Select two teams to get matchup results and history
    </template>
    <template #content>
      <div class="formgrid grid justify-content-center">
        <div class="field col-12 sm:col-6 lg:col-3">
          <label>Team 1</label>
          <Dropdown
            :options="
              mainStore.teams.filter(
                (t) => t.classification == 'fbs' || t.classification == 'fcs',
              )
            "
            v-model="team1"
            option-label="school"
            placeholder="Select a team..."
            filter
            show-clear
            class="w-full"
            @change="getMatchup"
          ></Dropdown>
        </div>
        <div class="field col-12 sm:col-6 lg:col-3">
          <label>Team 2</label>
          <Dropdown
            :options="
              mainStore.teams.filter(
                (t) => t.classification == 'fbs' || t.classification == 'fcs',
              )
            "
            v-model="team2"
            option-label="school"
            placeholder="Select a team..."
            filter
            show-clear
            class="w-full"
            @change="getMatchup"
          ></Dropdown>
        </div>
      </div>
      <div class="formgrid grid justify-content-center">
        <div class="field col-12 sm:col-6 lg:col-3">
          <label>Start Year (optional)</label>
          <InputNumber
            v-model="startYear"
            :min="1869"
            :max="2050"
            :use-grouping="false"
            placeholder="Pick a start year..."
            class="w-full"
            @update:model-value="getMatchup"
          ></InputNumber>
        </div>
        <div class="field col-12 sm:col-6 lg:col-3">
          <label>End Year (optional)</label>
          <InputNumber
            v-model="endYear"
            :min="1869"
            :max="2050"
            :use-grouping="false"
            placeholder="Pick an end year..."
            class="w-full"
            @update:model-value="getMatchup"
          ></InputNumber>
        </div>
      </div>
      <Divider></Divider>
      <div v-if="matchupData" class="grid justify-content-center m-6">
        <div class="col-12 lg:col-3">
          <img
            :src="`https://cdn.collegefootballdata.com/logos/256/${team1.id}.png`"
            class="matchup-logo"
          />
          <h2 :style="{ color: team1.color }">{{ team1.school }}</h2>
        </div>
        <div class="col-12 lg:col-2">
          <h1 class="text-center">
            <strong class="text-6xl">
              <span :style="{ color: team1.color }">{{
                matchupData.team1Wins
              }}</span
              ><span>-</span><span class="text-500">{{ matchupData.ties }}</span
              ><span>-</span
              ><span :style="{ color: team2.color }">{{
                matchupData.team2Wins
              }}</span>
            </strong>
          </h1>
        </div>
        <div class="col-12 lg:col-3">
          <img
            :src="`https://cdn.collegefootballdata.com/logos/256/${team2.id}.png`"
            class="matchup-logo"
          />
          <h2 :style="{ color: team2.color }">{{ team2.school }}</h2>
        </div>
      </div>
      <Divider></Divider>
      <div v-if="games && games.length" class="grid m-3">
        <div class="col-12 md:col-6">
          <DataTable
            :value="games"
            paginator
            :rows="10"
            class="p-datatable-small w-10"
          >
            <Column field="date" header="Date">
              <template #body="slotProps">
                {{ new Date(slotProps.data.date).toDateString() }}
              </template>
            </Column>
            <Column field="homeTeam" header="Home">
              <template #body="slotProps">
                <div
                  :class="
                    slotProps.data.winner == slotProps.data.homeTeam
                      ? 'winner-cell'
                      : ''
                  "
                >
                  {{ slotProps.data.homeTeam }}
                </div>
              </template>
            </Column>
            <Column field="homeScore" header="Points">
              <template #body="slotProps">
                <div
                  :class="
                    slotProps.data.winner == slotProps.data.homeTeam
                      ? 'winner-cell'
                      : ''
                  "
                >
                  {{ slotProps.data.homeScore }}
                </div>
              </template>
            </Column>
            <Column field="awayTeam" header="Away">
              <template #body="slotProps">
                <div
                  :class="
                    slotProps.data.winner == slotProps.data.awayTeam
                      ? 'winner-cell'
                      : ''
                  "
                >
                  {{ slotProps.data.awayTeam }}
                </div>
              </template>
            </Column>
            <Column field="awayScore" header="Points">
              <template #body="slotProps">
                <div
                  :class="
                    slotProps.data.winner == slotProps.data.awayTeam
                      ? 'winner-cell'
                      : ''
                  "
                >
                  {{ slotProps.data.awayScore }}
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
        <div class="col-12 md:col-6">
          <Chart
            type="scatter"
            :data="scatterData"
            :options="scatterOptions"
            class="w-10"
          ></Chart>
        </div>
        <div class="col-12 md:col-6">
          <Chart
            type="line"
            :data="lineData"
            :options="lineOptions"
            class="w-10"
          ></Chart>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

import { useMainStore } from '~/stores/main';
const mainStore = useMainStore();

const team1 = ref();
const team2 = ref();
const startYear = ref();
const endYear = ref();
const matchupData = ref();
const games = ref([]);
const scatterData = ref();
const lineData = ref();

const scatterOptions = ref({
  responsive: true,
  aspectRatio: 1,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: '',
    },
  },
  scales: {
    y: {
      max: 100,
      title: {
        display: true,
        text: 'Team 2 Points',
      },
    },
    x: {
      max: 100,
      type: 'linear',
      title: {
        display: true,
        text: 'Team 2 Points',
      },
    },
  },
});

const lineOptions = ref({
  responsive: true,
  aspectRatio: 1,
  plugins: {
    title: {
      display: true,
      text: 'Win History',
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: 'Cumulative Wins',
      },
    },
    x: {
      title: {
        display: true,
        text: 'Season',
      },
    },
  },
});

const getMatchup = () => {
  if (!team1.value || !team2.value) {
    return;
  }

  // this.$ga.event('visualization', 'generation', 'matchup');

  $fetch<{ games: never[] }>('/teams/matchup', {
    method: 'GET',
    baseURL: config.public.apiBaseUrl,
    params: {
      team1: team1.value.school,
      team2: team2.value.school,
      minYear: startYear.value,
      maxYear: endYear.value,
    },
  }).then((result) => {
    matchupData.value = result;
    games.value = result.games.sort((a: string, b: string) =>
      new Date(a).valueOf() - new Date(b).valueOf() > 0 ? 1 : -1,
    );

    let chartData = games.value.map(
      (g: { homeTeam: string; homeScore: number; awayScore: number }) => {
        if (matchupData.value.team1 === g.homeTeam) {
          return {
            x: g.homeScore,
            y: g.awayScore,
          };
        } else {
          return {
            x: g.awayScore,
            y: g.homeScore,
          };
        }
      },
    );

    const maxScore =
      Math.ceil(
        Math.max(
          ...[
            ...games.value.map((g: { homeScore: number }) => g.homeScore),
            ...games.value.map((g: { awayScore: number }) => g.awayScore),
          ],
        ) / 10,
      ) * 10;

    scatterOptions.value = {
      responsive: true,
      aspectRatio: 1,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: `Historical Scores - ${team1.value.school} vs ${team2.value.school}`,
        },
      },
      scales: {
        y: {
          max: maxScore,
          title: {
            display: true,
            text: `${team2.value.school} Points`,
          },
        },
        x: {
          max: maxScore,
          type: 'linear',
          title: {
            display: true,
            text: `${team1.value.school} Points`,
          },
        },
      },
    };

    scatterData.value = {
      datasets: [
        {
          label: 'Scores',
          pointBackgroundColor: chartData.map((cd: { x: number; y: number }) =>
            cd.x > cd.y
              ? team1.value.alt_color
              : cd.y > cd.x
                ? team2.value.alt_color
                : '#888888',
          ),
          pointBorderColor: chartData.map((cd: { x: number; y: number }) =>
            cd.x > cd.y
              ? team1.value.color
              : cd.y > cd.x
                ? team2.value.color
                : '#888888',
          ),
          pointRadius: 4,
          pointBorderWidth: 2,
          data: chartData,
        },
      ],
    };

    // @ts-ignore
    let years: number[] = Array.from(
      new Set(
        games.value.map((g: { date: string }) =>
          new Date(g.date).getFullYear(),
        ),
      ),
    ).sort();
    let team1Wins = years.map((year: number) => {
      return matchupData.value.games.filter(
        (g: {
          homeTeam: string;
          homeScore: number;
          awayTeam: string;
          awayScore: number;
          date: string;
        }) =>
          new Date(g.date).getFullYear() <= year &&
          ((g.homeTeam == matchupData.value.team1 &&
            g.homeScore > g.awayScore) ||
            (g.awayTeam == matchupData.value.team1 &&
              g.awayScore > g.homeScore)),
      ).length;
    });
    let team2Wins = years.map((year) => {
      return matchupData.value.games.filter(
        (g: {
          date: string;
          homeTeam: string;
          homeScore: number;
          awayTeam: string;
          awayScore: number;
        }) =>
          new Date(g.date).getFullYear() <= year &&
          ((g.homeTeam == matchupData.value.team2 &&
            g.homeScore > g.awayScore) ||
            (g.awayTeam == matchupData.value.team2 &&
              g.awayScore > g.homeScore)),
      ).length;
    });

    lineData.value = {
      labels: years,
      datasets: [
        {
          label: team1.value.school,
          pointRadius: 0,
          borderColor: team1.value.color,
          data: team1Wins,
        },
        {
          label: team2.value.school,
          pointRadius: 0,
          borderColor: team2.value.color,
          data: team2Wins,
        },
      ],
    };
  });
};
</script>

<style>
.matchup-logo {
  width: 200px;
}

td[role='cell']:has(.winner-cell) {
  color: var(--primary-color-text) !important;
  background-color: var(--primary-color) !important;
}
</style>
