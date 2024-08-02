import React from 'react';

const ChallengeFilter = ({ filter, setFilter }) => {
  return (
    <div className="mb-4">
      <button onClick={() => setFilter('all')} className={`mr-2 ${filter === 'all' ? 'font-bold' : ''}`}>
        All
      </button>
      <button onClick={() => setFilter('active')} className={`mr-2 ${filter === 'active' ? 'font-bold' : ''}`}>
        Active
      </button>
      <button onClick={() => setFilter('completed')} className={`mr-2 ${filter === 'completed' ? 'font-bold' : ''}`}>
        Completed
      </button>
    </div>
  );
};

export default ChallengeFilter;
