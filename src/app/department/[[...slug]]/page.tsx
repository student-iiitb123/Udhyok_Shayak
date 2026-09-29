'use client';

import React, { useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { DepartmentDashboard } from '@/components/department/DepartmentDashboard';
import { ApplicationQueue } from '@/components/department/ApplicationQueue';
import { SlaMonitor } from '@/components/department/SlaMonitor';
import { DepartmentAnalytics } from '@/components/department/DepartmentAnalytics';
import { DepartmentCompliance } from '@/components/department/DepartmentCompliance';
import { RegulatoryKnowledgeBase } from '@/components/admin/RegulatoryKnowledgeBase';
import { OwnerInspections } from '@/components/owner/OwnerInspections';
import { OwnerGrievances } from '@/components/owner/OwnerGrievances';

export default function DepartmentPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { setCurrentRole } = useApp();
  const unwrappedParams = React.use(params);
  const subRoute = unwrappedParams?.slug?.[0] || '';

  useEffect(() => {
    setCurrentRole('department', false);
  }, [setCurrentRole]);

  switch (subRoute) {
    case 'queue':
      return <ApplicationQueue />;
    case 'sla':
      return <SlaMonitor />;
    case 'analytics':
      return <DepartmentAnalytics />;
    case 'rules':
      return <RegulatoryKnowledgeBase />;
    case 'inspections':
      return <OwnerInspections />;
    case 'compliance':
      return <DepartmentCompliance />;
    case 'grievances':
      return <OwnerGrievances />;
    default:
      return <DepartmentDashboard />;
  }
}
