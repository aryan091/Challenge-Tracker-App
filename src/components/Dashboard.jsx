import React, { useState, useContext, useEffect } from "react";
import { ChallengeContext } from "../context/ChallengeContext";
import { Link, useNavigate } from "react-router-dom";
import ChallengeCard from "./ChallengeCard";
import CreateChallenge from "./CreateChallenge";
import { FaFilter } from "react-icons/fa";

import "./custom-scrollbar.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { challenges } = useContext(ChallengeContext);
  const [filter, setFilter] = useState({
    active: false,
    completed: false,
    missed: false,
  });

  /**
   * Navigates to the '/create-challenge' route when called.
   *
   * @return {void} This function does not return anything.
   */
  const handleCreateTaskClick = () => {
    navigate("/create-challenge");
  };

  /**
   * Closes the modal by navigating to the root route.
   *
   * @return {void} This function does not return anything.
   */

  const closeModal = () => {
    navigate("/");
  };

  useEffect(() => {
    /**
     * Resets the filter values to their default state when the component mounts.
     *
     * This effect ensures that the filter settings are initialized to a known state
     * whenever the component is first rendered. The default state sets all filter
     * categories (active, completed, missed) to false, indicating no filtering is
     * applied initially.
     *
     * Dependencies:
     * - This effect has no dependencies, so it runs only once upon component mount.
     *
     * Note:
     * - If filter state needs to be preserved across component mounts, consider
     *   implementing a persistent state management strategy using context
     */

    setFilter({
      active: false,
      completed: false,
      missed: false,
    });
  }, []);

  /**
   * Updates the filter state based on the selected filter name.
   *
   * @param {Event} event - The event object triggered by the filter change.
   * @return {void} This function does not return anything.
   */

  const handleFilterChange = (event) => {
    const { name } = event.target;
    setFilter((prevFilter) => ({
      active: name === "active" ? !prevFilter.active : false,
      completed: name === "completed" ? !prevFilter.completed : false,
      missed: name === "missed" ? !prevFilter.missed : false,
    }));
  };

  /**
   * Filters challenges based on the selected status filters: 'Active', 'Completed', and 'Missed'.
   *
   * - Includes a challenge if its status matches any of the active filters.
   * - If no filters are active, all challenges are included.
   *
   * @param {Object} challenge - The challenge object to evaluate.
   * @returns {boolean} - True if the challenge matches the filter criteria; otherwise, false.
   *
   * Example:
   * - If `filter.active` is true and the challenge's status is 'Active', it will be included.
   */

  const filteredChallenges = challenges.filter((challenge) => {
    if (filter.active && challenge.status === "Active") return true;
    if (filter.completed && challenge.status === "Completed") return true;
    if (filter.missed && challenge.status === "Missed") return true;
    if (!filter.active && !filter.completed && !filter.missed) return true;
    return false;
  });

  /**
   * Sorts filtered challenges by prioritizing the 'Active' status.
   *
   * - 'Active' challenges are moved to the top of the list.
   * - Non-'Active' challenges maintain their relative order.
   *
   * @param {Object} a - The first challenge object to compare.
   * @param {Object} b - The second challenge object to compare.
   * @returns {number} - A negative number if 'a' should come before 'b',
   *   a positive number if 'b' should come before 'a',
   *   or 0 if their order should remain unchanged.
   *
   * Example:
   * - If `a` is 'Active' and `b` is not, `a` will precede `b`.
   */

  const sortedChallenges = filteredChallenges.sort((a, b) => {
    if (a.status === "Active" && b.status !== "Active") return -1;
    if (a.status !== "Active" && b.status === "Active") return 1;
    return 0;
  });

  return (
    <div className="flex flex-col w-[100vw] h-[100vh] ">
      {/* Challenge List Section */}
      <div className="flex flex-col overflow-y-auto p-4 max-w-[100vw] max-h-[100vh]  overflow-hidden custom-scrollbar z-20">
        <div className="flex justify-center  flex-col sm:flex-row sm:justify-around sm:items-center gap-4 ">
          <div>
            <p
              className=" text-lg cursor-pointer hover:text-pink-500 bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text  tracking-tight text-transparent font-bold text-center"
              onClick={handleCreateTaskClick}
            >
              Create
            </p>
          </div>

          <div className="flex justify-center z-20  mb-4 ">
            <FaFilter size={20} color="orange" />
            <div className="flex items-center ml-4">
              <label className="flex items-center mr-4 text-purple-100 font-bold">
                <input
                  type="checkbox"
                  name="active"
                  checked={filter.active}
                  onChange={handleFilterChange}
                  className=" h-5 w-5 text-green-500 mr-2"
                />
                Active
              </label>
              <label className="flex items-center mr-4 text-purple-100 font-bold">
                <input
                  type="checkbox"
                  name="completed"
                  checked={filter.completed}
                  onChange={handleFilterChange}
                  className=" h-5 w-5 text-green-500 mr-2"
                />
                Completed
              </label>
              <label className="flex items-center text-purple-100 font-bold">
                <input
                  type="checkbox"
                  name="missed"
                  checked={filter.missed}
                  onChange={handleFilterChange}
                  className=" h-5 w-5 bg-green-500 mr-2"
                />
                Missed
              </label>
            </div>
          </div>
        </div>

        {/* Challenge List Section */}
        <div className="flex flex-col mx-4 sm:mx-20 p-4 max-w-[100vw] max-h-[100vh]  z-20">
          {sortedChallenges.length === 0 ? (
            <div className="flex justify-center items-center h-full text-xl text-purple-100 font-bold mx-auto">
              No Challenges
            </div>
          ) : (
            <div className="challenge-list flex flex-wrap gap-6 justify-center sm:justify-start mx-auto z-20">
              {sortedChallenges.map((challenge) => (
                <Link to={`/challenge/${challenge.id}`} key={challenge.id}>
                  <ChallengeCard id={challenge.id} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Conditional Rendering for CreateChallenge Modal */}
      {location.pathname === "/create-challenge" && (
        <CreateChallenge closeModal={closeModal} />
      )}
    </div>
  );
};

export default Dashboard;
