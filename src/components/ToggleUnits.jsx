import React from 'react';

const ToggleUnits = ({ toggleUnit, unit }) => {
  return (
    <div className="unit-toggle">
      <button onClick={toggleUnit} style={{ padding: '5px 10px', margin: '10px' }}>
        Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
      </button>
    </div>
  );
};

export default ToggleUnits;