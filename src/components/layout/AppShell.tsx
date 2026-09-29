'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { RoleSwitcherModal } from "@/components/layout/RoleSwitcherModal";
import { GlobalSearchModal } from "@/components/layout/GlobalSearchModal";
import { BusinessSetupWizardModal } from "@/components/layout/BusinessSetupWizardModal";
import { ToastContainer } from "@/components/ui/ToastContainer";

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  if (isLandingPage) {
    return (
      <div className="min-h-screen bg-white text-slate-900">
        <main className="min-h-screen bg-white">
          {children}
        </main>
        <RoleSwitcherModal />
        <GlobalSearchModal />
        <BusinessSetupWizardModal />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col font-sans antialiased text-slate-900 bg-slate-50 min-h-screen">
      {/* Dashboard Top Header */}
      <Header />

      {/* Dashboard Main Layout Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        <Sidebar />
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>

      {/* Dashboard Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div>
            © 2026 Government of Maharashtra • Industry & Commerce Department • Maitri Single Window Clearance
          </div>
          <div className="flex space-x-4 text-slate-600 font-medium">
            <span>Privacy Policy</span>
            <span>Terms of Use</span>
            <span>State Helpline: 1800-233-0099</span>
          </div>
        </div>
      </footer>

      {/* Shared Modals & Toasts */}
      <RoleSwitcherModal />
      <GlobalSearchModal />
      <BusinessSetupWizardModal />
      <ToastContainer />
    </div>
  );
};

