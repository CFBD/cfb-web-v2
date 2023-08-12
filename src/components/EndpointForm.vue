<!-- ts-nocheck -->

<template>
    <Card class="m-2">
        <template #header>
            {{ apiStore.selectedEndpoint?.summary }}
        </template>
        <template #content>
            <div class="grid">
                <div class="col-3" v-for="qp in apiStore.selectedEndpoint?.path.get.parameters" :key="qp.name">
                    <div>
                        <label :for="`input-${qp.name}`">{{
                            //@ts-ignore
                            $filters.capitalize(qp.name)
                        }}</label>
                    </div>
                    <Dropdown v-if="isTeamParameter(qp.name)" :id="`input-${qp.name}`" :options="mainStore.teams"
                        v-model="apiStore.queryParams[qp.name]" option-label="school" option-value="school"
                        :placeholder="qp.description" filter show-clear class="w-10"></Dropdown>
                    <Dropdown v-else-if="isConferenceParameter(qp.name)" :id="`input-${qp.name}`"
                        :options="mainStore.conferences" v-model="apiStore.queryParams[qp.name]" option-label="name"
                        option-value="abbreviation" :placeholder="qp.description" filter show-clear class="w-10">
                    </Dropdown>
                    <Dropdown v-else-if="qp.name === 'playType'" :id="`input-${qp.name}`" :options="mainStore.playTypes"
                        v-model="apiStore.queryParams[qp.name]" option-label="text" option-value="id"
                        :placeholder="qp.description" filter show-clear class="w-10"></Dropdown>
                    <Dropdown v-else-if="qp.name === 'statTypeId'" :id="`input-${qp.name}`"
                        :options="mainStore.playStatTypes" v-model="apiStore.queryParams[qp.name]" option-label="name"
                        option-value="id" :placeholder="qp.description" filter show-clear class="w-10"></Dropdown>
                    <PlayerSearch v-else-if="qp.name == 'athleteId' || qp.name == 'playerId'" :placeholder="qp.description //@ts-ignore
                        " v-model="apiStore.queryParams[qp.name]" show-team>
                    </PlayerSearch>
                    <Checkbox v-else-if="qp.type === 'boolean'" :id="`input-${qp.name}`"
                        v-model="apiStore.queryParams[qp.name]" :binary="true">
                    </Checkbox>
                    <Dropdown v-else-if="qp.name === 'seasonType'" :id="`input-${qp.name}`"
                        :options="['regular', 'postseason', 'both']" v-model="apiStore.queryParams[qp.name]"
                        :placeholder="qp.description" class="w-10"></Dropdown>
                    <InputNumber v-else-if="qp.type === 'number' || qp.type === 'integer'" :id="`input-${qp.name}`"
                        :placeholder="qp.description //@ts-ignore
                            " :use-grouping="false" v-model="apiStore.queryParams[qp.name]" class="w-10">
                    </InputNumber>
                    <InputText v-else :id="`input-${qp.name}`" :placeholder="qp.description //@ts-ignore
                        " v-model="apiStore.queryParams[qp.name]" class="w-10">
                    </InputText>
                </div>
            </div>
            <div class="mt-3">
                <Button label="Query" @click="apiStore.query"></Button>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import Checkbox from 'primevue/checkbox';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import PlayerSearch from './PlayerSearch.vue';
import { useApiStore } from '@/stores/api';
import { useMainStore } from '@/stores/main';

const apiStore = useApiStore();
const mainStore = useMainStore();

const isTeamParameter = (paramName: string): boolean => {
    const nameParameters = ['home', 'away', 'offense', 'defense', 'college'];
    return nameParameters.includes(paramName.toLowerCase()) || paramName.toLowerCase().includes("team");
};

const isConferenceParameter = (paramName: string): boolean => {
    return paramName.toLowerCase().includes("conference");
};

</script>

<style scoped></style>