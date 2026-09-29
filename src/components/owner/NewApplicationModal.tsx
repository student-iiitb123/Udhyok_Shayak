'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { X, FilePlus, Building2, Upload } from 'lucide-react';

interface NewApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewApplicationModal: React.FC<NewApplicationModalProps> = ({ isOpen, onClose }) => {
  const { createNewApplication } = useApp();
  
  const [approvalType, setApprovalType] = useState('Factory License Renewal & Expansion');
  const [department, setDepartment] = useState('Industries Department');
  const [sector, setSector] = useState('Heavy Industrial');
  const [location, setLocation] = useState('Chakan MIDC, Pune');
  const [priority, setPriority] = useState<'Normal' | 'High' | 'Urgent'>('Normal');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createNewApplication({
      approvalType,
      department,
      sector,
      location,
      priority,
      slaDays: department === 'Fire Department' ? 10 : department === 'Labour Department' ? 7 : 15,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 relative">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <FilePlus className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-bold text-slate-900">Initiate Single Window Application</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Approval Service Type</label>
            <select
              value={approvalType}
              onChange={(e) => setApprovalType(e.target.value)}
              className="w-full rounded border border-slate-300 p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
            >
              <option value="Factory License Renewal & Expansion">Factory License Renewal & Expansion</option>
              <option value="Fire Safety NOC (Form A)">Fire Safety NOC (Form A)</option>
              <option value="Consent to Establish (CTE - Red Category)">Consent to Establish (CTE - Red Category)</option>
              <option value="Consent to Operate (CTO - Air & Water)">Consent to Operate (CTO - Air & Water)</option>
              <option value="Contract Labour License">Contract Labour License</option>
              <option value="Trade & Establishment License">Trade & Establishment License</option>
              <option value="Non-Agricultural (NA) Land Clearance">Non-Agricultural (NA) Land Clearance</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nodal Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full rounded border border-slate-300 p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
              >
                <option value="Industries Department">Industries Department</option>
                <option value="Environment Department">Environment Department</option>
                <option value="Fire Department">Fire Department</option>
                <option value="Labour Department">Labour Department</option>
                <option value="Pollution Control">Pollution Control (MPCB)</option>
                <option value="Revenue Department">Revenue Department</option>
                <option value="Municipal Authority">Municipal Authority</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full rounded border border-slate-300 p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
              >
                <option value="Normal">Normal SLA</option>
                <option value="High">Fast-track High</option>
                <option value="Urgent">Urgent Priority</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Industrial Sector</label>
              <input
                type="text"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full rounded border border-slate-300 p-2 text-slate-900"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Location / MIDC Zone</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded border border-slate-300 p-2 text-slate-900"
              />
            </div>
          </div>

          <div className="border border-dashed border-slate-300 rounded p-3 text-center bg-slate-50">
            <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
            <span className="text-[11px] text-slate-600 font-medium">Attach Project Dossier (Mock PDF)</span>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded shadow-xs"
            >
              Submit Application
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
