<template>
  <button id="collapse-button">
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
  </button>

</template>

<style scoped lang="scss">
#collapse-button {
  align-items: center;
  background-color: rgba(90, 90, 90, 0.5);
  border-radius: 5px;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 35px;
  justify-content: space-between;
  padding: 8px 0px;
  width: 35px;

  .line {
    background-color: white;
    border-radius: 2px;
    height: 3px;
    width: 22.5px;
  }

  //@media (max-width: 960px) {
  //  display: flex;
  //}
}
</style>

