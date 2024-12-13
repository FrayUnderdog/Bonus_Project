import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "eb127721141477f82c30e4cb112e4b0f";

  const fetchWeather = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeather({
        temperature: data.main.temp,
        description: data.weather[0].description,
      });
      setError(null);
    } catch (err) {
      setWeather(null);
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={fetchWeather}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <button type="submit">Get Weather</button>
      </form>
      {weather && (
        <div className="weather-info">
          <p>Temperature: {weather.temperature}°C</p>
          <p>Description: {weather.description}</p>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
