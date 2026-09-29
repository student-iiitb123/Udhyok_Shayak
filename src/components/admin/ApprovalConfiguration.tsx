'use client';

import React, { useState } from 'react';
import { Sliders, Search, FileText, CheckCircle2 } from 'lucide-react';
import { mockSLAConfigs } from '@/data/mockData';

export const ApprovalConfiguration: React.FC = () => {
  const [selectedApproval, setSelectedApproval] = useState(mockSLAConfigs[0]);

  const approvalDetails = [
    {
      id: 'sla-1',
      approvalType: 'Factory License Renewal & Expansion',
      department: 'Industries Department',
      slaDays: 15,
      requiredDocs: ['Form 1 Application', 'MIDC Lease Deed', 'Form III Environmental Certificate', 'Factory Blueprint'],
      inspectionRequired: true,
      renewalPeriod: '1 Year / 5 Years Auto-renew',
    },
    {
      id: 'sla-2',
      approvalType: 'Fire Safety NOC (Form A)',
      department: 'Fire Department',
      slaDays: 10,
      requiredDocs: ['Building Egress Plan', 'Hydrant System Certificate', 'Form B Audit Log'],
      inspectionRequired: true,
      renewalPeriod: 'Bi-annual Audit (Form B)',
    },
    {
      id: 'sla-3',
      approvalType: 'Consent to Establish (CTE - Red Category)',
      department: 'Environment Department',
      slaDays: 30,
      requiredDocs: ['EIA Report', 'Effluent Flow Diagram', 'Public Hearing Minutes'],
      inspectionRequired: true,
      renewalPeriod: 'Valid 5 Years for CTE',
    },
    {
      id: 'sla-4',
      approvalType: 'Consent to Operate (CTO - Air & Water)',
      department: 'Pollution Control (MPCB)',
      slaDays: 20,
      requiredDocs: ['CTE Copy', 'ETP Operational Log', 'RTEMS Meter Details'],
      inspectionRequired: true,
      renewalPeriod: '1 Year / 3 Years',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Service Registry</span>
        <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">Approval Service Configuration</h2>
        <p className="text-xs text-slate-500 font-medium">Configure statutory document requirements, inspection triggers, and SLA parameters</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left List */}
        <div className="space-y-2">
          {approvalDetails.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedApproval(item as any)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedApproval.id === item.id 
                  ? 'bg-amber-50 border-amber-500 shadow-xs' 
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <h4 className="text-xs font-bold text-slate-900">{item.approvalType}</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">{item.department}</p>
              <div className="mt-2 flex justify-between text-[11px]">
                <span className="text-slate-400">SLA: <strong className="text-slate-700">{item.slaDays} Days</strong></span>
                <span className="text-emerald-700 font-bold">{item.inspectionRequired ? 'Inspection Required' : 'Desktop Review'}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Details Workspace */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg border border-slate-200 shadow-2xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-mono">
              {selectedApproval.department}
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-1">{selectedApproval.approvalType}</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-3 rounded border border-slate-200">
              <span className="text-slate-500 block font-semibold">Statutory SLA Duration</span>
              <span className="text-lg font-bold text-slate-900">{selectedApproval.slaDays} Calendar Days</span>
            </div>

            <div className="bg-slate-50 p-3 rounded border border-slate-200">
              <span className="text-slate-500 block font-semibold">Renewal Cycle</span>
              <span className="text-sm font-bold text-slate-900">1 Year / 5 Years</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-800 mb-2">Mandatory Annexures & Documents Required:</h4>
            <div className="space-y-1.5 text-xs">
              {['Form 1 Application & Flowchart', 'MIDC Allotment Letter / Lease Deed', 'MPCB Environmental Form III', 'Approved Architectural Blueprint'].map((doc, idx) => (
                <div key={idx} className="flex items-center space-x-2 p-2 bg-slate-50 rounded border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-slate-800">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
