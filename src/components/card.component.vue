<template>
  <div class="card pointer" @click="toogleActive()">
    <div class="center w-100 gap-2">

      <!-- card-image -->
      <img :src="character.image" alt="profile image"/>

      <!-- card-description -->
      <div class="text-center">
        <p class="paragraph-1 bold">{{ character.name }}</p>
        <p class="paragraph-2 light">{{ character.species }}</p>
        <p class="paragraph-2">{{ character.origin.name }}</p>
      </div>

      <CardActive :character="character" :active="active"/>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CardActive from './card-active.component.vue'
import type { ICharacter } from '@/interfaces/character.interface';

defineProps({
  character: { type: Object as () => ICharacter, required: true }
})

const active = ref<boolean>(false)

const toogleActive = () => {
  active.value = !active.value
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/colors.scss';

.card {
  border: solid 3px $g-300;
  border-radius: 8px;
  background-color: $bg-500;
  width: 200px;
  aspect-ratio: 1/1.15;
  transition: all .2s ease-in-out;

  @media( max-width: 500px ) {
    width: 100%;
    aspect-ratio: 1/1.25; 
  }
  @media( max-width: 400px ) {
    aspect-ratio: 1/1.35; 
  }

  &:hover {
    box-shadow: 0px 0px 20px 2px $g-500;  
  }

  img {
    margin-top: -20px;
    border-radius: 50%;
    width: 110px;
    height: 110px;
    object-fit: cover;
    object-position: center;
  
    @media( max-width: 500px ) {
      width: 100px;
      height: 100px;
    }
  }

}
</style>