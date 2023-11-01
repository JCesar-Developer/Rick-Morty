<template>
  <div id="home-view" class="bg-700 vh-min-100 center py-5">
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

  import axios from 'axios';
  import { base_url, Endpoints } from '@/api/api';

  const characters = ref<ICharacter[]|null>(null)
  const url: string = base_url + Endpoints.Chararacters;


  onBeforeMount( async () => {

    try {
      const resp = await axios.get(url);
      characters.value = resp.data.results;
    } catch (error) {
      //TODO: Toast si no se encuentra respuesta del servidor
      console.log(error);
    }

  });
</script>

<style scoped lang="scss">

</style>