
import React , {useContext, useEffect } from 'react';
import { ChallengeContext } from '../context/ChallengeContext';

const ProgressBar = ({id }) => {

    const { challenges } = useContext(ChallengeContext);
    const challenge = challenges.find(c => c.id === id);



    useEffect(() => {
        localStorage.setItem('challenges', JSON.stringify(challenges));
    }, [challenges]);
    
    


  const totalDays =challenge.progress.flat().length || 0;
  const completedDays = challenge.progress.flat().filter(day => day.completed).length;


  const percentage = totalDays === 0 ? 0 : (completedDays / totalDays) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mt-4 shadow-2xl">
      <div
        className={`h-4 rounded-full ${percentage === 0 ? 'bg-transparent' : 'bg-purple-800'}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
