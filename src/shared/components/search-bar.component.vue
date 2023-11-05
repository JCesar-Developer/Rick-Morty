w<template>
  <input id="searchbar" type="text" placeholder="Find a character" class="w-100" v-model="_search">
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import debounce from 'lodash.debounce'
import { useParamsStore } from '@/stores/params.store';

  const emit = defineEmits(['search']);
  const _search = ref<string>('');
  const paramsStore = useParamsStore();

  watch(_search, debounce(() => {
    paramsStore.setPage(1);
    paramsStore.setName(_search.value);
    emit('search');
  }, 500))
</script>

<style scoped lang="scss">
@import '@/assets/styles/colors.scss';

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
</style>