
import React , {useContext, useEffect } from 'react';
import { ChallengeContext } from '../context/ChallengeContext';

const ProgressBar = ({id }) => {

    const { challenges, updateChallenge } = useContext(ChallengeContext);
    const challenge = challenges.find(c => c.id === id);

    console.log(challenge)
    


    useEffect(() => {
        localStorage.setItem('challenges', JSON.stringify(challenges));
    }, [challenges]);
    
    


  const totalDays =challenge?.progress?.length || 0;
  console.log(" totalDays :",totalDays)
  const completedDays = challenge.progress.filter(day => day.completed).length;

  console.log(" completedDays :",completedDays)

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
