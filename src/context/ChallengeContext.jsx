
import React, { createContext, useState, useEffect } from 'react';

const ChallengeContext = createContext();

const ChallengeProvider = ({ children }) => {
  const [challenges, setChallenges] = useState(() => {
    const savedChallenges = localStorage.getItem('challenges');
    return savedChallenges ? JSON.parse(savedChallenges) : [];
  });

  useEffect(() => {
    localStorage.setItem('challenges', JSON.stringify(challenges));
  }, [challenges]);

  const updateChallenge = (id, updatedChallenge) => {
    setChallenges(prevChallenges =>
        prevChallenges.map(challenge =>
            challenge.id === id
                ? { ...challenge, ...updatedChallenge }
                : challenge
        )
    );
};


  const addChallenge = (newChallenge) => {
    setChallenges(prevChallenges => [...prevChallenges, newChallenge]);
  };

  return (
    <ChallengeContext.Provider value={{ challenges, updateChallenge, addChallenge }}>
      {children}
    </ChallengeContext.Provider>
  );
};

export { ChallengeContext, ChallengeProvider };
