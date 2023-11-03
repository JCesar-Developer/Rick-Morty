<template>
  <div id="styles-view">
    <div class="row w-100 gap-5 py-5 justify-content-center">
  
      <section class="style-container">
        <h1 class="h1">h1: Lorem ipsum dolor sit amet.</h1>
        <h2 class="h2">h2: Lorem ipsum dolor sit amet.</h2>
        <h3 class="h3">h3: Lorem ipsum dolor sit amet.</h3>
        <h4 class="h4">h4: Lorem ipsum dolor sit amet.</h4>
        <h5 class="h5">h5: Lorem ipsum dolor sit amet.</h5>
        <br>
        <p class="bold">Text bold</p>
        <p class="normal">Text normal</p>
        <p>Text regular</p>
        <p class="light">Text light</p>
        <br>
        <p class="paragraph-1">Paragraph 1</p>
        <p class="paragraph-2">Paragraph 2</p>
        <p class="paragraph-3">Paragraph 3</p>
      </section>
  
      <section class="style-container">
        <h1 class="w-100 text-start text-uppercase mb-2">Background colors</h1>
  
        <div class="color-palete">
          <div class="bg-container bg-900 w-100">Bg1</div>
          <div class="bg-container bg-700 w-100">Bg2</div>
          <div class="bg-container bg-500 w-100">Bg3</div>
          <div class="bg-container bg-300 w-100">Bg4</div>
          <div class="bg-container bg-100 w-100">Bg5</div>
          <div class="bg-container bg-50 w-100">Bg6</div>
        </div>
      </section>
  
      <section class="style-container">
        <h1 class="w-100 text-start text-uppercase mb-2">Accent colors</h1>
  
        <div class="color-palete">
          <div class="bg-container bg-g-500 w-100">Green1</div>
          <div class="bg-container g-300 w-100">Green2</div>
          <div class="bg-container g-100 w-100">Green2</div>
        </div>
      </section>
  
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
#styles-view {
  .style-container {
    width: 800px;

    .color-palete {
      border: lightgray 1px solid;
      width: 100%;

      .bg-container {
        height: 50px;
      }
    }
  }
}
</style>