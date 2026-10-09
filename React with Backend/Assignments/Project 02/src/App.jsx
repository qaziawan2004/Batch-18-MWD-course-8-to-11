// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [city, setCity] = useState('');
//   const [weather, setWeather] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const API_KEY = '482f2fdf446bcb7891eea06c0ea25cb8';

//   const fetchWeather = async (e) => {
//     e.preventDefault();

//     if (!city.trim()) return;

//     setLoading(true);
//     setError('');
//     setWeather(null);

//     try {
//       const response = await axios.get(
//         `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
//       );

//       setWeather(response.data);
//     } catch (err) {
//       setError('City not found. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="weather-container">
//       <h1>React Weather App</h1>

//       <form onSubmit={fetchWeather} className="search-form">
//         <input
//           type="text"
//           placeholder="Enter city name..."
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//         />

//         <button type="submit">Search</button>
//       </form>

//       {loading && (
//         <p className="message">Loading weather data...</p>
//       )}

//       {error && (
//         <p className="message error">{error}</p>
//       )}

//       {weather && (
//         <div className="weather-card">
//           <h2>
//             {weather.name}, {weather.sys.country}
//           </h2>

//           <div className="weather-info">
//             <img
//               src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
//               alt={weather.weather[0].description}
//             />

//             <h3>{Math.round(weather.main.temp)}°C</h3>
//           </div>

//           <p className="description">
//             {weather.weather[0].description}
//           </p>

//           <div className="details">
//             <p>
//               <strong>Humidity:</strong> {weather.main.humidity}%
//             </p>

//             <p>
//               <strong>Wind Speed:</strong> {weather.wind.speed} m/s
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
 

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = '482f2fdf446bcb7891eea06c0ea25cb8';

function getUVLabel(value) {
  if (value == null || !Number.isFinite(value)) return 'Unavailable';
  if (value <= 2) return 'Low';
  if (value <= 5) return 'Moderate';
  if (value <= 7) return 'High';
  if (value <= 10) return 'Very High';
  return 'Extreme';
}

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [uvIndex, setUvIndex] = useState(null);
  const [uvError, setUvError] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (e) => {
    e.preventDefault();

    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }

    setLoading(true);
    setError('');
    setWeather(null);
    setUvIndex(null);
    setUvError(false);

    try {
      const response = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather',
        {
          params: {
            q: city.trim(),
            units: 'metric',
            appid: API_KEY,
          },
        }
      );

      const data = response.data;
      setWeather(data);
      console.log(data);
      
      setCity(data.name);

      try {
        const uvResponse = await axios.get(
          'https://api.openweathermap.org/data/3.0/onecall',
          {
            params: {
              lat: data.coord.lat,
              lon: data.coord.lon,
              exclude: 'minutely,hourly,daily,alerts',
              units: 'metric',
              appid: API_KEY,
            },
          }
        );

        setUvIndex(uvResponse.data.current.uvi);
      } catch {
        setUvError(true);
      }
    } catch (err) {
      setError(
        err.response?.status === 401
          ? 'Invalid API key. Check your OpenWeatherMap settings.'
          : err.response?.status === 429
          ? 'API request limit reached. Please try again later.'
          : 'City not found. Please try another city.'
      );
    } finally {
      setLoading(false);
    }
  };

  const windSpeed = weather
    ? (weather.wind.speed * 3.6).toFixed(1)
    : null;

  return (
    <main className="app">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Aura Weather home">
          <span className="brand-icon">☀</span>
          <span>Aura<span className="brand-accent">Weather</span></span>
        </a>

        <span className="live-status">
          <span className="status-dot" />
          CURRENT WEATHER
        </span>
      </header>

      <section className="hero">
        <p className="eyebrow">YOUR WEATHER, RIGHT NOW</p>

        <h1>
          Weather made <span>simple.</span>
        </h1>

        <p className="subtitle">
          Everything you need to know about the weather.
          Nothing you don't.
        </p>

        <form className="search-form" onSubmit={fetchWeather}>
          <span className="search-icon">⌕</span>

          <input
            type="text"
            placeholder="Search any city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            aria-label="City name"
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </button>
        </form>

        {error && (
          <p className="message error" role="alert">
            {error}
          </p>
        )}
      </section>

      {weather && (
        <section className="weather-dashboard" aria-live="polite">
          <div className="weather-main">
            <div className="location">
              <span className="location-pin">⌖</span>
              <div>
                <h2>
                  {weather.name}, {weather.sys.country}
                </h2>
                <p>Current conditions</p>
              </div>
            </div>

            <div className="current-weather">
              <div className="temperature-block">
                <p className="weather-description">
                  {weather.weather[0].description}
                </p>

                <div className="temperature">
                  {Math.round(weather.main.temp)}
                  <span>°C</span>
                </div>

                <p className="feels-like">
                  Feels like {Math.round(weather.main.feels_like)}°C
                </p>
              </div>

              <img
                className="weather-icon"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt={weather.weather[0].description}
              />
            </div>
          </div>

          <div className="section-heading">
            <div>
              <p className="eyebrow">LIVE CONDITIONS</p>
              <h2>Your weather details</h2>
            </div>
            <span className="details-count">03 DETAILS</span>
          </div>

          <div className="details-grid">
            <article className="detail-card humidity-card">
              <div className="detail-top">
                <span className="detail-icon humidity-icon">≋</span>
                <span className="detail-label">HUMIDITY</span>
              </div>

              <p className="detail-value">
                {weather.main.humidity}
                <span>%</span>
              </p>

              <p className="detail-description">
                Relative air moisture
              </p>

              <div className="meter">
                <span
                  style={{ width: `${weather.main.humidity}%` }}
                />
              </div>
            </article>

            <article className="detail-card wind-card">
              <div className="detail-top">
                <span className="detail-icon wind-icon">↗</span>
                <span className="detail-label">WIND SPEED</span>
              </div>

              <p className="detail-value">
                {windSpeed}
                <span> km/h</span>
              </p>

              <p className="detail-description">
                {weather.wind.deg != null
                  ? `Direction ${weather.wind.deg}°`
                  : 'Current wind speed'}
              </p>

              <div className="wind-indicator">
                <span>WIND</span>
                <span>→</span>
              </div>
            </article>

            <article className="detail-card uv-card">
              <div className="detail-top">
                <span className="detail-icon uv-icon">☀</span>
                <span className="detail-label">UV INDEX</span>
              </div>

              <p className="detail-value">
                {uvIndex != null ? uvIndex.toFixed(1) : '—'}
              </p>

              <p className="detail-description">
                {uvError
                  ? 'Enable One Call API access'
                  : uvIndex != null
                  ? getUVLabel(uvIndex) + ' UV exposure'
                  : 'Current UV level'}
              </p>

              <div className="uv-meter">
                <span
                  style={{
                    width:
                      uvIndex != null
                        ? `${Math.min(uvIndex / 11, 1) * 100}%`
                        : '0%',
                  }}
                />
              </div>
            </article>
          </div>

          <p className="updated-note">
            <span className="status-dot" />
            Live weather data for {weather.name}
          </p>
        </section>
      )}

      {!weather && !loading && !error && (
        <section className="empty-state">
          <div className="empty-icon">☁</div>
          <h2>Find your weather</h2>
          <p>
            Search for a city to see its current temperature,
            humidity, wind speed, and UV index.
          </p>
        </section>
      )}

      {loading && (
        <p className="loading-message">Fetching current conditions...</p>
      )}

      <footer className="footer">
        <span>✳ Aura Weather</span>
        <span>Just the weather. Nothing extra.</span>
      </footer>
    </main>
  );
}

export default App;