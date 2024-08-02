
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChallengeDetail from './components/ChallengeDetail';
import { ChallengeProvider } from './context/ChallengeContext';
import Dashboard from './components/Dashboard';
import './index.css';

const App = () => {
  return (
    <ChallengeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/challenge/:id" element={<ChallengeDetail />} />
          <Route path="/create-challenge" element={<Dashboard />} />
        </Routes>
      </Router>
    </ChallengeProvider>
  );
};

export default App;
