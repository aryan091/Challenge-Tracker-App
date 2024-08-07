import React, { useState, useRef, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChallengeContext } from "../context/ChallengeContext";
import { formatCreateDate } from "../utils/helper";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";

const CreateChallenge = ({ closeModal }) => {
  const [id, setId] = useState(uuidv4());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [frequency, setFrequency] = useState("daily");
  const [daysPerWeek, setDaysPerWeek] = useState(0);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [activeDatePicker, setActiveDatePicker] = useState(null);
  const [progress, setProgress] = useState([]);
  const [errors, setErrors] = useState({});
  const [createdAt, setCreatedAt] = useState(new Date().toLocaleDateString());

  const { addChallenge, challenges, updateChallenge } =
    useContext(ChallengeContext);
  const datePickerRef = useRef(null);
  const { state } = useLocation();

  /**
   * useEffect hook to populate the form with existing challenge data when editing.
   *
   * If there is a challenge provided in the state, it finds the corresponding challenge
   * in the challenges list and sets the form fields with the challenge's details.
   *
   * Dependencies: state?.challenge, challenges
   */

  useEffect(() => {
    if (state?.challenge) {
      const challengeToEdit = challenges.find(
        (challenge) => challenge.id === state.challenge.id
      );
      if (challengeToEdit) {
        setId(challengeToEdit.id);
        setTitle(challengeToEdit.title);
        setDescription(challengeToEdit.description);
        setStartDate(new Date(challengeToEdit.startDate));
        setEndDate(new Date(challengeToEdit.endDate));
        setFrequency(challengeToEdit.frequency);
        setDaysPerWeek(challengeToEdit.daysPerWeek);
        // Set the progress state for the existing challenge
        setProgress(challengeToEdit.progress || []);
      }
    }
  }, [state?.challenge, challenges]);

  /**
   * Handles the click event outside the date picker component.
   *
   * @param {Event} event - The click event.
   * @return {void} This function does not return a value.
   */
  const handleClickOutside = (event) => {
    if (
      isDatePickerOpen &&
      datePickerRef.current &&
      !datePickerRef.current.contains(event.target)
    ) {
      setIsDatePickerOpen(false);
      setActiveDatePicker(null);
    }
  };

  useEffect(() => {
    // Attach or remove the "mousedown" event listener based on the date picker state

    if (isDatePickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDatePickerOpen]);

  /**
   * Validates the fields of a challenge form.
   *
   * @return {Object} An object containing error messages for each field that failed validation.
   * If there are no errors, the object will be empty.
   */

  const validateFields = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (frequency === "weekly" && daysPerWeek === 0)
      newErrors.daysPerWeek = "Days per week are required";
    if (!startDate) newErrors.startDate = "Start date is required";
    if (!endDate) newErrors.endDate = "End date is required";
    // Check if endDate is before startDate
    if (startDate && endDate && startDate > endDate)
      newErrors.endDate = "End date must be after start date";
    return newErrors;
  };

  /**
   * Handles the save task event by validating the form fields, updating or adding a new challenge, and closing the modal.
   *
   * @param {Event} event - The save task event.
   * @return {void} This function does not return a value.
   */
  const handleSaveTask = async (event) => {
    event.preventDefault();

    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const newTask = {
        id,
        title,
        description,
        startDate: formatCreateDate(startDate),
        endDate: formatCreateDate(endDate),
        frequency,
        daysPerWeek,
        status: "Active",
        createdAt,
        progress: [],
      };

      if (state?.challenge) {
        updateChallenge(id, newTask); // Update the existing challenge
      } else {
        addChallenge(newTask); // Add a new challenge
      }

      closeModal();
    }
  };

  return (
    <div className="task-modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 ">
      <div className="task-modal-content bg-white rounded-lg shadow-lg w-[350px] h-[596px] p-6 flex flex-col justify-between relative sm:w-[644px] ">
        <form className="flex flex-col flex-grow" onSubmit={handleSaveTask}>
          <div className="flex-grow">
            <div className="task-title mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter Challenge Title"
                className="task-title-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>

            <div className="task-description mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <input
                id="description"
                type="text"
                placeholder="Enter Challenge Description"
                className="task-description-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>

            <div className="task-dates mt-8 flex flex-col mb-4 gap-4 sm:flex-row">
              <div className="flex items-center mb-4">
                <label
                  className="text-gray-700 text-sm font-bold mr-2"
                  htmlFor="startDate"
                >
                  Start Date <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  className="task-start-date w-48 h-11 border border-solid-[2px] border-[#E2E2E2] hover:bg-gray-300 py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline shadow-lg font-semibold text-[#707070]"
                  onClick={() => {
                    setIsDatePickerOpen(!isDatePickerOpen);
                    setActiveDatePicker("startDate");
                  }}
                >
                  {formatCreateDate(startDate)}
                </button>
              </div>

              <div className="flex items-center mb-6">
                <label
                  className="text-gray-700 text-sm font-bold mr-2"
                  htmlFor="endDate"
                >
                  End Date <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  className="task-end-date w-48 h-11 border border-solid-[2px] border-[#E2E2E2] hover:bg-gray-300 py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline shadow-lg font-semibold text-[#707070]"
                  onClick={() => {
                    setIsDatePickerOpen(!isDatePickerOpen);
                    setActiveDatePicker("endDate");
                  }}
                >
                  {formatCreateDate(endDate)}
                </button>
              </div>

              {isDatePickerOpen && (
                <div ref={datePickerRef} className="absolute z-50">
                  <DatePicker
                    selected={
                      activeDatePicker === "startDate" ? startDate : endDate
                    }
                    onChange={(date) => {
                      if (activeDatePicker === "startDate") {
                        setStartDate(date);
                      } else {
                        setEndDate(date);
                      }
                      setIsDatePickerOpen(false);
                      setActiveDatePicker(null);
                    }}
                    inline
                    minDate={new Date()} // Disable all dates before today

                  />
                </div>
              )}
            </div>
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate}</p>
            )}
            {errors.endDate && (
              <p className="text-red-500 text-sm">{errors.endDate}</p>
            )}

            <div className="task-frequency-days flex mb-4">
              <div className="task-frequency flex-grow mr-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="frequency"
                >
                  Select Frequency <span className="text-red-500">*</span>
                </label>
                <select
                  id="frequency"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  required
                  className="w-full text-gray-700"
                >
                  <option value="daily" className="text-gray-700">
                    Daily
                  </option>
                  <option value="weekly" className="text-gray-700">
                    Weekly
                  </option>
                </select>
              </div>

              {frequency === "weekly" && (
                <div className="task-days-per-week flex-grow">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="daysPerWeek"
                  >
                    Select Days Per Week <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="daysPerWeek"
                    value={daysPerWeek}
                    onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                    required
                    className="w-full text-gray-700"
                  >
                    <option value="0" className="text-gray-700">
                      Select Days
                    </option>
                    <option value="1" className="text-gray-700">
                      1
                    </option>
                    <option value="2" className="text-gray-700">
                      2
                    </option>
                    <option value="3" className="text-gray-700">
                      3
                    </option>
                    <option value="4" className="text-gray-700">
                      4
                    </option>
                    <option value="5" className="text-gray-700">
                      5
                    </option>
                  </select>
                  {errors.daysPerWeek && (
                    <p className="text-red-500 text-sm">{errors.daysPerWeek}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="task-modal-actions mt-4">
            <div className="task-modal-buttons flex gap-4 sm:gap-[17rem]">
              <button
                type="button"
                className="task-cancel border border-solid border-[#CF3636] w-40 h-11 text-[#CF3636] py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline font-bold shadow-lg"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="task-save w-40 h-11 bg-[#17A2B8] text-white py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline shadow-lg font-bold"
              >
                {state?.challenge ? "Update " : "Save "}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChallenge;
