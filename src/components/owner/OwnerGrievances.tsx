'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { MessageSquareWarning, Plus, Search, X, Send, Paperclip } from 'lucide-react';

export const OwnerGrievances: React.FC = () => {
  const { grievances, raiseGrievance, applications, currentRole, respondToGrievance } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [subject, setSubject] = useState('');
  const [department, setDepartment] = useState('Municipal Authority');
  const [applicationId, setApplicationId] = useState('MH-MUN-6120');
  const [description, setDescription] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;
    raiseGrievance(subject, department, applicationId, description);
    setIsModalOpen(false);
    setSubject('');
    setDescription('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-slate-200 shadow-2xs">
        <div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
            {currentRole === 'department' ? 'Department Redressal Desk' : 'Investor Redressal'}
          </span>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">Grievance & Delay Redressal Desk</h2>
          <p className="text-xs text-slate-500 font-medium">
            {currentRole === 'department' ? 'Review escalated SLA delay grievances and issue resolution directives' : 'Escalate SLA delays or administrative queries directly to Senior Nodal Officers'}
          </p>
        </div>

        {currentRole === 'owner' && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2.5 rounded-md shadow-xs transition-all flex items-center space-x-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Raise Grievance Ticket</span>
          </button>
        )}
      </div>

      {/* Grievance Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">Ticket ID</th>
              <th className="py-3 px-4">Subject</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4">Application</th>
              <th className="py-3 px-4">Created Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Officer Response</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {grievances.map(grv => (
              <tr key={grv.id} className="hover:bg-amber-50/40 transition-colors">
                <td className="py-3 px-4 font-bold text-amber-900 font-mono">#{grv.id}</td>
                <td className="py-3 px-4 font-semibold text-slate-900">{grv.subject}</td>
                <td className="py-3 px-4 text-slate-600">{grv.department}</td>
                <td className="py-3 px-4 font-mono text-[11px]">{grv.applicationId}</td>
                <td className="py-3 px-4 font-mono text-[11px]">{grv.createdDate}</td>
                <td className="py-3 px-4">
                  <StatusBadge status={grv.status} />
                </td>
                <td className="py-3 px-4 text-slate-600 text-[11px]">
                  {grv.responseText ? (
                    <span className="text-emerald-700 font-medium">{grv.responseText}</span>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 italic">Under Investigation by HOD</span>
                      {currentRole === 'department' && (
                        <button
                          onClick={() => respondToGrievance(grv.id, 'Payment reconciliation issue resolved. Status updated to Active.', 'Resolved')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] px-2 py-1 rounded transition-colors ml-2"
                        >
                          Resolve
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Raise Grievance Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 relative">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-lg font-bold text-slate-900">Raise Redressal Grievance</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Grievance Subject <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Unjustified delay in Municipal Trade License approval"
                  className="w-full rounded border border-slate-300 p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full rounded border border-slate-300 p-2 text-slate-900"
                  >
                    <option value="Municipal Authority">Municipal Authority</option>
                    <option value="Industries Department">Industries Department</option>
                    <option value="Environment Department">Environment Department</option>
                    <option value="Fire Department">Fire Department</option>
                    <option value="Pollution Control">Pollution Control</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Application Reference</label>
                  <select
                    value={applicationId}
                    onChange={(e) => setApplicationId(e.target.value)}
                    className="w-full rounded border border-slate-300 p-2 text-slate-900"
                  >
                    {applications.map(a => (
                      <option key={a.id} value={a.id}>{a.id} ({a.approvalType})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Detailed Grievance Description <span className="text-red-500">*</span></label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain the background, timelines, and requested administrative intervention..."
                  className="w-full rounded border border-slate-300 p-2.5 text-slate-900"
                />
              </div>

              <div className="border border-dashed border-slate-300 rounded p-2.5 text-center bg-slate-50 flex items-center justify-center space-x-2">
                <Paperclip className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600 font-medium text-[11px]">Attach Supporting Evidence (Optional PDF)</span>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded shadow-xs flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Ticket</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
