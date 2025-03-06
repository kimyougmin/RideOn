import axios from "axios";
import { KmaCoordConverter } from "../../../utils/KmaCoordConverter";

const API_BASE_URL = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const converter = new KmaCoordConverter();

const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
};

export async function fetchWeatherData(lat, lon) {
  try {
    const { nx, ny } = converter.convertToNx(lat, lon);
    const today = formatDate(new Date());
    const yesterday = formatDate(Date.now() - 86400000);
    const currentHour = new Date().getHours();

    const fetchData = async (baseDate, baseTime) => {
      const res = await axios.get(`${API_BASE_URL}/getVilageFcst`, {
        params: {
          serviceKey: decodeURIComponent(API_KEY),
          pageNo: 1,
          numOfRows: 100,
          dataType: "JSON",
          base_date: baseDate,
          base_time: baseTime,
          nx,
          ny,
        },
      });
      return res.data.response?.body?.items?.item || [];
    };

    const [weatherItems, minTempItems, maxTempItems] = await Promise.all([
      fetchData(today, "0500"),
      fetchData(today, "0200"),
      fetchData(currentHour >= 11 ? today : yesterday, "1100"),
    ]);

    const getClosestForecast = (category, sourceItems = weatherItems) => {
      const forecast = sourceItems.find((item) => item.category === category);
      return forecast ? Number(forecast.fcstValue) || 0 : null;
    };

    const getWeatherStatus = (sky, pty) => {
      if (pty === 1) return { text: "비", icon: "🌧️", message: "비가 내리고 있어요, 우비를 챙기세요!" };
      if (pty === 2) return { text: "비/눈", icon: "🌧️", message: "진눈깨비가 내려요, 노면이 미끄러울 수 있어요!" };
      if (pty === 3) return { text: "눈", icon: "🌨️", message: "눈이 내리고 있어요, 도로가 미끄러울 수 있으니 조심하세요!" };
      if (pty === 4) return { text: "소나기", icon: "🌦️", message: "소나기가 내릴 수 있어요, 잠깐 쉬었다 가는 것도 좋겠네요!" };
      if (sky === 1) return { text: "맑음", icon: "☀️", message: "라이딩 하기 좋은 날씨예요!" };
      if (sky === 3) return { text: "구름 많음", icon: "⛅", message: "라이딩할 만한 날씨예요, 하지만 바람이 강할 수도 있어요!" };
      if (sky === 4) return { text: "흐림", icon: "🌥️", message: "흐린 날씨네요, 우산을 챙기면 좋을 수도 있어요." };
      return { text: "알 수 없음", icon: "❓", message: "날씨 정보를 가져오는 데 문제가 발생했어요." };
    };

    const weatherStatus = getWeatherStatus(getClosestForecast("SKY"), getClosestForecast("PTY"));

    return {
      temperature: getClosestForecast("TMP"),
      minTemp: getClosestForecast("TMN", minTempItems),
      maxTemp: getClosestForecast("TMX", maxTempItems),
      humidity: getClosestForecast("REH"),
      rainProbability: getClosestForecast("POP"),
      precipitation: getClosestForecast("PCP") === 0 ? "강수없음" : `${getClosestForecast("PCP")}mm`,
      weatherText: weatherStatus.text,
      weatherIcon: weatherStatus.icon,
      weatherMessage: weatherStatus.message,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
