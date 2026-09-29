'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { X, Bell, Send, AlertTriangle, Building2 } from 'lucide-react';

interface SendComplianceAlertModalProps {
  companyName: string;
  licenseName: string;
  department: string;
  isOpen: boolean;
  onClose: () => void;
}

export const SendComplianceAlertModal: React.FC<SendComplianceAlertModalProps> = ({
  companyName,
  licenseName,
  department,
  isOpen,
  onClose,
}) => {
  const { addToast, addAuditLog } = useApp();

  const [alertType, setAlertType] = useState('Renewal Deadline Reminder');
  const [subject, setSubject] = useState(`Official Statutory Alert: ${licenseName} Renewal`);
  const [noticeMessage, setNoticeMessage] = useState(
    `Dear Management, your ${licenseName} issued by ${department} is approaching statutory expiry. Please submit online renewal documentation within 15 days to maintain active industrial status.`
  );
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeMessage.trim()) return;

    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      addToast(
        'success',
        'Official Compliance Notice Issued',
        `Alert notification successfully transmitted to ${companyName} for ${licenseName}.`
      );
      addAuditLog(
        `Issued Compliance Alert to ${companyName}`,
        'Compliance Oversight',
        'STAT-MH-2026',
        'Success',
        `Notice Type: ${alertType}. Message: ${noticeMessage.substring(0, 60)}...`
      );
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-amber-600" />
            <div>
              <h3 className="text-base font-bold text-slate-900">Issue Compliance Alert Notice</h3>
              <p className="text-[11px] text-slate-500">Government Official Redressal Transmission</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Company & License Info Box */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-lg p-3.5 mb-4 text-xs space-y-1">
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-amber-700" />
            <span className="font-extrabold text-slate-900 text-sm">{companyName}</span>
          </div>
          <p className="text-amber-900 font-medium">
            Target License: <strong className="text-slate-900">{licenseName}</strong> ({department})
          </p>
        </div>

        {/* Notice Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Notice Classification Type</label>
            <select
              value={alertType}
              onChange={(e) => {
                setAlertType(e.target.value);
                setSubject(`Official Statutory Notice: ${e.target.value} — ${licenseName}`);
              }}
              className="w-full rounded border border-slate-300 p-2 text-slate-900 focus:ring-2 focus:ring-amber-500 font-medium"
            >
              <option value="Renewal Deadline Reminder">Renewal Deadline Reminder (Normal Notice)</option>
              <option value="Show Cause Compliance Notice">Show Cause Compliance Notice (Urgent Notice)</option>
              <option value="Inspection Defect Rectification Warning">Inspection Defect Rectification Warning</option>
              <option value="Statutory Return Overdue Warning">Statutory Return Overdue Warning</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Notice Subject Line <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded border border-slate-300 p-2 text-slate-900 font-semibold"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Official Department Notice Directive <span className="text-red-500">*</span></label>
            <textarea
              required
              rows={4}
              value={noticeMessage}
              onChange={(e) => setNoticeMessage(e.target.value)}
              placeholder="Enter official departmental warning or action requirement text..."
              className="w-full rounded border border-slate-300 p-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500 leading-relaxed"
            />
          </div>

          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-500">
            ℹ️ Notice will be delivered to Company Dashboard, DigiLocker Portal, and state SMS/Email gateway.
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
              disabled={isSending || !noticeMessage.trim()}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded shadow-xs flex items-center space-x-1.5 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSending ? 'Transmitting Notice...' : 'Send Compliance Alert'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
