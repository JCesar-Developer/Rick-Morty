<template>
  <div id="animated-card">
    <div id="card-component" class="pointer card-animation" :class="gender" @click="activeCard()">
      <div class="center w-100 gap-2">
        <!-- card-image -->
        <img :src="character.image" alt="profile image"/>
        <!-- card-description -->
        <div class="text-center">
          <div class="paragraph-1 bold mb-2">
            <span id="status" :class="status">{{ character.name }}</span>
          </div>
          <p class="paragraph-3 light">Specie: {{ character.species }}</p>
          <p class="paragraph-3">Origin: {{ character.origin.name }}</p>
        </div>
      </div>
    </div>
  </div>

  <CardActive class="pointer" :character="character" :active="active" @click="deactiveCard()"/>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import CardActive from './card-active.component.vue'
import type { ICharacter } from '@/models/character.interface';

  const props = defineProps({
    character: { type: Object as () => ICharacter, required: true }
  })

  const active = ref<boolean>(false);
  const status = ref<string>( props.character.status );
  const gender = ref<string>( props.character.gender );

  const activeCard = () => {
    active.value = true;
  }
  const deactiveCard = () => {
    active.value = false;
  }
</script>

<style scoped lang="scss">
@import '@/assets/styles/colors.scss';
#animated-card {
  width: 200px;
  aspect-ratio: 1/1.15;

  @media( max-width: 480px ) {
    width: 100%;
    aspect-ratio: 1/1.25; 
  }
  @media( max-width: 400px ) {
    aspect-ratio: 1/1.35; 
  }
  @media (max-width: 690px) and (min-width: 576px){
    width: 100%;
    aspect-ratio: 1/1.45; 
  }
}

#card-component {
  border: solid 3px $g-300;
  border-radius: 8px;
  height: 100%;
  transition: all .2s ease-in-out;

  &.Male {
    background-color: $male;
  }
  &.Female {
    background-color: $female;
  }
  &.Genderless {
    background-color: $genderless;
  }
  &.unknown {
    background-color: $gender-unknown;
  }
  &:hover {
    box-shadow: 0px 0px 20px 2px $g-500;  
  }

  img {
    margin-top: -25px;
    margin-bottom: 10px;
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

  #status::before {
    content: "•"; 
    font-size: 2.8rem;
    margin-right: 3px; 
    vertical-align: middle;
  }
  #status.Alive::before {
    color: $alive;
  }
  #status.Dead::before {
    color: $dead;
  }
  #status.unknown::before {
    color: $state-unknown;
  }
}

//animations
#animated-card:hover .card-animation {
    perspective: 1000px;
    transform-style: preserve-3d;
    animation: rotateY 2s linear infinite; 
}

@keyframes rotateY {
    0% {
        transform: rotateY(0deg);
    }
    100% {
        transform: rotateY(360deg);
    }
}

</style>