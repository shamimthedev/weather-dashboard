import { Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";

const WeatherCard = ({ city, removeCity, unit, setLoading }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [cityToRemove, setCityToRemove] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchWeather = async () => {
      try {
        const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
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
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  if (!weather) {
    return (
      <div className="text-gray-500 text-center p-4">Loading...</div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow-lg w-full max-w-xs transform transition-transform hover:scale-105">
      <h3 className="text-2xl font-bold mb-3 text-center">{city}</h3>
      <p className="text-lg text-center mb-4">{weather.condition}</p>
      <p className="text-4xl font-bold text-center mb-6">
        {weather.temperature}°{unit === "metric" ? "C" : "F"}
      </p>
      <div className="flex justify-between items-center text-sm mb-4">
        <div className="flex items-center space-x-2">
          <span>💧</span>
          <p>{weather.humidity}% Humidity</p>
        </div>
        <div className="flex items-center space-x-2">
          <span>🌬</span>
          <p>{weather.windSpeed} km/h</p>
        </div>
      </div>
      <button
        className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition duration-300 w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
        onClick={() => {
          setCityToRemove(city);
          setShowConfirmation(true);
        }}
      >
        <Trash2 className="w-4 h-4" />
        <span>Remove</span>
      </button>

      {showConfirmation && (
        <div className="fixed inset-0 bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-md">
            <h3 className="text-xl font-bold mb-4">Confirm Removal</h3>
            <p className="text-gray-700 mb-6 text-center">
              Are you sure you want to remove <span className="font-semibold">{cityToRemove}</span>?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                onClick={() => {
                  removeCity(cityToRemove); 
                  setShowConfirmation(false);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;