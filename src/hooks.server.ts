import type { Handle } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import { saveWeatherEntry } from "./lib/server/weatherDb";
import jwt from "jsonwebtoken";

const WEATHER_API_KEY = "b91872c774f877283dc9faf31eed2a15";
const SECRET_KEY = "your_secret_key_here";

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get("token");

  let email: string | null = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY) as { email: string };
      email = decoded.email;

      event.locals.user = { token, email };
    } catch (e) {
      console.error("Invalid token");
      event.locals.user = null;
    }
  }

  // Protect main route
  if (!event.locals.user && event.url.pathname === "/") {
    throw redirect(302, "/login");
  }

  // Fetch weather and save per email
  if (event.url.pathname === "/" && event.locals.user && email) {
    try {
      const ipRes = await fetch("http://ip-api.com/json/");
      const ipData = await ipRes.json();
      const lat = ipData.lat ?? 28.6139;
      const lon = ipData.lon ?? 77.2090;

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

      // Save per user email
      saveWeatherEntry(email, weatherEntry);
    } catch (e) {
      console.error("Weather fetch failed:", e);
      event.locals.weather = null;
    }
  }

  return resolve(event);
};
