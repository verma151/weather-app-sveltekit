<script lang="ts">
  export let data;

  let activeTab: "current" | "history" = "current";

  function formatTime(ts: number) {
    return new Date(ts).toLocaleTimeString();
  }

  function weatherIcon(weather: string, hour: number) {
    if (weather.toLowerCase().includes("rain")) return "🌧️";
    if (hour >= 18 || hour < 6) return "🌙"; // after 6pm or before 6am
    return "☀️";
  }
</script>

<h1 class="text-2xl font-bold mb-4">Weather Dashboard</h1>

<div class="mb-4">
  <button on:click={() => (activeTab = "current")}>Current Weather</button>
  <button on:click={() => (activeTab = "history")}>Weather History</button>
</div>

{#if activeTab === "current"}
  {#if data.weather}
    <div class="p-4 border rounded">
      <h2 class="text-lg font-bold">{data.weather.city}, {data.weather.country}</h2>
      <p>Temperature: {data.weather.temp}°C</p>
      <p>Sunrise: {formatTime(data.weather.sunrise)}</p>
      <p>Sunset: {formatTime(data.weather.sunset)}</p>
      <p>{weatherIcon(data.weather.weather, new Date(data.weather.time).getHours())} {data.weather.weather}</p>
    </div>
  {:else}
    <p>Weather data unavailable</p>
  {/if}
{/if}

{#if activeTab === "history"}
  <ul>
    {#each data.history as item}
      <li class="border-b p-2">
        {item.city}, {item.country} — {item.temp}°C — 
        {weatherIcon(item.weather, new Date(item.time).getHours())}
        <small>({new Date(item.time).toLocaleString()})</small>
      </li>
    {/each}
  </ul>
{/if}

<form method="POST" action="/logout" class="mt-4">
  <button type="submit">Logout</button>
</form>
