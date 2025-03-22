import React from 'react';

const ToggleUnits = ({ toggleUnit, unit }) => {
  return (
    <div>
      <button
        onClick={toggleUnit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
      </button>
    </div>
  );
};

export default ToggleUnits;