<template>
  <button class="col-5 paragraph-2 pointer" :class="{ 'active': isActive }">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  isActive: { type: Boolean, required: false, default: false }
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/colors.scss';

button {
  border-radius: 5px;
  padding: 2px 0px;
  background-color: $g-300;
  color: $bg-700;
  font-weight: 400;
  transition: all .3s ease-in-out;

  &.active {
    border: solid 2px transparent;
    box-shadow: 0px 0px 10px 2px $g-500;  
  }
}
</style>