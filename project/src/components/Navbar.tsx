import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Lightbulb, FileText, Search, Phone, UserCog } from 'lucide-react';
import useStore from '../store/useStore';

const Navbar = () => {
  const location = useLocation();
  const { user } = useStore();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Lightbulb className="h-6 w-6" />
              <span className="font-bold text-xl">StreetLight</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/') ? 'bg-blue-700' : 'hover:bg-blue-500'
                }`}
              >
                <Lightbulb className="h-4 w-4" />
                <span>Home</span>
              </Link>
              
              <Link
                to="/report"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/report') ? 'bg-blue-700' : 'hover:bg-blue-500'
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>Report Fault</span>
              </Link>
              
              <Link
                to="/track"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/track') ? 'bg-blue-700' : 'hover:bg-blue-500'
                }`}
              >
                <Search className="h-4 w-4" />
                <span>Track Report</span>
              </Link>
              
              <Link
                to="/contact"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/contact') ? 'bg-blue-700' : 'hover:bg-blue-500'
                }`}
              >
                <Phone className="h-4 w-4" />
                <span>Contact</span>
              </Link>

              {(user.role === 'admin' || user.role === 'worker') && (
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/dashboard') ? 'bg-blue-700' : 'hover:bg-blue-500'
                  }`}
                >
                  <UserCog className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;