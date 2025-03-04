import L from "leaflet";

export function fetchMap(mapContainer, onLocationUpdate) {
  if (!mapContainer) throw new Error("지도를 불러올 수 없습니다.");

  const map = L.map(mapContainer, { zoomControl: false }).setView([36.5, 127.5], 7);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  L.control.zoom({ position: "bottomright" }).addTo(map);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLatLng = L.latLng(position.coords.latitude, position.coords.longitude);
        console.log("✅ 내 위치 감지됨:", userLatLng);
        map.setView([position.coords.latitude, position.coords.longitude], 15);
        
        if (onLocationUpdate) {
          onLocationUpdate(userLatLng); // 콜백 함수 실행
        }
      },
      (error) => {
        console.error("🚨 내 위치 정보를 불러올 수 없습니다.", error);
      },
      { enableHighAccuracy: true, maximumAge: 0 }
    );
  }

  return { map };
}
