export type UserRole = 'owner' | 'department' | 'inspector' | 'admin';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  designation: string;
  department?: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface Business {
  id: string;
  name: string;
  registrationNo: string;
  category: string;
  sector: string;
  location: string;
  address: string;
  ownerName: string;
  phone: string;
  status: 'Active' | 'Pending Verification' | 'Suspended';
}

export type ApplicationStatus = 
  | 'Submitted' 
  | 'Under Review' 
  | 'Query Raised' 
  | 'Inspection Scheduled' 
  | 'Approved' 
  | 'Rejected' 
  | 'Delayed';

export interface Application {
  id: string;
  approvalType: string;
  department: string;
  businessId: string;
  businessName: string;
  status: ApplicationStatus;
  slaDays: number;
  daysRemaining: number;
  lastUpdated: string;
  createdDate: string;
  priority: 'Normal' | 'High' | 'Urgent';
  riskLevel: 'Low' | 'Medium' | 'High';
  sector: string;
  location: string;
  queryText?: string;
  queryDate?: string;
  queryResponse?: string;
  queryResponseDate?: string;
  inspectionId?: string;
  notes?: string;
}

export type DocumentStatus = 'Verified' | 'Pending Verification' | 'Rejected' | 'Needs Clarification';

export interface ApplicationDocument {
  id: string;
  name: string;
  category: string;
  applicationId: string;
  uploadedDate: string;
  expiryDate?: string;
  status: DocumentStatus;
  size: string;
  fileType: string;
  rejectionReason?: string;
}

export type InspectionStatus = 'Assigned' | 'Scheduled' | 'In Progress' | 'Completed' | 'Report Pending' | 'Closed';

export interface InspectionChecklistItem {
  id: string;
  label: string;
  category: string;
  status: 'Compliant' | 'Partially Compliant' | 'Non-Compliant' | 'Not Applicable';
  notes?: string;
}

export interface InspectionObservation {
  id: string;
  category: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  evidenceFile?: string;
  correctiveAction: string;
  deadline: string;
}

export interface Inspection {
  id: string;
  applicationId: string;
  applicationNo: string;
  approvalType: string;
  businessName: string;
  inspectorName: string;
  inspectorId: string;
  location: string;
  inspectionDate: string;
  inspectionTime: string;
  status: InspectionStatus;
  checklistItems: InspectionChecklistItem[];
  observations: InspectionObservation[];
  overallResult?: 'Compliant' | 'Conditionally Compliant' | 'Non-Compliant' | 'Requires Re-inspection';
  remarks?: string;
}

export interface Grievance {
  id: string;
  subject: string;
  department: string;
  applicationId: string;
  description: string;
  createdDate: string;
  status: 'Open' | 'In Progress' | 'Escalated' | 'Resolved';
  resolutionDate?: string;
  responseText?: string;
  priority: 'Normal' | 'High' | 'Urgent';
  submittedBy: string;
}

export interface Scheme {
  id: string;
  name: string;
  department: string;
  eligibility: string;
  benefits: string;
  deadline: string;
  status: 'Eligible' | 'Maybe Eligible' | 'Applied' | 'Approved';
  sector: string;
  location: string;
}

export interface Regulation {
  id: string;
  actName: string;
  section: string;
  title: string;
  description: string;
  category: string;
  lastUpdated: string;
  applicability: string;
}

export interface AuditLog {
  id: string;
  user: string;
  role: string;
  action: string;
  module: string;
  applicationId: string;
  timestamp: string;
  status: 'Success' | 'Warning' | 'Failed';
  details: string;
}

export interface SLAConfig {
  id: string;
  approvalType: string;
  department: string;
  slaDays: number;
  warningDays: number;
  escalationDays: number;
}

export interface WorkflowStep {
  id: string;
  order: number;
  stepName: string;
  description: string;
  department: string;
  durationDays: number;
  isRequired: boolean;
}

export interface DepartmentSummary {
  id: string;
  name: string;
  head: string;
  officersCount: number;
  totalApplications: number;
  pendingApplications: number;
  avgSlaDays: number;
}

export type Language = 'en' | 'mr' | 'hi';

export interface NotificationItem {
  id: string;
  role?: UserRole;
  title: string;
  titleMr?: string;
  titleHi?: string;
  message: string;
  messageMr?: string;
  messageHi?: string;
  timestamp: string;
  timestampMr?: string;
  timestampHi?: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'alert';
  linkTo?: string;
}

