'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { KpiCard } from '@/components/ui/KpiCard';
import { SendComplianceAlertModal } from '@/components/department/SendComplianceAlertModal';
import { 
  ShieldCheck, RefreshCw, Calendar, CheckCircle2, AlertTriangle, 
  Bell, Building2, Search, Filter, Send, ShieldAlert
} from 'lucide-react';

interface ComplianceItem {
  id: string;
  companyName: string;
  regNo: string;
  location: string;
  licenseName: string;
  department: string;
  expiryDate: string;
  daysRemaining: number;
  status: string;
}

export const DepartmentCompliance: React.FC = () => {
  const [selectedAlertItem, setSelectedAlertItem] = useState<ComplianceItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [companyFilter, setCompanyFilter] = useState('ALL');

  const complianceList: ComplianceItem[] = [
    {
      id: 'cmp-1',
      companyName: 'ABC Industries Pvt Ltd',
      regNo: 'MH-REG-2024-8891',
      location: 'Chakan MIDC, Pune',
      licenseName: 'Consent to Operate (CTO - MPCB Air & Water)',
      department: 'Pollution Control (MPCB)',
      expiryDate: '2026-10-18',
      daysRemaining: 24,
      status: 'Renewal Due Soon',
    },
    {
      id: 'cmp-2',
      companyName: 'Sunrise Chemicals Ltd',
      regNo: 'MH-REG-2023-4120',
      location: 'Taloja MIDC, Navi Mumbai',
      licenseName: 'Hazardous Waste Storage & Disposal Permit',
      department: 'Environment Department',
      expiryDate: '2026-10-05',
      daysRemaining: 11,
      status: 'Renewal Due Soon',
    },
    {
      id: 'cmp-3',
      companyName: 'ABC Industries Pvt Ltd',
      regNo: 'MH-REG-2024-8891',
      location: 'Chakan MIDC, Pune',
      licenseName: 'Factory Operating License Renewal',
      department: 'Industries Department',
      expiryDate: '2027-12-31',
      daysRemaining: 463,
      status: 'Compliant',
    },
    {
      id: 'cmp-4',
      companyName: 'Shree Traders & Logistics',
      regNo: 'MH-REG-2022-7714',
      location: 'Bhiwandi, Thane',
      licenseName: 'Trade & Commercial Establishment Permit',
      department: 'Municipal Authority',
      expiryDate: '2026-09-20',
      daysRemaining: -4,
      status: 'Overdue / Non-Compliant',
    },
    {
      id: 'cmp-5',
      companyName: 'Galaxy Builders & Infra',
      regNo: 'MH-REG-2025-1002',
      location: 'BKC, Mumbai',
      licenseName: 'Fire Safety NOC (Form B Bi-annual Audit)',
      department: 'Fire Department',
      expiryDate: '2026-12-12',
      daysRemaining: 79,
      status: 'Compliant',
    },
    {
      id: 'cmp-6',
      companyName: 'Maharashtra Agro Processing Pvt Ltd',
      regNo: 'MH-REG-2024-9905',
      location: 'MIDC Waluj, Sambhajinagar',
      licenseName: 'Food Safety & Industrial Boiler Clearance',
      department: 'Industries Department',
      expiryDate: '2026-11-15',
      daysRemaining: 52,
      status: 'Compliant',
    },
  ];

  const filteredItems = complianceList.filter(item => {
    const matchesSearch = 
      item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.licenseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    const matchesCompany = companyFilter === 'ALL' || item.companyName === companyFilter;

    return matchesSearch && matchesStatus && matchesCompany;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Departmental Monitoring</span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">Statutory Compliance Oversight & Alerts</h2>
          <p className="text-xs text-slate-500 font-medium">Monitor active licenses across registered companies and issue official compliance notices</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Monitored Companies" value="5 Units" subtitle="Active Industrial Sites" icon={<Building2 className="w-5 h-5" />} accentColor="navy" />
        <KpiCard title="Renewals Due Soon" value="2 Items" subtitle="Within 30 days" icon={<RefreshCw className="w-5 h-5" />} accentColor="saffron" />
        <KpiCard title="Overdue / Non-Compliant" value="1 Item" subtitle="Requires Notice" icon={<ShieldAlert className="w-5 h-5" />} accentColor="red" />
        <KpiCard title="Fully Compliant" value="3 Items" subtitle="Valid Clearances" icon={<CheckCircle2 className="w-5 h-5" />} accentColor="green" />
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Company Name, License Type, Nodal Department..."
              className="w-full bg-slate-50 border border-slate-300 rounded-md pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center space-x-2 flex-wrap gap-y-2 text-xs">
            {/* Company Filter */}
            <select
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none"
            >
              <option value="ALL">All Companies</option>
              <option value="ABC Industries Pvt Ltd">ABC Industries Pvt Ltd</option>
              <option value="Sunrise Chemicals Ltd">Sunrise Chemicals Ltd</option>
              <option value="Shree Traders & Logistics">Shree Traders & Logistics</option>
              <option value="Galaxy Builders & Infra">Galaxy Builders & Infra</option>
              <option value="Maharashtra Agro Processing Pvt Ltd">Maharashtra Agro Processing Pvt Ltd</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none"
            >
              <option value="ALL">All Compliance Statuses</option>
              <option value="Compliant">Compliant</option>
              <option value="Renewal Due Soon">Renewal Due Soon</option>
              <option value="Overdue / Non-Compliant">Overdue / Non-Compliant</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Compliance Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Active License & Compliance Status</h3>
            <p className="text-xs text-slate-500">View enterprise compliance records and transmit official department alerts</p>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Showing {filteredItems.length} records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Company Name & Registration</th>
                <th className="py-3 px-4">License / Permit</th>
                <th className="py-3 px-4">Nodal Department</th>
                <th className="py-3 px-4">Validity / Renewal Schedule</th>
                <th className="py-3 px-4">Compliance Status</th>
                <th className="py-3 px-4 text-right">Officer Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400">
                    No matching compliance records found.
                  </td>
                </tr>
              ) : (
                filteredItems.map(item => (
                  <tr key={item.id} className="hover:bg-amber-50/40 transition-colors">
                    
                    {/* Company Name Column */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-start space-x-2.5">
                        <Building2 className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-xs">{item.companyName}</h4>
                          <div className="flex items-center space-x-2 mt-0.5">
                            <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                              {item.regNo}
                            </span>
                            <span className="text-[10px] text-slate-500">{item.location}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* License Name */}
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {item.licenseName}
                    </td>

                    {/* Department */}
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {item.department}
                    </td>

                    {/* Validity Details */}
                    <td className="py-3.5 px-4">
                      <span className={`font-semibold block ${item.daysRemaining < 0 ? 'text-red-600 font-bold' : item.daysRemaining <= 30 ? 'text-amber-800 font-bold' : 'text-slate-700'}`}>
                        {item.daysRemaining < 0 ? `${Math.abs(item.daysRemaining)} Days Overdue` : `Due in ${item.daysRemaining} days`}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">Expires: {item.expiryDate}</span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      <StatusBadge status={item.status} size="md" />
                    </td>

                    {/* Officer Action Column - SEND ALERT BUTTON */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedAlertItem(item)}
                        className="inline-flex items-center space-x-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-3 py-1.5 rounded shadow-xs transition-all"
                      >
                        <Bell className="w-3.5 h-3.5" />
                        <span>Send Alert</span>
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Send Compliance Alert Modal */}
      {selectedAlertItem && (
        <SendComplianceAlertModal
          companyName={selectedAlertItem.companyName}
          licenseName={selectedAlertItem.licenseName}
          department={selectedAlertItem.department}
          isOpen={!!selectedAlertItem}
          onClose={() => setSelectedAlertItem(null)}
        />
      )}

    </div>
  );
};
