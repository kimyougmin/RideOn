import L from "leaflet";

const API_KEY = encodeURIComponent(import.meta.env.VITE_BIKE_ROAD_API_KEY);
const WMS_URL = `https://www.safemap.go.kr/openApiService/wms/getLayerData.do?apikey=${API_KEY}`;


export function fetchBikeRoads(map) {
  try {
    const bikeRoadLayer = L.tileLayer.wms(WMS_URL, {
      layers: "A2SM_BIKE",
      styles: "",
      format: "image/png",
      transparent: true,
    });

    map.addLayer(bikeRoadLayer);
    return bikeRoadLayer;
  } catch (error) {
    console.error(error);
  }
}
