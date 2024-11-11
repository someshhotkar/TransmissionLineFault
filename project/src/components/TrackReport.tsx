import React, { useState } from 'react';
import { Search, CheckCircle, Clock, UserCheck } from 'lucide-react';
import useStore from '../store/useStore';

const TrackReport = () => {
  const reports = useStore((state) => state.reports);
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const report = reports.find((r) => r.id === searchId);
    setSearchResult(report);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'assigned':
        return <UserCheck className="h-6 w-6 text-blue-500" />;
      default:
        return <Clock className="h-6 w-6 text-yellow-500" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center space-x-2 mb-6">
        <Search className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Track Your Report</h2>
      </div>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex space-x-2">
          <input
            type="text"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter report ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Track
          </button>
        </div>
      </form>

      {searchResult ? (
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-medium">Report #{searchResult.id}</span>
            <div className="flex items-center space-x-2">
              {getStatusIcon(searchResult.status)}
              <span className="capitalize">{searchResult.status}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <p><strong>Location:</strong> {searchResult.location}</p>
            <p><strong>Pole Number:</strong> {searchResult.poleNumber}</p>
            <p><strong>Description:</strong> {searchResult.description}</p>
            <p><strong>Reported:</strong> {new Date(searchResult.reportDate).toLocaleDateString()}</p>
            {searchResult.assignedTo && (
              <p><strong>Assigned to:</strong> {searchResult.assignedTo}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          Enter your report ID to track its status
        </div>
      )}
    </div>
  );
};

export default TrackReport;