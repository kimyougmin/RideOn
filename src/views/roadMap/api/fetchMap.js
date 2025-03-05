import L from "leaflet";
import { fetchBikeRoads } from "./fetchBikeRoads"; // 🚴‍♂️ 자전거 도로 추가 함수 가져오기

export function fetchMap(mapContainer, onLocationUpdate) {
  if (!mapContainer) throw new Error("지도를 불러올 수 없습니다.");

  const map = L.map(mapContainer, { zoomControl: false }).setView([36.5, 127.5], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  L.control.zoom({ position: "bottomright" }).addTo(map);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLatLng = L.latLng(position.coords.latitude, position.coords.longitude);
        map.setView([position.coords.latitude, position.coords.longitude], 15);

        if (onLocationUpdate) {
          onLocationUpdate(userLatLng);
        }
      },
      (error) => {
        console.error(error);
      },
      { enableHighAccuracy: true, maximumAge: 0 }
    );
  }

  // 🚴‍♂️ 자전거 도로 데이터 추가
  fetchBikeRoads(map);

  return { map };
}
