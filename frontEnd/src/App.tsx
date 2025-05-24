import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Elections from './pages/elections/Elections';
import CreateElection from './pages/elections/CreateElection';
import CreateVoter from './pages/voters/CreateVoter';
import CreateCandidate from './pages/candidates/CreateCandidate';

const Candidates = () => <div className="p-4">Candidates page coming soon</div>;
const Voters = () => <div className="p-4">Voters page coming soon</div>;
const Results = () => <div className="p-4">Results page coming soon</div>;
const AuditLogs = () => <div className="p-4">Audit Logs page coming soon</div>;

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          
          {/* Elections Routes */}
          <Route path="/elections" element={<Elections />} />
          <Route path="/elections/create" element={<CreateElection />} />
          
          {/* Candidates Routes */}
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/candidates/create" element={<CreateCandidate />} />
          
          {/* Voters Routes */}
          <Route path="/voters" element={<Voters />} />
          <Route path="/voters/create" element={<CreateVoter />} />
          
          {/* Other Routes */}
          <Route path="/results" element={<Results />} />
          <Route path="/audit" element={<AuditLogs />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
