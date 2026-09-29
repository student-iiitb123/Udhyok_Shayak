'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { GovernmentEcosystemHero } from '@/components/landing/GovernmentEcosystemHero';
import { 
  Building2, ArrowRight, ShieldCheck, CheckCircle2, Clock, 
  ChevronDown, FileText, Landmark, Gift, AlertCircle, Layers, 
  HelpCircle, ExternalLink, Sparkles, UserCheck
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setIsRoleModalOpen, setCurrentRole, setIsBusinessSetupModalOpen } = useApp();
  const router = useRouter();
  const [activeJourneyStep, setActiveJourneyStep] = useState(2);

  const handleSetUpBusiness = () => {
    setIsBusinessSetupModalOpen(true);
  };


  const journeySteps = [
    { num: '01', title: 'Tell us about your business', desc: 'Sector, location & capital setup' },
    { num: '02', title: 'Identify required approvals', desc: 'Automated statutory rule mapping' },
    { num: '03', title: 'Prepare your documents', desc: 'DigiLocker integrated vault' },
    { num: '04', title: 'Submit applications', desc: 'Single digital gateway payment' },
    { num: '05', title: 'Track department actions', desc: 'Real-time SLA clock tracking' },
    { num: '06', title: 'Complete inspections', desc: 'Joint safety & fire site audits' },
    { num: '07', title: 'Receive approvals', desc: 'Digital QR-signed certificates' },
  ];

  const departments = [
    { name: 'Industries Department', desc: 'Factory licensing, MSME registrations, and industrial expansion permits.', icon: <Landmark className="w-5 h-5 text-amber-700" /> },
    { name: 'Environment Department', desc: 'Environmental Impact Assessment (EIA) & clearance certificates.', icon: <ShieldCheck className="w-5 h-5 text-emerald-600" /> },
    { name: 'Labour Department', desc: 'Contract labour registration, shop act licenses, and safety compliance.', icon: <FileText className="w-5 h-5 text-blue-600" /> },
    { name: 'Fire Department', desc: 'Building fire safety NOC (Form A & Form B bi-annual audits).', icon: <AlertCircle className="w-5 h-5 text-red-600" /> },
    { name: 'Revenue Department', desc: 'Non-Agricultural (NA) land conversion & zoning clearances.', icon: <Building2 className="w-5 h-5 text-slate-700" /> },
    { name: 'Pollution Control (MPCB)', desc: 'Consent to Establish (CTE) & Consent to Operate (CTO - Air & Water).', icon: <Sparkles className="w-5 h-5 text-emerald-700" /> },
    { name: 'Municipal Authorities', desc: 'Trade & commercial establishment licenses across Maharashtra cities.', icon: <Landmark className="w-5 h-5 text-slate-800" /> },
  ];

  const schemes = [
    { name: 'Package Scheme of Incentives (PSI 2026)', dept: 'Industries Department', eligibility: 'Units in Zone B, C, D MIDC investing > ₹5 Cr', benefit: '100% Stamp Duty Exemption & 5% Subsidized Interest' },
    { name: 'Chief Minister Employment Generation Programme', dept: 'Industries Department', eligibility: 'Micro & Small enterprises up to ₹50 L project cost', benefit: 'Capital Subsidy up to 25% (35% for Special Categories)' },
    { name: 'Green Energy & Solar Subsidy', dept: 'Environment Department', eligibility: 'Industrial units installing rooftop solar > 100 kW', benefit: '25% Capital Subsidy + Priority Open Access Grid' },
    { name: 'Mahila Udyam Infrastructure Support', dept: 'Industries Department', eligibility: 'Women-owned industrial units (>= 51% equity)', benefit: '20% MIDC Land Rebate & Dedicated Incubator' },
  ];

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* 4. HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="h-1 bg-gradient-to-r from-amber-500 via-white to-emerald-600"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Government Identity */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => router.push('/')}>
              <div className="w-11 h-11 bg-amber-50 rounded-full border border-amber-300 flex items-center justify-center shrink-0 shadow-2xs">
                <span className="text-amber-800 font-extrabold text-xl">म</span>
              </div>
              <div>
                <div className="flex items-center space-x-1.5 text-[11px] font-bold text-amber-900 tracking-wider">
                  <span>महाराष्ट्र शासन</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-600 font-medium">Government of Maharashtra</span>
                </div>
                <h1 className="text-base font-extrabold text-slate-900 tracking-tight leading-tight">
                  Single Window Clearance
                </h1>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold text-slate-600">
              <a href="#hero" className="hover:text-amber-800 transition-colors">Home</a>
              <a href="#how-it-works" className="hover:text-amber-800 transition-colors">How It Works</a>
              <a href="#approvals" className="hover:text-amber-800 transition-colors">Approvals</a>
              <a href="#departments" className="hover:text-amber-800 transition-colors">Departments</a>
              <a href="#schemes" className="hover:text-amber-800 transition-colors">Schemes</a>
              <a href="#transparency" className="hover:text-amber-800 transition-colors">Tracking</a>
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsRoleModalOpen(true)}
                className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-md hover:bg-slate-100 transition-colors"
              >
                Login / Switch Persona
              </button>

              <button
                onClick={handleSetUpBusiness}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2.5 rounded-md shadow-xs transition-all flex items-center space-x-1.5"
              >
                <span>Set Up Your Business</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* 5. HERO SECTION */}
      <section id="hero" className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center pt-6 pb-12 overflow-hidden bg-gradient-to-b from-slate-50/50 via-white to-white">
        
        {/* Subtle Background Geometric Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-[11px] font-bold text-amber-900 tracking-wider">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
                <span>MAHARASHTRA GOVERNMENT • SINGLE WINDOW CLEARANCE</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Your Business.<br />
                <span className="bg-gradient-to-r from-amber-700 via-amber-600 to-emerald-700 bg-clip-text text-transparent">
                  One Clear Government Journey.
                </span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                Simplify approvals, licenses, inspections and compliance through one connected digital platform for Maharashtra.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleSetUpBusiness}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm px-6 py-3.5 rounded-lg shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <span>Set Up Your Business</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#how-it-works"
                  className="bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm px-6 py-3.5 rounded-lg border border-slate-300 transition-colors text-center"
                >
                  Explore How It Works
                </a>
              </div>

              {/* Quick Trust Tags */}
              <div className="pt-4 flex items-center space-x-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>40+ Integrated Departments</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Statutory SLA Guarantees</span>
                </div>
              </div>

            </div>

            {/* Right Hero Government Showcase Visual */}
            <div className="lg:col-span-6 relative">
              <GovernmentEcosystemHero />
            </div>


          </div>
        </div>

        {/* 12. HERO SCROLL INDICATOR */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center text-xs text-slate-400 font-semibold flex flex-col items-center animate-bounce">
          <span>Scroll to explore</span>
          <ChevronDown className="w-4 h-4 text-amber-600 mt-0.5" />
        </div>
      </section>

      {/* 13. TRUST STRIP */}

      <section className="bg-slate-900 text-white py-12 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">TRUSTED STATE ARCHITECTURE</span>
            <h2 className="text-lg sm:text-xl font-extrabold text-white mt-1">A simpler way to navigate government processes</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Single Window', desc: 'One single digital point of filing across all state line departments.' },
              { num: '02', title: 'Transparent Process', desc: 'Real-time Right to Services SLA countdown clock & step tracking.' },
              { num: '03', title: 'Digital Applications', desc: '100% paperless submission with DigiLocker document vault.' },
              { num: '04', title: 'Connected Departments', desc: 'Seamless inter-departmental routing & joint field safety audits.' },
            ].map((f) => (
              <div key={f.num} className="bg-slate-800/60 p-5 rounded-lg border border-slate-700 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-400 block">{f.num}</span>
                <h3 className="text-sm font-bold text-white">{f.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. "ONE PLATFORM. ONE JOURNEY." SECTION */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">END-TO-END FLOW</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">One Platform. One Clear Journey.</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              From setting up your business to managing approvals, inspections and compliance — follow your journey from one connected platform.
            </p>
          </div>

          {/* Horizontal Process Diagram */}
          <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200">
            <div className="grid grid-cols-2 md:grid-cols-7 gap-3 text-center">
              {[
                'Business Profile', 'Required Approvals', 'Documents', 'Department Review', 'Inspection', 'Approval', 'Compliance'
              ].map((stepName, idx) => (
                <div key={idx} className="relative p-3 bg-white rounded-lg border border-slate-200 shadow-2xs flex flex-col items-center justify-center space-y-2 group hover:border-amber-400 transition-colors">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-amber-800">{stepName}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 15. INTERACTIVE APPROVAL JOURNEY */}
      <section id="approvals" className="py-16 bg-slate-50/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">VISUAL TIMELINE</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">See your journey before you begin.</h2>
            <p className="text-xs text-slate-500 mt-1">Click any step below to preview the statutory clearance milestone.</p>
          </div>

          <div className="space-y-6">
            {/* Steps Horizontal Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {journeySteps.map((step, idx) => {
                const isActive = activeJourneyStep === idx;
                return (
                  <button
                    key={step.num}
                    onClick={() => setActiveJourneyStep(idx)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      isActive 
                        ? 'bg-amber-600 text-white border-amber-700 shadow-md scale-105' 
                        : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    <span className={`text-[10px] font-mono font-bold block ${isActive ? 'text-amber-200' : 'text-slate-400'}`}>
                      {step.num}
                    </span>
                    <span className="text-xs font-bold block leading-tight mt-0.5">{step.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Step Preview Card */}
            <div className="bg-white p-6 rounded-xl border border-amber-300 shadow-md flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                  STAGE {journeySteps[activeJourneyStep].num} DETAILS
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">{journeySteps[activeJourneyStep].title}</h3>
                <p className="text-xs text-slate-600 mt-1">{journeySteps[activeJourneyStep].desc}</p>
              </div>
              <button
                onClick={handleSetUpBusiness}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2 rounded shadow-2xs"
              >
                Start This Step →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 16. SET UP YOUR BUSINESS CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 rounded-2xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="max-w-xl space-y-3 relative z-10">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">GUIDED SETUP ASSISTANT</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Not sure where to start?</h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Tell us about your business, location and project. Get a clearer view of the approvals and requirements you may need to consider.
              </p>
            </div>

            <button
              onClick={handleSetUpBusiness}
              className="bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm px-7 py-4 rounded-lg shadow-lg transition-all shrink-0 flex items-center space-x-2 relative z-10"
            >
              <span>Set Up Your Business</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 17. GOVERNMENT DEPARTMENTS SECTION */}
      <section id="departments" className="py-16 bg-slate-50/70 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">STATE NETWORK</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Connected Government Departments</h2>
            <p className="text-xs text-slate-500">Integrated departmental approvals routed through the single window gateway</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:-translate-y-1 hover:border-amber-400 hover:shadow-md transition-all space-y-3"
              >
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 inline-block">
                  {dept.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-900">{dept.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{dept.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 18. GOVERNMENT SCHEMES SECTION */}
      <section id="schemes" className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">STATE FINANCIAL INCENTIVES</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Explore Government Support</h2>
            <p className="text-xs text-slate-500">Discover government schemes and subsidies relevant to your business enterprise</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schemes.map((sch, idx) => (
              <div key={idx} className="bg-slate-50/70 p-6 rounded-xl border border-slate-200 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    {sch.dept}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{sch.name}</h3>
                  <div className="text-xs space-y-1 text-slate-600 pt-1">
                    <p><strong>Eligibility:</strong> {sch.eligibility}</p>
                    <p className="text-emerald-700 font-semibold"><strong>Benefits:</strong> {sch.benefit}</p>
                  </div>
                </div>

                <button
                  onClick={handleSetUpBusiness}
                  className="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center space-x-1 pt-2 border-t border-slate-200"
                >
                  <span>Learn More & Apply</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 19. TRANSPARENCY SECTION */}
      <section id="transparency" className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">TRANSPARENT TRACKING</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Know where your application stands.</h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Real-time visibility into every departmental milestone, officer review notes, and Right to Services statutory SLA deadline.
              </p>
            </div>

            {/* Mock Application Tracking Card */}
            <div className="lg:col-span-7 bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-4 shadow-xl">
              <div className="flex justify-between items-center border-b border-slate-700 pb-3 text-xs">
                <div>
                  <span className="font-bold text-amber-400 font-mono">#MH-IND-1024</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">Factory License Renewal & Expansion</h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Status / SLA</span>
                  <span className="text-xs font-bold text-emerald-400">Under Review (3 Days Left)</span>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  { step: 'Application Submitted', state: 'done' },
                  { step: 'Documents Verified', state: 'done' },
                  { step: 'Department Review', state: 'done' },
                  { step: 'Inspection Audit', state: 'active' },
                  { step: 'Final Approval Issuance', state: 'pending' },
                ].map((st, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-700/60">
                    <span className="text-slate-200">{st.step}</span>
                    <span className={`text-xs font-bold ${
                      st.state === 'done' ? 'text-emerald-400' : st.state === 'active' ? 'text-amber-400 animate-pulse' : 'text-slate-500'
                    }`}>
                      {st.state === 'done' ? '✓ Completed' : st.state === 'active' ? '● In Progress' : '○ Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 20. DATA / IMPACT SECTION */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">STATE PROTOTYPE METRICS</span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">Multiple Departments. One Connected Journey.</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="text-3xl font-extrabold text-amber-700">7+</h3>
              <p className="text-xs text-slate-600 font-bold mt-1">Nodal Departments</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="text-3xl font-extrabold text-emerald-700">24/7</h3>
              <p className="text-xs text-slate-600 font-bold mt-1">Application Tracking</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="text-3xl font-extrabold text-slate-900">Single</h3>
              <p className="text-xs text-slate-600 font-bold mt-1">Digital Entry Point</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="text-3xl font-extrabold text-blue-700">100%</h3>
              <p className="text-xs text-slate-600 font-bold mt-1">Transparent Status</p>
            </div>
          </div>
        </div>
      </section>

      {/* 21. FINAL CTA */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center px-4 space-y-6">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Start your business journey with clarity.
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
            One place to understand your approvals, requirements and government processes across Maharashtra.
          </p>
          <div className="flex items-center justify-center space-x-4 pt-2">
            <button
              onClick={handleSetUpBusiness}
              className="bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-lg shadow-md transition-all flex items-center space-x-1.5"
            >
              <span>Set Up Your Business</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 22. FORMAL GOVERNMENT FOOTER */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm">
                म
              </div>
              <span className="font-extrabold text-white text-sm">Government of Maharashtra</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Single Window Clearance Platform • Ease of Doing Business Gateway
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">Platform</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#hero" className="hover:text-amber-400">Home</a></li>
              <li><a href="#how-it-works" className="hover:text-amber-400">How It Works</a></li>
              <li><a href="#approvals" className="hover:text-amber-400">Approvals</a></li>
              <li><a href="#departments" className="hover:text-amber-400">Departments</a></li>
              <li><a href="#schemes" className="hover:text-amber-400">Schemes</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">Resources</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-amber-400">Help Desk</a></li>
              <li><a href="#" className="hover:text-amber-400">FAQs</a></li>
              <li><a href="#" className="hover:text-amber-400">Contact Us</a></li>
              <li><a href="#" className="hover:text-amber-400">Helpline: 1800-233-0099</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">Legal</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-amber-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-amber-400">Terms of Service</a></li>
              <li><a href="#" className="hover:text-amber-400">Accessibility</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-500">
          <span>© Government of Maharashtra • Prototype Interface — Demo</span>
          <span>Maitri Single Window Gateway</span>
        </div>
      </footer>

    </div>
  );
};
