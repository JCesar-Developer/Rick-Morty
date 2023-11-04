<template>
  <div id="loading-view" class="black-curtain center justify-content-center">
    <img class="loading" src="@/assets/images/loading.png" alt="Loading...">
  </div>
</template>

<style scoped lang="scss">
#loading-view {
  .loading {
    width: 200px;
    animation: blink .5s linear infinite;
  }
  .not-found-img,
  .not-found-text {
    width: 40%;
  }

  @keyframes blink {
    0% {opacity: 1;}
    50% {opacity: 0.5;}
    100% {opacity: 1;}
  }
}
</style>