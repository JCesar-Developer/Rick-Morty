<template>
  <div v-if="active" id="card-active-curtain">
    <div class="thin-container row justify-content-center">

      <!-- CARD -->
      <div id="card-active" ref="cardActive" class="col-9 col-sm-9 col-md-8 col-lg-7 first-state" :class="gender">
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
                <CardDetails class="col p-0" label="State" :value="character.status" :status="status"/>
                <CardDetails class="col p-0" label="Gender" :value="character.gender"/>
              </div>
              <div class="row m-0">
                <CardDetails class="col p-0" label="Species" :value="character.species"/>
                <CardDetails class="col p-0" label="Type" :value="character.type"/>
              </div>
              <CardDetails label="Origin" :value="character.origin.name"/>
              <CardDetails label="Creation date" :value="formattedDate"/>
              <CardDetails label="Last seen on" :value="character.location.name"/>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import CardDetails from '../card-details.component.vue';
import useFormatData from './useFormatData.composable';
import type { ICharacter } from '@/models/character.interface';

  const props = defineProps({
    character: { type: Object as () => ICharacter, required: true },
    active: { type: Boolean, required: false }
  })

  const { shortName, formattedDate } = useFormatData( props.character );
  const cardActive = ref<HTMLElement | null>(null);
  const status = ref<string>( props.character.status );
  const gender = ref<string>( props.character.gender );

  watch( () => props.active, ( active ) => {
    setTimeout(() => {
      if( active ) 
      cardActive.value?.classList.add('active-state');
    }, 100);
  });
</script>

<style src="./card-active.component.scss" lang="scss"></style>