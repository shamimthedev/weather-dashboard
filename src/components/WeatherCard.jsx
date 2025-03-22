import React, { useState, useEffect } from 'react';

const WeatherCard = ({ city, removeCity, unit, setLoading }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchWeather = async () => {
      try {
        const apiKey = "9e659c01b6bc1f9d5a3a690df6657f76"; // Replace with your actual key
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        setWeather({
          temperature: data.main.temp,
          condition: data.weather[0].main,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, unit, setLoading]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weather) {
    return <div>Loading...</div>;
  }

  return (
    <div className="weather-card">
      <h3>{city}</h3>
      <p>{weather.condition}</p>
      <p>{`Temperature: ${weather.temperature}° ${unit === 'metric' ? 'C' : 'F'}`}</p>
      <p>{`Humidity: ${weather.humidity}%`}</p>
      <p>{`Wind Speed: ${weather.windSpeed} km/h`}</p>
      <button onClick={() => removeCity(city)}>Remove</button>
    </div>
  );
};

export default WeatherCard;