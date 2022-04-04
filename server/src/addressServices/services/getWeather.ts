import axios from 'axios';
import { RedisClient } from '../../core/db/redis';
import { weatherServiceUrl } from '../../config';

const getWeather = async (lon: string, lat: string) => {
  const cacheManager = new RedisClient();
  const cahceValue = await cacheManager.getData(JSON.stringify({ lat, lon }));
  if (cahceValue) {
    return JSON.parse(cahceValue);
  } else {
    const response = await axios.get(weatherServiceUrl, {
      params: { lat, lon, appid: process.env.OPEN_WEATHER_API_KEY },
    });
    if (cacheManager)
      await cacheManager.setData(
        JSON.stringify({ lat, lon }),
        JSON.stringify(response.data),
        6 * 60 * 60,
      );
    return response.data;
  }
};

export { getWeather };
