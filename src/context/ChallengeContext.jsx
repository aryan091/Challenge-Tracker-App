import React, { createContext, useState, useEffect } from "react";

const ChallengeContext = createContext();

/**
 * Creates a ChallengeProvider component that provides challenges to its children.
 *
 * @param {Object} props - The props object.
 * @param {ReactNode} props.children - The children components.
 * @return {ReactNode} The ChallengeProvider component.
 */
const ChallengeProvider = ({ children }) => {
  const [challenges, setChallenges] = useState(() => {
    try {
      const savedChallenges = localStorage.getItem("challenges");
      return savedChallenges ? JSON.parse(savedChallenges) : [];
    } catch (error) {
      console.error("Failed to load challenges from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("challenges", JSON.stringify(challenges));
    } catch (error) {
      console.error("Failed to save challenges to localStorage:", error);
    }
  }, [challenges]);

  // Update and save challenge in local storage
  const updateChallenge = (id, updatedChallenge) => {
    setChallenges((prevChallenges) => {
      const updatedChallenges = prevChallenges.map((challenge) =>
        challenge.id === id
          ? updatedChallenge // Replace the entire challenge with the updatedChallenge
          : challenge
      );
      localStorage.setItem("challenges", JSON.stringify(updatedChallenges));
      return updatedChallenges;
    });
  };

  /**
   * Deletes a challenge from the list of challenges.
   *
   * @param {string} id - The ID of the challenge to delete.
   * @return {Array} The updated list of challenges after deletion.
   */

  const deleteChallenge = (id) => {
    setChallenges((prevChallenges) => {
      const updatedChallenges = prevChallenges.filter(
        (challenge) => challenge.id !== id
      );
      localStorage.setItem("challenges", JSON.stringify(updatedChallenges));
      return updatedChallenges;
    });
  };

  /**
   * Adds a new challenge to the list of challenges.
   *
   * @param {Object} newChallenge - The challenge to be added.
   * @return {void} This function does not return anything.
   */
  const addChallenge = (newChallenge) => {
    setChallenges((prevChallenges) => [...prevChallenges, newChallenge]);
  };

  /**
   * Returns an object containing the count of completed, active, missed challenges,
   * and the total number of challenges.
   *
   * @return {Object} An object with the following properties:
   *   - completedCount: The number of completed challenges.
   *   - activeCount: The number of active challenges.
   *   - missedCount: The number of missed challenges.
   *   - totalChallenges: The total number of challenges.
   */

  const getStats = () => {
    const completedCount = challenges.filter(
      (challenge) => challenge.status === "Completed"
    ).length;
    const activeCount = challenges.filter(
      (challenge) => challenge.status === "Active"
    ).length;
    const missedCount = challenges.filter(
      (challenge) => challenge.status === "Missed"
    ).length;
    const totalChallenges = challenges.length;

    return { completedCount, activeCount, missedCount, totalChallenges };
  };

  return (
    // Provide the challenges and updateChallenge function to the children
    <ChallengeContext.Provider
      value={{
        challenges,
        updateChallenge,
        setChallenges,
        addChallenge,
        getStats,
        deleteChallenge,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};

// Export the ChallengeProvider

export { ChallengeContext, ChallengeProvider };
