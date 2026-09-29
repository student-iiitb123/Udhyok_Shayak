'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { FolderArchive, Upload, Download, Search, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';

export const DocumentCenter: React.FC = () => {
  const { documents, uploadDocument } = useApp();
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const filteredDocs = documents.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'ALL' || d.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSimulatedUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      uploadDocument({
        name: 'Factory_Structural_Safety_Audit_2026.pdf',
        category: 'Building Plan',
        size: '4.8 MB',
        fileType: 'PDF',
      });
      setIsUploading(false);
    }, 500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-slate-200 shadow-2xs">
        <div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Document Repository</span>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">DigiLocker & Document Vault</h2>
          <p className="text-xs text-slate-500 font-medium">Verified statutory certificates, licenses, and annexure attachments</p>
        </div>

        <button
          onClick={handleSimulatedUpload}
          disabled={isUploading}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2.5 rounded-md shadow-xs transition-all flex items-center space-x-2 shrink-0 disabled:opacity-50"
        >
          <Upload className="w-4 h-4" />
          <span>{isUploading ? 'Uploading...' : 'Upload Document'}</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
        <div className="relative flex-1 w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents by name or category..."
            className="w-full bg-slate-50 border border-slate-300 rounded-md pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-slate-50 border border-slate-300 rounded-md px-3 py-1.5 text-xs text-slate-700 font-medium focus:outline-none"
        >
          <option value="ALL">All Categories</option>
          <option value="Legal Registration">Legal Registration</option>
          <option value="Tax Identification">Tax Identification</option>
          <option value="Land Title">Land Title</option>
          <option value="Building Plan">Building Plan</option>
          <option value="Environmental Safety">Environmental Safety</option>
          <option value="Fire Safety">Fire Safety</option>
        </select>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">Document Title</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Uploaded Date</th>
              <th className="py-3 px-4">File Specs</th>
              <th className="py-3 px-4">Verification State</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {filteredDocs.map(doc => (
              <tr key={doc.id} className="hover:bg-amber-50/40 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2.5">
                    <FileText className="w-4 h-4 text-amber-600 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900">{doc.name}</span>
                      <p className="text-[10px] text-slate-400">App #{doc.applicationId}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-slate-600">{doc.category}</td>
                <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{doc.uploadedDate}</td>
                <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{doc.size} ({doc.fileType})</td>
                <td className="py-3 px-4">
                  <StatusBadge status={doc.status} />
                </td>
                <td className="py-3 px-4 text-right space-x-2">
                  <button className="p-1.5 text-slate-600 hover:text-amber-800 hover:bg-slate-100 rounded">
                    <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
