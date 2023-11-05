<template>
  <div v-if="active" id="card-active-curtain">
    <div class="thin-container row justify-content-center">

      <!-- CARD -->
      <div id="card-active" class="col-9 col-sm-9 col-md-8 col-lg-7" :class="gender">
        <div class="row justify-content-between">

          <!-- card-image -->
          <div id="img-container" class="col-sm-4 p-0">
            <img :src="character.image" alt="profile image" class="w-100"/>
          </div>

          <!-- card-description -->
          <div id="description-container" class="col-12 col-sm-8 text-start py-2">
            <p id="title" class="h3 bold">{{ shortName }}</p>
            
            <div id="description" class="d-flex flex-column mt-2">
              <div class="row m-0">
                <p class="paragraph-2 col p-0">State: 
                  <span id="status" class="paragraph-2 t-gray" :class="status">
                    {{ character.status || 'unknown' }}
                  </span>
                </p>
                <p class="paragraph-2 col p-0">Gender: 
                  <span class="paragraph-2 t-gray">{{ character.gender || 'unknown' }}</span>
                </p>
              </div>
              <div class="row m-0">
                <p class="paragraph-2 col p-0">Species: 
                  <span class="paragraph-2 t-gray">{{ character.species }}</span>
                </p>
                <p class="paragraph-2 col p-0">Type: 
                  <span class="paragraph-2 t-gray">{{ character.type || 'unknown' }}</span>
                </p>
              </div>
              <p class="paragraph-2">Origin: 
                <span class="paragraph-2 t-gray">{{ character.origin.name || 'unknown' }}</span>
              </p>
              <p class="paragraph-2">Creation date: 
                <span class="paragraph-2 t-gray">{{ formattedDate }}</span>
              </p>
              <p class="paragraph-2">Last seen on:
                <span class="paragraph-2 t-gray">{{ character.location.name || 'unknown' }}</span>
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { ICharacter } from '@/models/character.interface';

  const props = defineProps({
    character: { type: Object as () => ICharacter, required: true },
    active: { type: Boolean, required: false }
  })

  const status = ref<string>( props.character.status );
  const gender = ref<string>( props.character.gender );

//watch( () => props.active , ( active ) => {
//  active 
//    ? document.body.style.overflow = 'hidden'
//    : document.body.style.overflow = '';
//})
  const shortName = computed(() => {
    return props.character.name.length > 15
      ? props.character.name.slice(0, 15)
      : props.character.name;
  });

  const formattedDate = computed(() => {
    const date = new Date( props.character.created );
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0 based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  });
</script>

<style lang="scss">
@import '@/assets/styles/colors.scss';

#card-active-curtain {
  //global-black-curtain
  background-color: rgba(0, 0, 0, 0.8);
  bottom: 0;
  height: 100%;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;

  //display
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  #card-active {
    position: relative;
    right: -58px;
    border-radius: 20px;
    border: solid 3px $g-300;
    border-left: none;
    height: 200px;
    overflow: visible;

    @media (max-width:576px) {
      display: flex;
      flex-direction: column;
      right: 0px;
      top: 0px;
      height: max-content;
      box-sizing: content-box;
      border: solid 7px $g-300;
    }

    &.Male {
      background-color: $male;
    }
    &.Female {
      background-color: $female;
    }
    &.Genderless {
      background-color: $genderless;
    }
    &.unknown {
      background-color: $gender-unknown;
    }

    #img-container{
      @media (max-width: 576px) {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
      }
      img {
        position: relative;
        box-sizing: content-box;
        top: -32px;
        left: -116px;
        min-width: 250px;
        min-height: 250px;
        border: solid 8px $g-300;
        object-position: center;
        border-radius: 50%;

        @media (max-width:576px) {
          top: auto;
          left: auto;
          min-width: auto;
          min-height: auto;
          margin: 10px;
          box-sizing: border-box;
          border: solid 3px $g-300;
          border-radius: 20px;
        }
      }
    }

    #description-container {
      height: 194px;
      p { line-height: 160%; }

      @media (max-width:576px) {
        height: max-content;
        margin-bottom: 20px;
        padding: 0 20px;
        #title { margin-bottom: 10px; }
      }

      #status::after {
        content: "•"; 
        font-size: 2.5rem;
        margin-left: 3px;
        vertical-align: middle;
      }
      #status.Alive::after {
        color: $alive;
      }
      #status.Dead::after {
        color: $dead;
      }
      #status.unknown::after {
        color: $state-unknown;
      }
    }
  
  }
}
</style>