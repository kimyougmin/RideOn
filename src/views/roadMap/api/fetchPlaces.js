import L from "leaflet";

export async function fetchPlaces(map, userLatLng, updateStationData) {
  const apiKey = "IRGhFxC5PMvHbBWM%2F7LTGlQgR85OTnVunXgsxVV3UPEA4904FIiFn6%2BKnxOhd5QcdyQqDc9ncFkzSRhy%2Bls5pw%3D%3D";

  const stationUrl = `http://apis.data.go.kr/B551982/pbdo/inf_101_00010001?serviceKey=${apiKey}&numOfRows=1000&pageNo=`;
  const availableBikesUrl = `http://apis.data.go.kr/B551982/pbdo/inf_101_00010002?serviceKey=${apiKey}&numOfRows=1000&pageNo=`;

  try {
    const fetchData = async (url, numPages) => {
      const allData = [];
      for (let pageNo = 1; pageNo <= numPages; pageNo++) {
        const res = await fetch(`${url}${pageNo}&_type=json`);
        const data = await res.json();
        if (data.body?.item) {
          allData.push(...data.body.item);
        }
      }
      return allData;
    };

    const stations = await fetchData(stationUrl, 7);
    const availableBikes = await fetchData(availableBikesUrl, 7);

    if (!stations.length || !availableBikes.length) {
      console.warn("대여소 또는 사용 가능한 자전거 데이터가 없습니다.");
      return;
    }

    const bikeDataMap = new Map();

    availableBikes.forEach((bike) => {
      const bikeStationId = bike.rntstnId?.trim();
      if (bikeStationId) {
        bikeDataMap.set(bikeStationId, { available: bike.bcyclTpkctNocs || "0" });
      }
    });

    if (userLatLng) {
      stations.forEach((station) => {
        station.distance = userLatLng.distanceTo(L.latLng(parseFloat(station.lat), parseFloat(station.lot)));
      });
      stations.sort((a, b) => a.distance - b.distance);
      stations.splice(100);
    } else {
      stations.splice(100);
    }

    stations.forEach((station) => {
      const stationName = station.rntstnNm.replace(/^\d+\.\s*/, "");
      const lat = parseFloat(station.lat);
      const lng = parseFloat(station.lot);
    
      const bikeData = bikeDataMap.get(station.rntstnId?.trim()) || { available: "0" };
      const available = bikeData.available;
      const address = station.roadNmAddr;
      const facilityType = station.rntstnFcltTypeNm || "정보 없음";
      const operatingDays = station.rntstnOperDayoffDayCn || "정보 없음";
    
      const customIcon = L.divIcon({
        className: 'custom-icon', 
        html: `
          <svg width="20" height="28" viewBox="0 0 42 50" fill="none" xmlns="http://www.w3.org/2000/svg" class="transition-transform duration-200 transform hover:scale-125">
            <path d="M20.7938 0C15.2811 0.00606477 9.99599 2.19849 6.09778 6.09631C2.19957 9.99413 0.00661711 15.279 0 20.7917C0 26.1458 4.14583 34.525 12.3229 45.6958C13.2964 47.0294 14.571 48.1144 16.0429 48.8623C17.5149 49.6102 19.1427 50.0001 20.7938 50.0001C22.4448 50.0001 24.0726 49.6102 25.5446 48.8623C27.0166 48.1144 28.2911 47.0294 29.2646 45.6958C37.4417 34.525 41.5875 26.1458 41.5875 20.7917C41.5809 15.279 39.3879 9.99413 35.4897 6.09631C31.5915 2.19849 26.3064 0.00606477 20.7938 0ZM20.7938 29.0792C19.1456 29.0792 17.5344 28.5904 16.164 27.6747C14.7936 26.7591 13.7255 25.4576 13.0948 23.9349C12.464 22.4121 12.299 20.7366 12.6205 19.1201C12.9421 17.5036 13.7358 16.0187 14.9012 14.8533C16.0666 13.6878 17.5515 12.8942 19.168 12.5726C20.7845 12.2511 22.4601 12.4161 23.9828 13.0468C25.5055 13.6776 26.807 14.7457 27.7227 16.1161C28.6383 17.4865 29.1271 19.0977 29.1271 20.7458C29.1271 22.956 28.2491 25.0756 26.6863 26.6384C25.1235 28.2012 23.0039 29.0792 20.7938 29.0792Z" fill="#DC3644"/>
          </svg>
        `,
        iconSize: [20, 30],
        iconAnchor: [12, 30],
        popupAnchor: [0, -30],
      });
      
      
    
      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
    
      marker.on('click', () => {
        updateStationData({
          stationName,
          availableBikes: available,
          address,
          facilityType,
          operatingDays,
        });
      });
    });
    
  } catch (error) {
    console.error(error);
  }
}
