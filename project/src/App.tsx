import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ReportForm from './components/ReportForm';
import TrackReport from './components/TrackReport';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import useStore from './store/useStore';

function App() {
  const setUser = useStore((state) => state.setUser);
  const loginAsAdmin = () => setUser({ id: '1', role: 'admin' });
  const loginAsWorker = () => setUser({ id: '2', role: 'worker' });
  const logout = () => setUser({ id: '', role: null });
  const user = useStore((state) => state.user);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="bg-gray-100 p-4 flex justify-center space-x-4">
          {!user.role ? (
            <>
              <button
                onClick={loginAsAdmin}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Login as Admin
              </button>
              <button
                onClick={loginAsWorker}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Login as Worker
              </button>
            </>
          ) : (
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Logout ({user.role})
            </button>
          )}
        </div>

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<ReportForm />} />
            <Route path="/track" element={<TrackReport />} />
            <Route path="/contact" element={
              <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  For emergency situations or immediate assistance, please contact us:
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Emergency Hotline:</span>
                    <span>1800-LIGHTS (1800-544-487)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Email:</span>
                    <span>support@streetlights.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Operating Hours:</span>
                    <span>24/7 for emergencies</span>
                  </div>
                </div>
              </div>
            } />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;