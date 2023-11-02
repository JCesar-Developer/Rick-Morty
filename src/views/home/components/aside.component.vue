<template>
  <div id="aside-component" class="d-flex flex-column justify-content-center align-items-center">

    <!-- Aside-image -->
    <div class="space-cruiser w-80">
      <img src="/src/assets/images/space-cruiser.png" alt="Space Cruiser" class="w-100">
    </div>

    <div class="logo w-80 my-2">
      <img src="/src/assets/images/logo.png" alt="Space Cruiser" class="w-100">
    </div>

    <div class="w-80 mt-4">
      <input id="searchbar" type="text" placeholder="Encuentra un personaje" class="w-100" v-model="searchText">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import debounce from 'lodash.debounce'

const emit = defineEmits({ search: (value: string) => true });
const searchText = ref<string>('');

watch(searchText, debounce(() => {
  emit('search', searchText.value);
}, 500))
</script>

<style scoped lang="scss">
@import '@/assets/styles/colors.scss';

#aside-component {
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