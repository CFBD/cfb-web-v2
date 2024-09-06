<template>
    <Card class="text-center m-3">
        <template #title>
            Teams
        </template>
        <template #subtitle>
            Select a team
        </template>
        <template #content>
            <div class="grid">
                <div v-for="c in conferences" :key="c.name" class="col-6 md:col-4 mt-3">
                    <div class="text-lg font-bold text-left mb-2">{{ c.name }}</div>
                    <div v-for="t in c.teams" :key="t.id" class="text-left">
                        <Button @click="goto(t.name)" link><img :src="`https://cdn.collegefootballdata.com/logos/48/${t.id}.png`" /><span class="ml-2">{{ t.name
                        }}</span></Button>
                    </div>
                </div>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from "vue";

import Button from "primevue/button";
import Card from 'primevue/card';

import { useMainStore } from '@/stores/main';
const mainStore = useMainStore();

import { useRouter } from "vue-router";
const router = useRouter();

let conferences: Ref<{ name: string, teams: { id: number, name: string }[] }[]> = ref([]);

const loadTeams = () => {
    let confs = Array.from(new Set(mainStore.teams.filter(t => t.classification === "fbs").map(t => t.conference))).sort();
    conferences.value = confs.map(c => ({
        name: c,
        teams: mainStore.teams
            .filter(t => t.conference == c)
            .map(t => ({
                id: t.id,
                name: t.school,
            }))
            .sort((a, b) => {
                let teamA = a.name.toLowerCase();
                let teamB = b.name.toLowerCase();

                if (teamA < teamB) {
                    return -1;
                } else {
                    return 1;
                }
            })
    }));
}

const goto = (team: string) => {
    router.push(`/team/${team}`);
};

onBeforeMount(async () => {
    if (mainStore.teams.length === 0) {
        await mainStore.loadTeams();
    }
    loadTeams();
});

</script>

<style scoped></style>