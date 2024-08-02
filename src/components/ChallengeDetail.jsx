import React, { useState, useEffect , useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ChallengeContext } from '../context/ChallengeContext';

const ChallengeDetail = () => {
  const { id } = useParams();
  const challengeId = id
  const { challenges, updateChallenge } = useContext(ChallengeContext);

  const challenge = challenges.find(c => c.id === challengeId);

  // Initialize progress from the challenge
  const [progress, setProgress] = useState(() => Array.isArray(challenge?.progress) ? challenge.progress : []);
  const [dates, setDates] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);


  useEffect(() => {
    if (challenge) {
      const { startDate, endDate, daysPerWeek } = challenge;
      const calculatedDates = calculateChallengeDates(startDate, endDate, daysPerWeek);
      setDates(calculatedDates);
    }
  }, [challenge]);

  useEffect(() => {
    localStorage.setItem('challenges', JSON.stringify(challenges));
    setCompletedCount(progress.length);
  }, [progress, challenges]);

  const calculateChallengeDates = (startDate, endDate, daysPerWeek) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let dates = [];

    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      if (date.getDay() === 0 || date.getDay() === 6) continue; // Skip weekends if needed

      dates.push(date.toISOString().split('T')[0]); // Format as YYYY-MM-DD
    }

    // Select the required number of days per week
    const uniqueDates = [];
    for (let i = 0; i < dates.length; i += 7) {
      uniqueDates.push(...dates.slice(i, i + daysPerWeek));
    }

    return uniqueDates;
  };

  const handleMarkAsCompleted = (date) => {
    setProgress(prevProgress => {
      const updatedProgress = prevProgress.includes(date)
        ? prevProgress
        : [...prevProgress, date];
      
      // Update the challenge's progress and save to localStorage
      updateChallenge(challengeId, updatedProgress);

      return updatedProgress;
    });
  };

  const handleMarkAsMissed = (date) => {
    setProgress(prevProgress => {
      const updatedProgress = prevProgress.includes(date)
        ? prevProgress.filter(d => d !== date)
        : prevProgress;
      
      // Update the challenge's progress and save to localStorage
      updateChallenge(challengeId, updatedProgress);

      return updatedProgress;
    });
  };

  if (!challenge) return <div>Challenge not found!</div>;

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">{challenge.title}</h2>
      <p>{challenge.description}</p>
      <h3 className="text-md font-medium mt-4">Progress ({completedCount}/{dates.length})</h3>
      <div className="mt-2">
        {dates.map((date, index) => (
          <div key={index} className="flex items-center mb-2">
            <span className="mr-2">{date}</span>
            <button
              onClick={() => handleMarkAsCompleted(date)}
              className="bg-green-500 text-white py-1 px-3 rounded mr-2"
            >
              Mark as Completed
            </button>
            <button
              onClick={() => handleMarkAsMissed(date)}
              className="bg-red-500 text-white py-1 px-3 rounded"
            >
              Mark as Missed
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeDetail;
