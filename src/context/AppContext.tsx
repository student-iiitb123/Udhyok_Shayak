'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, User, Application, ApplicationDocument, Inspection, 
  Grievance, Scheme, Regulation, AuditLog, SLAConfig, WorkflowStep, 
  DepartmentSummary, NotificationItem, ApplicationStatus, DocumentStatus, InspectionChecklistItem, InspectionObservation, Language
} from '@/types';

import { 
  mockUsers, mockBusinesses, mockApplications, mockDocuments, 
  mockInspections, mockGrievances, mockSchemes, mockRegulations, 
  mockAuditLogs, mockSLAConfigs, mockWorkflowSteps, mockDepartments, 
  mockNotifications 
} from '@/data/mockData';

interface ToastState {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

interface AppContextType {
  // Role & Auth
  currentRole: UserRole;
  setCurrentRole: (role: UserRole, showToast?: boolean) => void;
  currentUser: User;
  isRoleModalOpen: boolean;
  setIsRoleModalOpen: (open: boolean) => void;

  // Data Collections
  applications: Application[];
  documents: ApplicationDocument[];
  inspections: Inspection[];
  grievances: Grievance[];
  schemes: Scheme[];
  regulations: Regulation[];
  auditLogs: AuditLog[];
  slaConfigs: SLAConfig[];
  workflowSteps: WorkflowStep[];
  departments: DepartmentSummary[];
  notifications: NotificationItem[];
  
  // Language State
  language: Language;
  setLanguage: (lang: Language) => void;

  // UI State
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  isBusinessSetupModalOpen: boolean;
  setIsBusinessSetupModalOpen: (open: boolean) => void;
  toasts: ToastState[];
  addToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
  removeToast: (id: string) => void;

  // Actions
  updateApplicationStatus: (appId: string, status: ApplicationStatus, notes?: string) => void;
  submitQueryResponse: (appId: string, responseText: string, fileName?: string) => void;
  scheduleInspection: (appId: string, date: string, time: string, inspectorName: string) => void;
  submitOfficerDecision: (appId: string, decision: 'Approved' | 'Query Raised' | 'Rejected' | 'Inspection Scheduled', remarks?: string) => void;
  createNewApplication: (appData: Partial<Application>) => void;
  uploadDocument: (docData: Partial<ApplicationDocument>) => void;
  verifyDocument: (docId: string, status: DocumentStatus, rejectionReason?: string) => void;
  updateChecklistItem: (inspectionId: string, itemId: string, status: 'Compliant' | 'Partially Compliant' | 'Non-Compliant' | 'Not Applicable', notes?: string) => void;
  addInspectionObservation: (inspectionId: string, observation: Omit<InspectionObservation, 'id'>) => void;
  submitInspectionReport: (inspectionId: string, result: 'Compliant' | 'Conditionally Compliant' | 'Non-Compliant' | 'Requires Re-inspection', remarks: string) => void;
  raiseGrievance: (subject: string, department: string, applicationId: string, description: string) => void;
  respondToGrievance: (grievanceId: string, responseText: string, newStatus: 'In Progress' | 'Escalated' | 'Resolved') => void;
  updateWorkflowSteps: (steps: WorkflowStep[]) => void;
  updateSLAConfig: (id: string, slaDays: number, warningDays: number, escalationDays: number) => void;
  addAuditLog: (action: string, module: string, applicationId: string, status: 'Success' | 'Warning' | 'Failed', details: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRoleState] = useState<UserRole>('owner');
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  // App Data State
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [documents, setDocuments] = useState<ApplicationDocument[]>(mockDocuments);
  const [inspections, setInspections] = useState<Inspection[]>(mockInspections);
  const [grievances, setGrievances] = useState<Grievance[]>(mockGrievances);
  const [schemes, setSchemes] = useState<Scheme[]>(mockSchemes);
  const [regulations, setRegulations] = useState<Regulation[]>(mockRegulations);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(mockAuditLogs);
  const [slaConfigs, setSLAConfigs] = useState<SLAConfig[]>(mockSLAConfigs);
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>(mockWorkflowSteps);
  const [departments] = useState<DepartmentSummary[]>(mockDepartments);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);

  // UI States
  const [language, setLanguage] = useState<Language>('en');
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const [isBusinessSetupModalOpen, setIsBusinessSetupModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = React.useCallback((type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  }, [removeToast]);

  // Update current user when role changes
  const setCurrentRole = React.useCallback((role: UserRole, showToast: boolean = true) => {
    setCurrentRoleState(prevRole => {
      if (prevRole !== role) {
        const userForRole = mockUsers.find(u => u.role === role) || mockUsers[0];
        setCurrentUser(userForRole);
        if (showToast) {
          addToast('info', 'Role Switched', `Active view changed to ${role.toUpperCase()}: ${userForRole.name}`);
        }
      }
      return role;
    });
  }, [addToast]);

  const addAuditLog = (action: string, module: string, applicationId: string, status: 'Success' | 'Warning' | 'Failed', details: string) => {
    const newLog: AuditLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      user: currentUser.name,
      role: currentUser.role === 'owner' ? 'Business Owner' : currentUser.role === 'department' ? 'Department Officer' : currentUser.role === 'inspector' ? 'Inspector' : 'Government Admin',
      action,
      module,
      applicationId,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      status,
      details,
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Actions implementations
  const updateApplicationStatus = (appId: string, status: ApplicationStatus, notes?: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          status,
          lastUpdated: new Date().toISOString().slice(0, 10),
          notes: notes || app.notes
        };
      }
      return app;
    }));
    addAuditLog(`Updated Application Status to ${status}`, 'Applications', appId, 'Success', `Status changed to ${status}. ${notes ? 'Notes: ' + notes : ''}`);
  };

  const submitQueryResponse = (appId: string, responseText: string, fileName?: string) => {
    const now = new Date().toISOString().slice(0, 10);
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          status: 'Under Review',
          queryResponse: responseText,
          queryResponseDate: now,
          lastUpdated: now,
        };
      }
      return app;
    }));

    if (fileName) {
      const newDoc: ApplicationDocument = {
        id: `DOC-${Date.now().toString().slice(-4)}`,
        name: fileName,
        category: 'Query Response Document',
        applicationId: appId,
        uploadedDate: now,
        status: 'Pending Verification',
        size: '1.8 MB',
        fileType: 'PDF',
      };
      setDocuments(prev => [newDoc, ...prev]);
    }

    addToast('success', 'Response Submitted', 'Department query response submitted successfully.');
    addAuditLog('Responded to Query', 'Application Workspace', appId, 'Success', `Applicant provided response: "${responseText.substring(0, 50)}..."`);
  };

  const scheduleInspection = (appId: string, date: string, time: string, inspectorName: string) => {
    const app = applications.find(a => a.id === appId);
    const newInspId = `INSP-2026-${Math.floor(100 + Math.random() * 900)}`;

    const newInspection: Inspection = {
      id: newInspId,
      applicationId: appId,
      applicationNo: appId,
      approvalType: app ? app.approvalType : 'Site Inspection',
      businessName: app ? app.businessName : 'ABC Industries',
      inspectorName,
      inspectorId: 'usr-3',
      location: app ? app.location : 'Pune',
      inspectionDate: date,
      inspectionTime: time,
      status: 'Scheduled',
      checklistItems: [
        { id: 'c-1', label: 'Safety & Emergency Exit Clearances', category: 'General', status: 'Compliant' },
        { id: 'c-2', label: 'Fire Extinguisher Pressure & Date Tags', category: 'Fire Safety', status: 'Compliant' },
        { id: 'c-3', label: 'Effluent & Waste Disposal Line Setup', category: 'Environment', status: 'Partially Compliant' },
        { id: 'c-4', label: 'Mandatory Marathi & English Warning Signs', category: 'Compliance', status: 'Compliant' },
      ],
      observations: [],
    };

    setInspections(prev => [newInspection, ...prev]);
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: 'Inspection Scheduled', inspectionId: newInspId, lastUpdated: new Date().toISOString().slice(0, 10) } : a));

    addToast('success', 'Inspection Scheduled', `Site inspection scheduled for ${date} at ${time}`);
    addAuditLog('Scheduled Inspection', 'Inspection Management', appId, 'Success', `Assigned inspector ${inspectorName} for ${date} ${time}`);
  };

  const submitOfficerDecision = (appId: string, decision: 'Approved' | 'Query Raised' | 'Rejected' | 'Inspection Scheduled', remarks?: string) => {
    const now = new Date().toISOString().slice(0, 10);
    let appStatus: ApplicationStatus = 'Approved';
    if (decision === 'Query Raised') appStatus = 'Query Raised';
    if (decision === 'Rejected') appStatus = 'Rejected';
    if (decision === 'Inspection Scheduled') appStatus = 'Inspection Scheduled';

    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          status: appStatus,
          lastUpdated: now,
          queryText: decision === 'Query Raised' ? remarks : app.queryText,
          queryDate: decision === 'Query Raised' ? now : app.queryDate,
        };
      }
      return app;
    }));

    addToast(
      decision === 'Approved' ? 'success' : decision === 'Rejected' ? 'error' : 'warning',
      `Application ${decision}`,
      `Application #${appId} updated to ${decision}.`
    );

    addAuditLog(`Officer Decision: ${decision}`, 'Scrutiny Desk', appId, decision === 'Approved' ? 'Success' : 'Warning', remarks || `Decision finalized by ${currentUser.name}`);
  };

  const createNewApplication = (appData: Partial<Application>) => {
    const newId = `MH-${appData.department?.split(' ')[0].toUpperCase() || 'GEN'}-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString().slice(0, 10);
    const newApp: Application = {
      id: newId,
      approvalType: appData.approvalType || 'General Industrial License',
      department: appData.department || 'Industries Department',
      businessId: 'biz-101',
      businessName: 'ABC Industries Pvt Ltd',
      status: 'Submitted',
      slaDays: appData.slaDays || 15,
      daysRemaining: appData.slaDays || 15,
      lastUpdated: now,
      createdDate: now,
      priority: appData.priority || 'Normal',
      riskLevel: appData.riskLevel || 'Medium',
      sector: appData.sector || 'Manufacturing',
      location: appData.location || 'Pune MIDC',
    };

    setApplications(prev => [newApp, ...prev]);
    addToast('success', 'Application Submitted', `Application #${newId} registered successfully!`);
    addAuditLog('Created Application', 'Single Window Gateway', newId, 'Success', `Investor initiated application for ${newApp.approvalType}`);
  };

  const uploadDocument = (docData: Partial<ApplicationDocument>) => {
    const now = new Date().toISOString().slice(0, 10);
    const newDoc: ApplicationDocument = {
      id: `DOC-${Date.now().toString().slice(-4)}`,
      name: docData.name || 'Uploaded Document.pdf',
      category: docData.category || 'General Compliance',
      applicationId: docData.applicationId || 'MH-IND-1024',
      uploadedDate: now,
      status: 'Pending Verification',
      size: docData.size || '2.1 MB',
      fileType: docData.fileType || 'PDF',
    };

    setDocuments(prev => [newDoc, ...prev]);
    addToast('success', 'Document Uploaded', `${newDoc.name} stored in document vault.`);
    addAuditLog('Uploaded Document', 'Document Center', newDoc.applicationId, 'Success', `File: ${newDoc.name}`);
  };

  const verifyDocument = (docId: string, status: DocumentStatus, rejectionReason?: string) => {
    setDocuments(prev => prev.map(doc => {
      if (doc.id === docId) {
        return {
          ...doc,
          status,
          rejectionReason: status === 'Rejected' || status === 'Needs Clarification' ? rejectionReason : undefined
        };
      }
      return doc;
    }));
    addToast(status === 'Verified' ? 'success' : 'error', `Document ${status}`, `Document status set to ${status}.`);
  };

  const updateChecklistItem = (inspectionId: string, itemId: string, status: 'Compliant' | 'Partially Compliant' | 'Non-Compliant' | 'Not Applicable', notes?: string) => {
    setInspections(prev => prev.map(insp => {
      if (insp.id === inspectionId) {
        return {
          ...insp,
          checklistItems: insp.checklistItems.map(item => item.id === itemId ? { ...item, status, notes } : item)
        };
      }
      return insp;
    }));
  };

  const addInspectionObservation = (inspectionId: string, observation: Omit<InspectionObservation, 'id'>) => {
    const newObs: InspectionObservation = {
      ...observation,
      id: `obs-${Date.now().toString().slice(-4)}`
    };
    setInspections(prev => prev.map(insp => {
      if (insp.id === inspectionId) {
        return {
          ...insp,
          observations: [...insp.observations, newObs]
        };
      }
      return insp;
    }));
    addToast('info', 'Observation Logged', `Recorded ${observation.severity} severity observation.`);
  };

  const submitInspectionReport = (inspectionId: string, result: 'Compliant' | 'Conditionally Compliant' | 'Non-Compliant' | 'Requires Re-inspection', remarks: string) => {
    setInspections(prev => prev.map(insp => {
      if (insp.id === inspectionId) {
        return {
          ...insp,
          status: 'Completed',
          overallResult: result,
          remarks
        };
      }
      return insp;
    }));

    // Update matching application status
    const insp = inspections.find(i => i.id === inspectionId);
    if (insp) {
      setApplications(prev => prev.map(app => {
        if (app.id === insp.applicationId) {
          return {
            ...app,
            status: result === 'Compliant' ? 'Under Review' : result === 'Requires Re-inspection' ? 'Inspection Scheduled' : 'Query Raised',
            lastUpdated: new Date().toISOString().slice(0, 10)
          };
        }
        return app;
      }));
    }

    addToast('success', 'Inspection Report Submitted', `Field inspection report finalized with result: ${result}`);
    addAuditLog('Submitted Inspection Report', 'Inspection Portal', insp?.applicationId || inspectionId, 'Success', `Report outcome: ${result}. Remarks: ${remarks}`);
  };

  const raiseGrievance = (subject: string, department: string, applicationId: string, description: string) => {
    const newGrv: Grievance = {
      id: `GRV-2026-${Math.floor(100 + Math.random() * 900)}`,
      subject,
      department,
      applicationId,
      description,
      createdDate: new Date().toISOString().slice(0, 10),
      status: 'Open',
      priority: 'High',
      submittedBy: currentUser.name,
    };
    setGrievances(prev => [newGrv, ...prev]);
    addToast('success', 'Grievance Submitted', `Grievance #${newGrv.id} registered. Ticket assigned to Department Head.`);
    addAuditLog('Raised Grievance', 'Grievance System', applicationId, 'Warning', `Ticket #${newGrv.id}: ${subject}`);
  };

  const respondToGrievance = (grievanceId: string, responseText: string, newStatus: 'In Progress' | 'Escalated' | 'Resolved') => {
    const now = new Date().toISOString().slice(0, 10);
    setGrievances(prev => prev.map(g => {
      if (g.id === grievanceId) {
        return {
          ...g,
          status: newStatus,
          responseText,
          resolutionDate: newStatus === 'Resolved' ? now : undefined
        };
      }
      return g;
    }));
    addToast('info', 'Grievance Updated', `Ticket #${grievanceId} updated to ${newStatus}`);
  };

  const updateWorkflowSteps = (steps: WorkflowStep[]) => {
    setWorkflowSteps(steps);
    addToast('success', 'Workflow Updated', 'Single Window workflow pipeline reconfigured.');
    addAuditLog('Updated Workflow Builder', 'Workflow Engine', 'ALL', 'Success', 'Modified stage ordering and duration SLA parameters.');
  };

  const updateSLAConfig = (id: string, slaDays: number, warningDays: number, escalationDays: number) => {
    setSLAConfigs(prev => prev.map(cfg => cfg.id === id ? { ...cfg, slaDays, warningDays, escalationDays } : cfg));
    addToast('success', 'SLA Config Updated', 'Statutory timeline limits updated.');
    addAuditLog('Updated SLA Rules', 'SLA Manager', id, 'Success', `Set SLA to ${slaDays} days, warning at ${warningDays} days.`);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentUser,
        isRoleModalOpen,
        setIsRoleModalOpen,
        applications,
        documents,
        inspections,
        grievances,
        schemes,
        regulations,
        auditLogs,
        slaConfigs,
        workflowSteps,
        departments,
        notifications,
        language,
        setLanguage,
        globalSearchQuery,

        setGlobalSearchQuery,
        isSearchModalOpen,
        setIsSearchModalOpen,
        isBusinessSetupModalOpen,
        setIsBusinessSetupModalOpen,
        toasts,
        addToast,
        removeToast,
        updateApplicationStatus,
        submitQueryResponse,
        scheduleInspection,
        submitOfficerDecision,
        createNewApplication,
        uploadDocument,
        verifyDocument,
        updateChecklistItem,
        addInspectionObservation,
        submitInspectionReport,
        raiseGrievance,
        respondToGrievance,
        updateWorkflowSteps,
        updateSLAConfig,
        addAuditLog,
        markNotificationRead,
        markAllNotificationsRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
