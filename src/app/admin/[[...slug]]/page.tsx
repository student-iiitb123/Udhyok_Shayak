'use client';

import React, { useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { UserManagement } from '@/components/admin/UserManagement';
import { DepartmentDirectory } from '@/components/admin/DepartmentDirectory';
import { ApprovalConfiguration } from '@/components/admin/ApprovalConfiguration';
import { WorkflowBuilder } from '@/components/admin/WorkflowBuilder';
import { RegulatoryKnowledgeBase } from '@/components/admin/RegulatoryKnowledgeBase';
import { SlaConfiguration } from '@/components/admin/SlaConfiguration';
import { BottleneckAnalysis } from '@/components/admin/BottleneckAnalysis';
import { AuditLogsTable } from '@/components/admin/AuditLogsTable';
import { OwnerSchemes } from '@/components/owner/OwnerSchemes';
import { DepartmentAnalytics } from '@/components/department/DepartmentAnalytics';

export default function AdminPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { setCurrentRole } = useApp();
  const unwrappedParams = React.use(params);
  const subRoute = unwrappedParams?.slug?.[0] || '';

  useEffect(() => {
    setCurrentRole('admin', false);
  }, [setCurrentRole]);

  switch (subRoute) {
    case 'users':
    case 'roles':
      return <UserManagement />;
    case 'departments':
      return <DepartmentDirectory />;
    case 'approval-config':
      return <ApprovalConfiguration />;
    case 'workflow-builder':
      return <WorkflowBuilder />;
    case 'regulatory-rules':
      return <RegulatoryKnowledgeBase />;
    case 'sla-config':
      return <SlaConfiguration />;
    case 'schemes':
      return <OwnerSchemes />;
    case 'bottlenecks':
      return <BottleneckAnalysis />;
    case 'grievance-analytics':
      return <DepartmentAnalytics />;
    case 'audit-logs':
    case 'reports':
      return <AuditLogsTable />;
    default:
      return <AdminDashboard />;
  }
}
