import React, { useState } from 'react';

function YearDropdown({onSelect}) {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState('');

  const years = Array.from({length: 21}, (_, index) => currentYear - 20 + index);

  function handleYearChange(event) {
    setSelectedYear(event.target.value);
    onSelect(event.target.value)
  }

  return (
    <div>
      <label htmlFor="year-select">Chọn năm:</label>
      <select id="year-select" value={selectedYear} onChange={handleYearChange}>
        <option value="">--Chọn năm--</option>
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      <p>Bạn đã chọn năm: {selectedYear}</p>
    </div>
  );
}

export default YearDropdown;
