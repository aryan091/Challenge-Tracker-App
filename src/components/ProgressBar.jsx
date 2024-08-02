// ProgressBar.js
import React from 'react';

const ProgressBar = ({ progress }) => {
  const totalDays = progress.length;
  const completedDays = progress.filter(day => day.completed).length;
  const percentage = totalDays === 0 ? 0 : (completedDays / totalDays) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
      <div
        className={`h-4 rounded-full ${percentage === 0 ? 'bg-transparent' : 'bg-blue-500'}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
