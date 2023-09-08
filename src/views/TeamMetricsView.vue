<template>
    <Card class="text-center m-3">
        <template #title>
            Team Metrics
        </template>
        <template #subtitle>
            Select metric criteria to compare
        </template>
        <template #content>
            <div class="formgrid grid mt-3 justify-content-center">
                <div class="field col-12 sm:col-6 lg:col-3">
                    <label>Year</label>
                    <Dropdown :options="mainStore.yearRanges" v-model="selectedYear" placeholder="Select a year"
                        class="w-full" @change="refreshData"></Dropdown>
                </div>
            </div>
            <div class="formgrid grid mt-3 justify-content-center">
                <div class="field col-12 sm:col-6 lg:col-3">
                    <label>Data Point 1</label>
                    <Dropdown :options="statTypes" optionLabel="text" optionValue="value" v-model="dataPoint1.statType"
                        placeholder="Select a type" class="w-full" @change="reloadData"></Dropdown>
                    <Dropdown :options="playFilters" optionLabel="text" optionValue="value" v-model="dataPoint1.playFilter"
                        class="w-full" @change="reloadData"></Dropdown>
                    <Dropdown :options="metricTypes1" optionLabel="text" optionValue="value" v-model="dataPoint1.metricType"
                        placeholder="Select a metric" class="w-full" @change="reloadData"></Dropdown>
                </div>
                <div class="field col-12 sm:col-6 lg:col-3">
                    <label>Data Point 2</label>
                    <Dropdown :options="statTypes" optionLabel="text" optionValue="value" v-model="dataPoint2.statType"
                        placeholder="Select a type" class="w-full" @change="reloadData"></Dropdown>
                    <Dropdown :options="playFilters" optionLabel="text" optionValue="value" v-model="dataPoint2.playFilter"
                        class="w-full" @change="reloadData"></Dropdown>
                    <Dropdown :options="metricTypes2" optionLabel="text" optionValue="value" v-model="dataPoint2.metricType"
                        placeholder="Select a metric" class="w-full" @change="reloadData"></Dropdown>
                </div>
            </div>
            <div class="formgrid grid mt-3 justify-content-center">
                <div class="field col-12 sm:col-6 lg:col-3">
                    <label>Conference Filter</label>
                    <Dropdown v-model="conference" :options="mainStore.fbsConferences" optionLabel="text"
                        optionValue="value" class="w-full" @change="reloadData">
                    </Dropdown>
                </div>
            </div>
            <div class="formgrid grid mt-3 justify-content-center">
                <div class="field col-12 sm:col-6 lg:col-3">
                    <label>Start Week</label>
                    <InputNumber v-model="startWeek" :use-grouping="false" :min="1" :max="20" class="w-full"
                        @change="refreshData"></InputNumber>
                </div>
                <div class="field col-12 sm:col-6 lg:col-3">
                    <label>End Week</label>
                    <InputNumber v-model="endWeek" :use-grouping="false" :min="1" :max="20" class="w-full"
                        @change="refreshData"></InputNumber>
                </div>
            </div>
            <Divider></Divider>
            <div class="grid justify-content-center pt-5">
                <Chart type="scatter" :data="chartData" :options="chartOptions" class="w-10"></Chart>
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

import { computed, onMounted, ref } from 'vue';

import { useMainStore } from "@/stores/main";
const mainStore = useMainStore();

import http from '@/helpers/http';

const statTypes = ref([{
    value: 'offense',
    text: 'Offense'
}, {
    value: 'defense',
    text: 'Defense'
}]);

const playFilters = ref([{
    value: 'all',
    text: 'All'
}, {
    value: 'standardDowns',
    text: 'Standard Downs'
}, {
    value: 'passingDowns',
    text: 'Passing Downs'
}, {
    value: 'rushingPlays',
    text: 'Rushing Plays'
}, {
    value: 'passingPlays',
    text: 'Passing Plays'
}]);

const metricTypes = ref([{
    value: 'rate',
    text: 'Rate',
    playFilters: ['rushingPlays', 'passingPlays']
}, {
    value: 'ppa',
    text: 'PPA',
    playFilters: ['all', 'standardDowns', 'passingDowns', 'rushingPlays', 'passingPlays']
}, {
    value: 'successRate',
    text: 'Success Rate',
    playFilters: ['all', 'standardDowns', 'passingDowns', 'rushingPlays', 'passingPlays']
}, {
    value: 'explosiveness',
    text: 'Explosiveness',
    playFilters: ['all', 'standardDowns', 'passingDowns', 'rushingPlays', 'passingPlays']
}, {
    value: 'powerSuccess',
    text: 'Power Success',
    playFilters: ['all', 'standardDowns', 'passingDowns', 'rushingPlays']
}, {
    value: 'stuffRate',
    text: 'Stuff Rate',
    playFilters: ['all', 'standardDowns', 'passingDowns', 'rushingPlays']
}, {
    value: 'lineYards',
    text: 'Line Yards',
    playFilters: ['all', 'standardDowns', 'passingDowns', 'rushingPlays']
}, {
    value: 'secondLevelYards',
    text: 'Second Level Yards',
    playFilters: ['all', 'standardDowns', 'passingDowns', 'rushingPlays']
}, {
    value: 'openFieldYards',
    text: 'Open Field Yards',
    playFilters: ['all', 'standardDowns', 'passingDowns', 'rushingPlays']
}, {
    value: 'pointsPerOpportunity',
    text: 'Pts/Scoring Opportunity',
    playFilters: ['all', 'standardDowns', 'passingDowns', 'rushingPlays', 'passingPlays']
}, {
    value: 'havoc.total',
    text: 'Total Havoc',
    playFilters: ['all', 'standardDowns', 'passingDowns', 'rushingPlays', 'passingPlays']
}, {
    value: 'havoc.frontSeven',
    text: 'Front 7 Havoc',
    playFilters: ['all', 'standardDowns', 'passingDowns', 'rushingPlays', 'passingPlays']
}, {
    value: 'havoc.db',
    text: 'DB Havoc',
    playFilters: ['all', 'standardDowns', 'passingDowns', 'rushingPlays', 'passingPlays']
}]);

const selectedYear = ref(mainStore.defaultYear);
const conference = 'All';
const startWeek = ref(null);
const endWeek = ref(null);
const dataItems = ref([]);
const chartData = ref([]);

const chartOptions = ref({
    plugins: {
        legend: {
            display: false
        },
    },
    title: {
        display: false,
        text: ''
    },
    scales: {
        y: {
            title: {
                display: true,
                text: 'Data Point 2'
            }
        },
        x: {
            title: {
                display: true,
                text: 'Data Point 1'
            }
        }
    }
});

const dataPoint1 = ref({
    statType: null,
    playFilter: 'all',
    metricType: null
});
const dataPoint2 = ref({
    statType: null,
    playFilter: 'all',
    metricType: null
});
const metricTypes1 = computed(() => metricTypes.value.filter(m => m.playFilters.includes(dataPoint1.value.playFilter)));
const metricTypes2 = computed(() => metricTypes.value.filter(m => m.playFilters.includes(dataPoint2.value.playFilter)));

const refreshData = async () => {
    http.get('/stats/season/advanced', {
        params: {
            year: selectedYear.value,
            excludeGarbageTime: true,
            startWeek: startWeek.value,
            endWeek: endWeek.value
        }
    }).then((res) => {
        dataItems.value = res.data;
        reloadData();
    })
};

const reloadData = () => {
    if (dataItems.value && dataPoint1.value.statType && dataPoint1.value.metricType && dataPoint2.value.statType && dataPoint2.value.metricType) {
        // this.$ga.event('visualization', 'generation', 'season-metrics');

        // eslint-disable-next-line
        // @ts-ignore
        let points = dataItems.value.filter(r => conference === 'All' || r.conference == conference).map(r => {
            let img = new Image();
            // eslint-disable-next-line
            // @ts-ignore
            img.src = `/logos/${mainStore.teams.find(t => t.school == r.team).id}.png`
            return img;
        });

        const data1Label = getDataPointLabel(dataPoint1.value);
        const data2Label = getDataPointLabel(dataPoint2.value);

        chartOptions.value.scales.x.title.text = data1Label;
        chartOptions.value.scales.y.title.text = data2Label;

        chartData.value = {
            // eslint-disable-next-line
            // @ts-ignore
            datasets: [{
                pointStyle: points,
                // eslint-disable-next-line
                // @ts-ignore
                data: dataItems.value.filter(r => conference == 'All' || r.conference == conference).map(r => ({
                    x: getValueByKey(r, data1Label.split('.')),
                    y: getValueByKey(r, data2Label.split('.'))
                }))
            }]
        };
    }
};
const getDataPointLabel = (dataPoint: { statType: string | null, playFilter: string | null, metricType: string | null }) => {
    return `${dataPoint.statType}.${dataPoint.playFilter == 'all' ? '' : `${dataPoint.playFilter}.`}${dataPoint.metricType}`;
};
const getValueByKey = (obj: object, keys: string[]): object => {
    let first: string = keys.shift() ?? '';
    // eslint-disable-next-line
    // @ts-ignore
    let newObj = obj[first];

    return keys.length ? getValueByKey(newObj, keys) : newObj;
}

onMounted(async () => {
    refreshData();
});

</script>

<style scoped></style>