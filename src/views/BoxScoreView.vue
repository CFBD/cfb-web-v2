<template>
    <Card class="text-center m-3">
        <template #title>
            Advanced Box Scores
        </template>
        <template #subtitle>
            Search for games to get started
        </template>
        <template #content>
            <GameSearch v-model="selectedGameId" clearOnSelection @selection="loadData"></GameSearch>
            <Divider v-if="boxScoreData"></Divider>
            <div v-if="boxScoreData">
                <h2>{{ formattedScore() }}</h2>
                <h4 class="text-500">Note: Garbage time is filtered from these stats</h4>
                <div class="grid">
                    <div class="col-12" :class="{ 'md:col-6': hasPlayerData, 'divider-right': hasPlayerData }">
                        <h3>Team Metrics</h3>
                        <Divider></Divider>
                        <div class="grid">
                            <div class="col-6" v-tooltip="getTooltip('winExpectancy')">
                                <div class="font-bold text-lg">Postgame Win Expectancy</div>
                                {{ winExpectancy }}
                            </div>
                            <div class="col-6" v-tooltip="getTooltip('excitementIndex')">
                                <div class="font-bold text-lg">Excitement Index</div>
                                {{ (Math.round(boxScoreData.gameInfo.excitement * 10) / 10) }}
                            </div>
                        </div>
                        <Divider></Divider>
                        <div class="font-bold text-lg m-3">
                            Scoring Opportunities
                        </div>
                        <DataTable :value="oppsTable" :rows="3" class="p-datatable-small"
                            v-tooltip="getTooltip('opportunities')">
                            <Column field="label" header=""></Column>
                            <Column field="homeValue" :header="boxScoreData.gameInfo.homeTeam" class="text-center"
                                headerClass="center-header">
                                <template #body="slotProps">
                                    <div :class="getColumnFormatting(slotProps.data.label, slotProps.data.homeValue)">
                                        {{ slotProps.data.homeValue }}
                                    </div>
                                </template>
                            </Column>
                            <Column field="awayValue" :header="boxScoreData.gameInfo.awayTeam" class="text-center"
                                headerClass="center-header">
                                <template #body="slotProps">
                                    <div :class="getColumnFormatting(slotProps.data.label, slotProps.data.awayValue)">
                                        {{ slotProps.data.awayValue }}
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
                            <Column field="homeValue" :header="boxScoreData.gameInfo.homeTeam" class="text-center"
                                headerClass="center-header">
                                <template #body="slotProps">
                                    <div :class="getColumnFormatting(slotProps.data.label, slotProps.data.homeValue)">
                                        {{ slotProps.data.homeValue }}
                                    </div>
                                </template>
                            </Column>
                            <Column field="awayValue" :header="boxScoreData.gameInfo.awayTeam" class="text-center"
                                headerClass="center-header">
                                <template #body="slotProps">
                                    <div :class="getColumnFormatting(slotProps.data.label, slotProps.data.awayValue)">
                                        {{ slotProps.data.awayValue }}
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
                            <Column field="homeValue" :header="boxScoreData.gameInfo.homeTeam" class="text-center"
                                headerClass="center-header">
                                <template #body="slotProps">
                                    <div :class="getColumnFormatting(slotProps.data.label, slotProps.data.homeValue)">
                                        {{ slotProps.data.homeValue }}
                                    </div>
                                </template>
                            </Column>
                            <Column field="awayValue" :header="boxScoreData.gameInfo.awayTeam" class="text-center"
                                headerClass="center-header">
                                <template #body="slotProps">
                                    <div :class="getColumnFormatting(slotProps.data.label, slotProps.data.awayValue)">
                                        {{ slotProps.data.awayValue }}
                                    </div>
                                </template>
                            </Column>
                        </DataTable>
                        <Divider></Divider>
                        <div class="font-bold text-lg m-3">
                            Defensive Havoc
                        </div>
                        <DataTable :value="havocMetrics" :rows="3" class="p-datatable-small"
                            v-tooltip="getTooltip('havoc')">
                            <Column field="label" header=""></Column>
                            <Column field="homeValue" :header="boxScoreData.gameInfo.homeTeam" class="text-center"
                                headerClass="center-header">
                                <template #body="slotProps">
                                    <div
                                        :class="getColumnFormatting(`${slotProps.data.label} Havoc`, slotProps.data.homeValue)">
                                        {{ Math.round(slotProps.data.homeValue * 1000) / 10 }}%
                                    </div>
                                </template>
                            </Column>
                            <Column field="awayValue" :header="boxScoreData.gameInfo.awayTeam" class="text-center"
                                headerClass="center-header">
                                <template #body="slotProps">
                                    <div
                                        :class="getColumnFormatting(`${slotProps.data.label} Havoc`, slotProps.data.awayValue)">
                                        {{ Math.round(slotProps.data.awayValue * 1000) / 10 }}%
                                    </div>
                                </template>
                            </Column>
                        </DataTable>
                        <Divider></Divider>
                        <div class="font-bold text-lg m-3">
                            Predicted Points Added
                        </div>
                        <div class="mb-2 mt-3">Overall</div>
                        <DataTable :value="boxScoreData.teams.ppa" :rows="2" class="p-datatable-small"
                            v-tooltip="getTooltip('ppa')">
                            <Column field="team" label="Team"></Column>
                            <Column v-for="i in [1, 2, 3, 4]" :key="i" :field="`overall.quarter${i}`" :header="`${i}`"
                                class="text-center" headerClass="center-header">
                                <template #body="slotProps">
                                    <div :class="getColumnFormatting('PPA', slotProps.data.overall[`quarter${i}`])">
                                        {{ slotProps.data.overall[`quarter${i}`] }}
                                    </div>
                                </template>
                            </Column>
                            <Column field="overall.total" header="Total" class="text-center" headerClass="center-header">
                                <template #body="slotProps">
                                    <div :class="getColumnFormatting('PPA', slotProps.data.overall.total)">
                                        {{ slotProps.data.overall.total }}
                                    </div>
                                </template>
                            </Column>
                        </DataTable>
                        <div class="mb-2 mt-3">Passing</div>
                        <DataTable :value="boxScoreData.teams.ppa" :rows="2" class="p-datatable-small"
                            v-tooltip="getTooltip('ppa')">
                            <Column field="team" label="Team"></Column>
                            <Column v-for="i in [1, 2, 3, 4]" :key="i" :field="`passing.quarter${i}`" :header="`${i}`"
                                class="text-center" headerClass="center-header">
                                <template #body="slotProps">
                                    <div :class="getColumnFormatting('Passing PPA', slotProps.data.passing[`quarter${i}`])">
                                        {{ slotProps.data.passing[`quarter${i}`] }}
                                    </div>
                                </template>
                            </Column>
                            <Column field="passing.total" header="Total" class="text-center" headerClass="center-header">
                                <template #body="slotProps">
                                    <div :class="getColumnFormatting('Passing PPA', slotProps.data.passing.total)">
                                        {{ slotProps.data.passing.total }}
                                    </div>
                                </template>
                            </Column>
                        </DataTable>
                        <div class="mb-2 mt-3">Rushing</div>
                        <DataTable :value="boxScoreData.teams.ppa" :rows="2" class="p-datatable-small"
                            v-tooltip="getTooltip('ppa')">
                            <Column field="team" label="Team"></Column>
                            <Column v-for="i in [1, 2, 3, 4]" :key="i" :field="`rushing.quarter${i}`" :header="`${i}`"
                                class="text-center" headerClass="center-header">
                                <template #body="slotProps">
                                    <div :class="getColumnFormatting('Rushing PPA', slotProps.data.rushing[`quarter${i}`])">
                                        {{ slotProps.data.rushing[`quarter${i}`] }}
                                    </div>
                                </template>
                            </Column>
                            <Column field="rushing.total" header="Total" class="text-center" headerClass="center-header">
                                <template #body="slotProps">
                                    <div :class="getColumnFormatting('Rushing PPA', slotProps.data.rushing.total)">
                                        {{ slotProps.data.rushing.total }}
                                    </div>
                                </template>
                            </Column>
                        </DataTable>
                        <Divider></Divider>
                        <div class="font-bold text-lg m-3">
                            Success Rate
                        </div>
                        <div class="mb-2 mt-3">Overall</div>
                        <DataTable :value="boxScoreData.teams.successRates" :rows="2" class="p-datatable-small"
                            v-tooltip="getTooltip('success')">
                            <Column field="team" label="Team"></Column>
                            <Column v-for="i in [1, 2, 3, 4]" :key="i" :field="`overall.quarter${i}`" :header="`${i}`"
                                class="text-center" headerClass="center-header">
                                <template #body="slotProps">
                                    <div
                                        :class="getColumnFormatting('Success Rate', slotProps.data.overall[`quarter${i}`])">
                                        {{ Math.round(slotProps.data.overall[`quarter${i}`] * 100) }}%
                                    </div>
                                </template>
                            </Column>
                            <Column field="overall.total" header="Total" class="text-center" headerClass="center-header">
                                <template #body="slotProps">
                                    <div :class="getColumnFormatting('Success Rate', slotProps.data.overall.total)">
                                        {{ Math.round(slotProps.data.overall.total * 100) }}%
                                    </div>
                                </template>
                            </Column>
                        </DataTable>
                        <div class="mb-2 mt-3">Standard Downs</div>
                        <DataTable :value="boxScoreData.teams.successRates" :rows="2" class="p-datatable-small"
                            v-tooltip="getTooltip('success')">
                            <Column field="team" label="Team"></Column>
                            <Column v-for="i in [1, 2, 3, 4]" :key="i" :field="`standardDowns.quarter${i}`" :header="`${i}`"
                                class="text-center" headerClass="center-header">
                                <template #body="slotProps">
                                    <div
                                        :class="getColumnFormatting('Standard Success Rate', slotProps.data.standardDowns[`quarter${i}`])">
                                        {{ Math.round(slotProps.data.standardDowns[`quarter${i}`] * 100) }}%
                                    </div>
                                </template>
                            </Column>
                            <Column field="standardDowns.total" header="Total" class="text-center"
                                headerClass="center-header">
                                <template #body="slotProps">
                                    <div
                                        :class="getColumnFormatting('Standard Success Rate', slotProps.data.standardDowns.total)">
                                        {{ Math.round(slotProps.data.standardDowns.total * 100) }}%
                                    </div>
                                </template>
                            </Column>
                        </DataTable>
                        <div class="mb-2 mt-3">Passing Downs</div>
                        <DataTable :value="boxScoreData.teams.successRates" :rows="2" class="p-datatable-small"
                            v-tooltip="getTooltip('success')">
                            <Column field="team" label="Team"></Column>
                            <Column v-for="i in [1, 2, 3, 4]" :key="i" :field="`passingDowns.quarter${i}`" :header="`${i}`"
                                class="text-center" headerClass="center-header">
                                <template #body="slotProps">
                                    <div
                                        :class="getColumnFormatting('Passing Success Rate', slotProps.data.passingDowns[`quarter${i}`])">
                                        {{ Math.round(slotProps.data.passingDowns[`quarter${i}`] * 100) }}%
                                    </div>
                                </template>
                            </Column>
                            <Column field="passingDowns.total" header="Total" class="text-center"
                                headerClass="center-header">
                                <template #body="slotProps">
                                    <div
                                        :class="getColumnFormatting('Passing Success Rate', slotProps.data.passingDowns.total)">
                                        {{ Math.round(slotProps.data.passingDowns.total * 100) }}%
                                    </div>
                                </template>
                            </Column>
                        </DataTable>
                        <Divider></Divider>
                        <div class="font-bold text-lg m-3">
                            Explosiveness
                        </div>
                        <DataTable :value="boxScoreData.teams.explosiveness" :rows="2" class="p-datatable-small"
                            v-tooltip="getTooltip('explosiveness')">
                            <Column field="team" label="Team"></Column>
                            <Column v-for="i in [1, 2, 3, 4]" :key="i" :field="`overall.quarter${i}`" :header="`${i}`"
                                class="text-center" headerClass="center-header">
                                <template #body="slotProps">
                                    <div
                                        :class="getColumnFormatting('Explosiveness', slotProps.data.overall[`quarter${i}`])">
                                        {{ slotProps.data.overall[`quarter${i}`] }}
                                    </div>
                                </template>
                            </Column>
                            <Column field="overall.total" header="Total" class="text-center" headerClass="center-header">
                                <template #body="slotProps">
                                    <div :class="getColumnFormatting('Explosiveness', slotProps.data.overall.total)">
                                        {{ slotProps.data.overall.total }}
                                    </div>
                                </template>
                            </Column>
                        </DataTable>
                    </div>
                    <div v-if="hasPlayerData" class="col-12 md:col-6">
                        <h3>Player Metrics</h3>
                        <Divider></Divider>
                    </div>
                </div>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { computed, ref, type Ref } from "vue";

import { type BoxScoreData } from "../types/boxScoreTypes";

import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';

import Divider from "primevue/divider";

import GameSearch from '@/components/GameSearch.vue';

import http from "@/helpers/http";

import { useMainStore } from '@/stores/main';
const mainStore = useMainStore();

const selectedGameId = ref();
const boxScoreData: Ref<BoxScoreData | undefined> = ref();

const loadData = () => {
    if (selectedGameId.value) {
        http.get("/game/box/advanced", {
            params: {
                gameId: selectedGameId.value
            }
        }).then((response) => {
            boxScoreData.value = response.data;
        });
    }
};

const getColumnFormatting = (label: string, value: number) => {
    let thresholds = null;
    let reversed = false;

    switch (label) {
        case "Points Per Opportunity":
            thresholds = [3, 4];
            break;
        case "Average Start":
            thresholds = [67, 75];
            reversed = true;
            break;
        case "Average Expected Points":
            thresholds = [1.0, 1.75];
            break;
        case "Stuff Rate":
            thresholds = [0.15, 0.3];
            reversed = true;
            break;
        case "Line Yards per Rush":
            thresholds = [2.5, 3.5];
            break;
        case "Second Level Yards per Rush":
            thresholds = [0.7, 1.5];
            break;
        case "Open Field Yards per Rush":
            thresholds = [1, 2];
            break;
        case "Total Havoc":
            thresholds = [.1, .25];
            break;
        case "Front Seven Havoc":
            thresholds = [.07, .15];
            break;
        case "DB Havoc":
            thresholds = [.04, .1];
            break;
        case "PPA":
            thresholds = [0, 0.4];
            break;
        case "Passing PPA":
            thresholds = [.1, .4];
            break;
        case "Rushing PPA":
            thresholds = [0, 0.3];
            break;
        case "Success Rate":
            thresholds = [.3, .5];
            break;
        case "Standard Success Rate":
            thresholds = [.35, .55];
            break;
        case "Passing Success Rate":
            thresholds = [.2, .4];
            break;
        case "Explosiveness":
            thresholds = [1, 1.5];
            break;
        default:
            thresholds = null;
            break;
    }

    if (thresholds && value >= thresholds[1]) {
        return reversed ? "bg-red-300" : "bg-green-300";
    } else if (thresholds && value < thresholds[0]) {
        return reversed ? "bg-green-300" : "bg-red-300";
    }

    return "";
}

const formattedScore = () => {
    return `${boxScoreData.value?.gameInfo.homeTeam} ${boxScoreData.value?.gameInfo.homePoints}, ${boxScoreData.value?.gameInfo.awayTeam} ${boxScoreData.value?.gameInfo.awayPoints}`;
};

const hasPlayerData = computed(() => {
    const stats = boxScoreData.value?.players.ppa.length;
    return stats && stats > 0;
});

const winExpectancy = computed(() => {
    const homeProb = boxScoreData.value?.gameInfo.homeWinProb;
    const awayProb = boxScoreData.value?.gameInfo.awayWinProb;

    if (homeProb && awayProb) {
        if (homeProb >= awayProb) {
            return `${boxScoreData.value?.gameInfo.homeTeam} ${Math.round(homeProb * 100)}%`;
        } else {
            return `${boxScoreData.value?.gameInfo.awayTeam} ${Math.round(awayProb * 100)}%`;
        }
    }

    return "";
});

const oppsTable = computed(() => {
    const homeOpps = boxScoreData.value?.teams.scoringOpportunities.find(o => o.team === boxScoreData.value?.gameInfo.homeTeam);
    const awayOpps = boxScoreData.value?.teams.scoringOpportunities.find(o => o.team === boxScoreData.value?.gameInfo.awayTeam);

    return [{
        label: "Opportunities",
        homeValue: homeOpps?.opportunities,
        awayValue: awayOpps?.opportunities
    }, {
        label: "Points",
        homeValue: homeOpps?.points,
        awayValue: awayOpps?.points
    }, {
        label: "Points Per Opportunity",
        homeValue: homeOpps?.pointsPerOpportunity,
        awayValue: awayOpps?.pointsPerOpportunity
    }];
});

const fieldPositionTable = computed(() => {
    const homeFieldPosition = boxScoreData.value?.teams.fieldPosition.find(f => f.team === boxScoreData.value?.gameInfo.homeTeam);
    const awayFieldPosition = boxScoreData.value?.teams.fieldPosition.find(f => f.team === boxScoreData.value?.gameInfo.awayTeam);

    return [{
        label: "Average Start",
        homeValue: homeFieldPosition?.averageStart,
        awayValue: awayFieldPosition?.averageStart
    }, {
        label: "Average Expected Points",
        homeValue: homeFieldPosition?.averageStartingPredictedPoints,
        awayValue: awayFieldPosition?.averageStartingPredictedPoints
    }];
});

const rushingMetrics = computed(() => {
    const homeRushing = boxScoreData.value?.teams.rushing.find(r => r.team === boxScoreData.value?.gameInfo.homeTeam);
    const awayRushing = boxScoreData.value?.teams.rushing.find(r => r.team === boxScoreData.value?.gameInfo.awayTeam);

    return [{
        label: 'Power Success',
        homeValue: homeRushing?.powerSuccess,
        awayValue: awayRushing?.powerSuccess
    }, {
        label: 'Stuff Rate',
        homeValue: homeRushing?.stuffRate,
        awayValue: awayRushing?.stuffRate,
    }, {
        label: 'Line Yards',
        homeValue: homeRushing?.lineYards,
        awayValue: awayRushing?.lineYards
    }, {
        label: 'Line Yards per Rush',
        homeValue: homeRushing?.lineYardsAverage,
        awayValue: awayRushing?.lineYardsAverage,
    }, {
        label: 'Second Level Yards',
        homeValue: homeRushing?.secondLevelYards,
        awayValue: awayRushing?.secondLevelYards
    }, {
        label: 'Second Level Yards per Rush',
        homeValue: homeRushing?.secondLevelYardsAverage,
        awayValue: awayRushing?.secondLevelYardsAverage,
    }, {
        label: 'Open Field Yards',
        homeValue: homeRushing?.openFieldYards,
        awayValue: awayRushing?.openFieldYards
    }, {
        label: 'Open Field Yards per Rush',
        homeValue: homeRushing?.openFieldYardsAverage,
        awayValue: awayRushing?.openFieldYardsAverage,
    }]
});

const havocMetrics = computed(() => {
    const homeHavoc = boxScoreData.value?.teams.havoc.find(r => r.team === boxScoreData.value?.gameInfo.homeTeam);
    const awayHavoc = boxScoreData.value?.teams.havoc.find(r => r.team === boxScoreData.value?.gameInfo.awayTeam);

    return [{
        label: 'Total',
        homeValue: homeHavoc?.total,
        awayValue: awayHavoc?.total,
    }, {
        label: 'Front Seven',
        homeValue: homeHavoc?.frontSeven,
        awayValue: awayHavoc?.frontSeven,
    }, {
        label: 'DB',
        homeValue: homeHavoc?.db,
        awayValue: awayHavoc?.db,
    }]
});

const getTooltip = (key: string) => {
    const tooltip = tooltips[key];
    const html = `<div class="font-bold text-lg text-center">${tooltip.title}</div><hr /><div class="text-sm">${tooltip.content}</div>`;

    return {
        value: html,
        escape: true,
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

td[role="cell"]:has(.bg-green-300) {
    background-color: var(--green-300) !important;
}

td[role="cell"]:has(.bg-red-300) {
    background-color: var(--red-300) !important;
}

.boxscore-tooltip {
    .p-tooltip-text {
        width: 300px;
        background-color: var(--blue-400);
    }

    &.p-tooltip-right .p-tooltip-arrow {
        border-right-color: var(--blue-400);
    }
}</style>