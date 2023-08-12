<template>
    <div class="w-full justify-content-center">
        <div>
            <InputText class="w-10" v-model="searchTerm" @focus="isTyping = true" @blur="onBlur" @input="queryPlayers">
            </InputText>
        </div>
        <div class="flex justify-content-center player-suggestions-container">
            <Listbox v-show="showSuggestions" :options="players" optionLabel="displayName" @change="selectPlayer"
                class="player-search-suggestions w-10" @focus="isChanging = true"></Listbox>
            <!-- <div class="p-listbox p-component player-search-suggestions w-10">
                <div class="p-listbox-list-wrapper">
                    <ul class="p-listbox-list">
                        <li v-for="player in players" :key="player.id" class="p-listbox-item">{{ player.displayName }}</li>
                    </ul>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';
import InputText from 'primevue/inputtext';
import Listbox, { type ListboxChangeEvent } from 'primevue/listbox';

import http from "@/helpers/http";

const props = defineProps({
    modelValue: Number,
    position: String,
    school: String,
    year: Number,
    showTeam: Boolean
});

const emit = defineEmits(["update:modelValue", "selection"]);

const searchTerm = ref("");
const isTyping = ref(false);
const isChanging = ref(false);
const players: Ref<{ id: number; name: string; displayName: string }[]> = ref([]);
const selectedPlayerId: Ref<number | null> = ref(null);

const showSuggestions = computed(() => isTyping.value || isChanging.value);

const selectPlayer = (event: ListboxChangeEvent) => {
    isChanging.value = true;
    searchTerm.value = event.value?.name;
    selectedPlayerId.value = event.value?.id;
    emit("update:modelValue", event.value?.id);
    emit("selection", event.value);
    isChanging.value = false;
}

const queryPlayers = () => {
    if (!isChanging.value && searchTerm.value) {
        http.get('/player/search', {
            params: {
                position: props.position,
                school: props.school,
                year: props.year,
                searchTerm: searchTerm.value
            }
        }).then(result => {
            players.value = result.data.slice(0, 10).map((p: { name: string; team: string; }) => ({
                displayName: props.showTeam ? `${p.name} (${p.team})` : p.name,
                ...p
            }));
        });
    }
}

const onBlur = () => {
    setTimeout(() => isTyping.value = false, 200);
}

</script>

<style lang="scss">
.player-search-suggestions {
    position: absolute;
    z-index: 1;
    width: 100%;
    overflow: auto;
}

.player-suggestions-container {
    position: relative;
}
</style>