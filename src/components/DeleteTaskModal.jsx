import React, { useContext } from "react";
import { ChallengeContext } from '../context/ChallengeContext';
import { useNavigate } from 'react-router-dom';

const DeleteTaskModal = ({ closeModal, id }) => {
    const { deleteChallenge } = useContext(ChallengeContext);
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await deleteChallenge(id);
            closeModal();
            navigate('/'); // Redirect to the homepage after deletion
        } catch (error) {
            console.error("Error deleting challenge:", error);
            // Handle the error (e.g., show a notification)
        }
    };

    return (
        <div className="delete-task-modal z-50 w-full h-full fixed inset-0 flex items-center justify-center bg-white bg-opacity-50">
            <div className="delete-task-modal-content bg-white rounded-xl shadow-lg w-[644px] h-52 p-6 flex flex-col justify-between relative z-70">
                <div className="delete-task-modal-content-inner flex flex-col justify-between items-center gap-8">
                    <div className="delete-task-modal-content-text">
                        <p className="text-value text-sm font-bold text-neutral-500">Are you sure you want to delete?</p>
                    </div>
                    <div className="delete-task-modal-buttons flex flex-col text-center gap-2">
                        <button
                            className="w-full h-11 bg-[#17A2B8] text-white py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline shadow-lg font-bold cursor-pointer"
                            onClick={handleDelete}
                        >
                            Yes, Delete
                        </button>
                        <button
                            className="w-full h-11 border border-solid border-[#CF3636] text-[#CF3636] py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline font-bold shadow-lg cursor-pointer"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteTaskModal;
