import React from 'react';

const DayItem = ({ item, onStatusChange }) => {
  const handleCheckboxChange = () => {
    onStatusChange(item.date, !item.completed);
  };

  return (
    <div className="day-item flex items-center justify-between mb-2 p-2 shadow-sm rounded-md">
      <span className="mr-4 text-gray-700 font-medium">{item.date}</span>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={handleCheckboxChange}
        className="form-checkbox h-5 w-5 text-green-500"
      />
    </div>
  );
};

export default DayItem;
