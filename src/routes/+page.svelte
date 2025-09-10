<script lang="ts">
  export let data;

  let activeTab: "current" | "history" = "current";

  function formatTime(ts: number) {
    return new Date(ts).toLocaleTimeString();
  }

  function weatherIcon(weather: string, hour: number) {
    if (weather.toLowerCase().includes("rain")) return "🌧️";
    if (hour >= 18 || hour < 6) return "🌙"; 
    return "☀️";
  }
</script>

<div class="container">
  <div class="header-card">
    <div class="header-content">
      <h1 class="title">My Weather</h1>
      <p class="subtitle">
        Stay updated with current weather and historical data
      </p>
    </div>
  </div>

  <div class="weather-card">
    <div class="tab-container">
      <button 
        class="tab-button {activeTab === 'current' ? 'active' : ''}"
        on:click={() => (activeTab = "current")}
      >
        <span class="tab-icon">🌤️</span>
        Current Weather
      </button>
      <button 
        class="tab-button {activeTab === 'history' ? 'active' : ''}"
        on:click={() => (activeTab = "history")}
      >
        <span class="tab-icon">📊</span>
        Weather History
      </button>
    </div>

    <div class="tab-content">
      {#if activeTab === "current"}
        <div class="current-weather">
          {#if data.weather}
            <div class="weather-info">
              <div class="location">
                <h2>{data.weather.city}, {data.weather.country}</h2>
              </div>
              
              <div class="main-weather">
                <div class="weather-icon">
                  {weatherIcon(data.weather.weather, new Date(data.weather.time).getHours())}
                </div>
                <div class="temperature">
                  {data.weather.temp}°C
                </div>
              </div>

              <div class="weather-details">
                <div class="detail-item">
                  <span class="detail-label">Condition</span>
                  <span class="detail-value">{data.weather.weather}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Sunrise</span>
                  <span class="detail-value">{formatTime(data.weather.sunrise)}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Sunset</span>
                  <span class="detail-value">{formatTime(data.weather.sunset)}</span>
                </div>
              </div>
            </div>
          {:else}
            <div class="no-data">
              <div class="no-data-icon">🌫️</div>
              <p>Weather data unavailable</p>
            </div>
          {/if}
        </div>
      {/if}

      {#if activeTab === "history"}
        <div class="history-weather">
          {#if data.history && data.history.length > 0}
            <div class="history-list">
              {#each data.history as item}
                <div class="history-item">
                  <div class="history-main">
                    <div class="history-icon">
                      {weatherIcon(item.weather, new Date(item.time).getHours())}
                    </div>
                    <div class="history-info">
                      <div class="history-location">{item.city}, {item.country}</div>
                      <div class="history-temp">{item.temp}°C</div>
                      <div class="history-condition">{item.weather}</div>
                    </div>
                  </div>
                  <div class="history-time">
                    {new Date(item.time).toLocaleString()}
                  </div>
                </div>
              {/each}
            </div>
          {:else}
            <div class="no-data">
              <div class="no-data-icon">📝</div>
              <p>No weather history available</p>
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </div>

  <div class="logout-container">
    <form method="POST" action="/logout">
      <button type="submit" class="logout-button">
        <span>🚪</span>
        Logout
      </button>
    </form>
  </div>
</div>

<style>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .header-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 32px;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin-bottom: 24px;
    color: white;
  }

  .header-content {
    max-width: 400px;
    margin: 0 auto;
  }

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0 0 12px 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
    margin: 0;
    line-height: 1.5;
  }

  .weather-card {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-bottom: 24px;
  }

  .tab-container {
    display: flex;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
  }

  .tab-button {
    flex: 1;
    padding: 16px 24px;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    color: #64748b;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .tab-button:hover {
    background: #e2e8f0;
    color: #475569;
  }

  .tab-button.active {
    background: white;
    color: #3b82f6;
    border-bottom: 2px solid #3b82f6;
  }

  .tab-icon {
    font-size: 1.2rem;
  }

  .tab-content {
    padding: 24px;
    min-height: 200px;
  }

  .current-weather {
    text-align: center;
  }

  .location h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 24px 0;
  }

  .main-weather {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    margin-bottom: 32px;
  }

  .weather-icon {
    font-size: 4rem;
  }

  .temperature {
    font-size: 3rem;
    font-weight: 700;
    color: #3b82f6;
  }

  .weather-details {
    display: grid;
    gap: 16px;
    max-width: 300px;
    margin: 0 auto;
  }

  .detail-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: #f8fafc;
    border-radius: 8px;
  }

  .detail-label {
    font-weight: 500;
    color: #64748b;
  }

  .detail-value {
    font-weight: 600;
    color: #1e293b;
  }

  .history-weather {
    max-height: 400px;
    overflow-y: auto;
  }

  .history-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .history-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: #f8fafc;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    transition: all 0.2s ease;
  }

  .history-item:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
  }

  .history-main {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .history-icon {
    font-size: 1.5rem;
  }

  .history-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .history-location {
    font-weight: 600;
    color: #1e293b;
  }

  .history-temp {
    font-size: 1.1rem;
    font-weight: 700;
    color: #3b82f6;
  }

  .history-condition {
    font-size: 0.9rem;
    color: #64748b;
  }

  .history-time {
    font-size: 0.875rem;
    color: #64748b;
    text-align: right;
  }

  .no-data {
    text-align: center;
    padding: 48px 24px;
    color: #64748b;
  }

  .no-data-icon {
    font-size: 3rem;
    margin-bottom: 16px;
  }

  .no-data p {
    font-size: 1.1rem;
    margin: 0;
  }

  .logout-container {
    text-align: center;
  }

  .logout-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.2);
  }

  .logout-button:hover {
    background: #dc2626;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  }

  .logout-button:active {
    transform: translateY(0);
  }

  /* Responsive Design */
  @media (max-width: 640px) {
    .container {
      padding: 16px;
    }

    .header-card {
      padding: 24px;
    }

    .title {
      font-size: 2rem;
    }

    .tab-button {
      padding: 12px 16px;
      font-size: 0.9rem;
    }

    .main-weather {
      flex-direction: column;
      gap: 16px;
    }

    .temperature {
      font-size: 2.5rem;
    }

    .history-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }

    .history-time {
      text-align: left;
    }
  }
</style>