import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';


interface Stat {
  id: number;
  name: string;
  value: number;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ReactNode;
}

interface RecentElection {
  id: string;
  title: string;
  status: string;
  startDate: string;
  voters: number;
  progress: number;
}

const Dashboard: React.FC = () => {
  // Mock data for dashboard
  const stats: Stat[] = [
    { 
      id: 1, 
      name: 'Active Elections', 
      value: 3, 
      change: '+20%', 
      changeType: 'increase',
      icon: (
        <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    { 
      id: 2, 
      name: 'Registered Voters', 
      value: 2543, 
      change: '+15%', 
      changeType: 'increase',
      icon: (
        <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    { 
      id: 3, 
      name: 'Total Candidates', 
      value: 48, 
      change: '+12%', 
      changeType: 'increase',
      icon: (
        <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    { 
      id: 4, 
      name: 'Votes Cast', 
      value: 1789, 
      change: '+18%', 
      changeType: 'increase',
      icon: (
        <svg className="h-6 w-6 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const recentElections: RecentElection[] = [
    {
      id: '1',
      title: 'City Council Election 2025',
      status: 'Upcoming',
      startDate: 'Jun 15, 2025',
      voters: 1254,
      progress: 0
    },
    {
      id: '2',
      title: 'Student Body President',
      status: 'Preparation',
      startDate: 'May 30, 2025',
      voters: 520,
      progress: 25
    },
    {
      id: '3',
      title: 'Neighborhood Association Board',
      status: 'Completed',
      startDate: 'Dec 10, 2024',
      voters: 89,
      progress: 100
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'Preparation':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Completed':
        return 'bg-gray-100 text-gray-800 border border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to the Online Voting and Election Management System.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {stat.icon}
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd>
                      <div className="text-lg font-semibold text-gray-900">{stat.value.toLocaleString()}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <span className={`font-medium ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
                <span className="text-gray-500"> from previous period</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Elections */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Recent Elections</h3>
              <Link to="/elections">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            <div className="divide-y divide-gray-200">
              {recentElections.map((election) => (
                <div key={election.id} className="px-6 py-5">
                  <div className="flex items-center justify-between mb-2">
                    <Link to={`/elections/${election.id}`} className="text-lg font-medium text-primary-600 hover:text-primary-800">
                      {election.title}
                    </Link>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(election.status)}`}>
                      {election.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mb-3">
                    Start Date: {election.startDate} • {election.voters.toLocaleString()} registered voters
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${election.status === 'Completed' ? 'bg-gray-500' : 'bg-primary-600'}`}
                      style={{ width: `${election.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="bg-white shadow rounded-lg border border-gray-200">
            <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6 space-y-4">
              <Link to="/elections/create" className="block">
                <Button variant="primary" fullWidth iconLeft={
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                }>
                  Create New Election
                </Button>
              </Link>
              <Link to="/voters/create" className="block">
                <Button variant="outline" fullWidth iconLeft={
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                    <path d="M16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                  </svg>
                }>
                  Register New Voter
                </Button>
              </Link>
              <Link to="/candidates/create" className="block">
                <Button variant="outline" fullWidth iconLeft={
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                }>
                  Add New Candidate
                </Button>
              </Link>
              <Link to="/results" className="block">
                <Button variant="outline" fullWidth iconLeft={
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                }>
                  View Election Results
                </Button>
              </Link>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white shadow rounded-lg border border-gray-200 mt-6">
            <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900">System Status</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-gray-500">Server Status</div>
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm font-medium text-green-700">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-gray-500">Database</div>
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm font-medium text-green-700">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-500">Last Updated</div>
                <div className="text-sm text-gray-700">Today at 12:45 PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 