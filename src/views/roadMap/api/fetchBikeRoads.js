import L from "leaflet";

// 🔹 API 키 (반드시 URL 인코딩된 값 사용)
const API_KEY = encodeURIComponent("Z90X4CIK-Z90X-Z90X-Z90X-Z90X4CIKO9");

// 🔹 WMS 서비스 URL
const WMS_URL = `https://www.safemap.go.kr/openApiService/wms/getLayerData.do?apikey=${API_KEY}`;

export function fetchBikeRoads(map) {
  try {
    const bikeRoadLayer = L.tileLayer.wms(WMS_URL, {
      layers: "A2SM_BIKE", // 자전거 도로 레이어명
      styles: "", // 스타일 없음
      format: "image/png",
      transparent: true,
    });

    map.addLayer(bikeRoadLayer);
    console.log("✅ 자전거 도로 WMS 레이어 추가됨!");

    return bikeRoadLayer;
  } catch (error) {
    console.error("❌ 자전거 도로 WMS 레이어를 추가하는 데 실패했습니다.", error);
  }
}
