<template>

  <!-- GLOBAL-ERROR-HANDLER -->
  <Alert 
    :show="alert.show" 
    :message="alert.message" 
    :new-class="alert.newClass" 
    :position="alert.position"/>

  <!-- MAIN-TEMPLATE -->
  <div id="main-template" class="d-flex min-vh-100 flex-column flex-lg-row m-0 bg-700">

    <!-- Aside -->
    <SideBar class="col-lg-3 p-0" @search="searchCharacters($event)"/>

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
              :characters="characters" 
              :stop-scroll="stopScrolling" 
              :show-scroll-loader="showLoader"/>
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