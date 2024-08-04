import React, { createContext, useState, useEffect } from 'react';

const ChallengeContext = createContext();

const ChallengeProvider = ({ children }) => {
    const [challenges, setChallenges] = useState(() => {
        try {
          const savedChallenges = localStorage.getItem('challenges');
          return savedChallenges ? JSON.parse(savedChallenges) : [];
        } catch (error) {
          console.error('Failed to load challenges from localStorage:', error);
          return [];
        }
      });
    
      useEffect(() => {
        try {
          localStorage.setItem('challenges', JSON.stringify(challenges));
        } catch (error) {
          console.error('Failed to save challenges to localStorage:', error);
        }
      }, [challenges]);
    
      // Update and save challenge in local storage
      const updateChallenge = (id, updatedChallenge) => {
        setChallenges(prevChallenges => {
            const updatedChallenges = prevChallenges.map(challenge =>
                challenge.id === id
                  ? updatedChallenge  // Replace the entire challenge with the updatedChallenge
                  : challenge
              );
          localStorage.setItem('challenges', JSON.stringify(updatedChallenges));
          return updatedChallenges;
        });
      };
            

  const addChallenge = (newChallenge) => {
    setChallenges(prevChallenges => [...prevChallenges, newChallenge]);
  };

  const getStats = () => {
    const completedCount = challenges.filter(challenge => challenge.status === 'Completed').length;
    const activeCount = challenges.filter(challenge => challenge.status === 'Active').length;
    const missedCount = challenges.filter(challenge => challenge.status === 'Missed').length;
    const totalChallenges = challenges.length;

    return { completedCount, activeCount, missedCount, totalChallenges };
  };

  return (
    <ChallengeContext.Provider value={{ challenges, updateChallenge,setChallenges, addChallenge, getStats }}>
      {children}
    </ChallengeContext.Provider>
  );
};

export { ChallengeContext, ChallengeProvider };
