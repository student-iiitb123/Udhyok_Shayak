'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { X, Upload, Send, FileCheck } from 'lucide-react';

interface QueryResponseModalProps {
  appId: string;
  queryText: string;
  isOpen: boolean;
  onClose: () => void;
}

export const QueryResponseModal: React.FC<QueryResponseModalProps> = ({
  appId,
  queryText,
  isOpen,
  onClose,
}) => {
  const { submitQueryResponse } = useApp();
  const [responseText, setResponseText] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('Form_III_Environmental_Certificate_2026.pdf');
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!responseText.trim()) return;

    setIsUploading(true);
    setTimeout(() => {
      submitQueryResponse(appId, responseText, selectedFileName);
      setIsUploading(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div>
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-widest">Department Clarification Request</span>
            <h3 className="text-lg font-bold text-slate-900">Respond to Query — #{appId}</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Query Box */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-lg p-3.5 mb-4 text-xs">
          <span className="font-bold text-amber-900 block mb-1">Official Department Query:</span>
          <p className="text-amber-800 leading-relaxed">{queryText}</p>
        </div>

        {/* Response Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Applicant Statement / Clarification Remarks <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              placeholder="Provide clear justification or notes regarding the uploaded environmental certificate..."
              className="w-full rounded-md border border-slate-300 p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Upload Mock Box */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Attach Updated Document (Form III Certificate)
            </label>
            <div className="border-2 border-dashed border-slate-300 hover:border-amber-400 rounded-lg p-4 text-center bg-slate-50 transition-colors">
              <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
              <p className="text-xs text-slate-600 font-medium">Click to choose file or drag and drop</p>
              <p className="text-[10px] text-slate-400 mt-0.5">PDF, DWG or PNG up to 15MB</p>
              
              {selectedFileName && (
                <div className="mt-2 inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-2.5 py-1 rounded text-xs font-semibold">
                  <FileCheck className="w-3.5 h-3.5 text-amber-700" />
                  <span>{selectedFileName}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading || !responseText.trim()}
              className="flex items-center space-x-1.5 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-xs font-bold transition-all disabled:opacity-50 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isUploading ? 'Submitting...' : 'Submit Response'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
