'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { X, AlertOctagon, Paperclip, Send } from 'lucide-react';
import { InspectionObservation } from '@/types';

interface AddObservationModalProps {
  inspectionId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const AddObservationModal: React.FC<AddObservationModalProps> = ({
  inspectionId,
  isOpen,
  onClose,
}) => {
  const { addInspectionObservation } = useApp();

  const [category, setCategory] = useState('Electrical Safety');
  const [severity, setSeverity] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Medium');
  const [description, setDescription] = useState('');
  const [correctiveAction, setCorrectiveAction] = useState('');
  const [deadline, setDeadline] = useState('2026-10-05');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !correctiveAction.trim()) return;

    addInspectionObservation(inspectionId, {
      category,
      severity,
      description,
      correctiveAction,
      deadline,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 relative">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <AlertOctagon className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-bold text-slate-900">Record Field Observation</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Observation Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded border border-slate-300 p-2 text-slate-900"
              >
                <option value="Electrical Safety">Electrical Safety</option>
                <option value="Fire Hazards & Egress">Fire Hazards & Egress</option>
                <option value="Machinery Safeguards">Machinery Safeguards</option>
                <option value="Effluent & Environment">Effluent & Environment</option>
                <option value="Worker Health & PPE">Worker Health & PPE</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Severity Level</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as any)}
                className="w-full rounded border border-slate-300 p-2 text-slate-900 font-bold"
              >
                <option value="Low" className="text-slate-700">Low (Minor Non-Conformity)</option>
                <option value="Medium" className="text-amber-700">Medium (Needs Rectification)</option>
                <option value="High" className="text-red-700">High (Hazardous Defect)</option>
                <option value="Critical" className="text-red-800">Critical (Immediate Stop)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Field Observation Details <span className="text-red-500">*</span></label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe physical defect or non-conformity noticed during site walk..."
              className="w-full rounded border border-slate-300 p-2 text-slate-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Mandatory Corrective Action Required <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              value={correctiveAction}
              onChange={(e) => setCorrectiveAction(e.target.value)}
              placeholder="Action required by occupier..."
              className="w-full rounded border border-slate-300 p-2 text-slate-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Compliance Deadline Date</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full rounded border border-slate-300 p-2 text-slate-900"
            />
          </div>

          <div className="border border-dashed border-slate-300 rounded p-2.5 text-center bg-slate-50 flex items-center justify-center space-x-2">
            <Paperclip className="w-4 h-4 text-slate-400" />
            <span className="text-slate-600 font-medium">Attach Photographic Evidence (Mock JPG)</span>
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
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-2 rounded shadow-xs flex items-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Log Observation</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
