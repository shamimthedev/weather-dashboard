import React, { useState, useEffect } from 'react';

const CitySearch = ({ addCity }) => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const citiesList = [
    'New York', 'London', 'Tokyo', 'Paris', 'Berlin',
    'Mumbai', 'Sydney', 'Dubai', 'Toronto', 'Moscow',
    'Cairo', 'Rome', 'Beijing', 'Los Angeles', 'Chicago',
    'Singapore', 'Seoul', 'Madrid', 'Bangkok', 'Istanbul', 'Dhaka'
  ];

  useEffect(() => {
    if (search) {
      const debounceTimer = setTimeout(() => {
        const filteredSuggestions = citiesList.filter((city) =>
          city.toLowerCase().includes(search.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
      }, 300);

      return () => clearTimeout(debounceTimer);
    } else {
      setSuggestions([]);
    }
  }, [search]);

  const handleSelect = (city) => {
    addCity(city);
    setSearch('');
    setSuggestions([]);
  };

  return (
    <div className="city-search relative">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a city..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
          {suggestions.map((city) => (
            <li
              key={city}
              onClick={() => handleSelect(city)}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition duration-200"
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySearch;