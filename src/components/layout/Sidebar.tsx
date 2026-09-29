'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  LayoutDashboard, FileText, FolderArchive, ClipboardCheck, 
  ShieldCheck, Gift, MessageSquareWarning, RefreshCw, Sparkles, 
  Users, UserCheck, Landmark, Settings, Sliders, Layers, 
  BookOpen, Clock, AlertOctagon, BarChart3, Calendar, FileQuestion, 
  Bell, Building, Eye, ChevronRight
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

export const Sidebar: React.FC = () => {
  const { currentRole, applications, grievances, inspections } = useApp();
  const pathname = usePathname();

  // Dynamic counts for badges
  const pendingAppsCount = applications.filter(a => a.status === 'Query Raised' || a.status === 'Submitted').length;
  const openGrievancesCount = grievances.filter(g => g.status === 'Open' || g.status === 'Escalated').length;
  const pendingInspectionsCount = inspections.filter(i => i.status === 'Scheduled' || i.status === 'Report Pending').length;

  const ownerNav: NavItem[] = [
    { label: 'Dashboard', href: '/owner', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'My Business', href: '/owner/business', icon: <Building className="w-4 h-4" /> },
    { label: 'Applications & Approvals', href: '/owner/applications', icon: <FileText className="w-4 h-4" />, badge: pendingAppsCount > 0 ? `${pendingAppsCount}` : undefined },
    { label: 'Document Vault', href: '/owner/documents', icon: <FolderArchive className="w-4 h-4" /> },
    { label: 'My Inspections', href: '/owner/inspections', icon: <ClipboardCheck className="w-4 h-4" /> },
    { label: 'Compliance Tracker', href: '/owner/compliance', icon: <ShieldCheck className="w-4 h-4" /> },
    { label: 'Incentives & Schemes', href: '/owner/schemes', icon: <Gift className="w-4 h-4" /> },
    { label: 'Grievance Desk', href: '/owner/grievances', icon: <MessageSquareWarning className="w-4 h-4" /> },
    { label: 'Renewals', href: '/owner/renewals', icon: <RefreshCw className="w-4 h-4" /> },
    { label: 'AI Assistance', href: '/owner/ai-assistant', icon: <Sparkles className="w-4 h-4 text-amber-600" /> },
  ];

  const departmentNav: NavItem[] = [
    { label: 'Dashboard', href: '/department', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Application Queue', href: '/department/queue', icon: <FileText className="w-4 h-4" />, badge: `${applications.length}` },
    { label: 'My Department', href: '/department/info', icon: <Landmark className="w-4 h-4" /> },
    { label: 'Inspections Desk', href: '/department/inspections', icon: <ClipboardCheck className="w-4 h-4" /> },
    { label: 'SLA Monitor', href: '/department/sla', icon: <Clock className="w-4 h-4" />, badge: '31 Breached' },
    { label: 'Compliance Oversight', href: '/department/compliance', icon: <ShieldCheck className="w-4 h-4" /> },
    { label: 'Grievances', href: '/department/grievances', icon: <MessageSquareWarning className="w-4 h-4" />, badge: openGrievancesCount > 0 ? `${openGrievancesCount}` : undefined },
    { label: 'Dept Analytics', href: '/department/analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { label: 'Regulatory Rules', href: '/department/rules', icon: <BookOpen className="w-4 h-4" /> },
  ];

  const inspectorNav: NavItem[] = [
    { label: 'Overview', href: '/inspector', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'My Inspections', href: '/inspector/list', icon: <ClipboardCheck className="w-4 h-4" />, badge: pendingInspectionsCount > 0 ? `${pendingInspectionsCount}` : undefined },
    { label: 'Inspection Calendar', href: '/inspector/calendar', icon: <Calendar className="w-4 h-4" /> },
    { label: 'Conduct Inspection', href: '/inspector/conduct', icon: <Eye className="w-4 h-4" /> },
    { label: 'Submit Reports', href: '/inspector/reports', icon: <FileText className="w-4 h-4" /> },
    { label: 'Field Observations', href: '/inspector/observations', icon: <AlertOctagon className="w-4 h-4" /> },
  ];

  const adminNav: NavItem[] = [
    { label: 'Apex Dashboard', href: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'User Directory', href: '/admin/users', icon: <Users className="w-4 h-4" /> },
    { label: 'Department Directory', href: '/admin/departments', icon: <Landmark className="w-4 h-4" /> },
    { label: 'Approval Config', href: '/admin/approval-config', icon: <Sliders className="w-4 h-4" /> },
    { label: 'Workflow Builder', href: '/admin/workflow-builder', icon: <Layers className="w-4 h-4" /> },
    { label: 'Regulatory Rules', href: '/admin/regulatory-rules', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'SLA Configuration', href: '/admin/sla-config', icon: <Clock className="w-4 h-4" /> },
    { label: 'Bottleneck Analysis', href: '/admin/bottlenecks', icon: <AlertOctagon className="w-4 h-4" /> },
    { label: 'Audit Logs', href: '/admin/audit-logs', icon: <Clock className="w-4 h-4" /> },
  ];

  const getNavItems = (): NavItem[] => {
    switch (currentRole) {
      case 'owner': return ownerNav;
      case 'department': return departmentNav;
      case 'inspector': return inspectorNav;
      case 'admin': return adminNav;
      default: return ownerNav;
    }
  };

  const getPortalTitle = (): string => {
    switch (currentRole) {
      case 'owner': return 'INVESTOR HUB';
      case 'department': return 'STATE EXECUTIVE';
      case 'inspector': return 'FIELD AUDITOR';
      case 'admin': return 'APEX SYSTEM ADMIN';
      default: return 'INVESTOR HUB';
    }
  };

  const currentNavItems = getNavItems();

  return (
    <>
      {/* MOBILE HORIZONTAL SUB-NAV SCROLLER (< md screens) */}
      <div className="md:hidden w-full overflow-x-auto pb-2 border-b border-slate-200 mb-4 flex items-center space-x-1.5 no-scrollbar scroll-smooth shrink-0">
        {currentNavItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/owner' && item.href !== '/department' && item.href !== '/inspector' && item.href !== '/admin');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 flex items-center space-x-1.5 transition-all ${
                isActive
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && (
                <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-extrabold ${
                  isActive ? 'bg-amber-800 text-white' : 'bg-slate-200 text-slate-800'
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* DESKTOP VERTICAL SIDEBAR (>= md screens) */}
      <aside className="hidden md:block w-64 shrink-0">
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 sticky top-24">
          
          {/* Header Label */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <span className="text-[10px] font-extrabold text-amber-800 uppercase tracking-widest">
              {getPortalTitle()}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {currentNavItems.map((item) => {
              const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/owner' && item.href !== '/department' && item.href !== '/inspector' && item.href !== '/admin');

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all group relative ${
                    isActive
                      ? 'bg-amber-50 text-amber-900 font-bold border-l-4 border-amber-600 shadow-2xs pl-2.5'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span className={`${isActive ? 'text-amber-700' : 'text-slate-500 group-hover:text-slate-800'}`}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-amber-200 text-amber-900' : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer Info Box in Sidebar */}
          <div className="mt-6 pt-3 border-t border-slate-200">
            <div className="bg-slate-50 p-2.5 rounded-md border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>State Helpline</span>
                <span className="text-amber-700">1800-233-0099</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-normal">
                Maitri SWC Cell • Govt of Maharashtra
              </p>
            </div>
          </div>

        </div>
      </aside>
    </>
  );
};
