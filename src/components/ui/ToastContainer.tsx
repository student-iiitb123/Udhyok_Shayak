'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  const visibleToasts = toasts.slice(-3);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
      {visibleToasts.map(toast => {
        let bgClass = 'bg-white border-l-4 border-amber-500 text-slate-800 shadow-lg';
        let icon = <Info className="w-5 h-5 text-amber-600 shrink-0" />;

        if (toast.type === 'success') {
          bgClass = 'bg-white border-l-4 border-emerald-600 text-slate-800 shadow-lg';
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
        } else if (toast.type === 'error') {
          bgClass = 'bg-white border-l-4 border-red-600 text-slate-800 shadow-lg';
          icon = <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />;
        } else if (toast.type === 'warning') {
          bgClass = 'bg-white border-l-4 border-amber-500 text-slate-800 shadow-lg';
          icon = <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded border border-slate-200 ${bgClass} transition-all duration-300 animate-in slide-in-from-bottom-3`}
          >
            {icon}
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-slate-900 leading-tight">{toast.title}</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
