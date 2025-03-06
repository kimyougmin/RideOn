import axios from "axios";
import { KmaCoordConverter } from "../KmaCoordConverter";

const API_BASE_URL = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0"; // 기상청 API 주소
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // 기상청 API 키

const converter = new KmaCoordConverter();

function formatDate(date) {
  const year = new Date(date).getFullYear();
  const month = String(new Date(date).getMonth() + 1).padStart(2, "0");
  const day = String(new Date(date).getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

export async function fetchWeatherData(lat, lon) {
  try {
    const { nx, ny } = converter.convertToNx(lat, lon);
    const today = formatDate(new Date()); // 오늘 날짜 (YYYYMMDD)
    const yesterday = formatDate(new Date(Date.now() - 86400000)); // 어제 날짜 (YYYYMMDD)

    const currentHour = new Date().getHours(); // 현재 시간 (24시간 형식)

    // ✅ 기본 날씨 데이터 요청 (현재 기온, 습도, 강수 확률, 강수량, SKY, PTY)
    const response = await axios.get(`${API_BASE_URL}/getVilageFcst`, {
      params: {
        serviceKey: decodeURIComponent(API_KEY),
        pageNo: 1,
        numOfRows: 350,
        dataType: "JSON",
        base_date: today,
        base_time: "0500", // 기본적으로 05:00 발표 데이터 사용
        nx,
        ny,
      },
    });

    // ✅ TMN(최저 기온) 데이터를 가져오기 위한 요청 (02:00 발표 데이터)
    const minTempResponse = await axios.get(`${API_BASE_URL}/getVilageFcst`, {
      params: {
        serviceKey: decodeURIComponent(API_KEY),
        pageNo: 1,
        numOfRows: 100,
        dataType: "JSON",
        base_date: today,
        base_time: "0200", // 최저 기온은 02:00 발표 데이터에서만 제공
        nx,
        ny,
      },
    });

    // ✅ TMX(최고 기온) 데이터를 가져오기 위한 요청 (11:00 발표 데이터)
    const maxTempResponse = await axios.get(`${API_BASE_URL}/getVilageFcst`, {
      params: {
        serviceKey: decodeURIComponent(API_KEY),
        pageNo: 1,
        numOfRows: 100,
        dataType: "JSON",
        base_date: currentHour >= 11 ? today : yesterday, // 오전 11시 이전이면 어제 데이터 사용
        base_time: "1100", // 최고 기온 데이터는 11:00 발표 데이터에서만 제공
        nx,
        ny,
      },
    });

    console.log("API 응답 데이터:", response.data);
    console.log("TMN 응답 데이터:", minTempResponse.data);
    console.log("TMX 응답 데이터:", maxTempResponse.data);

    if (!response.data.response || response.data.response.header.resultCode !== "00") {
      throw new Error("날씨 데이터를 가져올 수 없습니다.");
    }

    const items = response.data.response.body.items.item;
    const minTempItems = minTempResponse.data.response.body.items.item; // TMN 데이터 포함
    const maxTempItems = maxTempResponse.data.response.body.items.item; // TMX 데이터 포함

    // 가장 가까운 시간 데이터를 찾기 위한 필터링 함수
    function getClosestForecast(category, sourceItems = items) {
      const forecastItems = sourceItems
        .filter((item) => item.category === category)
        .sort((a, b) => Math.abs(a.fcstTime - currentHour * 100) - Math.abs(b.fcstTime - currentHour * 100));

      if (forecastItems.length === 0) return null;

      let value = forecastItems[0].fcstValue;

      // ✅ 강수량(PCP)이 "강수없음"이면 0으로 변환
      if (category === "PCP" && (value === "강수없음" || isNaN(Number(value)))) {
        return 0;
      }

      return Number(value);
    }

    function getWeatherStatus(sky, pty) {
      if (pty === 1) return { text: "비", icon: "🌧️", message: "비가 내리고 있어요, 우비를 챙기세요!" };
      if (pty === 2) return { text: "비/눈", icon: "🌧️", message: "진눈깨비가 내려요, 노면이 미끄러울 수 있어요!" };
      if (pty === 3) return { text: "눈", icon: "🌨️", message: "눈이 내리고 있어요, 도로가 미끄러울 수 있으니 조심하세요!" };
      if (pty === 4) return { text: "소나기", icon: "🌦️", message: "소나기가 내릴 수 있어요, 잠깐 쉬었다 가는 것도 좋겠네요!" };
      if (sky === 1) return { text: "맑음", icon: "☀️", message: "라이딩 하기 좋은 날씨예요!" };
      if (sky === 3) return { text: "구름 많음", icon: "⛅", message: "라이딩할 만한 날씨예요, 하지만 바람이 강할 수도 있어요!" };
      if (sky === 4) return { text: "흐림", icon: "🌥️", message: "흐린 날씨네요, 우산을 챙기면 좋을 수도 있어요." };
      return { text: "알 수 없음", icon: "❓", message: "날씨 정보를 가져오는 데 문제가 발생했어요." };
    }


    const skyValue = getClosestForecast("SKY");
    const ptyValue = getClosestForecast("PTY");
    const weatherStatus = getWeatherStatus(skyValue, ptyValue);

    // 필요한 데이터만 필터링
    const weatherData = {
      temperature: getClosestForecast("TMP"), // 🌡 현재 기온
      minTemp: getClosestForecast("TMN", minTempItems), // 📉 최저 기온
      maxTemp: getClosestForecast("TMX", maxTempItems), // 📈 최고 기온
      humidity: getClosestForecast("REH"), // 💧 습도
      rainProbability: getClosestForecast("POP"), // ☔ 강수 확률
      precipitation: getClosestForecast("PCP") === 0 ? "강수없음" : `${getClosestForecast("PCP")}mm`, // 🌧 강수량
      weatherText: weatherStatus.text, // 🌤 날씨 상태 (텍스트)
      weatherIcon: weatherStatus.icon, // 🌤 날씨 상태 (이모티콘)
      weatherMessage: weatherStatus.message,
    };

    return weatherData;
  } catch (error) {
    console.error("날씨 데이터 가져오기 실패:", error);
    return null;
  }
}
