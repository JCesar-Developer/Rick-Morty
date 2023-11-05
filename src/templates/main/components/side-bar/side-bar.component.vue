<template>

  <div id="side-bar-component" class="row justify-content-center m-0" :class="{'active': sideBarStore.isOpen}">

    <CollapseButton @click="sideBarStore.deactivateSideBar"/>

    <div id="side-bar-container" class="d-flex flex-column justify-content-center align-items-center p-0 m-0">
      
      <div class="w-100 row justify-content-center m-0">
        <!-- Image -->
        <img src="@/assets/images/space-cruiser.png" alt="Space Cruiser" class="w-100 w-sm-80 p-0">
        <!-- Logo -->
        <img src="@/assets/images/logo.png" alt="Logo" class="w-100 w-sm-80 my-2 p-0">
      </div>

      <!-- Filters -->
      <!-- status-filters -->
      <div class="row w-100 justify-content-center gap-2">
        <p class="paragraph-2 t-gray text-center">Status</p>
        <FilterButton class="col-4" v-for="status in statusHandler" :key="status.id" @click="setStatus(status)" :is-active="activeStatus == status.id">
          {{ status.name }}
        </FilterButton>
      </div>

      <!-- gender-filters -->
      <div class="row w-80 justify-content-center mt-2 gap-2">
        <p class="paragraph-2 t-gray text-center">Gender</p>
        <FilterButton class="col-5" v-for="gender in genderHandler" :key="gender.id" @click="setGender(gender)" :is-active="activeGender == gender.id">
          {{ gender.name }}
        </FilterButton>
      </div>
      
      <!-- Search-bar -->
      <div class="w-80 mt-4">
        <SearchBar @search="emit('search')"/>
      </div>

      <!-- total-resoults -->
      <div v-if="getViewportWidth() < 576">
        <p class="paragraph-2 t-gray text-center mt-4">Total Results: {{ sideBarStore.totalResults }}</p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
//components
import FilterButton from '@/shared/components/filter-button.vue';
import CollapseButton from '@/shared/components/collapse-button.vue';
import SearchBar from '@/shared/components/search-bar.component.vue';

//composables
import { useSidebarStore } from '@/stores/sidebar.store';
import useStatusHandler from './composables/useStatusHandler.composable';
import useGenderHandler from './composables/useGenderHandler.composable';

//helpers
import { getViewportWidth } from '@/shared/helpers';

  const emit = defineEmits(['search']);
  const sideBarStore = useSidebarStore();

  const { activeStatus, statusHandler, setStatus } = useStatusHandler( emit );
  const { activeGender, genderHandler, setGender } = useGenderHandler( emit );
</script>

<style src="./side-bar.component.scss" scoped lang="scss"></style>