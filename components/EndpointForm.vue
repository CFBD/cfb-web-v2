<!-- ts-nocheck -->

<template>
  <Card class="m-3 pt-3">
    <template #header>
      {{ apiStore.selectedEndpoint?.description }}
    </template>
    <template #content>
      <div class="grid">
        <div
          class="col-12 md:col-6 lg:col-3"
          v-for="qp in apiStore.selectedEndpoint?.path.get.parameters"
          :key="qp.name"
        >
          <div>
            <label :for="`input-${qp.name}`">{{ capitalize(qp.name) }}</label>
          </div>
          <Dropdown
            v-if="isTeamParameter(qp.name)"
            :id="`input-${qp.name}`"
            :options="mainStore.teams"
            v-model="apiStore.queryParams[qp.name]"
            option-label="school"
            option-value="school"
            :placeholder="qp.description"
            filter
            show-clear
            class="w-10"
          ></Dropdown>
          <Dropdown
            v-else-if="isConferenceParameter(qp.name)"
            :id="`input-${qp.name}`"
            :options="mainStore.conferences"
            v-model="apiStore.queryParams[qp.name]"
            option-label="name"
            option-value="abbreviation"
            :placeholder="qp.description"
            filter
            show-clear
            class="w-10"
          >
          </Dropdown>
          <Dropdown
            v-else-if="qp.name === 'playType'"
            :id="`input-${qp.name}`"
            :options="mainStore.playTypes"
            v-model="apiStore.queryParams[qp.name]"
            option-label="text"
            option-value="id"
            :placeholder="qp.description"
            filter
            show-clear
            class="w-10"
          ></Dropdown>
          <Dropdown
            v-else-if="qp.name === 'statTypeId'"
            :id="`input-${qp.name}`"
            :options="mainStore.playStatTypes"
            v-model="apiStore.queryParams[qp.name]"
            option-label="name"
            option-value="id"
            :placeholder="qp.description"
            filter
            show-clear
            class="w-10"
          ></Dropdown>
          <PlayerSearch
            v-else-if="qp.name == 'athleteId' || qp.name == 'playerId'"
            :placeholder="
              qp.description //@ts-ignore
            "
            v-model="apiStore.queryParams[qp.name]"
            show-team
          >
          </PlayerSearch>
          <Checkbox
            v-else-if="qp.schema.type === 'boolean'"
            :id="`input-${qp.name}`"
            v-model="apiStore.queryParams[qp.name]"
            :binary="true"
          >
          </Checkbox>
          <Dropdown
            v-else-if="qp.name === 'seasonType'"
            :id="`input-${qp.name}`"
            :options="['regular', 'postseason', 'both']"
            v-model="apiStore.queryParams[qp.name]"
            :placeholder="qp.description"
            class="w-10"
          ></Dropdown>
          <Dropdown
            v-else-if="qp.name === 'classification'"
            :id="`input-${qp.name}`"
            :options="['fbs', 'fcs', 'ii', 'iii']"
            v-model="apiStore.queryParams[qp.name]"
            :placeholder="qp.description"
            class="w-10"
          ></Dropdown>
          <InputNumber
            v-else-if="
              qp.schema.type === 'number' || qp.schema.type === 'integer'
            "
            :id="`input-${qp.name}`"
            :placeholder="
              qp.description //@ts-ignore
            "
            :use-grouping="false"
            v-model="apiStore.queryParams[qp.name]"
            class="w-10"
          >
          </InputNumber>
          <InputText
            v-else
            :id="`input-${qp.name}`"
            :placeholder="
              qp.description //@ts-ignore
            "
            v-model="apiStore.queryParams[qp.name]"
            class="w-10"
          >
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
import PlayerSearch from './PlayerSearch.vue';
import { useApiStore } from '~/stores/api';
import { useMainStore } from '~/stores/main';
import { capitalize } from '~/utils';

const apiStore = useApiStore();
const mainStore = useMainStore();

const isTeamParameter = (paramName: string): boolean => {
  const nameParameters = ['home', 'away', 'offense', 'defense', 'college'];
  return (
    nameParameters.includes(paramName.toLowerCase()) ||
    paramName.toLowerCase().includes('team')
  );
};

const isConferenceParameter = (paramName: string): boolean => {
  return paramName.toLowerCase().includes('conference');
};
</script>

<style scoped></style>
