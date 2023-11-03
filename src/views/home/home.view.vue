<template>
  <div id="home-view" class="row row-gap-5">
    <div v-for="(character, index) in characters" :key="index" class="col-6 col-sm-4 col-xxl-3 center">
      <Card :character="character"></Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import Card from './components/card.component.vue';
import type { ICharacter } from '@/models/character.interface';

  defineProps({
    characters: {
      type: Array as PropType<ICharacter[]>,
      required: true
    }
  });
</script>

<style scoped lang="scss">
#home-view {

}
</style>