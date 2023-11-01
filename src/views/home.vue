<template>
  <div id="home-view" class="vh-min-100 center py-5">
    <div class="thin-container row row-gap-5">

      <!-- first-row -->
      <div v-for="(character, index) in characters" :key="index" class="col-6 col-md-4 col-lg-3 center">
        <Card :character="character"></Card>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import Card from '@/components/card.component.vue';
import type { ICharacter } from '@/interfaces/character.interface';

const characters = ref<ICharacter[]|null>(null)

onBeforeMount( async () => {
  const response = await fetch("src/api/characters.fakeapi.json");
  const file = await response.json();
  characters.value = file.results;
});
</script>

<style scoped lang="scss">

</style>