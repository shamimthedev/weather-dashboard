import React, { useState, useEffect } from 'react';

const CitySearch = ({ addCity }) => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (search) {
      const debounceTimer = setTimeout(() => {
        const citiesList = ['New York', 'London', 'Tokyo', 'Paris', 'Berlin'];
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
    <div className="city-search">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a city..."
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((city) => (
            <li key={city} onClick={() => handleSelect(city)}>
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySearch;