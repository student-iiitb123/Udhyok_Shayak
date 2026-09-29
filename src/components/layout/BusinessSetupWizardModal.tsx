'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Building2, Factory, FlaskConical, Utensils, Shirt, Laptop, PackageCheck,
  MapPin, Landmark, Trees, ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft,
  X, Zap, Users, Sparkles, FileText, Gift, Clock, AlertTriangle
} from 'lucide-react';

export const BusinessSetupWizardModal: React.FC = () => {
  const { 
    isBusinessSetupModalOpen, 
    setIsBusinessSetupModalOpen, 
    setCurrentRole,
    addToast 
  } = useApp();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);

  // Questionnaire State
  const [sector, setSector] = useState<string>('Manufacturing & Engineering');
  const [locationType, setLocationType] = useState<string>('MIDC Industrial Zone');
  const [investmentScale, setInvestmentScale] = useState<string>('Small (₹1 Cr - ₹10 Cr)');
  const [powerDemand, setPowerDemand] = useState<string>('High Tension (HT > 500 kVA)');
  const [workforceSize, setWorkforceSize] = useState<string>('50 to 200 Workers');

  if (!isBusinessSetupModalOpen) return null;

  const sectors = [
    { id: 'manufacturing', name: 'Manufacturing & Engineering', icon: <Factory className="w-5 h-5 text-amber-700" />, desc: 'Auto components, steel fabrication, heavy machinery & assembly lines.' },
    { id: 'chemical', name: 'Chemical, Fertilizer & Pharma', icon: <FlaskConical className="w-5 h-5 text-red-600" />, desc: 'Bulk drugs, chemical synthesis, cosmetics & fertilizer units (Red Category).' },
    { id: 'food', name: 'Food Processing & Agro Units', icon: <Utensils className="w-5 h-5 text-emerald-600" />, desc: 'Dairy processing, grain mills, beverage plants & cold chain storage.' },
    { id: 'textiles', name: 'Textiles, Apparel & Dyeing', icon: <Shirt className="w-5 h-5 text-purple-600" />, desc: 'Weaving, garment manufacturing, textile processing & spinning mills.' },
    { id: 'it', name: 'IT / ITeS & Electronics', icon: <Laptop className="w-5 h-5 text-blue-600" />, desc: 'Hardware assembly, semiconductor packaging, software parks & data centers.' },
    { id: 'logistics', name: 'Logistics & Warehousing', icon: <PackageCheck className="w-5 h-5 text-indigo-600" />, desc: 'Supply chain hubs, industrial warehousing & distribution centers.' },
  ];

  const locations = [
    { id: 'midc', name: 'MIDC Industrial Zone', icon: <Landmark className="w-5 h-5 text-amber-700" />, desc: 'State-governed industrial estates with pre-cleared infrastructure.' },
    { id: 'private_park', name: 'Private Industrial Park / SEZ', icon: <Building2 className="w-5 h-5 text-blue-600" />, desc: 'Co-operative or private industrial parks with specialized utilities.' },
    { id: 'na_land', name: 'Non-Agricultural (NA) Land', icon: <Trees className="w-5 h-5 text-emerald-600" />, desc: 'Converted private land parcels with individual statutory clearances.' },
  ];

  const handleCompleteWizard = () => {
    setCurrentRole('owner');
    addToast('success', 'Factory Setup Configured', `Mapped statutory clearances for ${sector} in ${locationType}.`);
    setIsBusinessSetupModalOpen(false);
    router.push('/owner');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-bold text-amber-400 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Factory & Business Setup Wizard</span>
            </div>
            <h2 className="text-lg font-extrabold text-white mt-0.5">Configure Your Single Window Journey</h2>
          </div>
          <button 
            onClick={() => setIsBusinessSetupModalOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-600">
          <div className="flex items-center space-x-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${currentStep >= 1 ? 'bg-amber-600 text-white' : 'bg-slate-300 text-slate-700'}`}>1</span>
            <span className={currentStep === 1 ? 'text-amber-800 font-bold' : ''}>Sector</span>
          </div>
          <div className="w-8 h-0.5 bg-slate-300"></div>
          <div className="flex items-center space-x-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${currentStep >= 2 ? 'bg-amber-600 text-white' : 'bg-slate-300 text-slate-700'}`}>2</span>
            <span className={currentStep === 2 ? 'text-amber-800 font-bold' : ''}>Location</span>
          </div>
          <div className="w-8 h-0.5 bg-slate-300"></div>
          <div className="flex items-center space-x-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${currentStep >= 3 ? 'bg-amber-600 text-white' : 'bg-slate-300 text-slate-700'}`}>3</span>
            <span className={currentStep === 3 ? 'text-amber-800 font-bold' : ''}>Scale & Power</span>
          </div>
          <div className="w-8 h-0.5 bg-slate-300"></div>
          <div className="flex items-center space-x-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${currentStep >= 4 ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-700'}`}>4</span>
            <span className={currentStep === 4 ? 'text-emerald-800 font-bold' : ''}>Roadmap</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">

          {/* STEP 1: SECTOR CLASSIFICATION */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">Step 1 of 4</span>
                <h3 className="text-base font-bold text-slate-900">What kind of factory or enterprise are you setting up?</h3>
                <p className="text-xs text-slate-500 mt-1">Select your primary sector to determine environmental category and statutory approval requirements.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sectors.map((sec) => (
                  <div
                    key={sec.id}
                    onClick={() => setSector(sec.name)}
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-start space-x-3 ${
                      sector === sec.name
                        ? 'border-amber-600 bg-amber-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-slate-100 shrink-0">{sec.icon}</div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{sec.name}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 leading-tight">{sec.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: LOCATION CLASSIFICATION */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">Step 2 of 4</span>
                <h3 className="text-base font-bold text-slate-900">Where is your proposed factory land located?</h3>
                <p className="text-xs text-slate-500 mt-1">Location determines municipal approvals, land conversion NOCs, and MIDC utility access.</p>
              </div>

              <div className="space-y-3">
                {locations.map((loc) => (
                  <div
                    key={loc.id}
                    onClick={() => setLocationType(loc.name)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center space-x-4 ${
                      locationType === loc.name
                        ? 'border-amber-600 bg-amber-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="p-2.5 rounded-lg bg-slate-100 shrink-0">{loc.icon}</div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-slate-900">{loc.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{loc.desc}</div>
                    </div>
                    {locationType === loc.name && (
                      <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: SCALE & POWER DEMAND */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">Step 3 of 4</span>
                <h3 className="text-base font-bold text-slate-900">Specify your investment scale & capacity requirements</h3>
                <p className="text-xs text-slate-500 mt-1">Helps map eligibility for PSI 2026 incentives and high-tension utility connections.</p>
              </div>

              {/* Capital Investment */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">Project Capital Investment</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Micro (< ₹1 Cr)', 'Small (₹1 Cr - ₹10 Cr)', 'Medium (₹10 Cr - ₹50 Cr)', 'Mega (> ₹50 Cr)'].map((scale) => (
                    <button
                      key={scale}
                      onClick={() => setInvestmentScale(scale)}
                      className={`px-3 py-2 rounded-lg border text-xs font-semibold text-center transition-all ${
                        investmentScale === scale
                          ? 'border-amber-600 bg-amber-600 text-white shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {scale}
                    </button>
                  ))}
                </div>
              </div>

              {/* Power Demand */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">Electricity & Power Sanction Demand</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { label: 'High Tension (HT > 500 kVA)', icon: <Zap className="w-4 h-4 text-amber-600" /> },
                    { label: 'Standard Commercial (LT < 100 kVA)', icon: <Zap className="w-4 h-4 text-blue-600" /> }
                  ].map((pwr) => (
                    <div
                      key={pwr.label}
                      onClick={() => setPowerDemand(pwr.label)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center space-x-2.5 ${
                        powerDemand === pwr.label
                          ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      {pwr.icon}
                      <span className="text-xs">{pwr.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Workforce Size */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">Projected Workforce / Labour Headcount</label>
                <div className="grid grid-cols-3 gap-2">
                  {['10 to 50 Workers', '50 to 200 Workers', '200+ Workers (DISH Officer)'].map((wf) => (
                    <button
                      key={wf}
                      onClick={() => setWorkforceSize(wf)}
                      className={`px-3 py-2 rounded-lg border text-xs font-semibold text-center transition-all ${
                        workforceSize === wf
                          ? 'border-amber-600 bg-amber-600 text-white shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {wf}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CUSTOM REGULATORY ROADMAP SUMMARY */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider">Automated Single Window Assessment Complete</h4>
                  <p className="text-xs text-emerald-700 mt-0.5">Your factory profile has been configured with personalized statutory clearance mappings.</p>
                </div>
              </div>

              {/* Configuration Breakdown Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">Configured Setup Summary</div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Industrial Sector:</span>
                    <span className="font-bold text-slate-800">{sector}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Proposed Land:</span>
                    <span className="font-bold text-slate-800">{locationType}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Investment Scale:</span>
                    <span className="font-bold text-slate-800">{investmentScale}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Power Load Sanction:</span>
                    <span className="font-bold text-amber-700">{powerDemand}</span>
                  </div>
                </div>
              </div>

              {/* Mapped Statutory Clearances */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">Mapped Statutory Approvals (5 NOCs)</span>
                <div className="space-y-1.5 text-xs font-medium text-slate-700">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      <span>MPCB Consent to Establish (Air & Water Act)</span>
                    </div>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">7 Days SLA</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
                    <div className="flex items-center space-x-2">
                      <Landmark className="w-4 h-4 text-amber-700" />
                      <span>MIDC Building Plan Approval & Plot Possession</span>
                    </div>
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">14 Days SLA</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-purple-600" />
                      <span>DISH Factory Registration & Plan Sanction (Factories Act)</span>
                    </div>
                    <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded">10 Days SLA</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
                    <div className="flex items-center space-x-2">
                      <Gift className="w-4 h-4 text-amber-600" />
                      <span>PSI 2026 Package Scheme of Incentives Application</span>
                    </div>
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Auto-Mapped</span>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-lg border border-slate-300 transition-colors flex items-center space-x-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div></div>
          )}

          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm transition-all flex items-center space-x-1.5"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleCompleteWizard}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-6 py-3 rounded-lg shadow-md transition-all flex items-center space-x-2"
            >
              <span>Launch Business Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
