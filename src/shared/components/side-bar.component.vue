<template>
  <div id="side-bar-component" class="d-flex flex-column justify-content-center align-items-center">

    <!-- Image -->
    <div class="space-cruiser w-80">
      <img src="@/assets/images/space-cruiser.png" alt="Space Cruiser" class="w-100">
    </div>

    <!-- Logo -->
    <div class="logo w-80 my-2">
      <img src="@/assets/images/logo.png" alt="Space Cruiser" class="w-100">
    </div>

    <!-- Filters -->
    <!-- filter-status -->
    <div class="row w-80 justify-content-center gap-2">
      <FilterButton v-for="status in statusHandler" :key="status.id" @click="emitStatus(status)" :is-active="activeStatus == status.id">
        {{ status.name }}
      </FilterButton>
    </div>

    <!-- filter-gender -->
    <div class="row w-80 justify-content-center mt-5 gap-2">
      <FilterButton v-for="gender in genderHandler" :key="gender.id" @click="emitGender(gender)" :is-active="activeGender == gender.id">
        {{ gender.name }}
      </FilterButton>
    </div>

    <!-- Search-bar -->
    <div class="w-80 mt-4">
      <input id="searchbar" type="text" placeholder="Encuentra un personaje" class="w-100" v-model="_search">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import debounce from 'lodash.debounce'
import FilterButton from './filter-button.vue';
import useStatusHandler from '../composables/useStatusHandler.composable';
import useGenderHandler from '../composables/useGenderHandler.composable';

import type { ICharactersParams } from '@/api/api';

  const emit = defineEmits({ 
    search: (value: ICharactersParams) => value, 
  });

  const _search = ref<string>('');
  const _params: ICharactersParams = { page: 1 };

  watch(_search, debounce(() => {
    _params.page = 1;
    _params.name = _search.value;
    emit('search', _params);
  }, 500))

  const { activeStatus, statusHandler, emitStatus,  } = useStatusHandler(_params, emit);
  const { activeGender, genderHandler, emitGender } = useGenderHandler(_params, emit);

</script>

<style scoped lang="scss">
@import '@/assets/styles/colors.scss';

#side-bar-component {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: rgba(0, 0, 0, 0.3);

  .w-80 {
    width: 80% !important;
  }

  #searchbar {
    background-color: $bg-500;
    height: 35px;
    border-radius: 17.5px;
    border: none;
    padding: 0 15px;
    font-size: 14px;
    

    &::placeholder {
      color: $t-gray;
    }
  }
}
</style>