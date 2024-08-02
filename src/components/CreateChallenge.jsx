import React, { useState, useRef, useEffect, useContext } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ChallengeContext } from '../context/ChallengeContext';
import { v4 as uuidv4 } from 'uuid';
import { useLocation  } from 'react-router-dom'; 

const CreateChallenge = ({ closeModal }) => {
    const [id, setId] = useState(uuidv4());
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [frequency, setFrequency] = useState('daily');
    const [daysPerWeek, setDaysPerWeek] = useState(0);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [activeDatePicker, setActiveDatePicker] = useState(null);
    const [errors, setErrors] = useState({});

    const { addChallenge, challenges, updateChallenge } = useContext(ChallengeContext);


    const datePickerRef = useRef(null);

    const { state } = useLocation();

    useEffect(() => {
        if (state?.challengeId) {
            const challengeToEdit = challenges.find(challenge => challenge.id === state.challengeId);
            if (challengeToEdit) {
                setId(challengeToEdit.id);
                setTitle(challengeToEdit.title);
                setDescription(challengeToEdit.description);
                setStartDate(new Date(challengeToEdit.startDate));
                setEndDate(new Date(challengeToEdit.endDate));
                setFrequency(challengeToEdit.frequency);
                setDaysPerWeek(challengeToEdit.daysPerWeek);
            }
        }
    }, [state?.challengeId, challenges]);

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
        if (isDatePickerOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDatePickerOpen]);

    const formatDate = (date) => {
        if (!date) return "Select Date";
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };

    const validateFields = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = "Title is required";
        if (!description.trim()) newErrors.description = "Description is required";
        if (frequency === 'weekly' && daysPerWeek === 0) newErrors.daysPerWeek = "Days per week are required";
        if (!startDate) newErrors.startDate = "Start date is required";
        if (!endDate) newErrors.endDate = "End date is required";
        return newErrors;
    };

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
                startDate: formatDate(startDate),
                endDate: formatDate(endDate),
                frequency,
                daysPerWeek,
                status: 'Active',
                progress: [],
            };

            if (state?.challengeId) {
                updateChallenge(id, newTask); // Update the existing challenge
            } else {
                addChallenge(newTask); // Add a new challenge
            }
            closeModal();
        }
    };

    return (
        <div className="task-modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
            <div className="task-modal-content bg-white rounded-lg shadow-lg w-[644px] h-[596px] p-6 flex flex-col justify-between relative">
                <form className="flex flex-col flex-grow" onSubmit={handleSaveTask}>
                    {/* Form fields here */}
                    {/* ... */}
                    <div className="task-modal-actions mt-4">
                        <div className="task-modal-buttons flex gap-[17rem]">
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
                                Save
                            </button>
                        </div>
                    </div>
                </form>
                {isDatePickerOpen && (
                    <div
                        ref={datePickerRef}
                        className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
                    >
                        <DatePicker
                            selected={activeDatePicker === 'startDate' ? startDate : endDate}
                            onChange={(date) => {
                                if (activeDatePicker === 'startDate') {
                                    setStartDate(date);
                                } else {
                                    setEndDate(date);
                                }
                                setIsDatePickerOpen(false);
                            }}
                            inline
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateChallenge;
