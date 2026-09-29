'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ConductInspectionWorkspace } from '@/components/inspector/ConductInspectionWorkspace';
import { 
  Calendar as CalendarIcon, Clock, MapPin, ChevronLeft, ChevronRight, 
  UserCheck, Building2, Eye, CheckCircle2 
} from 'lucide-react';
import { Inspection } from '@/types';

export const InspectionCalendar: React.FC = () => {
  const { inspections } = useApp();
  const [selectedInsp, setSelectedInsp] = useState<Inspection | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');

  // Days matrix for September 2026
  const calendarDays = [
    { day: 21, inMonth: true, events: [] },
    { day: 22, inMonth: true, events: [inspections[1]] }, // INSP-2026-089 (Completed)
    { day: 23, inMonth: true, events: [] },
    { day: 24, inMonth: true, events: [] },
    { day: 25, inMonth: true, events: [] },
    { day: 26, inMonth: true, events: [] },
    { day: 27, inMonth: true, events: [] },
    { day: 28, inMonth: true, isToday: true, events: [inspections[0]] }, // INSP-2026-092 (Scheduled)
    { day: 29, inMonth: true, events: [] },
    { day: 30, inMonth: true, events: [{
      id: 'INSP-2026-095',
      applicationId: 'MH-ENV-3012',
      applicationNo: 'MH-ENV-3012',
      approvalType: 'ETP Effluent Discharge Line Audit',
      businessName: 'Sunrise Chemicals Ltd',
      inspectorName: 'Amit Sharma',
      inspectorId: 'usr-3',
      location: 'Taloja MIDC, Navi Mumbai',
      inspectionDate: '2026-09-30',
      inspectionTime: '02:00 PM',
      status: 'Scheduled' as const,
      checklistItems: [],
      observations: [],
    }] },
    { day: 1, inMonth: false, events: [] },
    { day: 2, inMonth: false, events: [{
      id: 'INSP-2026-098',
      applicationId: 'MH-MUN-6120',
      applicationNo: 'MH-MUN-6120',
      approvalType: 'Commercial Storage Safety Audit',
      businessName: 'Shree Traders & Logistics',
      inspectorName: 'Amit Sharma',
      inspectorId: 'usr-3',
      location: 'Bhiwandi, Thane',
      inspectionDate: '2026-10-02',
      inspectionTime: '11:00 AM',
      status: 'Assigned' as const,
      checklistItems: [],
      observations: [],
    }] },
  ];

  if (selectedInsp) {
    return (
      <ConductInspectionWorkspace
        inspection={selectedInsp}
        onBack={() => setSelectedInsp(null)}
      />
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Field Visit Scheduler</span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">Inspector Site Audit Calendar</h2>
          <p className="text-xs text-slate-500 font-medium">Interactive timeline schedule of assigned industrial safety and fire NOC site assessments</p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <div className="bg-slate-100 p-1 rounded-md border border-slate-200 flex space-x-1 text-xs font-bold">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1 rounded transition-colors ${viewMode === 'month' ? 'bg-purple-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 rounded transition-colors ${viewMode === 'week' ? 'bg-purple-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1 rounded transition-colors ${viewMode === 'day' ? 'bg-purple-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Day
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Navigation Bar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h3 className="text-base font-extrabold text-slate-900">September 2026</h3>
          <span className="text-xs bg-purple-100 text-purple-900 font-bold px-2 py-0.5 rounded border border-purple-200">
            Inspector: Amit Sharma
          </span>
        </div>

        <div className="flex items-center space-x-1">
          <button className="p-1.5 rounded border border-slate-200 hover:bg-slate-100 text-slate-600">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="px-3 py-1 text-xs font-bold rounded border border-slate-200 hover:bg-slate-100 text-slate-700">
            Today (28 Sept)
          </button>
          <button className="p-1.5 rounded border border-slate-200 hover:bg-slate-100 text-slate-600">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid View */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        
        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-100/70 text-center text-xs font-bold text-slate-700 uppercase py-2.5">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>

        {/* Calendar Grid Cells */}
        <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-slate-200 text-xs min-h-[420px]">
          {calendarDays.map((cd, idx) => (
            <div
              key={idx}
              className={`p-2 min-h-[100px] flex flex-col justify-between transition-colors ${
                cd.isToday ? 'bg-purple-50/60 font-bold' : !cd.inMonth ? 'bg-slate-50/50 text-slate-400' : 'bg-white'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className={`text-xs ${cd.isToday ? 'bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-xs' : 'text-slate-700 font-semibold'}`}>
                  {cd.day}
                </span>
                {cd.isToday && <span className="text-[10px] text-purple-700 font-bold uppercase">TODAY</span>}
              </div>

              {/* Event items */}
              <div className="mt-2 space-y-1">
                {cd.events.map((ev, eIdx) => (
                  <div
                    key={eIdx}
                    onClick={() => setSelectedInsp(ev as any)}
                    className="p-1.5 rounded bg-purple-100 border border-purple-300 hover:bg-purple-600 hover:text-white cursor-pointer transition-all text-[11px] group shadow-2xs"
                  >
                    <div className="font-bold truncate group-hover:text-white">{ev.approvalType}</div>
                    <div className="text-[10px] opacity-80 truncate">{ev.businessName}</div>
                    <div className="text-[10px] font-mono mt-0.5 font-semibold">{ev.inspectionTime}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
