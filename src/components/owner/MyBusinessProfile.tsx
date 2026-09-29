'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { mockBusinesses } from '@/data/mockData';
import { 
  Building2, MapPin, Phone, Mail, FileText, CheckCircle2, 
  ShieldCheck, Edit3, Download, Users, Zap, Award
} from 'lucide-react';

export const MyBusinessProfile: React.FC = () => {
  const { addToast } = useApp();
  const mainBiz = mockBusinesses[0]; // ABC Industries

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Profile Banner */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start space-x-4">
          <div className="w-14 h-14 bg-amber-50 border-2 border-amber-300 rounded-xl flex items-center justify-center text-amber-700 font-extrabold text-2xl shadow-2xs shrink-0">
            <Building2 className="w-7 h-7 text-amber-600" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200 font-mono">
                {mainBiz.registrationNo}
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> State Verified Unit
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">{mainBiz.name}</h2>
            <p className="text-xs text-slate-500 font-medium">
              {mainBiz.category} • Sector: <strong className="text-slate-800">{mainBiz.sector}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => addToast('info', 'Profile Export', 'Enterprise profile PDF exported successfully.')}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold text-xs px-3.5 py-2 rounded shadow-2xs transition-colors flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Profile PDF</span>
          </button>
          
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2 rounded shadow-xs transition-colors flex items-center space-x-1.5"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Save Changes' : 'Edit Business Profile'}</span>
          </button>
        </div>
      </div>

      {/* Grid of Business Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Credentials & Facilities */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Company Registration Credentials */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600" /> Statutory Registration Credentials
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">State Registration No</span>
                <span className="font-bold text-slate-900 font-mono">{mainBiz.registrationNo}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Udyam Registration</span>
                <span className="font-bold text-slate-900 font-mono">UDYAM-MH-12-0044129</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">GSTIN (Maharashtra)</span>
                <span className="font-bold text-slate-900 font-mono">27AAACA9921M1Z5</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Permanent Account (PAN)</span>
                <span className="font-bold text-slate-900 font-mono">AAACA9921M</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">MPCB Industry Category</span>
                <span className="font-bold text-red-600">Red Category (Hazardous Waste)</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Factory License No</span>
                <span className="font-bold text-slate-900 font-mono">FAC-PUN-2024-88</span>
              </div>
            </div>
          </div>

          {/* Industrial Unit & Site Details */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-600" /> MIDC Industrial Unit & Facility Specs
            </h3>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded border border-slate-200">
                <span className="text-slate-500 font-semibold block">Registered Factory Premises Address:</span>
                <p className="text-slate-900 font-medium mt-0.5">{mainBiz.address}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">MIDC Zone</span>
                  <span className="font-bold text-slate-900">{mainBiz.location}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Plot Number</span>
                  <span className="font-bold text-slate-900">Plot C-45, Phase II</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Total Plot Area</span>
                  <span className="font-bold text-slate-900">4.5 Acres (18,210 sq m)</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Built-up Area</span>
                  <span className="font-bold text-slate-900">65,000 sq ft</span>
                </div>
              </div>
            </div>
          </div>

          {/* Capital Investment & Workforce Metrics */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-600" /> Operational & Workforce Scale
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200">
                <span className="text-slate-500 font-semibold block">Capital Investment</span>
                <span className="text-lg font-extrabold text-amber-900 mt-1 block">₹ 18.50 Crores</span>
                <span className="text-[10px] text-amber-700">Eligible for PSI 2026 Scheme</span>
              </div>

              <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-200">
                <span className="text-slate-500 font-semibold block">Employee Workforce</span>
                <span className="text-lg font-extrabold text-blue-900 mt-1 block">185 Workers</span>
                <span className="text-[10px] text-blue-700">Contract Labour Licensed</span>
              </div>

              <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-200">
                <span className="text-slate-500 font-semibold block">MSEDCL Power Load</span>
                <span className="text-lg font-extrabold text-emerald-900 mt-1 block">750 HP (3-Phase)</span>
                <span className="text-[10px] text-emerald-700">High Tension Grid Access</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Key Contacts & Management */}
        <div className="space-y-6">
          
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-600" /> Authorized Directors & Contacts
            </h3>

            <div className="space-y-3 text-xs">
              
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <div className="flex justify-between items-center font-bold text-slate-900">
                  <span>{mainBiz.ownerName}</span>
                  <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">Primary Contact</span>
                </div>
                <p className="text-slate-500">Managing Director • Din: 08842109</p>
                <div className="pt-2 text-[11px] text-slate-600 space-y-0.5">
                  <div className="flex items-center space-x-1.5">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>{mainBiz.phone}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Mail className="w-3 h-3 text-slate-400" />
                    <span>rahul.sharma@abcind.co.in</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <div className="flex justify-between items-center font-bold text-slate-900">
                  <span>Vikram Joshi</span>
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">Technical Director</span>
                </div>
                <p className="text-slate-500">Director & Factory Manager</p>
                <div className="pt-2 text-[11px] text-slate-600 space-y-0.5">
                  <div className="flex items-center space-x-1.5">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>+91 98230 55412</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Mail className="w-3 h-3 text-slate-400" />
                    <span>v.joshi@abcind.co.in</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg text-xs space-y-2">
            <span className="font-bold text-amber-900 block flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-700" /> Single Window Profile Status
            </span>
            <p className="text-amber-800 text-[11px] leading-relaxed">
              Your enterprise profile is 100% verified with Maharashtra Industrial Development Corporation (MIDC) records. All auto-populated application forms use these validated credentials.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
