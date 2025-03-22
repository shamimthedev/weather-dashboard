import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import CitySearch from './components/CitySearch';
import ToggleUnits from './components/ToggleUnits';
import { Cloud } from 'lucide-react';

const App = () => {
  const [cities, setCities] = useState(() => {
    const storedCities = localStorage.getItem('cities');
    return storedCities ? JSON.parse(storedCities) : [];
  });
  const [unit, setUnit] = useState('metric');
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
    <main className="container mx-auto p-6">
      <div className="flex items-center justify-center space-x-3 mb-8">
        <Cloud className="w-10 h-10 text-blue-600 hidden sm:block" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-center text-transparent">
          Weather Dashboard
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
        <CitySearch addCity={addCity} />
        <ToggleUnits toggleUnit={toggleUnit} unit={unit} />
      </div>

      {loading && <div className="text-center mb-4">Loading weather data...</div>}

      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,400px))] justify-center">
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
    </main>
  );
};

export default App;