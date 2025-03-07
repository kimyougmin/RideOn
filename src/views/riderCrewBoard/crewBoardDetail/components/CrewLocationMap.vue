<script setup>
import { onMounted, watch, ref } from 'vue'
import L from 'leaflet'
import { fetchBikeRoads } from '@/views/roadMap/api/fetchBikeRoads'

const props = defineProps({
  location: {
    type: String,
    required: true,
  },
})

const locationCoordinates = {
  '서울': { lat: 37.5665, lng: 126.9780 },
  '부산': { lat: 35.1796, lng: 129.0756 },
  '대구': { lat: 35.8714, lng: 128.6014 },
  '인천': { lat: 37.4563, lng: 126.7052 },
  '대전': { lat: 36.3504, lng: 127.3845 },
  '울산': { lat: 35.5384, lng: 129.3114 },
  '세종': { lat: 36.4801, lng: 127.2890 },
  '경기': { lat: 37.2750, lng: 127.0095 },
  '강원': { lat: 37.8854, lng: 127.7298 },
  '충북': { lat: 36.6357, lng: 127.4917 },
  '충남': { lat: 36.6588, lng: 126.6728 },
  '전북': { lat: 35.7175, lng: 127.1530 },
  '전남': { lat: 34.8679, lng: 126.9910 },
  '경북': { lat: 36.5760, lng: 128.5056 },
  '경남': { lat: 35.4606, lng: 128.2132 },
  '제주': { lat: 33.4996, lng: 126.5312 },
}

const map = ref(null)
const bikeRoadLayer = ref(null)

onMounted(() => {
  map.value = L.map('map').setView([37.5665, 126.9780], 12)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map.value)

  bikeRoadLayer.value = fetchBikeRoads(map.value)
})

watch(() => props.location, (newLocation) => {
  if (map.value && locationCoordinates[newLocation]) {
    const { lat, lng } = locationCoordinates[newLocation]
    map.value.setView([lat, lng], 12)
  }
})
</script>

<template>
  <div id="map" class="w-full h-64 mt-4 rounded-lg"></div>
</template>

