import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import CitySearch from './components/CitySearch';
import ToggleUnits from './components/ToggleUnits';

const App = () => {
  const [cities, setCities] = useState(() => {
    const storedCities = localStorage.getItem('cities');
    return storedCities ? JSON.parse(storedCities) : [];
  });
  const [unit, setUnit] = useState('metric'); // metric (Celsius) or imperial (Fahrenheit)
  const [loading, setLoading] = useState(false);

  const addCity = (city) => {
    if (cities.includes(city)) {
      alert('City already added');
      return;
    }
    setCities((prevCities) => {
      const updatedCities = [...prevCities, city];
      localStorage.setItem('cities', JSON.stringify(updatedCities));
      return updatedCities;
    });
  };

  const removeCity = (cityToRemove) => {
    setCities((prevCities) => {
      const updatedCities = prevCities.filter(city => city !== cityToRemove);
      localStorage.setItem('cities', JSON.stringify(updatedCities));
      return updatedCities;
    });
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => {
      const newUnit = prevUnit === 'metric' ? 'imperial' : 'metric';
      return newUnit;
    });
  };

  return (
    <div className="app">
      <h1>Weather Dashboard</h1>
      <CitySearch addCity={addCity} />
      <ToggleUnits toggleUnit={toggleUnit} unit={unit} />
      {loading && <div>Loading weather data...</div>}
      <div className="weather-grid">
        {cities.map((city) => (
          <WeatherCard
            key={city}
            city={city}
            removeCity={removeCity}
            unit={unit}
            setLoading={setLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default App;