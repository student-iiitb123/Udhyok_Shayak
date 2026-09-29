'use client';

import React, { useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { InspectorDashboard } from '@/components/inspector/InspectorDashboard';
import { InspectionList } from '@/components/inspector/InspectionList';
import { InspectionCalendar } from '@/components/inspector/InspectionCalendar';
import { ConductInspectionWorkspace } from '@/components/inspector/ConductInspectionWorkspace';
import { SubmitInspectionReports } from '@/components/inspector/SubmitInspectionReports';
import { FieldObservationsList } from '@/components/inspector/FieldObservationsList';
import { OwnerCompliance } from '@/components/owner/OwnerCompliance';
import { DocumentCenter } from '@/components/owner/DocumentCenter';

export default function InspectorPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { setCurrentRole } = useApp();
  const unwrappedParams = React.use(params);
  const subRoute = unwrappedParams?.slug?.[0] || '';

  useEffect(() => {
    setCurrentRole('inspector', false);
  }, [setCurrentRole]);

  switch (subRoute) {
    case 'list':
      return <InspectionList />;
    case 'calendar':
      return <InspectionCalendar />;
    case 'conduct':
      return <ConductInspectionWorkspace />;
    case 'reports':
      return <SubmitInspectionReports />;
    case 'observations':
      return <FieldObservationsList />;
    case 'compliance':
      return <OwnerCompliance />;
    case 'documents':
      return <DocumentCenter />;
    default:
      return <InspectorDashboard />;
  }
}
