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

  <div class="w-screen h-screen relative">
    <div ref="mapContainer" class="absolute w-full h-full z-0"></div>
    <RideModal/>
    <MapHeader/>
  </div>
</template>

<style>
@import "leaflet/dist/leaflet.css";
</style>
