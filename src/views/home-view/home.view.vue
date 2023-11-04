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

<style scoped lang="scss">
@import '@/assets/styles/colors.scss';

//custom typo-utilities
.sm-h3 {
  @media (min-width: 576px) {
    font-size: 28px;
  }
}

//viewport
#home-view {
  position: relative;

  #header {
    @media (max-width: 992px) {
      display: block !important;
    }
  }

  #title {
    @media (max-width: 992px) {
      display: flex !important;
      align-items: center;
      width: 100%;
      font-weight: 400 !important;

      &::after {
        content: "";
        flex-grow: 1;
        height: 2.5px;
        border-radius: 1.5px;
        background-color: $g-300;
        margin-left: 15px;
      }
    }
  }

  .infinite-scroll {

    @media (max-width: 575px) {
      &::-webkit-scrollbar {
        width: 0px;
      }
    }

    .thin-container {
      width: 900px;

      @media (max-width: 1200px) and (min-width: 992px) {
        width: 100%;
        padding: 0 3rem !important;
      }
      @media (max-width: 992px) {
        margin-top: 90px;
        width: 900px;
      }
      @media (max-width: 900px) {
        width: 100%;
        padding: 0 2rem !important;
      }

      @media (max-width: 575px) {
        margin-top: 80px;
      }
    }

    //Special-card-behaviors
    .thin-container {
      @media (max-width: 990px) and (min-width: 690px) {
        .row {
          justify-content: space-between;
          .col-6 {
            width: auto;
          }
        }
      }
      @media (max-width: 680px) and (min-width: 576px){
        .card { width: 100%; }
      }
      @media (max-width: 560px) and (min-width: 490px) {
        .row {
          justify-content: space-between;
          .col-6 {
            width: auto;
          }
        }
      }
    }
  }
}
</style>