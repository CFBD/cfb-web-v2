<template>
    <Card class="m-3 text-center">
        <template #title>
            {{ team }}
        </template>
        <template #content>
            <div><label>Year</label></div>
            <Dropdown v-model="selectedYear" :options="mainStore.yearRanges" @change="loadData"></Dropdown>
            <Divider></Divider>
            <ProgressBar v-if="loading" mode="indeterminate" style="height: 6px" class="mt-5"></ProgressBar>
            <div v-if="teamStats && !loading">
                <div class="grid">
                    <div class="col-12" :class="{ 'md:col-6': hasPlayerData, 'divider-right': hasPlayerData }">
                        <h3>Team Metrics</h3>
                        <Divider></Divider>
                        <div class="font-bold text-lg m-3">
                            Scoring Opportunities
                        </div>
                        <DataTable :value="oppsTable" :rows="3" class="p-datatable-small"
                            v-tooltip="getTooltip('opportunities')">
                            <Column field="label" header=""></Column>
                            <Column field="offense" header="Offense" class="text-center" headerClass="center-header">
                                <template #body="slotProps">
                                    <div :class="getColumnFormatting(slotProps.data.label, slotProps.data.offense)">
                                        {{ Math.round(slotProps.data.offense * 10) / 10 }}
                                    </div>
                                </template>
                            </Column>
                            <Column field="defense" header="Defense" class="text-center" headerClass="center-header">
                                <template #body="slotProps">
                                    <div :class="getColumnFormatting(slotProps.data.label, slotProps.data.defense, true)">
                                        {{ Math.round(slotProps.data.defense * 10) / 10 }}
                                    </div>
                                </template>
                            </Column>
                        </DataTable>
                        <Divider></Divider>
                        <div class="font-bold text-lg m-3">
                            Field Position
                        </div>
                        <DataTable :value="fieldPositionTable" :rows="2" class="p-datatable-small"
                            v-tooltip="getTooltip('fieldPosition')">
                            <Column field="label" header=""></Column>
                            <Column field="offense" header="Offense" class="text-center" headerClass="center-header">
                                <template #body="slotProps">
                                    <div :class="getColumnFormatting(slotProps.data.label, slotProps.data.offense)">
                                        {{ slotProps.data.offense }}
                                    </div>
                                </template>
                            </Column>
                            <Column field="defense" header="Defense" class="text-center" headerClass="center-header">
                                <template #body="slotProps">
                                    <div :class="getColumnFormatting(slotProps.data.label, slotProps.data.defense, true)">
                                        {{ slotProps.data.defense }}
                                    </div>
                                </template>
                            </Column>
                        </DataTable>
                        <Divider></Divider>
                        <div class="font-bold text-lg m-3">
                            Rushing
                        </div>
                        <DataTable :value="rushingMetrics" :rows="8" class="p-datatable-small"
                            v-tooltip="getTooltip('rushing')">
                            <Column field="label" header=""></Column>
                            <Column field="offense" header="Offense" class="text-center" headerClass="center-header">
                                <template #body="slotProps">
                                    <div :class="getColumnFormatting(slotProps.data.label, slotProps.data.offense)">
                                        {{ slotProps.data.label in ["Stuff Rate", "Power Success"] ?
                                            `${slotProps.data.offense}%` : slotProps.data.offense }}
                                    </div>
                                </template>
                            </Column>
                            <Column field="defense" header="Defense" class="text-center" headerClass="center-header">
                                <template #body="slotProps">
                                    <div :class="getColumnFormatting(slotProps.data.label, slotProps.data.defense, true)">
                                        {{ slotProps.data.label in ["Stuff Rate", "Power Success"] ?
                                            `${slotProps.data.defense}%` : slotProps.data.defense }}
                                    </div>
                                </template>
                            </Column>
                        </DataTable>
                        <Divider></Divider>
                        <div class="font-bold text-lg m-3">
                            Havoc
                        </div>
                        <DataTable :value="havocMetrics" :rows="3" class="p-datatable-small"
                            v-tooltip="getTooltip('havoc')">
                            <Column field="label" header=""></Column>
                            <Column field="offense" header="Offense" class="text-center" headerClass="center-header">
                                <template #body="slotProps">
                                    <div
                                        :class="getColumnFormatting(`${slotProps.data.label} Havoc`, slotProps.data.offense)">
                                        {{ Math.round(slotProps.data.offense * 1000) / 10 }}%
                                    </div>
                                </template>
                            </Column>
                            <Column field="defense" header="Defense" class="text-center" headerClass="center-header">
                                <template #body="slotProps">
                                    <div
                                        :class="getColumnFormatting(`${slotProps.data.label} Havoc`, slotProps.data.defense, true)">
                                        {{ Math.round(slotProps.data.defense * 1000) / 10 }}%
                                    </div>
                                </template>
                            </Column>
                        </DataTable>
                        <Divider></Divider>
                        <div class="font-bold text-lg m-3">
                            Predicted Points Added
                        </div>
                        <DataTable :value="teamPPAMetrics" :rows="3" class="p-datatable-small"
                            v-tooltip="getTooltip('ppa')">
                            <Column field="label" header=""></Column>
                            <Column field="offense" header="Offense" class="text-center" headerClass="center-header">
                                <template #body="slotProps">
                                    <div
                                        :class="getColumnFormatting(`${slotProps.data.label} PPA`, slotProps.data.offense)">
                                        {{ slotProps.data.offense }}
                                    </div>
                                </template>
                            </Column>
                            <Column field="defense" header="Defense" class="text-center" headerClass="center-header">
                                <template #body="slotProps">
                                    <div
                                        :class="getColumnFormatting(`${slotProps.data.label} PPA`, slotProps.data.defense, true)">
                                        {{ slotProps.data.defense }}
                                    </div>
                                </template>
                            </Column>
                        </DataTable>
                        <Divider></Divider>
                        <div class="font-bold text-lg m-3">
                            Success Rate
                        </div>
                        <DataTable :value="teamSuccessMetrics" :rows="3" class="p-datatable-small"
                            v-tooltip="getTooltip('success')">
                            <Column field="label" header=""></Column>
                            <Column field="offense" header="Offense" class="text-center" headerClass="center-header">
                                <template #body="slotProps">
                                    <div
                                        :class="getColumnFormatting(`${slotProps.data.label} Success`, slotProps.data.offense)">
                                        {{ Math.round(slotProps.data.offense * 100) }}%
                                    </div>
                                </template>
                            </Column>
                            <Column field="defense" header="Defense" class="text-center" headerClass="center-header">
                                <template #body="slotProps">
                                    <div
                                        :class="getColumnFormatting(`${slotProps.data.label} Success`, slotProps.data.defense, true)">
                                        {{ Math.round(slotProps.data.defense * 100) }}%
                                    </div>
                                </template>
                            </Column>
                        </DataTable>
                        <Divider></Divider>
                        <div class="font-bold text-lg m-3">
                            Explosiveness
                        </div>
                        <DataTable :value="explosivenessMetrics" :rows="3" class="p-datatable-small"
                            v-tooltip="getTooltip('explosiveness')">
                            <Column field="label" header=""></Column>
                            <Column field="offense" header="Offense" class="text-center" headerClass="center-header">
                                <template #body="slotProps">
                                    <div :class="getColumnFormatting('Explosiveness', slotProps.data.offense)">
                                        {{ Math.round(slotProps.data.offense * 100) / 100 }}
                                    </div>
                                </template>
                            </Column>
                            <Column field="defense" header="Defense" class="text-center" headerClass="center-header">
                                <template #body="slotProps">
                                    <div :class="getColumnFormatting('Explosiveness', slotProps.data.defense, true)">
                                        {{ Math.round(slotProps.data.defense * 100) / 100 }}
                                    </div>
                                </template>
                            </Column>
                        </DataTable>
                    </div>
                    <div class="col-12 md:col-6" v-if="hasPlayerData">
                        <h3>Player Metrics</h3>
                        <Divider></Divider>
                        <div class="font-bold text-lg m-3">
                            Usage
                        </div>
                        <DataTable :value="playerUsage" :rows="20" class="p-datatable-small"
                            v-tooltip.left="getTooltip('usage')">
                            <Column field="name" header="Player" sortable>
                            </Column>
                            <Column field="position" header="Position" sortable>
                            </Column>
                            <Column field="usage.overall" header="All" class="text-center" headerClass="center-header"
                                sortable>
                                <template #body="slotProps">
                                    {{ Math.round(slotProps.data.usage.overall * 100) }}%
                                </template>
                            </Column>
                            <Column field="usage.rush" header="Rushing" class="text-center" headerClass="center-header"
                                sortable>
                                <template #body="slotProps">
                                    {{ Math.round(slotProps.data.usage.rush * 100) }}%
                                </template>
                            </Column>
                            <Column field="usage.pass" header="Passing" class="text-center" headerClass="center-header"
                                sortable>
                                <template #body="slotProps">
                                    {{ Math.round(slotProps.data.usage.pass * 100) }}%
                                </template>
                            </Column>
                            <Column field="usage.standardDowns" header="Standard Downs" class="text-center"
                                headerClass="center-header" sortable>
                                <template #body="slotProps">
                                    {{ Math.round(slotProps.data.usage.standardDowns * 100) }}%
                                </template>
                            </Column>
                            <Column field="usage.passingDowns" header="Passing Downs" class="text-center"
                                headerClass="center-header" sortable>
                                <template #body="slotProps">
                                    {{ Math.round(slotProps.data.usage.passingDowns * 100) }}%
                                </template>
                            </Column>
                        </DataTable>
                        <Divider></Divider>
                        <div class="font-bold text-lg m-3">
                            Usage
                        </div>
                        <DataTable :value="playerPPA" :rows="20" class="p-datatable-small"
                            v-tooltip.left="getTooltip('ppa')">
                            <Column field="name" header="Player" sortable>
                            </Column>
                            <Column field="position" header="Position" sortable>
                            </Column>
                            <Column field="averagePPA.all" header="All" class="text-center" headerClass="center-header"
                                sortable>
                                <template #body="slotProps">
                                    {{ Math.round(slotProps.data.averagePPA.all * 1000) / 1000 }}
                                </template>
                            </Column>
                            <Column field="averagePPA.rush" header="Rushing" class="text-center" headerClass="center-header"
                                sortable>
                                <template #body="slotProps">
                                    {{ Math.round(slotProps.data.averagePPA.rush * 1000) / 1000 }}
                                </template>
                            </Column>
                            <Column field="averagePPA.pass" header="Passing" class="text-center" headerClass="center-header"
                                sortable>
                                <template #body="slotProps">
                                    {{ Math.round(slotProps.data.averagePPA.pass * 1000) / 1000 }}
                                </template>
                            </Column>
                        </DataTable>
                    </div>
                </div>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();

import { useMainStore } from '~/stores/main';
const mainStore = useMainStore();

import { type PlayerPPA, type PlayerUsage, type TeamStats } from '@/types/teamStatTypes';

const team = ref("");
const selectedYear = ref(mainStore.defaultYear);
const teamStats: Ref<TeamStats | undefined | null> = ref();
const playerPPA: Ref<PlayerPPA[] | undefined | null> = ref();
const playerUsage: Ref<PlayerUsage[] | undefined | null> = ref();
const loadingTeam = ref(false);
const loadingPPA = ref(false);
const loadingUsage = ref(false);

const loading = computed(() => {
    return loadingTeam.value || loadingPPA.value || loadingPPA.value;
});

const hasPlayerData = computed(() => {
    return playerPPA.value && playerUsage.value;
});

const loadData = () => {
    loadingTeam.value = true;
    loadingPPA.value = true;
    loadingUsage.value = true;

    teamStats.value = null;
    playerPPA.value = null;
    playerUsage.value = null;

    $fetch<TeamStats[] | undefined | null>('/stats/season/advanced', {
        method: 'GET',
        baseURL: config.public.apiBaseUrl,
        params: {
            year: selectedYear.value,
            team: team.value,
            excludeGarbageTime: false
        }
    }).then(result => {
        if (result && result.length) {
            teamStats.value = result[0];
        }
        loadingTeam.value = false;
    }).finally(() => {
        loadingTeam.value = false;
    });

    $fetch<PlayerUsage[] | undefined | null>('/player/usage', {
        method: 'GET',
        baseURL: config.public.apiBaseUrl,
        params: {
            year: selectedYear.value,
            team: team.value,
            excludeGarbageTime: false
        }
    }).then(result => {
        if (result && result.length) {
            playerUsage.value = result;
        }
        loadingUsage.value = false;
    }).finally(() => {
        loadingUsage.value = false;
    });

    $fetch<PlayerPPA[] | undefined | null>('/ppa/players/season', {
        method: 'GET',
        baseURL: config.public.apiBaseUrl,
        params: {
            year: selectedYear.value,
            team: team.value,
            excludeGarbageTime: false
        }
    }).then(result => {
        if (result && result.length) {
            playerPPA.value = result;
        }
        loadingPPA.value = false;
    }).finally(() => {
        loadingPPA.value = false;
    });
};

const getColumnFormatting = (label: string, value: number, defense = false) => {
    let thresholds = null;
    let reversed = defense;

    switch (label) {
        case "Points Per Opportunity":
            thresholds = [3, 4];
            break;
        case "Average Start":
            thresholds = [68, 72];
            reversed = !defense;
            break;
        case "Average Expected Points":
            thresholds = defense ? [-1.6, -1.25] : [1.25, 1.6];
            reversed = false;
            break;
        case "Stuff Rate":
            thresholds = [16, 22];
            reversed = !defense;
            break;
        case "Line Yards per Rush":
            thresholds = [2.6, 3.2];
            break;
        case "Second Level Yards per Rush":
            thresholds = [0.9, 1.3];
            break;
        case "Open Field Yards per Rush":
            thresholds = [.6, 1.8];
            break;
        case "Total Havoc":
            reversed = !defense;
            thresholds = [.07, .21];
            break;
        case "Front Seven Havoc":
            reversed = !defense;
            thresholds = [.035, .135];
            break;
        case "DB Havoc":
            reversed = !defense;
            thresholds = [.025, .075];
            break;
        case "PPA":
            thresholds = [0, 0.4];
            break;
        case "All PPA":
            thresholds = [0.9, 0.27];
            break;
        case "Passing PPA":
            thresholds = [.08, .38];
            break;
        case "Rushing PPA":
            thresholds = [0.05, 0.23];
            break;
        case "All Success":
            thresholds = [.3, .5];
            break;
        case "Standard Downs Success":
            thresholds = [.44, .52];
            break;
        case "Passing Downs Success":
            thresholds = [.28, .38];
            break;
        case "Explosiveness":
            thresholds = [1.11, 1.29];
            break;
        case "Player PPA":
            thresholds = [0, 0.5];
            break;
        case "Quarterly PPA":
            thresholds = [0, 2.5];
            break;
        case "Total PPA":
            thresholds = [0, 10];
            break;
        default:
            thresholds = null;
            break;
    }

    if (thresholds && value >= thresholds[1]) {
        return reversed ? "team-stat-bad" : "team-stat-good";
    } else if (thresholds && value < thresholds[0]) {
        return reversed ? "team-stat-good" : "team-stat-bad";
    }

    return "";
};

const getTooltip = (key: string) => {
    const tooltip = tooltips[key];
    const html = `<div class="font-bold text-lg text-center">${tooltip.title}</div><hr /><div class="text-sm">${tooltip.content}</div>`;

    return {
        value: html,
        escape: false,
        class: "boxscore-tooltip"
    };
};

const tooltips: Record<string, { title: string, content: string }> = {
    winExpectancy: {
        title: 'Win Expectancy',
        content: 'Measures the win expectancy if the game were to be played again with each team attaining the same stats'
    },
    excitementIndex: {
        title: 'Excitement Index',
        content: 'Measures the overall excitement of the game based on swings in in-game win probability. An average game scores around 4.0. There is no upper limit on score, but more exciting games will generally finish at 6.0 or higher.'
    },
    opportunities: {
        title: 'Scoring Opportunities',
        content: 'Analyzes drives in which the offense advanced the ball to out past the opponent\'s 40 yard line'
    },
    fieldPosition: {
        title: 'Field Position',
        content: 'Average starting field position in number of yards from opponent\'s goal line as well as average starting expected points'
    },
    rushing: {
        title: 'Rushing',
        content: 'Various rushing based metrics, some of which attempt to measure the effectiveness of the offensive line while others measure the performance of the team\'s backs'
    },
    havoc: {
        title: 'Havoc',
        content: 'Measures the percentage of plays in which the defensive generated a havoc event, such as a TFL, pass deflection, or turnover'
    },
    ppa: {
        title: 'Predicted Points Added',
        content: 'EPA metric that measures expected points added on an average play'
    },
    success: {
        title: 'Success Rate',
        content: 'A play is considered to by successful if it is a first down and at least 50% of yards to go are attained, or if it is 2nd down and at least 70% or yards to go are attained, or if it is a 3rd or 4th down that is converted for a first down or score'
    },
    explosiveness: {
        title: 'Explosiveness',
        content: 'Explosiveness measures the average expected points added on successful plays'
    },
    usage: {
        title: 'Usage',
        content: 'Usage measures the percentage of plays in which a player was involved, such as as a passer, a rusher, or a receiving target'
    },
    ppaCum: {
        title: 'Predicted Points Added - Cumulative',
        content: 'Cumulative PPA measures the sum of expected points added across all plays in which a player was involved'
    }
};

const oppsTable = computed(() => {
    const offense = teamStats.value?.offense;
    const defense = teamStats.value?.defense;

    return [{
        label: "Opportunities",
        offense: offense?.totalOpportunies,
        defense: defense?.totalOpportunies
    }, {
        label: "Points Per Opportunity",
        offense: offense?.pointsPerOpportunity,
        defense: defense?.pointsPerOpportunity
    }];
});

const fieldPositionTable = computed(() => {
    const offense = teamStats.value?.offense.fieldPosition
    const defense = teamStats.value?.defense.fieldPosition;

    return [{
        label: "Average Start",
        offense: offense?.averageStart,
        defense: defense?.averageStart
    }, {
        label: "Average Expected Points",
        offense: offense?.averagePredictedPoints,
        defense: defense?.averagePredictedPoints
    }];
});

const rushingMetrics = computed(() => {
    const offense = teamStats.value?.offense;
    const defense = teamStats.value?.defense;

    return [{
        label: 'Power Success',
        offense: Math.round((offense?.powerSuccess ?? 0) * 100),
        defense: Math.round((defense?.powerSuccess ?? 0) * 100)
    }, {
        label: 'Stuff Rate',
        offense: Math.round((offense?.stuffRate ?? 0) * 100),
        defense: Math.round((defense?.stuffRate ?? 0) * 100),
    }, {
        label: 'Line Yards per Rush',
        offense: Math.round((offense?.lineYards ?? 0) * 10) / 10,
        defense: Math.round((defense?.lineYards ?? 0) * 10) / 10,
    }, {
        label: 'Second Level Yards per Rush',
        offense: Math.round((offense?.secondLevelYards ?? 0) * 10) / 10,
        defense: Math.round((defense?.secondLevelYards ?? 0) * 10) / 10,
    }, {
        label: 'Open Field Yards per Rush',
        offense: Math.round((offense?.openFieldYards ?? 0) * 10) / 10,
        defense: Math.round((defense?.openFieldYards ?? 0) * 10) / 10,
    }]
});

const havocMetrics = computed(() => {
    const offense = teamStats.value?.offense.havoc;
    const defense = teamStats.value?.defense.havoc;

    return [{
        label: 'Total',
        offense: offense?.total,
        defense: defense?.total,
    }, {
        label: 'Front Seven',
        offense: offense?.frontSeven,
        defense: defense?.frontSeven,
    }, {
        label: 'DB',
        offense: offense?.db,
        defense: defense?.db,
    }]
});

const teamPPAMetrics = computed(() => {
    const offense = teamStats.value?.offense;
    const defense = teamStats.value?.defense;

    return [{
        label: 'All',
        offense: Math.round((offense?.ppa ?? 0) * 1000) / 1000,
        defense: Math.round((defense?.ppa ?? 0) * 1000) / 1000,
    }, {
        label: 'Rushing',
        offense: Math.round((offense?.rushingPlays.ppa ?? 0) * 1000) / 1000,
        defense: Math.round((defense?.rushingPlays.ppa ?? 0) * 1000) / 1000,
    }, {
        label: 'Passing',
        offense: Math.round((offense?.passingPlays.ppa ?? 0) * 1000) / 1000,
        defense: Math.round((defense?.passingPlays.ppa ?? 0) * 1000) / 1000,
    }];
});

const teamSuccessMetrics = computed(() => {
    return [{
        label: 'All',
        offense: teamStats.value?.offense.successRate,
        defense: teamStats.value?.defense.successRate,
    }, {
        label: 'Standard Downs',
        offense: teamStats.value?.offense.standardDowns.successRate,
        defense: teamStats.value?.defense.standardDowns.successRate,
    }, {
        label: 'Passing Downs',
        offense: teamStats.value?.offense.passingDowns.successRate,
        defense: teamStats.value?.defense.passingDowns.successRate,
    }];
});

const explosivenessMetrics = computed(() => {
    return [{
        label: 'All',
        offense: teamStats.value?.offense.explosiveness,
        defense: teamStats.value?.defense.explosiveness,
    }, {
        label: 'Rushing',
        offense: teamStats.value?.offense.rushingPlays.explosiveness,
        defense: teamStats.value?.defense.rushingPlays.explosiveness,
    }, {
        label: 'Passing',
        offense: teamStats.value?.offense.passingPlays.explosiveness,
        defense: teamStats.value?.defense.passingPlays.explosiveness,
    }];
});

onBeforeMount(async () => {
    if (route.params.team) {
        // eslint-disable-next-line
        // @ts-ignore
        team.value = route.params.team;
        loadData();
    }
});
</script>

<style lang="scss">
.divider-right {
    border-right: 1px solid;
}

.center-header {
    .p-column-header-content {
        text-align: center;
        display: block !important;
    }
}

td[role="cell"]:has(.team-stat-good) {
    background-color: var(--p-green-300) !important;
}

td[role="cell"]:has(.team-stat-bad) {
    background-color: var(--p-red-300) !important;
}

.boxscore-tooltip {
    .p-tooltip-text {
        background-color: var(--p-blue-400);
    }

    &.p-tooltip-right .p-tooltip-arrow,
    &.p-tooltip-left .p-tooltip-arrow {
        border-right-color: var(--p-blue-400);
    }
}

.dark-mode {
  td[role="cell"]:has(.team-stat-good) {
      background-color: var(--p-green-700) !important;
  }

  td[role="cell"]:has(.team-stat-bad) {
      background-color: var(--p-red-700) !important;
  }

  .boxscore-tooltip {
      .p-tooltip-text {
          background-color: var(--p-blue-600);
      }

      &.p-tooltip-right .p-tooltip-arrow,
      &.p-tooltip-left .p-tooltip-arrow {
          border-right-color: var(--p-blue-600);
      }
  }
}
</style>
