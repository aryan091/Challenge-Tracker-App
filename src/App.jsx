
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChallengeDetail from './components/ChallengeDetail';
import { ChallengeProvider } from './context/ChallengeContext';
import Dashboard from './components/Dashboard';
import './index.css';

const App = () => {
  return (
    <>
    
    <div className='fixed top-0 z-0 h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'></div>

    <ChallengeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/challenge/:id" element={<ChallengeDetail />} />
          <Route path="/create-challenge" element={<Dashboard />} />
        </Routes>
      </Router>
    </ChallengeProvider>
    </>
  );
  
};

export default App;
