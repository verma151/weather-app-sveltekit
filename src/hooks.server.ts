import type { Handle } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import { saveWeatherEntry } from "./lib/server/weatherDb";

const WEATHER_API_KEY = "b91872c774f877283dc9faf31eed2a15";

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get("token");
  event.locals.user = token ? { token } : null;

  // protect main "/" route
  if (!event.locals.user && event.url.pathname === "/") {
    throw redirect(302, "/login");
  }

  if (event.url.pathname === "/" && event.locals.user) {
    try {
      // Get user IP location (fallback to Delhi)
      const ipRes = await fetch("http://ip-api.com/json/");
      const ipData = await ipRes.json();
      const lat = ipData.lat ?? 28.6139;
      const lon = ipData.lon ?? 77.2090;

      // Fetch weather
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const weatherData = await weatherRes.json();

      const weatherEntry = {
        city: weatherData.name,
        country: weatherData.sys.country,
        temp: weatherData.main.temp,
        sunrise: weatherData.sys.sunrise * 1000,
        sunset: weatherData.sys.sunset * 1000,
        weather: weatherData.weather[0].main,
        icon: weatherData.weather[0].icon,
        time: Date.now()
      };

      event.locals.weather = weatherEntry;

      // Save to file system
      saveWeatherEntry(weatherEntry);

    } catch (e) {
      console.error("Weather fetch failed:", e);
      event.locals.weather = null;
    }
  }

  return resolve(event);
};
