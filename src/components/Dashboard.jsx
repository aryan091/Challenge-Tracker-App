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

    const { challenges } = useContext(ChallengeContext);
    

    const challengesMock = [
        {
            id: 'd2b8e978-7da6-4d54-a9c6-5ce1d28f8254',
            title: 'Aryan',
            description: '5 Km Daily',
            startDate: '2024-08-02',
            endDate: '2024-08-09',
            frequency: 'daily',
            daysPerWeek: 0,
            status: 'Active',
            progress: []
          },
          {
            id: 'fbd22fc1-4f00-44af-93b8-f75bda5b1fad',
            title: 'Pari',
            description: '25 Km per week',
            startDate: '2024-08-02',
            endDate: '2024-08-18',
            frequency: 'weekly',
            daysPerWeek: '4',           
            status: 'Active',
            progress: [  ]
          },
          {
            id: 'fbd22fc1-4f00-44af-93b8-f75bda5b1ffd',
            title: 'Ankur',
            description: '25 Km per week',
            startDate: '2024-08-02',
            endDate: '2024-08-18',
            frequency: 'weekly',
            daysPerWeek: '4',           
            status: 'Active',
            progress: [  ]
          },
          {
            id: 'fbd22fc1-4f00-44af-93b8-f75bda6b1ffd',
            title: 'Ankur',
            description: '25 Km per week',
            startDate: '2024-08-02',
            endDate: '2024-08-18',
            frequency: 'weekly',
            daysPerWeek: '4',           
            status: 'Active',
            progress: [  ]
          },
          {
            id: 'd2b8e978-7da6-4d54-a9c6-5ce1d28f8254',
            title: 'Aryan',
            description: '5 Km Daily',
            startDate: '2024-08-02',
            endDate: '2024-08-09',
            frequency: 'daily',
            daysPerWeek: 0,
            status: 'Active',
            progress: []
          },
          {
            id: 'fbd22fc1-4f00-44af-93b8-f75bda5b1fad',
            title: 'Pari',
            description: '25 Km per week',
            startDate: '2024-08-02',
            endDate: '2024-08-18',
            frequency: 'weekly',
            daysPerWeek: '4',           
            status: 'Active',
            progress: [  ]
          },
          {
            id: 'fbd22fc1-4f00-44af-93b8-f75bda5b1ffd',
            title: 'Ankur',
            description: '25 Km per week',
            startDate: '2024-08-02',
            endDate: '2024-08-18',
            frequency: 'weekly',
            daysPerWeek: '4',           
            status: 'Active',
            progress: [  ]
          },
          {
            id: 'fbd22fc1-4f00-44af-93b8-f75bda6b1ffd',
            title: 'Ankur',
            description: '25 Km per week',
            startDate: '2024-08-02',
            endDate: '2024-08-18',
            frequency: 'weekly',
            daysPerWeek: '4',           
            status: 'Active',
            progress: [  ]
          },
          {
            id: 'd2b8e978-7da6-4d54-a9c6-5ce1d28f8254',
            title: 'Aryan',
            description: '5 Km Daily',
            startDate: '2024-08-02',
            endDate: '2024-08-09',
            frequency: 'daily',
            daysPerWeek: 0,
            status: 'Active',
            progress: []
          },
          {
            id: 'fbd22fc1-4f00-44af-93b8-f75bda5b1fad',
            title: 'Pari',
            description: '25 Km per week',
            startDate: '2024-08-02',
            endDate: '2024-08-18',
            frequency: 'weekly',
            daysPerWeek: '4',           
            status: 'Active',
            progress: [  ]
          },
          {
            id: 'fbd22fc1-4f00-44af-93b8-f75bda5b1ffd',
            title: 'Ankur',
            description: '25 Km per week',
            startDate: '2024-08-02',
            endDate: '2024-08-18',
            frequency: 'weekly',
            daysPerWeek: '4',           
            status: 'Active',
            progress: [  ]
          },
          {
            id: 'fbd22fc1-4f00-44af-93b8-f75bda6b1ffd',
            title: 'Ankur',
            description: '25 Km per week',
            startDate: '2024-08-02',
            endDate: '2024-08-18',
            frequency: 'weekly',
            daysPerWeek: '4',           
            status: 'Active',
            progress: [  ]
          }
    ]

    const handleCreateTaskClick = () => {
        navigate('/create-challenge');
      };
    
      const closeModal = () => {
        navigate('/');
      };
    

  return (
    <div className="dashboard-container">
    {/* Statistics Section */}
    <div className="statistics-section">
      <div className="stat-box">
        <h2 className="stat-number " style={{ lineHeight: "2rem" }}>
          {challenges.length} <span className="stat-text">Challenges Created</span>
        </h2>
      </div>
      <div className="stat-box-ques">
        <h2 className="stat-number-ques" style={{ lineHeight: "2rem" }}>
          {challenges.length} <span className="stat-text-ques">Challenges Completed</span>
        </h2>
      </div>
      <div className="stat-box-imp">
        <h2 className="stat-number-imp " style={{ lineHeight: "2rem" }}>
          {challenges.length} <span className="stat-text-imp">Challenges Active</span>
        </h2>
      </div>
      <div className="stat-box-missed">
        <h2 className="stat-number-ques" style={{ lineHeight: "2rem" }}>
          {challenges.length} <span className="stat-text-ques">Challenges Missed</span>
        </h2>
      </div>

    </div>

    {/* Challenge List Section */}



    <div className='add-task mt-4 '>
    <IoMdAdd size={24} className="cursor-pointer" onClick={handleCreateTaskClick} />

    </div>

    <div className="challenge-list-section flex flex-row flex-wrap gap-6 mx-12 h-full w-full justify-center p-8">
    {
        challenges.map((challenge) => (
         <Link to={`/challenge/${challenge.id}`} key={challenge.id}><ChallengeCard key={challenge.id} challenge={challenge} /></Link> 
        ))
    }
    </div>
    {location.pathname === '/create-challenge' && (
        <CreateChallenge closeModal={closeModal}  />
      )}
      {isModalOpen && <isModalOpen closeModal={() => setIsModalOpen(false)} />}
    

    </div>
)
}

export default Dashboard