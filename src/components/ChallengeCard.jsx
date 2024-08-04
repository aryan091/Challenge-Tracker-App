import React , { useContext , useEffect , useState } from 'react';
import { FaCircle } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import ProgressBar from './ProgressBar'; 
import { FiEdit } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { ChallengeContext } from '../context/ChallengeContext';
import { capitalizeFirstLetter , formatDateString} from '../utils/helper';
import { RiDeleteBin5Fill } from "react-icons/ri";
import DeleteTaskModal from './DeleteTaskModal';

import './tooltip.css';

const ChallengeCard = ({ id }) => {



  const navigate = useNavigate();
  const [isModalOpen , setIsModalOpen] = useState(false);
  const { challenges } = useContext(ChallengeContext);
  const challenge = challenges.find(challenge => challenge.id === id);
  const { title, description, startDate, endDate, status, progress , frequency } = challenge;


  
  const handleDeleteClick = (event ) => {
    event.preventDefault(); // Prevent default behavior
    event.stopPropagation(); // Stop event from bubbling up
    setIsModalOpen(true);
  };


  const handleEditClick = (event , challenge) => {
    event.preventDefault(); // Prevent default behavior
    event.stopPropagation(); // Stop event from bubbling up

    // Handle edit click
    navigate('/create-challenge' , { state: { challenge: challenge, edit: true } })

  };

  
  
  

  return (
    <div className="task-card p-4 bg-white rounded-lg shadow-2xl relative w-72 h-50 mt-8 transform transition-transform duration-500 ease-in-out hover:scale-105">
      <div className="task-card-box flex items-center justify-between mb-2">
        <span className={`text-[10px] font-medium flex items-center ${status === 'Active' ? 'text-[#FF2473]' : status === 'Completed' ? 'text-[#18B0FF]' : 'text-red-600'}`}>
          <FaCircle size={10} className="mr-1 font-bold" /> {status.toUpperCase()}
        </span>
        <div className='edit flex items-center justify-between'>
        <span className="text-[10px] font-medium text-gray-500">
        <FiEdit size={20} color='blue' className="mr-1" onClick={(event) => handleEditClick(event, challenge)} />
        </span>

        <span className="text-[10px] font-medium text-gray-500">
        <RiDeleteBin5Fill size={20} color='red' className="mr-1" onClick={(event) => handleDeleteClick(event)} />
        
        </span>

        </div>
      </div>

      <div className='title min-w-60 max-h-[4.4rem] overflow-hidden'>
        <h4
          className="text-lg font-semibold mb-2 text-neutral-500"
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
        <button className={`w-28 h-7 text-[10px] rounded-xl bg-gray-200 text-[#5A5A5A] font-bold`}>Frequency : {capitalizeFirstLetter(frequency)}</button>

        <button className={`w-16 h-7 text-[10px] rounded-xl bg-gray-200 text-[#5A5A5A] font-bold`}>{formatDateString(endDate)}</button>
      </div>
      <ProgressBar id={id} progress={progress}/>
      {isModalOpen && <DeleteTaskModal id={id} closeModal={() => setIsModalOpen(false)} />}
      </div>
  );
};

export default ChallengeCard;
