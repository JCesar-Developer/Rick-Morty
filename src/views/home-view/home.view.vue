<template>
  <div id="home-view">
    <InfiniteScroll :stop-scroll="stopScroll" :loading="showScrollLoader" class="center py-5" @scroll-end="onScrollEnd">
      <div class="thin-container">

        <Header class="d-none"></Header>

        <div id="title" class="h5 sm-h3 bolder mb-5 d-none">
          Lista de personajes
        </div>

        <!-- Card-component -->
        <div class="row row-gap-5">
          <div v-for="(character, index) in characters" :key="index" class="col-6 col-sm-4 col-xxl-3 center">
            <Card :character="character"></Card>
          </div>
        </div>

      </div>
    </InfiniteScroll>
  </div>
</template>

<script setup lang="ts">
import Header from '@/views/components/header.component.vue';
import Card from './components/card.component.vue';
import InfiniteScroll from '@/shared/components/infinite-scroll.component.vue';

import type { ICharacter } from '@/models/character.interface';
import type { PropType } from 'vue';

  defineProps({
    characters: { type: Array as PropType<ICharacter[]>, required: true },
    stopScroll: { type: Boolean, required: false, default: false },
    showScrollLoader: { type: Boolean, required: false, default: false }
  });

  const emit = defineEmits(['scroll-end']);

  const onScrollEnd = async () => {
    emit('scroll-end');
  }

</script>

<style src="./home-view.scss" scoped lang="scss"></style>