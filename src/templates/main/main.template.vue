<template>

  <!-- GLOBAL-ERROR-HANDLER -->
  <Alert 
    :show="alert.show" 
    :message="alert.message" 
    :new-class="alert.newClass" 
    :position="alert.position"/>

  <!-- BLACK-CURTAIN -->
  <BlackCurtain :class="{'is-active': sideBarStore.isOpen}" @click="sideBarStore.deactivateSideBar"/>

  <!-- MAIN-TEMPLATE -->
  <!-- TODO: Aquí había un BG-700 y se veía bien -->
  <div id="main-template" class="d-flex min-vh-100 flex-column flex-lg-row m-0" @touchstart="startSwipe" @touchmove="swipe" @touchend="endSwipe">

    <!-- Aside -->
    <SideBar class="col-lg-3 p-0" @search="searchCharacters()"/>

    <div class="col-lg-9 p-0 position-relative">

      <Transition name="fade">
        <!-- Loading-view -->
        <template v-if="showLoadingScreen">
          <Loading/>
        </template>
  
        <template v-else>
          <!-- Home-view -->
          <template v-if="characters.length > 0">
            <Home 
              @scroll-end="loadMore" 
              :characters="characters"/>
          </template>

          <!-- Not-found-view -->
          <template v-else>
            <NotFound/>
          </template>
        </template>
      </Transition>

    </div>
  </div>
</template>

<script src="./main.template.ts" lang="ts"></script>
<style src="./main.template.scss" scoped lang="scss"></style>