import React  , {useState , useContext} from 'react'
import { ChallengeContext } from '../context/ChallengeContext';
import { Link  , useNavigate} from 'react-router-dom';
import './Dashboard.css'
import ChallengeCard from './ChallengeCard';
import { IoMdAdd } from "react-icons/io";
import CreateChallenge from './CreateChallenge';

const Dashboard = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const { challenges , getStats } = useContext(ChallengeContext);
    
    const stats = getStats();



    const handleCreateTaskClick = () => {
        navigate('/create-challenge');
      };
    
      const closeModal = () => {
        navigate('/');
      };

    

  return (
    <div className="App overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900  ">

        <div className="dashboard-container">
    {/* Statistics Section */}
    <div className="statistics-section">
      <div className="stat-box">
        <h2 className="stat-number " style={{ lineHeight: "2rem" }}>
          {stats.totalChallenges} <span className="stat-text">Challenges Created</span>
        </h2>
      </div>
      <div className="stat-box-ques">
        <h2 className="stat-number-ques" style={{ lineHeight: "2rem" }}>
          {stats.completedCount} <span className="stat-text-ques">Challenges Completed</span>
        </h2>
      </div>
      <div className="stat-box-imp">
        <h2 className="stat-number-imp " style={{ lineHeight: "2rem" }}>
          {stats.activeCount} <span className="stat-text-imp">Challenges Active</span>
        </h2>
      </div>
      <div className="stat-box-missed">
        <h2 className="stat-number-missed" style={{ lineHeight: "2rem" }}>
          {stats.missedCount} <span className="stat-text-missed">Challenges Missed</span>
        </h2>
      </div>

    </div>

    {/* Challenge List Section */}



    <div className='add-task mt-4  z-20'>
    <IoMdAdd size={24} color="white" className="cursor-pointer z-20 " onClick={handleCreateTaskClick} />

    </div>

    <div className="challenge-list-section flex flex-row flex-wrap gap-6 mx-12 h-full w-full justify-center p-8">
    {
        challenges.map((challenge) => (
         <Link to={`/challenge/${challenge.id}`} key={challenge.id}><ChallengeCard key={challenge.id} id={challenge.id} /></Link> 
        ))
    }
    </div>
    {location.pathname === '/create-challenge' && (
        <CreateChallenge closeModal={closeModal}  />
      )}
      {isModalOpen && <isModalOpen closeModal={() => setIsModalOpen(false)} />}
    

    </div>
    </div>

)
}

export default Dashboard