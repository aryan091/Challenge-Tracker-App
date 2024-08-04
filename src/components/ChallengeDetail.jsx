import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChallengeContext } from '../context/ChallengeContext';
import ProgressBar from './ProgressBar';

const ChallengeDetail = () => {
  const { id } = useParams();
  const challengeId = id;
  const { challenges, updateChallenge } = useContext(ChallengeContext);
  const challenge = challenges.find(c => c.id === challengeId);
  const navigate = useNavigate();

  const [progress, setProgress] = useState(challenge?.progress || []);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    if (challenge) {
      const { startDate, endDate } = challenge;
      if (progress.length === 0) {
        initializeProgress(startDate, endDate);
      }
    }
  }, [challenge, progress.length]);

  useEffect(() => {
    if (progress.length > 0) {
      const updatedCompletedCount = progress.filter(day => day.completed).length;
      setCompletedCount(updatedCompletedCount);
      console.log("Updated Completed Count: ", updatedCompletedCount); // Debugging
    }
  }, [progress]);

  const initializeProgress = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const initialProgress = [];

    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      initialProgress.push({ date: date.toISOString().split('T')[0], completed: false });
    }

    setProgress(initialProgress);
    console.log("Initial Progress: ", initialProgress); // Debugging
  };

  const updateChallengeProgress = (date, completed) => {
    setProgress(prevProgress => {
      const updatedProgress = prevProgress.map(item =>
        item.date === date ? { ...item, completed } : item
      );

      console.log("Updated Progress: ", updatedProgress); // Debugging

      updateChallenge(challengeId, { ...challenge, progress: updatedProgress });

      return updatedProgress;
    });
  };

  const handleDayStatusChange = (date, status) => {
    const completed = status === 'completed';
    updateChallengeProgress(date, completed);
  };

  if (!challenge) return <div>Challenge not found!</div>;

  return (
    <div className="challenge-detail-container p-4 bg-white shadow-md rounded-md">
      <button onClick={() => navigate(-1)} className="back-button">Back</button>
      <h2 className="text-lg font-bold mb-4">{challenge.title}</h2>
      <p>{challenge.description}</p>
      <h3 className="text-md font-medium mt-4">Progress ({completedCount}/{progress.length})</h3>
      <div className="days-container mt-2">
        {progress.length > 0 ? (
          progress.map((item, index) => (
            <div key={index} className="day-item flex items-center mb-2">
              <span className="mr-2">{item.date}</span>
              <button
                onClick={() => handleDayStatusChange(item.date, 'completed')}
                className={`date-button ${item.completed ? 'bg-green-500' : 'bg-gray-300'} text-white py-1 px-3 rounded mr-2`}
              >
                Mark as Completed
              </button>
              <button
                onClick={() => handleDayStatusChange(item.date, 'missed')}
                className={`date-button ${!item.completed ? 'bg-red-500' : 'bg-gray-300'} text-white py-1 px-3 rounded`}
              >
                Mark as Missed
              </button>
            </div>
          ))
        ) : (
          <p>No progress available for this challenge.</p>
        )}
      </div>
      <ProgressBar id={id} progress={progress} />
    </div>
  );
};

export default ChallengeDetail;
