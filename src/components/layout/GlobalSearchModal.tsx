'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { Search, X, FileText, Building2, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchModalOpen, setIsSearchModalOpen, applications, documents, schemes, regulations } = useApp();
  const [query, setQuery] = useState('');
  const router = useRouter();

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const filteredApps = applications.filter(a => 
    a.id.toLowerCase().includes(query.toLowerCase()) || 
    a.approvalType.toLowerCase().includes(query.toLowerCase()) || 
    a.businessName.toLowerCase().includes(query.toLowerCase()) ||
    a.department.toLowerCase().includes(query.toLowerCase())
  );

  const filteredDocs = documents.filter(d => 
    d.name.toLowerCase().includes(query.toLowerCase()) || 
    d.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredSchemes = schemes.filter(s => 
    s.name.toLowerCase().includes(query.toLowerCase()) || 
    s.department.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center space-x-3 bg-slate-50">
          <Search className="w-5 h-5 text-amber-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Application #, Approval Type, Department, Document, Scheme..."
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm focus:outline-none"
          />
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-5">
          {query.trim() === '' ? (
            <div className="text-center py-8 text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-xs">Type keywords like &quot;Factory&quot;, &quot;Fire&quot;, &quot;MH-IND-1024&quot;, or &quot;Scheme&quot;</p>
            </div>
          ) : (
            <>
              {/* Applications Match */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-amber-600" /> Applications ({filteredApps.length})
                </h4>
                {filteredApps.length === 0 ? (
                  <p className="text-xs text-slate-400 pl-4 italic">No matching applications</p>
                ) : (
                  <div className="space-y-1">
                    {filteredApps.map(app => (
                      <div
                        key={app.id}
                        onClick={() => {
                          setIsSearchModalOpen(false);
                          router.push(`/owner?appId=${app.id}`);
                        }}
                        className="p-2.5 rounded-lg border border-slate-100 hover:border-amber-300 hover:bg-amber-50/50 cursor-pointer flex items-center justify-between text-xs transition-colors"
                      >
                        <div>
                          <span className="font-bold text-slate-900">{app.id}</span> — {app.approvalType}
                          <p className="text-[11px] text-slate-500">{app.department} • {app.businessName}</p>
                        </div>
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-semibold">
                          {app.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Documents Match */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-blue-600" /> Documents ({filteredDocs.length})
                </h4>
                {filteredDocs.length === 0 ? (
                  <p className="text-xs text-slate-400 pl-4 italic">No matching documents</p>
                ) : (
                  <div className="space-y-1">
                    {filteredDocs.map(doc => (
                      <div
                        key={doc.id}
                        onClick={() => {
                          setIsSearchModalOpen(false);
                          router.push('/owner/documents');
                        }}
                        className="p-2.5 rounded-lg border border-slate-100 hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer flex items-center justify-between text-xs transition-colors"
                      >
                        <div>
                          <span className="font-bold text-slate-900">{doc.name}</span>
                          <p className="text-[11px] text-slate-500">{doc.category} • App #{doc.applicationId}</p>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">{doc.fileType}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Schemes Match */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Schemes ({filteredSchemes.length})
                </h4>
                {filteredSchemes.length === 0 ? (
                  <p className="text-xs text-slate-400 pl-4 italic">No matching schemes</p>
                ) : (
                  <div className="space-y-1">
                    {filteredSchemes.map(sch => (
                      <div
                        key={sch.id}
                        onClick={() => {
                          setIsSearchModalOpen(false);
                          router.push('/owner/schemes');
                        }}
                        className="p-2.5 rounded-lg border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50/50 cursor-pointer flex items-center justify-between text-xs transition-colors"
                      >
                        <div>
                          <span className="font-bold text-slate-900">{sch.name}</span>
                          <p className="text-[11px] text-slate-500">{sch.department}</p>
                        </div>
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-semibold">
                          {sch.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Search Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center">
          <span>Press <kbd className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-[10px]">ESC</kbd> to exit</span>
          <span className="text-amber-700 font-medium">Maharashtra e-Governance Portal Search</span>
        </div>

      </div>
    </div>
  );
};
