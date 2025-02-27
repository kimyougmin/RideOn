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
    <MapHeader class="fixed top-0 left-0 w-full z-10"/>
    <div ref="mapContainer" class="absolute w-full h-[93%] z-0"></div>
    <RideModal/>
  </div>
</template>

<style>
@import "leaflet/dist/leaflet.css";
</style>
