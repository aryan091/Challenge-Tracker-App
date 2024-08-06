import React, { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChallengeContext } from "../context/ChallengeContext";
import ProgressBar from "./ProgressBar";
import { formatDate, convertDateFormat, getDaysByWeek } from "../utils/helper";
import { IoIosArrowBack } from "react-icons/io";
import DayItem from "./DayItem";
import "./custom-scrollbar.css";

const ChallengeDetail = () => {
  const { id } = useParams();
  const challengeId = id;

  // Access the list of challenges and the deleteChallenge function from ChallengeContext

  const { challenges, updateChallenge } = useContext(ChallengeContext);

  // Find the challenge object with a matching id from the challenges array

  const challenge = challenges.find((c) => c.id === challengeId);

  // Import the useNavigate hook from React Router for navigation

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the challenge has progress data and initialize it if it doesn't

    if (challenge && challenge.progress.length === 0) {
      const { startDate, endDate, frequency, daysPerWeek } = challenge;
      initializeProgress(startDate, endDate, frequency, daysPerWeek);
    }

    // Update the challenge status based on the progress data
  }, [challenge]);

  // Update the challenge status based on the progress data
  useEffect(() => {
    if (challenge && challenge.progress.flat().length > 0) {
      updateChallengeStatus();
    }
  }, [challenge?.progress]);

  /**
   * Initializes the progress for a challenge based on the start and end dates, frequency, and days per week.
   *
   * @param {string} startDate - The start date of the challenge in the format 'YYYY-MM-DD'.
   * @param {string} endDate - The end date of the challenge in the format 'YYYY-MM-DD'.
   * @param {string} frequency - The frequency of the challenge. Can be 'daily' or 'weekly'.
   * @param {number} daysPerWeek - The number of days per week for the challenge if the frequency is 'weekly'.
   * @return {void} This function does not return anything.
   */

  const initializeProgress = (startDate, endDate, frequency, daysPerWeek) => {
    const start = convertDateFormat(startDate);
    const end = convertDateFormat(endDate);
    let initialProgress = [];

    if (frequency === "daily") {
      initialProgress = getDaysByWeek(start, end, 7);
    } else if (frequency === "weekly") {
      initialProgress = getDaysByWeek(start, end, daysPerWeek);
    }

    if (initialProgress.length > 0 && !Array.isArray(initialProgress[0])) {
      initialProgress = [initialProgress];
    }

    updateChallenge(challengeId, { ...challenge, progress: initialProgress });
  };

  /**
   * Updates the progress of a challenge based on the provided date and completion status.
   *
   * @param {type} date - The date to update the progress for.
   * @param {type} completed - The completion status to set for the date.
   * @return {type} This function does not return anything.
   */

  const updateChallengeProgress = (date, completed) => {
    const updatedProgress = challenge.progress.map((week) =>
      week.map((day) => (day.date === date ? { ...day, completed } : day))
    );

    updateChallenge(challengeId, { ...challenge, progress: updatedProgress });
  };

  /**
   * Updates the status of a challenge based on the current date and the completion status of the challenge.
   *
   * @return {void} This function does not return anything.
   */
  const updateChallengeStatus = () => {
    const now = new Date();
    const endDate = new Date(challenge.endDate);
    const allCompleted = challenge.progress
      .flat()
      .every((item) => item.completed);

    let newStatus = challenge.status;

    if (now > endDate) {
      if (allCompleted) {
        newStatus = "Completed";
      } else {
        newStatus = "Missed";
      }
    } else {
      if (allCompleted && newStatus !== "Completed") {
        newStatus = "Completed";
      } else if (!allCompleted && newStatus !== "Active") {
        newStatus = "Active";
      }
    }

    if (challenge.status !== newStatus) {
      updateChallenge(challengeId, { ...challenge, status: newStatus });
    }
  };

  /**
   * Updates the progress of a challenge based on the provided date and completion status.
   *
   * @param {string} date - The date to update the progress for.
   * @param {boolean} completed - The completion status to set for the date.
   * @return {void} This function does not return anything.
   */
  const handleDayStatusChange = (date, completed) => {
    updateChallengeProgress(date, completed);
  };

  if (!challenge) return <div>Challenge not found!</div>;

  return (
    <div className="flex justify-center items-center h-screen w-screen custom-scrollbar shadow-2xl">
      <div className="challenge-detail-container flex flex-col p-6 items-center lg:items-center  rounded-md z-20 w-full max-w-4xl h-full max-h-[80vh] overflow-hidden custom-scrollbar shadow-2xl sm:items-center md:items-center gap-4 sm:gap-4">
        <div className="w-full flex justify-between">
          <button
            onClick={() => navigate("/")}
            className="self-start mb-4 text-purple-800 hover:text-blue-700 transition duration-200"
          >
            <IoIosArrowBack />
          </button>
          <button className="self-start mb-4 text-purple-800 hover:text-blue-700 transition duration-200 font-bold">
            <span className="text-neutral-500">Created At :</span>{" "}
            {formatDate(challenge.createdAt)}
          </button>
        </div>

        <h2 className="text-xl font-bold mb-2 text-center text-purple-100">
          {challenge.title}
        </h2>
        <p className="mb-4 text-neutral-500 text-center font-semibold">
          {challenge.description}
        </p>
        <h3 className="text-md font-medium text-center mb-4 text-neutral-500">
          Progress (
          {challenge.progress.flat().filter((day) => day.completed).length}/
          {challenge.progress.flat().length})
        </h3>
        <div className="w-full h-64 overflow-y-auto custom-scrollbar px-4 py-2 rounded-md ">
          {challenge.progress.length > 0 ? (
            <div className="flex flex-wrap md:flex-row flex-col gap-4">
              {challenge.progress.map((week, weekIndex) => (
                <div
                  key={weekIndex}
                  className="flex w-72 p-4 border border-gray-300 rounded-lg flex-col sm:w-60"
                >
                  <h4 className="text-lg font-medium mb-2 text-purple-100">
                    Week {weekIndex + 1}
                  </h4>
                  <div className="flex flex-col">
                    {week.map((day, dayIndex) => (
                      <DayItem
                        key={dayIndex}
                        item={day}
                        onStatusChange={handleDayStatusChange}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No progress available for this challenge.
            </p>
          )}
        </div>
        <div className="w-full mt-4">
          <ProgressBar id={id} />
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;
