<template>
  <div class="infinite-scroll d-flex flex-column" ref="scrollContainer" @scroll="handleScrollEnd">
    <slot></slot>
    <Spinner v-if="!stopScroll && loading" class="my-3"></Spinner>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Spinner from './spinner.component.vue';

const emit = defineEmits(['scroll-end'])
const props = defineProps({ 
  stopScroll: { type: Boolean, required: false, default: false },
  loading: { type: Boolean, required: false, default: false }
})

const scrollContainer = ref<HTMLElement|null>(null)

const handleScrollEnd = () => {
  if (!scrollContainer.value) return;

  const totalHeight = scrollContainer.value.scrollHeight;
  const scrollPosition = scrollContainer.value.scrollTop;
  const viewportHeight = window.innerHeight;

  if ((totalHeight - scrollPosition -2 <= viewportHeight) && !props.stopScroll ) {
    emit('scroll-end');
  }
}
</script>

<style scoped lang="css">
.infinite-scroll {
  overflow-y: scroll;
  height: 0px;
  min-height: 100vh;
}
</style>