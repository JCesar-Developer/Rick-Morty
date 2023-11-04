<template>
  <div id="black-curtain"></div>
</template>

<style scoped lang="scss">
#black-curtain {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: rgba(25, 25, 25, 0.6);
  transition: opacity 0.4s ease;

  &.is-active {
    z-index: 1;
    opacity: 1;
  }
}
</style>