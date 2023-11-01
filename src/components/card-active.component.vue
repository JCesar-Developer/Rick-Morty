<template>
  <div v-if="active" class="card-active-component">
    <div class="thin-container row justify-content-center">

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
import type { ICharacter } from '@/interfaces/character.interface';

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
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);

  .card-active {
    border: solid 3px $g-300;
    overflow: hidden;
    border-radius: 8px;
    height: 230px;

    img {
      object-fit: cover;
      object-position: center;
    }
  
  }
}
</style>