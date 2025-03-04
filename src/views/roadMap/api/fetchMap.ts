import L from "leaflet";

export function fetchMap(mapContainer: HTMLElement): L.Map {
  if (!mapContainer) throw new Error("지도를 불러올 수 없습니다.");

  const map = L.map(mapContainer, {
    zoomControl: false,
  }).setView([36.5, 127.5], 7);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  L.control.zoom({
    position: 'bottomright',
  }).addTo(map);

  const apiKey = "PLJVLTTE-PLJV-PLJV-PLJV-PLJVLTTED4"; // 
  const wmsUrl = `https://www.safemap.go.kr/openApiService/wms/getLayerData.do?apiKey=${apiKey}&request=GetMap`;

  const wmsLayer = L.tileLayer.wms(wmsUrl, {
    layers: "roadMap",
    format: "image/png",
    transparent: true,
    version: "1.3.0",
    crs: L.CRS.EPSG3857, 
  });

  wmsLayer.addTo(map);

  return map;
}
