'use client';

import React, { useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { OwnerDashboard } from '@/components/owner/OwnerDashboard';
import { MyBusinessProfile } from '@/components/owner/MyBusinessProfile';
import { OwnerApplicationsList } from '@/components/owner/OwnerApplicationsList';
import { DocumentCenter } from '@/components/owner/DocumentCenter';
import { OwnerInspections } from '@/components/owner/OwnerInspections';
import { OwnerCompliance } from '@/components/owner/OwnerCompliance';
import { OwnerSchemes } from '@/components/owner/OwnerSchemes';
import { OwnerGrievances } from '@/components/owner/OwnerGrievances';
import { OwnerRenewals } from '@/components/owner/OwnerRenewals';
import { OwnerAiAssistant } from '@/components/owner/OwnerAiAssistant';

export default function OwnerPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { setCurrentRole } = useApp();
  const unwrappedParams = React.use(params);
  const subRoute = unwrappedParams?.slug?.[0] || '';

  useEffect(() => {
    setCurrentRole('owner', false);
  }, [setCurrentRole]);

  switch (subRoute) {
    case 'business':
      return <MyBusinessProfile />;
    case 'applications':
      return <OwnerApplicationsList />;
    case 'documents':
      return <DocumentCenter />;
    case 'inspections':
      return <OwnerInspections />;
    case 'compliance':
      return <OwnerCompliance />;
    case 'schemes':
      return <OwnerSchemes />;
    case 'grievances':
      return <OwnerGrievances />;
    case 'renewals':
      return <OwnerRenewals />;
    case 'ai-assistant':
      return <OwnerAiAssistant />;
    default:
      return <OwnerDashboard />;
  }
}
