import React, { useContext, useEffect } from "react";
import { ChallengeContext } from "../context/ChallengeContext";

const ProgressBar = ({ id }) => {
  // Access the list of challenges from ChallengeContext

  const { challenges } = useContext(ChallengeContext);

  // Find the challenge object with a matching id from the challenges array
  const challenge = challenges.find((c) => c.id === id);

  // Update and save challenge in local storage
  useEffect(() => {
    localStorage.setItem("challenges", JSON.stringify(challenges));
  }, [challenges]);

  // Calculate the total number of days and the number of completed days
  const totalDays = challenge.progress.flat().length || 0;

  // Calculate the percentage of completed days
  const completedDays = challenge.progress
    .flat()
    .filter((day) => day.completed).length;

  // Render the progress bar
  const percentage = totalDays === 0 ? 0 : (completedDays / totalDays) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mt-4 shadow-2xl">
      <div
        className={`h-4 rounded-full ${
          percentage === 0 ? "bg-transparent" : "bg-purple-800"
        }`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
