import type { PageServerLoad } from "./$types";
import { getWeatherHistory } from "$lib/server/weatherDb";

export const load: PageServerLoad = async ({ locals }) => {
  

  return {
    user: locals.user,
    weather: locals.weather,
    history: locals.user ? getWeatherHistory(locals?.user?.email) : []
  };
};
