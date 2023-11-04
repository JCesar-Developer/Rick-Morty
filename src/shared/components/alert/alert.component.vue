<template>
  <div id="alert-component" ref="$alertComponent" class="py-2 px-3 rounded-4 d-none" :class="[newClass, position]">
    <div class="d-flex justify-content-between align-items-center gap-4">
      <span></span>
      <small>{{ message }}</small>
      <button type="button" class="btn-close" aria-label="Close" @click="hideAlert"></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { AlertPosition } from './alert-position.enum';

  const $alertComponent = ref<HTMLElement | null>(null);

  const props = defineProps({
    show: { type: Boolean, default: false, required: true },
    newClass: { type: String, default: 'bg-warning text-white', required: false },
    message: { type: String, default: 'This is an alert component', required: false },
    position: { type: String, default: AlertPosition.TOP_RIGHT, required: false }
  });

  watch(() => props.show, () => {
    showAlert();
  });

  const showAlert = () => {
    $alertComponent.value!.classList.remove('fade-out');
    $alertComponent.value!.classList.remove('d-none');
    $alertComponent.value!.classList.add('fade-in');

    setTimeout(() => {
      hideAlert();
    }, 5000);
  };

  const hideAlert = () => {
    $alertComponent.value!.classList.remove('fade-in');
    $alertComponent.value!.classList.add('fade-out');
  };
</script>

<style scoped lang="scss">
#alert-component {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  opacity: 0.9;
  position: fixed;
  width: fit-content;
  z-index: 2;

  &.top {
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
  }

  &.top-right {
    top: 10px;
    right: 30px;
  }

  &.bottom-right {
    bottom: 10px;
    right: 30px;
  }

  &.bottom {
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }

  .btn-close {
    align-items: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    height: 15px;
    width: 15px;
    margin: 0px;
    justify-content: center;
  }

  .btn-close::before {
    content: "×"; 
    font-size: 1.5rem;
    color: #333333;
  }

  &.fade-in {
    animation: fadeIn 0.5s ease-in-out forwards;
  }
  &.fade-out {
    animation: fadeOut 0.5s ease-in-out forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.9;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 0.9;
    }
    to {
      opacity: 0;
    }
  }
}
</style>
