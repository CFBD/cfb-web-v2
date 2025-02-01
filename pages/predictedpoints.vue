<template>
    <Card class="text-center m-3">
        <template #title>
            Predicted Points
        </template>
        <template #subtitle>
            Select a down and distance points to begin generating visualizations
        </template>
        <template #content>
            <div class="formgrid grid justify-content-center">
                <div class="field col-12 sm:col-6 lg:col-3">
                    <label>Down</label>
                    <Dropdown :options="downs" v-model="selectedDown" class="w-full" @change="reloadData"></Dropdown>
                </div>
                <div class="field col-12 sm:col-6 lg:col-3">
                    <label>Distance</label>
                    <InputNumber v-model="distance" :min="1" :max="99" class="w-full" @update:model-value="reloadData">
                    </InputNumber>
                </div>
            </div>
            <Divider></Divider>
            <div class="grid justify-content-center pt-5">
                <Chart type="line" :options="chartOptions" :data="chartData" class="w-10"></Chart>
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
import InputNumber from 'primevue/inputnumber';

const config = useRuntimeConfig();

const downs = ref([1, 2, 3, 4]);
const selectedDown = ref();
const distance = ref(null);

const chartOptions = ref({
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: 'Predicted Points'
        }
    },
    scales: {
        y: {
            min: -2,
            max: 7,
            title: {
                display: true,
                text: 'Predicted Points'
            }
        },
        x: {
            type: "linear",
            min: 0,
            max: 100,
            title: {
                display: true,
                text: 'Yardline'
            }
        }
    }
});

const chartData = ref({
    datasets: []
});

const reloadData = () => {
    if (selectedDown.value && distance.value) {
        // this.$ga.event('visualization', 'generation', 'predicted-points');
        $fetch('/ppa/predicted', {
            method: 'GET',
            baseURL: config.public.apiBaseUrl,
            params: {
                down: selectedDown.value,
                distance: distance.value
            }
        }).then(results => {
            chartData.value = {
                // eslint-disable-next-line
                // @ts-ignore
                datasets: [{
                    pointRadius: 5,
                    fill: false,
                    data: results.map((d: { yardLine: number, predictedPoints: number }) => ({
                        x: `${d.yardLine}`,
                        y: d.predictedPoints
                    }))
                }]
            };
        })
    }
}
</script>

<style scoped></style>
