import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChallengeContext } from '../context/ChallengeContext';
import ProgressBar from './ProgressBar';
import { formatDate , convertDateFormat  , getDaysByWeek} from '../utils/helper';
import { IoIosArrowBack } from "react-icons/io";
import DayItem from './Dayitem';
import './custom-scrollbar.css';
import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChallengeContext } from '../context/ChallengeContext';
import ProgressBar from './ProgressBar';
import { formatDate , convertDateFormat  , getDaysByWeek} from '../utils/helper';
import { IoIosArrowBack } from "react-icons/io";
import DayItem from './Dayitem';
import './custom-scrollbar.css';

const ChallengeDetail = () => {
  const { id } = useParams();
  const challengeId = id;
  const { challenges, updateChallenge } = useContext(ChallengeContext);
  const challenge = challenges.find(c => c.id === challengeId);
  const navigate = useNavigate();

  

  useEffect(() => {
    if (challenge && challenge.progress.length === 0) {
      const { startDate, endDate, frequency, daysPerWeek } = challenge;
      initializeProgress(startDate, endDate, frequency, daysPerWeek);
    }
  }, [challenge]);

  useEffect(() => {
    if (challenge && challenge.progress.flat().length > 0) {
      updateChallengeStatus();
    }
  }, [challenge?.progress]);

  const initializeProgress = (startDate, endDate, frequency, daysPerWeek) => {
    const start = convertDateFormat(startDate);
    const end = convertDateFormat(endDate);
    let initialProgress = [];
    
    if (frequency === 'daily') {
      initialProgress = getDaysByWeek(start, end, 7);
      console.log("initialProgress :",initialProgress)
    } else if (frequency === 'weekly') {
      initialProgress = getDaysByWeek(start, end, daysPerWeek);
      console.log("initialProgress :",initialProgress)

    }
  
    if (initialProgress.length > 0 && !Array.isArray(initialProgress[0])) {
      initialProgress = [initialProgress];
    }
  
    updateChallenge(challengeId, { ...challenge, progress: initialProgress });
  };
        

        
  const updateChallengeProgress = (date, completed) => {
  
    const updatedProgress = challenge.progress.map(week => 
      week.map(day =>
        day.date === date ? { ...day, completed } : day
      )
    );
  
    updateChallenge(challengeId, { ...challenge, progress: updatedProgress });
  };
  
  const updateChallengeStatus = () => {
    const now = new Date();
    const endDate = new Date(challenge.endDate);
    const allCompleted = challenge.progress.flat().every(item => item.completed);

    let newStatus = challenge.status;

    if (now > endDate) {
      if (allCompleted) {
        newStatus = 'Completed';
      } else {
        newStatus = 'Missed';
      }
    } else {
      if (allCompleted && newStatus !== 'Completed') {
        newStatus = 'Completed';
      } else if (!allCompleted && newStatus !== 'Active') {
        newStatus = 'Active';
      }
    }

    if (challenge.status !== newStatus) {
      updateChallenge(challengeId, { ...challenge, status: newStatus });
    }
  };

  const handleDayStatusChange = (date, completed) => {
    updateChallengeProgress(date, completed);
  };


  if (!challenge) return <div>Challenge not found!</div>;

  return (
    <div className="flex justify-center items-center h-screen w-screen custom-scrollbar shadow-2xl">
      <div className="challenge-detail-container flex flex-col p-6 justify-center items-center rounded-md z-20 w-full max-w-4xl h-full max-h-[80vh] overflow-hidden custom-scrollbar shadow-2xl">
        <div className='w-full flex justify-between'>
          <button
            onClick={() => navigate(-1)}
            className="self-start mb-4 text-purple-800 hover:text-blue-700 transition duration-200"
          >
            <IoIosArrowBack />
          </button>
          <button
            className="self-start mb-4 text-purple-800 hover:text-blue-700 transition duration-200"
          >
            {formatDate(challenge.createdAt)}
          </button>
        </div>

        <h2 className="text-xl font-bold mb-2 text-purple-100">{challenge.title}</h2>
        <p className="mb-4 text-neutral-500 font-semibold">{challenge.description}</p>
        <h3 className="text-md font-medium mb-4 text-neutral-500">
          Progress ({challenge.progress.flat().filter(day => day.completed).length}/{challenge.progress.flat().length})
        </h3>
        <div className="weeks-container w-full max-w-4xl h-64 overflow-y-auto custom-scrollbar px-4 py-2 rounded-md shadow-2xl">
          {challenge.progress.length > 0 ? (
            challenge.progress.map((week, weekIndex) => (
              Array.isArray(week) ? (
                <div key={weekIndex} className="mb-4">
                  <h4 className="text-lg font-medium mb-2 text-purple-100">Week {weekIndex + 1}</h4>
                  <div className="days-container w-full max-w-4xl mb-4">
                    {week.map((day, dayIndex) => (
                      <DayItem
                        key={dayIndex}
                        item={day}
                        onStatusChange={handleDayStatusChange}
                      />
                    ))}
                  </div>
                </div>
              ) : null
            ))
          ) : (
            <p className="text-gray-500">No progress available for this challenge.</p>
          )}
        </div>
        <div className="w-full mt-4">
          <ProgressBar id={id}  />
        </div>
      </div>
    </div>
  );};

export default ChallengeDetail;

const ChallengeDetail = () => {
  const { id } = useParams();
  const challengeId = id;
  const { challenges, updateChallenge } = useContext(ChallengeContext);
  const challenge = challenges.find(c => c.id === challengeId);
  const navigate = useNavigate();

  

  useEffect(() => {
    if (challenge && challenge.progress.length === 0) {
      const { startDate, endDate, frequency, daysPerWeek } = challenge;
      initializeProgress(startDate, endDate, frequency, daysPerWeek);
    }
  }, [challenge]);

  useEffect(() => {
    if (challenge && challenge.progress.flat().length > 0) {
      updateChallengeStatus();
    }
  }, [challenge?.progress]);

  const initializeProgress = (startDate, endDate, frequency, daysPerWeek) => {
    const start = convertDateFormat(startDate);
    const end = convertDateFormat(endDate);
    let initialProgress = [];
    
    if (frequency === 'daily') {
      initialProgress = getDaysByWeek(start, end, 7);
      console.log("initialProgress :",initialProgress)
    } else if (frequency === 'weekly') {
      initialProgress = getDaysByWeek(start, end, daysPerWeek);
      console.log("initialProgress :",initialProgress)

    }
  
    if (initialProgress.length > 0 && !Array.isArray(initialProgress[0])) {
      initialProgress = [initialProgress];
    }
  
    updateChallenge(challengeId, { ...challenge, progress: initialProgress });
  };
        

        
  const updateChallengeProgress = (date, completed) => {
  
    const updatedProgress = challenge.progress.map(week => 
      week.map(day =>
        day.date === date ? { ...day, completed } : day
      )
    );
  
    updateChallenge(challengeId, { ...challenge, progress: updatedProgress });
  };
  
  const updateChallengeStatus = () => {
    const now = new Date();
    const endDate = new Date(challenge.endDate);
    const allCompleted = challenge.progress.flat().every(item => item.completed);

    let newStatus = challenge.status;

    if (now > endDate) {
      if (allCompleted) {
        newStatus = 'Completed';
      } else {
        newStatus = 'Missed';
      }
    } else {
      if (allCompleted && newStatus !== 'Completed') {
        newStatus = 'Completed';
      } else if (!allCompleted && newStatus !== 'Active') {
        newStatus = 'Active';
      }
    }

    if (challenge.status !== newStatus) {
      updateChallenge(challengeId, { ...challenge, status: newStatus });
    }
  };

  const handleDayStatusChange = (date, completed) => {
    updateChallengeProgress(date, completed);
  };


  if (!challenge) return <div>Challenge not found!</div>;

  return (
    <div className="flex justify-center items-center h-screen w-screen custom-scrollbar shadow-2xl">
      <div className="challenge-detail-container flex flex-col p-6 justify-center items-center rounded-md z-20 w-full max-w-4xl h-full max-h-[80vh] overflow-hidden custom-scrollbar shadow-2xl">
        <div className='w-full flex justify-between'>
          <button
            onClick={() => navigate(-1)}
            className="self-start mb-4 text-purple-800 hover:text-blue-700 transition duration-200"
          >
            <IoIosArrowBack />
          </button>
          <button
            className="self-start mb-4 text-purple-800 hover:text-blue-700 transition duration-200"
          >
            {formatDate(challenge.createdAt)}
          </button>
        </div>

        <h2 className="text-xl font-bold mb-2 text-purple-100">{challenge.title}</h2>
        <p className="mb-4 text-neutral-500 font-semibold">{challenge.description}</p>
        <h3 className="text-md font-medium mb-4 text-neutral-500">
          Progress ({challenge.progress.flat().filter(day => day.completed).length}/{challenge.progress.flat().length})
        </h3>
        <div className="weeks-container w-full max-w-4xl h-64 overflow-y-auto custom-scrollbar px-4 py-2 rounded-md shadow-2xl">
          {challenge.progress.length > 0 ? (
            challenge.progress.map((week, weekIndex) => (
              Array.isArray(week) ? (
                <div key={weekIndex} className="mb-4">
                  <h4 className="text-lg font-medium mb-2 text-purple-100">Week {weekIndex + 1}</h4>
                  <div className="days-container w-full max-w-4xl mb-4">
                    {week.map((day, dayIndex) => (
                      <DayItem
                        key={dayIndex}
                        item={day}
                        onStatusChange={handleDayStatusChange}
                      />
                    ))}
                  </div>
                </div>
              ) : null
            ))
          ) : (
            <p className="text-gray-500">No progress available for this challenge.</p>
          )}
        </div>
        <div className="w-full mt-4">
          <ProgressBar id={id}  />
        </div>
      </div>
    </div>
  );};

export default ChallengeDetail;
