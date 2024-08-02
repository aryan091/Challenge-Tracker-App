// ChallengeCard.js
import React from 'react';
import { FaCircle } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import ProgressBar from './ProgressBar'; 
import { FiEdit } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

import './tooltip.css';

const ChallengeCard = ({ challenge }) => {
  const { title, description, startDate, endDate, status, progress } = challenge;

  const navigate = useNavigate();

  const formatDateString = (dateString) => {
    if (!dateString) return ""; // Handle null or undefined dateString
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ""; // Handle invalid date strings

    const options = { day: 'numeric', month: 'short' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(date);
    const month = parts.find(part => part.type === 'month').value;
    const day = parts.find(part => part.type === 'day').value;
    const dayWithSuffix = getDayWithSuffix(day);
    return `${month} ${dayWithSuffix}`;
  };

  const getDayWithSuffix = (day) => {
    if (day === '11' || day === '12' || day === '13') {
      return `${day}th`;
    }
    const lastDigit = day.slice(-1);
    switch (lastDigit) {
      case '1':
        return `${day}st`;
      case '2':
        return `${day}nd`;
      case '3':
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  const handleEditClick = (event , challenge) => {
    event.preventDefault(); // Prevent default behavior
    event.stopPropagation(); // Stop event from bubbling up

    // Handle edit click
    navigate('/create-challenge' , { state: { challenge: challenge, edit: true } })

  };
  

  return (
    <div className="task-card p-4 bg-white rounded-lg shadow-sm relative w-72 h-44 mt-8">
      <div className="task-card-box flex items-center justify-between mb-2">
        <span className={`text-[10px] font-medium flex items-center ${status === 'Active' ? 'text-[#FF2473]' : status === 'Completed' ? 'text-[#18B0FF]' : 'text-[#63C05B]'}`}>
          <FaCircle size={10} className="mr-1" /> {status.toUpperCase()}
        </span>
        <span className="text-[10px] font-medium text-gray-500">
        <FiEdit size={20} className="mr-1" onClick={handleEditClick} />

        </span>
      </div>
      <div className='title min-w-60 max-h-[4.4rem] overflow-hidden'>
        <h4
          className="text-lg font-semibold mb-2"
          style={{
            maxHeight: '4.4rem',
            cursor: 'default',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            whiteSpace: 'normal'
          }}
          data-tooltip-id={`tooltip-${title}`}
          data-tooltip-content={title}
        >
          {title}
        </h4>
        <Tooltip id={`tooltip-${title}`} place="top" type="dark" effect="solid" className='max-w-80 max-h-52'>
          {title} {/* Content of the tooltip */}
        </Tooltip>
      </div>
      <div>
        <p
          className="text-sm text-gray-500 mb-2"
          style={{
            maxHeight: '4.4rem',
            cursor: 'default',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            whiteSpace: 'normal'
          }}
          data-tooltip-id={`tooltip-${description}`}
          data-tooltip-content={description}
        >
          {description}
        </p>
        <Tooltip id={`tooltip-${description}`} place="top" type="dark" effect="solid" className='max-w-80 max-h-52'>
          {description} {/* Content of the tooltip */}
        </Tooltip>
      </div>
      <div className="flex items-center justify-between text-sm">
        <button className={`w-16 h-7 text-[10px] rounded-xl bg-gray-200 text-[#5A5A5A] font-bold`}>{formatDateString(startDate)}</button>
        <button className={`w-16 h-7 text-[10px] rounded-xl bg-gray-200 text-[#5A5A5A] font-bold`}>{formatDateString(endDate)}</button>
      </div>
      <ProgressBar progress={progress} />
    </div>
  );
};

export default ChallengeCard;
