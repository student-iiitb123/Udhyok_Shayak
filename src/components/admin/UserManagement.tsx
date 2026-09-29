'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Users, Search, UserCheck, Shield, Building2, UserX } from 'lucide-react';
import { mockUsers } from '@/data/mockData';

export const UserManagement: React.FC = () => {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'owner' | 'department' | 'inspector' | 'admin'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const usersList = [
    ...mockUsers,
    { id: 'usr-5', name: 'Vikram Joshi', role: 'owner' as const, designation: 'Director', email: 'v.joshi@sunrisechem.com', phone: '+91 98230 55412', avatar: 'VJ' },
    { id: 'usr-6', name: 'Dr. Meena Thorat', role: 'department' as const, designation: 'Chief Environment Officer', department: 'Environment Dept', email: 'm.thorat@maharashtra.gov.in', phone: '+91 98210 44321', avatar: 'MT' },
    { id: 'usr-7', name: 'Vikas Rane', role: 'inspector' as const, designation: 'Labor Safety Inspector', department: 'Labour Dept', email: 'v.rane@maharashtra.gov.in', phone: '+91 94211 88990', avatar: 'VR' },
  ];

  const filteredUsers = usersList.filter(u => {
    const matchesTab = activeTab === 'all' || u.role === activeTab;
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs flex justify-between items-center">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Access Control</span>
          <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">Portal User Directory & Identity Management</h2>
          <p className="text-xs text-slate-500 font-medium">Manage investor profiles, department officers, field auditors, and system admins</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 flex space-x-2">
        {[
          { id: 'all', label: 'All Users' },
          { id: 'owner', label: 'Business Owners' },
          { id: 'department', label: 'Department Officers' },
          { id: 'inspector', label: 'Inspectors' },
          { id: 'admin', label: 'Administrators' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-emerald-600 text-emerald-900 bg-emerald-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">User Name</th>
              <th className="py-3 px-4">Role / Designation</th>
              <th className="py-3 px-4">Department / Organization</th>
              <th className="py-3 px-4">Email Address</th>
              <th className="py-3 px-4">Mobile</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {filteredUsers.map(u => (
              <tr key={u.id} className="hover:bg-emerald-50/30 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-[11px]">
                      {u.avatar}
                    </div>
                    <span className="font-bold text-slate-900">{u.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="capitalize font-semibold text-slate-700">{u.role}</span> — <span className="text-slate-500">{u.designation}</span>
                </td>
                <td className="py-3 px-4 text-slate-600">{u.department || 'ABC Industries'}</td>
                <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{u.email}</td>
                <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{u.phone}</td>
                <td className="py-3 px-4 text-right space-x-1">
                  <button
                    onClick={() => addToast('info', 'User Profile', `Viewing ${u.name}`)}
                    className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[10px] font-bold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => addToast('warning', 'User Status Updated', `${u.name} toggled active state`)}
                    className="px-2 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded text-[10px] font-bold"
                  >
                    Active
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
