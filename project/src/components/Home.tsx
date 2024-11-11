import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, FileText, Search, Phone, AlertTriangle, Clock, CheckCircle, Wrench } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Transmission Line Fault Reporting System</h1>
          <p className="text-xl mb-8">
            Ensuring safer streets through prompt maintenance and repairs. Report faulty street lights and help us keep your community well-lit.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/report"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Report a Fault
            </Link>
            <Link
              to="/track"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Track Report
            </Link>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-500">
          <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Safety First</h3>
          <p className="text-gray-600">Faulty street lights can pose serious safety risks. Report issues immediately to keep your community safe.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-yellow-500">
          <Clock className="h-12 w-12 text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Quick Response</h3>
          <p className="text-gray-600">Our dedicated team responds promptly to all reports, prioritizing urgent safety concerns.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
          <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Verified Repairs</h3>
          <p className="text-gray-600">All repairs are thoroughly checked and verified with photo evidence before closing the report.</p>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg shadow-md mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Process</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-100 rounded-full p-4 mb-4">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Report</h3>
            <p className="text-gray-600">Submit detailed fault information through our easy-to-use form.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-purple-100 rounded-full p-4 mb-4">
              <Search className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Assessment</h3>
            <p className="text-gray-600">Our team evaluates the report and prioritizes based on safety impact.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-100 rounded-full p-4 mb-4">
              <Wrench className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Repair</h3>
            <p className="text-gray-600">Qualified technicians are dispatched to fix the reported issue.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-yellow-100 rounded-full p-4 mb-4">
              <CheckCircle className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Verification</h3>
            <p className="text-gray-600">Final checks ensure the repair meets our quality standards.</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Emergency Support Available 24/7</h2>
        <p className="text-gray-600 mb-6">For urgent issues requiring immediate attention, contact our emergency hotline.</p>
        <div className="text-xl font-semibold text-blue-600">1800-LIGHTS (1800-544-487)</div>
      </div>
    </div>
  );
}

export default Home;