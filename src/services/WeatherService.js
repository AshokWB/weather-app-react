import { data } from "autoprefixer";

const API_KEY = "1667afb680871b0d6dd5814a70097259";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};
const formatCurrentWeather = (date) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;
  const { main: details, icon } = weather[0];
  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

const formatForecastWeather = (date) => {
  let { timezone, daily, hourly } = data;
  daily = daily.slice(1, 6).map(d=>{
    return{
        title: formatToLocalTime(d.dt, timezone, 'ccc'),
        temp:d.temp.day,
        icon:d.weather[0].icon 
    }
  });
  hourly = daily.slice(1, 6).map(d=>{
    return{
        title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
        temp:d.temp.day,
        icon:d.weather[0].icon 
    }
  });

  return{timezone,daily,hourly};
};
const getFormattedWeatherDate = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForcastWeather = await getWeatherData("onecall", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: searchParams.units,
  }).then(formatForecastWeather);

  return {...formattedCurrentWeather,...formatForecastWeather};
};
const formatToLocalTime =
  (secs,
  zone,
  (format = "cccc,dd LLL yyyy' | Local Time: 'hh:mm a") =>
    DateTime.fremSeconds(secs).setZone(zone).toFormat(format));

const iconUrlFromCode=(code)=> `http://openweathermap.org/img/wn/${code}@2x.png`
export default getFormattedWeatherDate;
export {formatToLocalTime,iconUrlFromCode}