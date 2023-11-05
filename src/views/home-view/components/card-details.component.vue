<template>
  <div id="card-detail-component">
    <p class="paragraph-2 col p-0">{{ label }}:
      <span class="paragraph-2 t-gray" :class="status">{{ value || 'unknown' }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  status: { type: String, required: false }
})
</script>

<style scoped lang="scss">
@import '@/assets/styles/colors.scss';

#card-detail-component {
  .Alive::after {
    color: $alive;
    content: "•"; 
    font-size: 2.5rem;
    margin-left: 3px;
    vertical-align: middle;
  }
  .Dead::after {
    color: $dead;
    content: "•"; 
    font-size: 2.5rem;
    margin-left: 3px;
    vertical-align: middle;
  }
  .unknown::after {
    color: $state-unknown;
    content: "•"; 
    font-size: 2.5rem;
    margin-left: 3px;
    vertical-align: middle;
  }
}
</style>