<template>
  <div id="animated-card" class="pointer" @click="activeCard()">
    <div id="card-component" class="card-animation" :class="gender">
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

  <Transition name="fade">
    <CardActive class="pointer" :character="character" :active="active" @click="deactiveCard()"/>
  </Transition>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import CardActive from '@/views/home-view/components/card-active-component/card-active.component.vue'
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

<style src="./card.component.scss" scoped lang="scss"></style>