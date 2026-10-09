import React, { useState } from 'react'
import "./App.css"
const App = () => {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const API = "482f2fdf446bcb7891eea06c0ea25cb8"

  const fetchWaether = async (e) => {

    e.preventDefault();

    if (!city.trim()) {
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API}`)
      setWeather(res.data);
    } catch (err) {
      setError(`City Not Found.Please Try Again!!!`)
    }
    finally {
      setLoading(false)
    }

  }

  return (
    <div className="weather-dashboard">
      <h1><i>Check Weather on  <span>1</span>Click </i></h1>

      <div className="card">
        <form onSubmit={fetchWaether}>
          <input type="text"
            placeholder="Search your City"
            value={city}
            onChange={(e) => setCity(e.target.value)} />
          <button type="submit">Search</button>
        </form>
        <div className="weather-listing">
          <h2>Karachi</h2>
          <p><strong>Temperature :</strong><span>21c</span></p>
          <div className="wind-section">
            <p><strong>Humadity :</strong><span>20%</span></p>
            <p><strong>Wind Speed :</strong> <span>km/h</span></p>
          </div>
        </div>

      </div>

    </div>
  )
}
export default App
