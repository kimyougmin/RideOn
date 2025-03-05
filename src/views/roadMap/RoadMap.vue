<script setup>
import { ref, onMounted } from "vue";
import MapHeader from "./MapHeader.vue";
import { fetchMap } from "./api/fetchMap";
import { fetchPlaces } from "./api/fetchPlaces";
import { fetchConvenienceFacilities } from "./api/fetchConvenience";
import MapModal from "./MapModal.vue";

const mapContainer = ref(null);
const map = ref(null);
const userLatLng = ref(null);
const selectedStation = ref(null);
const selectedFacility = ref(null);
const bikeMarkers = ref([]);
const airPumpMarkers = ref([]);
const rackMarkers = ref([]);
const repairMarkers = ref([]);
const isToggled = ref({
  bikeStations: false,
  airPumps: false,
  racks: false,
  repairShops: false
});

onMounted(() => {
  if (mapContainer.value) {
    const { map: mapInstance } = fetchMap(mapContainer.value, (location) => {
      userLatLng.value = location;
    });

    map.value = mapInstance;
  }
});


const toggleBikeStations = async () => {
  if (!map.value) return;

  if (!isToggled.value.bikeStations) {
    if (bikeMarkers.value.length > 0) {
      bikeMarkers.value.forEach(marker => map.value.removeLayer(marker));
      bikeMarkers.value = [];
    }

    const newMarkers = await fetchPlaces(map.value, userLatLng.value, (stationData) => {
      selectedStation.value = stationData;
    });

    bikeMarkers.value = newMarkers || [];
  } else {
    bikeMarkers.value.forEach(marker => map.value.removeLayer(marker));
    bikeMarkers.value = [];
  }

  isToggled.value.bikeStations = !isToggled.value.bikeStations;
};

const toggleConvenienceFacilities = async (type) => {
  if (map.value) {
    let targetMarkers = null;
    let toggleKey = null;

    if (type === "공기주입기") {
      targetMarkers = airPumpMarkers;
      toggleKey = "airPumps";
    } else if (type === "보관소") {
      targetMarkers = rackMarkers;
      toggleKey = "racks";
    } else if (type === "수리시설") {
      targetMarkers = repairMarkers;
      toggleKey = "repairShops";
    }

    if (!isToggled.value[toggleKey]) {
      const newMarkers = await fetchConvenienceFacilities(map.value, userLatLng.value, type, (facilityData) => {
        selectedFacility.value = facilityData;
      });

      targetMarkers.value = newMarkers;
    } else {

      targetMarkers.value.forEach(marker => map.value.removeLayer(marker));
      targetMarkers.value = [];
    }
    isToggled.value[toggleKey] = !isToggled.value[toggleKey];
  }
};
</script>

<template>
  <div class="w-screen h-screen relative">
    <div ref="mapContainer" class="absolute w-full h-full z-0"></div>
    <MapHeader />

    <MapModal
      v-if="selectedStation || selectedFacility"
      :stationName="selectedStation?.stationName || selectedFacility?.name"
      :availableBikes="selectedStation?.availableBikes"
      :address="selectedStation?.address || selectedFacility?.address"
      :facilityType="selectedFacility?.type"
      :operatingDays="selectedStation?.operatingDays"
    />


    <div class="relative flex top-[2.5%] w-full h-[42px] text-lg font-medium" >
  <div class="ml-auto flex gap-4 max-w-[600px] flex-shrink-0 justify-end pr-8">

    <button 
  @click="toggleBikeStations"
  :class="{
    'bg-white dark:text-black1 dark:bg-black9 dark:hover:bg-primaryRed hover:bg-primaryRed': !isToggled.bikeStations,
    'bg-primaryRed text-white dark:bg-primaryRed dark:text-white': isToggled.bikeStations
  }"
  class="flex items-center justify-center rounded-3xl gap-2 shadow-lg hover:scale-110 transition-transform duration-200"
>

공공자전거</button>

<button 
  @click="toggleConvenienceFacilities('수리시설')"
  :class="{
    'bg-white text-black dark:text-black1 dark:bg-black9 dark:hover:bg-primaryRed hover:bg-primaryRed': !isToggled.repairShops,
    'bg-primaryRed text-white dark:bg-primaryRed dark:text-white': isToggled.repairShops
  }"
  class="flex items-center justify-center rounded-3xl gap-2 shadow-lg hover:scale-110 transition-transform duration-200"
>

수리시설</button>

<button 
  @click="toggleConvenienceFacilities('공기주입기')"
  :class="{
    'bg-white text-black dark:text-black1 dark:bg-black9 dark:hover:bg-primaryRed hover:bg-primaryRed': !isToggled.airPumps,
    'bg-primaryRed text-white dark:bg-primaryRed dark:text-white': isToggled.airPumps
  }"
  class="flex items-center justify-center rounded-3xl gap-2 shadow-lg hover:scale-110 transition-transform duration-200"
>

공기주입기</button>
<button 
  @click="toggleConvenienceFacilities('보관소')"
  :class="{
    'bg-white text-black dark:text-black1 dark:bg-black9 dark:hover:bg-primaryRed hover:bg-primaryRed': !isToggled.racks,
    'bg-primaryRed text-white dark:bg-primaryRed dark:text-white': isToggled.racks
  }"
  class="flex items-center justify-center rounded-3xl gap-2 shadow-lg hover:scale-110 transition-transform duration-200"
>
보관소</button>
</div>
  </div>
  </div>
</template>

<style>
@import "leaflet/dist/leaflet.css";
</style>