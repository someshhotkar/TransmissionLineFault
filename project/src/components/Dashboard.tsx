import React, { useState } from 'react';
import { Wrench, CheckCircle2, Calendar } from 'lucide-react';
import useStore from '../store/useStore';

const Dashboard = () => {
  const { reports, workers, assignWorker, completeReport, updateWorkStatus, user } = useStore();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [appointmentDate, setAppointmentDate] = useState<string>('');

  const handleImageUpload = (reportId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        completeReport(reportId, base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAssignWorker = (reportId: string, workerId: string) => {
    if (appointmentDate) {
      assignWorker(reportId, workerId, appointmentDate);
      setAppointmentDate('');
    } else {
      alert('Please select an appointment date');
    }
  };

  const handleStatusUpdate = (reportId: string, status: string) => {
    updateWorkStatus(reportId, status);
  };

  const pendingReports = reports.filter(r => r.status === 'pending');
  const assignedReports = reports.filter(r => r.status === 'assigned');
  const completedReports = reports.filter(r => r.status === 'completed');

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-lg font-semibold">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{pendingReports.length}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-lg font-semibold">In Progress</p>
            <p className="text-2xl font-bold text-blue-600">{assignedReports.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-lg font-semibold">Completed</p>
            <p className="text-2xl font-bold text-green-600">{completedReports.length}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Pending Reports */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Pending Reports</h3>
          <div className="space-y-4">
            {pendingReports.map((report) => (
              <div key={report.id} className="border p-3 rounded">
                <p className="font-medium">Report #{report.id}</p>
                <p>Location: {report.location}</p>
                <p>Pole: {report.poleNumber}</p>
                <p>Description: {report.description}</p>
                {user.role === 'admin' && (
                  <div className="space-y-2 mt-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Appointment Date
                      </label>
                      <input
                        type="datetime-local"
                        className="mt-1 block w-full rounded border p-2"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                      />
                    </div>
                    <select
                      className="w-full rounded border p-2"
                      onChange={(e) => handleAssignWorker(report.id, e.target.value)}
                      defaultValue=""
                    >
                      <option value="" disabled>Assign Worker</option>
                      {workers.map((worker) => (
                        <option key={worker} value={worker}>{worker}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Assigned Reports */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Assigned Reports</h3>
          <div className="space-y-4">
            {assignedReports.map((report) => (
              <div key={report.id} className="border p-3 rounded">
                <p className="font-medium">Report #{report.id}</p>
                <p>Location: {report.location}</p>
                <p>Assigned to: {report.assignedTo}</p>
                <p>Appointment: {new Date(report.appointmentDate || '').toLocaleString()}</p>
                <p>Status: {report.workStatus}</p>
                
                {user.role === 'worker' && (
                  <div className="mt-2 space-y-2">
                    <select
                      className="w-full rounded border p-2"
                      onChange={(e) => handleStatusUpdate(report.id, e.target.value)}
                      value={report.workStatus || ''}
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="En Route">En Route</option>
                      <option value="Working">Working</option>
                      <option value="Testing">Testing</option>
                    </select>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Upload Completion Photo
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(report.id, e)}
                        className="mt-1 block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Completed Reports */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Completed Reports</h3>
          <div className="space-y-4">
            {completedReports.map((report) => (
              <div key={report.id} className="border p-3 rounded">
                <p className="font-medium">Report #{report.id}</p>
                <p>Location: {report.location}</p>
                <p>Completed by: {report.assignedTo}</p>
                {report.completionPhoto && (
                  <div className="mt-2">
                    <img
                      src={report.completionPhoto}
                      alt="Completion"
                      className="w-full h-32 object-cover rounded cursor-pointer"
                      onClick={() => setSelectedImage(report.completionPhoto)}
                    />
                  </div>
                )}
                <div className="flex items-center mt-2 text-green-600">
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  <span>Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Completion"
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;