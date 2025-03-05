import L from "leaflet";

export async function fetchConvenienceFacilities(map, userLatLng, type, updateFacilityData) {
  const apiKey = import.meta.env.VITE_CONVENIENCE_API_KEY;
  const serviceName = "tvBicycleEtc";
  const startIndex = 1;
  const endIndex = 1000;

  const apiUrl = `http://openapi.seoul.go.kr:8088/${apiKey}/json/${serviceName}/${startIndex}/${endIndex}/`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (!data.tvBicycleEtc || !data.tvBicycleEtc.row) {
      return [];
    }

    let facilities = data.tvBicycleEtc.row;

    facilities = facilities.filter((facility) => {
      if (type === "공기주입기") return facility.FCLT_ID.includes("공기주입기");
      if (type === "보관소") return facility.FCLT_ID.includes("거치대");
      if (type === "수리시설") return facility.FCLT_ID.includes("수리") || facility.THMS_NM.includes("수리");
      return false;
    });

    if (userLatLng) {
      facilities.forEach((facility) => {
        facility.distance = userLatLng.distanceTo(L.latLng(parseFloat(facility.YCRD), parseFloat(facility.XCRD)));
      });
      facilities.sort((a, b) => a.distance - b.distance);
      facilities = facilities.slice(0, 100);
    } else {
      facilities = facilities.slice(0, 100);
    }
 

    let markers = [];

    facilities.forEach((facility) => {
      const name = facility.FCLT_ID;
      const lat = parseFloat(facility.YCRD);
      const lng = parseFloat(facility.XCRD);
      const address = facility.NEW_ADDR || "주소 정보 없음";
      const useYn = facility.USE_YN || "정보 없음";
      if (isNaN(lat) || isNaN(lng)) return;

      const iconColor =
        type === "공기주입기" ? "#1CA673" :
        type === "보관소" ? "#1A9EFE" :
        type === "수리시설" ? "#000000" : "#FF0000";

        const facilityIcon = L.divIcon({
          className: "custom-marker hover-effect",
          html: `
            <div class="transition-transform duration-200 transform hover:scale-125">
              <svg width="20" height="28" viewBox="0 0 42 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.7938 0C15.2811 0.00606477 9.99599 2.19849 6.09778 6.09631C2.19957 9.99413 0.00661711 15.279 0 20.7917C0 26.1458 4.14583 34.525 12.3229 45.6958C13.2964 47.0294 14.571 48.1144 16.0429 48.8623C17.5149 49.6102 19.1427 50.0001 20.7938 50.0001C22.4448 50.0001 24.0726 49.6102 25.5446 48.8623C27.0166 48.1144 28.2911 47.0294 29.2646 45.6958C37.4417 34.525 41.5875 26.1458 41.5875 20.7917C41.5809 15.279 39.3879 9.99413 35.4897 6.09631C31.5915 2.19849 26.3064 0.00606477 20.7938 0ZM20.7938 29.0792C19.1456 29.0792 17.5344 28.5904 16.164 27.6747C14.7936 26.7591 13.7255 25.4576 13.0948 23.9349C12.464 22.4121 12.299 20.7366 12.6205 19.1201C12.9421 17.5036 13.7358 16.0187 14.9012 14.8533C16.0666 13.6878 17.5515 12.8942 19.168 12.5726C20.7845 12.2511 22.4601 12.4161 23.9828 13.0468C25.5055 13.6776 26.807 14.7457 27.7227 16.1161C28.6383 17.4865 29.1271 19.0977 29.1271 20.7458C29.1271 22.956 28.2491 25.0756 26.6863 26.6384C25.1235 28.2012 23.0039 29.0792 20.7938 29.0792Z" fill="${iconColor}"/>
              </svg>
            </div>
          `,
          iconSize: [20, 28],
          iconAnchor: [10, 28],
          popupAnchor: [0, -28],
        });
        

      const marker = L.marker([lat, lng], { icon: facilityIcon }).addTo(map);
      markers.push(marker);

      marker.on("click", () => {
        updateFacilityData({
          name,
          type,
          useYn, 
          address,
        });
      });
    });

    return markers;
  } catch (error) {
    console.log(error)
  }
}
