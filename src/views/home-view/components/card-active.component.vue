<template>
  <div v-if="active" class="card-active-component">
    <div class="thin-container row justify-content-center">

      <!-- CARD -->
      <div class="card-active col-11 col-sm-10 col-md-9 col-lg-8 bg-300">
        <div class="row h-100 justify-content-between">

          <!-- card-image -->
          <div class="col-5 h-100 p-0">
            <img :src="character.image" alt="profile image" class="w-100 h-100"/>
          </div>

          <!-- card-description -->
          <div class="col-7 text-start">
            <p class="h3 bold">{{ character.name }}</p>
            <p class="paragraph-2">{{ character.status}} - {{ character.species }}</p>
            <p class="paragraph-2">{{ character.location.name }}</p>
            <p class="paragraph-2">Tipo: {{ character.type }}</p>
            <p class="paragraph-2">Genero: {{ character.gender }}</p>
            <p class="paragraph-2">Origen: {{ character.origin.name }}</p>
            <p class="paragraph-2">Localización: {{ character.location.name }}</p>
            <p class="paragraph-2">Creado: {{ character.created }}</p>
            <p class="paragraph-2" v-for="(episode, index) in character.episode" :key="index">{{ episode }}</p>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import type { ICharacter } from '@/models/character.interface';

const props = defineProps({
  character: { type: Object as () => ICharacter, required: true },
  active: { type: Boolean, required: false }
})

watch( () => props.active , ( active ) => {
  active 
    ? document.body.style.overflow = 'hidden'
    : document.body.style.overflow = '';
})
</script>

<style lang="scss">
@import '@/assets/styles/colors.scss';
.card-active-component {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  bottom: 0;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 2;

  .card-active {
    border-radius: 8px;
    border: solid 3px $g-300;
    height: 230px;
    overflow: hidden;

    img {
      object-fit: cover;
      object-position: center;
    }
  
  }
}
</style>