'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { Building2, ShieldCheck, ClipboardCheck, Landmark, X, Check } from 'lucide-react';
import { UserRole } from '@/types';

export const RoleSwitcherModal: React.FC = () => {
  const { currentRole, setCurrentRole, isRoleModalOpen, setIsRoleModalOpen, setIsBusinessSetupModalOpen } = useApp();
  const router = useRouter();

  if (!isRoleModalOpen) return null;

  const roles: { role: UserRole; title: string; desc: string; route: string; icon: React.ReactNode }[] = [
    {
      role: 'owner',
      title: 'Business Owner Portal',
      desc: 'Submit applications, upload documents, respond to department queries, track SLA progress, discovery of subsidies & schemes.',
      route: '/owner',
      icon: <Building2 className="w-6 h-6 text-amber-600" />,
    },
    {
      role: 'department',
      title: 'Department Officer Portal',
      desc: 'Process application queue, perform document scrutiny, evaluate risk level, schedule inspections, issue approvals or queries.',
      route: '/department',
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    },
    {
      role: 'inspector',
      title: 'Field Inspector Portal',
      desc: 'View assigned site visits, conduct safety & compliance audits, record observations, attach evidence, submit inspection reports.',
      route: '/inspector',
      icon: <ClipboardCheck className="w-6 h-6 text-purple-600" />,
    },
    {
      role: 'admin',
      title: 'Government Administrator Portal',
      desc: 'System oversight, department analytics, SLA bottleneck diagnosis, user management, workflow builder, audit logs, regulatory rules.',
      route: '/admin',
      icon: <Landmark className="w-6 h-6 text-emerald-600" />,
    },
  ];

  const handleSelectRole = (role: UserRole, route: string) => {
    setIsRoleModalOpen(false);
    if (role === 'owner') {
      setIsBusinessSetupModalOpen(true);
    } else {
      setCurrentRole(role);
      router.push(route);
    }
  };


  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">Maharashtra Single Window Clearance</span>
            <h2 className="text-xl font-bold text-slate-900">Prototype Persona Switcher</h2>
            <p className="text-xs text-slate-500 mt-0.5">Select a role to experience the interactive e-governance workflow.</p>
          </div>
          <button
            onClick={() => setIsRoleModalOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {roles.map(r => {
            const isSelected = currentRole === r.role;
            return (
              <button
                key={r.role}
                onClick={() => handleSelectRole(r.role, r.route)}
                className={`text-left p-4 rounded-lg border-2 transition-all relative group flex flex-col justify-between ${
                  isSelected 
                    ? 'border-amber-500 bg-amber-50/50 shadow-md' 
                    : 'border-slate-200 hover:border-amber-300 hover:bg-slate-50'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-3 right-3 bg-amber-600 text-white rounded-full p-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
                <div>
                  <div className="mb-3 p-2 bg-white rounded-md border border-slate-200 inline-block shadow-2xs">
                    {r.icon}
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-amber-800 transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {r.desc}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-800">
                  <span>Enter Dashboard →</span>
                  <span className="text-[10px] text-slate-400 font-mono">{r.route}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Modal Footer Note */}
        <div className="mt-6 pt-4 border-t border-slate-100 bg-slate-50 p-3 rounded-lg text-center">
          <p className="text-xs text-slate-500">
            ℹ️ <strong className="text-slate-700">Frontend Prototype Mode:</strong> All actions mutate in-memory state for seamless end-to-end demonstration.
          </p>
        </div>

      </div>
    </div>
  );
};
