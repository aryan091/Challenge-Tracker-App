import React, { useEffect, useState } from 'react';

const DayItem = ({ item, onStatusChange }) => {
  /**
   * Handles the change event of the checkbox.
   *
   * This function is called when the checkbox is checked or unchecked.
   * It updates the status of the item by calling the `onStatusChange` function
   * with the item's date and the negation of its current completed status.
   *
   * @return {void} This function does not return anything.
   */
  const handleCheckboxChange = () => {
    onStatusChange(item.date, !item.completed);
  };

  const [disable , setDisable] = useState(true)

  useEffect(() => {
    const today = new Date();
    if(item.date === today.toISOString().split('T')[0]){
      setDisable(false)
    }
  }, [item]);

  return (
    <div className="day-item flex items-center justify-between mb-2 p-2 shadow-sm rounded-md">
      <span className="mr-4 text-gray-700 font-medium">{item.date}</span>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={handleCheckboxChange}
        className="form-checkbox h-5 w-5 text-green-500 "
        disabled={disable}
      
      />
    </div>
  );
};

export default DayItem;
