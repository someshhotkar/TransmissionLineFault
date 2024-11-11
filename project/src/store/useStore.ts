import { create } from 'zustand';

interface Report {
  id: string;
  location: string;
  description: string;
  status: 'pending' | 'assigned' | 'completed';
  poleNumber: string;
  reportDate: string;
  assignedTo?: string;
  appointmentDate?: string;
  completionPhoto?: string;
  workStatus?: string;
}

interface User {
  id: string;
  role: 'admin' | 'worker' | null;
}

interface StoreState {
  reports: Report[];
  user: User;
  workers: string[];
  addReport: (report: Omit<Report, 'id' | 'status' | 'reportDate'>) => void;
  assignWorker: (reportId: string, workerId: string, appointmentDate: string) => void;
  updateWorkStatus: (reportId: string, status: string) => void;
  completeReport: (reportId: string, completionPhoto: string) => void;
  setUser: (user: User) => void;
}

const useStore = create<StoreState>((set) => ({
  reports: [],
  user: { id: '', role: null },
  workers: ['Worker 1', 'Worker 2', 'Worker 3'],
  
  addReport: (reportData) => set((state) => ({
    reports: [...state.reports, {
      ...reportData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      reportDate: new Date().toISOString(),
    }],
  })),

  assignWorker: (reportId, workerId, appointmentDate) => set((state) => ({
    reports: state.reports.map((report) =>
      report.id === reportId
        ? { ...report, status: 'assigned', assignedTo: workerId, appointmentDate, workStatus: 'Scheduled' }
        : report
    ),
  })),

  updateWorkStatus: (reportId, status) => set((state) => ({
    reports: state.reports.map((report) =>
      report.id === reportId
        ? { ...report, workStatus: status }
        : report
    ),
  })),

  completeReport: (reportId, completionPhoto) => set((state) => ({
    reports: state.reports.map((report) =>
      report.id === reportId
        ? { ...report, status: 'completed', completionPhoto, workStatus: 'Completed' }
        : report
    ),
  })),

  setUser: (user) => set({ user }),
}));

export default useStore;