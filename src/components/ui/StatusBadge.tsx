'use client';

import React from 'react';
import { ApplicationStatus, DocumentStatus, InspectionStatus } from '@/types';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm' }) => {
  let badgeStyle = 'bg-slate-100 text-slate-800 border-slate-300';
  let dotColor = 'bg-slate-500';

  const normalized = status.toLowerCase();

  if (
    normalized === 'approved' || 
    normalized === 'completed' || 
    normalized === 'compliant' || 
    normalized === 'verified' || 
    normalized === 'active' ||
    normalized === 'resolved' ||
    normalized === 'eligible'
  ) {
    badgeStyle = 'bg-emerald-50 text-emerald-800 border-emerald-300';
    dotColor = 'bg-emerald-600';
  } else if (
    normalized === 'query raised' || 
    normalized === 'under review' || 
    normalized === 'submitted' || 
    normalized === 'pending verification' ||
    normalized === 'needs clarification' ||
    normalized === 'maybe eligible' ||
    normalized === 'in progress' ||
    normalized === 'report pending'
  ) {
    badgeStyle = 'bg-amber-50 text-amber-800 border-amber-300';
    dotColor = 'bg-amber-600';
  } else if (
    normalized === 'inspection scheduled' || 
    normalized === 'inspection' ||
    normalized === 'scheduled' ||
    normalized === 'assigned'
  ) {
    badgeStyle = 'bg-purple-50 text-purple-800 border-purple-300';
    dotColor = 'bg-purple-600';
  } else if (
    normalized === 'rejected' || 
    normalized === 'delayed' || 
    normalized === 'sla breached' || 
    normalized === 'overdue' || 
    normalized === 'escalated' ||
    normalized === 'non-compliant' ||
    normalized === 'failed'
  ) {
    badgeStyle = 'bg-red-50 text-red-800 border-red-300 font-bold';
    dotColor = 'bg-red-600';
  }

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : size === 'lg' ? 'px-3 py-1 text-xs font-bold' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${sizeClasses} ${badgeStyle}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor} shrink-0`}></span>
      <span>{status}</span>
    </span>
  );
};
