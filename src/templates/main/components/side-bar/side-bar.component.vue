<template>

  <div id="side-bar-component" class="d-flex flex-column justify-content-center align-items-center" :class="{'active': sideBarStore.isOpen}">

    <CollapseButton @click="sideBarStore.deactivateSideBar"/>

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
      <FilterButton v-for="status in statusHandler" :key="status.id" @click="setStatus(status)" :is-active="activeStatus == status.id">
        {{ status.name }}
      </FilterButton>
    </div>

    <!-- filter-gender -->
    <div class="row w-80 justify-content-center mt-5 gap-2">
      <FilterButton v-for="gender in genderHandler" :key="gender.id" @click="setGender(gender)" :is-active="activeGender == gender.id">
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

//components
import FilterButton from '@/shared/components/filter-button.vue';
import CollapseButton from '@/shared/components/collapse-button.vue';

//composables
import { useSidebarStore } from '@/stores/sidebar.store';
import { useParamsStore } from '@/stores/params.store';
import useStatusHandler from './composables/useStatusHandler.composable';
import useGenderHandler from './composables/useGenderHandler.composable';

  const emit = defineEmits(['search']);

  const _search = ref<string>('');
  const paramsStore = useParamsStore();
  const sideBarStore = useSidebarStore();

  watch(_search, debounce(() => {
    paramsStore.setPage(1);
    paramsStore.setName(_search.value);
    emit('search');
  }, 500))

  const { activeStatus, statusHandler, setStatus } = useStatusHandler( emit );
  const { activeGender, genderHandler, setGender } = useGenderHandler( emit );

</script>

<style scoped lang="scss">
@import '@/assets/styles/colors.scss';

//custom-utilies
.w-80 {
  width: 80% !important;
}

//Viewport
#side-bar-component {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: $primary-color;
  z-index: 1;

  @media (max-width: 992px) {
    position: absolute;
    max-width: 380px;
    height: 100vh;
    left: -380px;
    transition: left 0.5s ease-in-out;

    &.active {
      left: 0;
    }
  }

  #collapse-button {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 3;
    display: none;

    @media (max-width: 992px) {
      display: flex;
    }
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