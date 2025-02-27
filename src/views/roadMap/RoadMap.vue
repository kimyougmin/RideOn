<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fetchMap } from "./api/fetchMap";
import RideModal from "./RideModal.vue";
import MapHeader from "./MapHeader.vue";

const mapContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  if (mapContainer.value) {
    fetchMap(mapContainer.value);
  }
});
</script>

<template>
  <v-sheet class="w-screen h-screen relative">
    <MapHeader/>
    <div ref="mapContainer" class="w-full h-full relative z-0"></div>
    <RideModal/>
  </v-sheet>
</template>

<style>
@import "leaflet/dist/leaflet.css";
</style>
