<template>
    <Card class="text-center m-3">
        <template #title>
            SP+ Team Trends
        </template>
        <template #subtitle>
            <p>SP+ is a rating system created by Bill Connelly (<a href='https://twitter.com/ESPN_BillC'>@ESPN_BillC</a>)
                that are meant to be a predictive comparison of teams. For a more detailed explanation, <a
                    href='https://www.sbnation.com/college-football/2017/10/13/16457830/college-football-advanced-stats-analytics-rankings'>see
                    this article</a>.</p>
            <p>Select a team and a data points to begin generating trend visualizations.</p>
            <div class="formgrid grid justify-content-center">
                <div class="col-12 sm:col-6 lg:col-3">
                    <div class="field">
                        <label>Team</label>
                        <Dropdown
                            :options="mainStore.teams.filter(t => t.classification == 'fbs' || t.classification == 'fcs')"
                            v-model="selectedTeam" option-label="school" placeholder="Select a team..." filter show-clear
                            class="w-full" @change="refreshData"></Dropdown>
                    </div>
                    <div class="field">
                        <label>Comparison Team</label>
                        <Dropdown
                            :options="mainStore.teams.filter(t => t.classification == 'fbs' || t.classification == 'fcs')"
                            v-model="comparisonTeam" option-label="school" placeholder="Select a team..." filter show-clear
                            class="w-full" @change="updateTeam2"></Dropdown>
                    </div>

                </div>
                <div class="field col-12 sm:col-6 lg:col-3">
                    <label>Data Point</label>
                    <Dropdown :options="datapoints" optionLabel="text" optionValue="value" v-model="selectedOption"
                        class="w-full" @change="reloadData"></Dropdown>
                </div>
            </div>
            <Divider></Divider>
            <div class="grid justify-content-center pt-5">
                <Chart type="line" :data="chartData" :options="chartOptions" class="w-10"></Chart>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Card from 'primevue/card';
import Chart from 'primevue/chart';
import Divider from 'primevue/divider';
import Dropdown from 'primevue/dropdown';

import http from "@/helpers/http";

import { useMainStore } from '@/stores/main';
const mainStore = useMainStore();

const datapoints = ref([{
    value: 'rating',
    text: 'Overall Rating'
}, {
    value: 'offense.rating',
    text: 'Offensive Rating'
}, {
    value: 'defense.rating',
    text: 'Defensive Rating'
}, {
    value: 'specialTeams.rating',
    text: 'Special Teams Rating'
}])

const selectedTeam = ref();
const comparisonTeam = ref();
const selectedOption = ref("rating");
const teamData = ref();
const comparisonTeamData = ref();
const conferenceData = ref();

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
                title: function (context: { parsed: { x: number } }[]) {
                    return `${context[0].parsed.x}`
                }
            }
        }
    },
    scales: {
        y: {
            scaleLabel: {
                display: true,
                text: 'Rating'
            }
        },
        x: {
            type: 'linear',
            ticks: {
                stepSize: 10,
                callback: (value: number) => {
                    return `${value}`;
                }
            },
            scaleLabel: {
                display: true,
                text: 'Year'
            }
        }
    }
});

const refreshData = () => {
    if (selectedTeam.value) {
        http.get('/ratings/sp', {
            params: {
                team: selectedTeam.value.school
            }
        }).then(results => {
            teamData.value = results.data;

            http.get('/ratings/sp/conferences', {
                params: {
                    conference: mainStore.conferences.find(c => c.name == selectedTeam.value?.conference)?.abbreviation
                }
            }).then(result => {
                conferenceData.value = result.data;
                reloadData();
            });
        });
    }
};

const updateTeam2 = () => {
    if (comparisonTeam.value) {
        http.get('/ratings/sp', {
            params: {
                team: comparisonTeam.value.school
            }
        }).then(results => {
            comparisonTeamData.value = results.data;
            reloadData();
        });
    } else {
        comparisonTeamData.value = null;
        reloadData();
    }
};

const reloadData = () => {
    if (selectedTeam.value && selectedOption.value && teamData.value) {
        // this.$ga.event('visualization', 'generation', 'sp-trends');
        chartOptions.value.plugins.title.text = `Team S&P+ Trends`;
        let data = teamData.value.filter((r: { team: string }) => r.team == selectedTeam.value.school).map((r: { year: number }) => ({ x: r.year, y: getValueByKey(r, selectedOption.value.split('.')) })).filter((r: { x: number, y: number }) => r.y);
        let averages = teamData.value.filter((r: { team: string }) => r.team == 'nationalAverages').map((r: { year: number }) => ({ x: r.year, y: getValueByKey(r, selectedOption.value.split('.')) })).filter((r: { x: number, y: number }) => r.y);
        let conferenceAverages = data.map((l: { x: number, y: number }) => {
            let item = conferenceData.value.find((d: { year: number }) => d.year == l.x);
            return item ? { x: l.x, y: getValueByKey(item, selectedOption.value.split('.')) } : null;
        }).filter((l: { y: number }) => l && l.y);

        let datasets = [{
            pointRadius: 5,
            borderColor: selectedTeam.value.color,
            fill: false,
            label: selectedTeam.value.school,
            data: data
        }, {
            borderDash: [5, 10],
            pointRadius: 0,
            borderColor: mainStore.darkMode ? '#444444' : '#cccccc',
            fill: false,
            label: 'National Average',
            data: averages
        }];

        if (comparisonTeam.value && comparisonTeamData.value && comparisonTeamData.value.length) {
            datasets.push({
                pointRadius: 5,
                borderColor: comparisonTeam.value.color,
                fill: false,
                label: comparisonTeam.value.school,
                data: comparisonTeamData.value.filter((r: { team: string }) => r.team == comparisonTeam.value.school).map((r: { year: number }) => ({ x: r.year, y: getValueByKey(r, selectedOption.value.split('.')) })).filter((r: { x: number, y: number }) => r.y)
            })
        }

        if (!(comparisonTeam.value && comparisonTeamData.value && comparisonTeamData.value.length) || (comparisonTeam.value && selectedTeam.value.conference == comparisonTeam.value.conference)) {
            datasets.push({
                borderDash: [10, 5],
                pointRadius: 0,
                borderColor: mainStore.darkMode ? '#779d9e' : '#a9e7e8',
                fill: false,
                label: `${selectedTeam.value.conference} Average`,
                data: conferenceAverages
            });
        }

        chartData.value = {
            // eslint-disable-next-line
            // @ts-ignore
            datasets
        };
    }
};

const getValueByKey = (obj: object, keys: string[]): object => {
    let first = keys.shift();
    // eslint-disable-next-line
    // @ts-ignore
    let newObj = obj[first];

    return keys.length ? getValueByKey(newObj, keys) : newObj;
}

</script>

<style scoped></style>