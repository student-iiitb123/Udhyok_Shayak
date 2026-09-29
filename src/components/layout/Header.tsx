'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Search, Bell, UserCheck, CheckCheck, Globe, ChevronDown } from 'lucide-react';
import { Language } from '@/types';

export const Header: React.FC = () => {
  const { 
    currentRole, 
    currentUser, 
    setIsRoleModalOpen, 
    setIsSearchModalOpen,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    language,
    setLanguage 
  } = useApp();

  const [showNotifMenu, setShowNotifMenu] = React.useState(false);
  const [showLangMenu, setShowLangMenu] = React.useState(false);

  // Filter notifications specifically for the current role!
  const roleNotifications = notifications.filter(n => !n.role || n.role === currentRole);
  const unreadCount = roleNotifications.filter(n => !n.read).length;

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'owner':
        if (language === 'mr') return 'उद्योगपती';
        if (language === 'hi') return 'व्यवसायी';
        return 'Business Owner';
      case 'department':
        if (language === 'mr') return 'विभाग अधिकारी';
        if (language === 'hi') return 'विभाग अधिकारी';
        return 'Department Officer';
      case 'inspector':
        if (language === 'mr') return 'सुरक्षा निरीक्षक';
        if (language === 'hi') return 'सुरक्षा निरीक्षक';
        return 'Safety Inspector';
      case 'admin':
        if (language === 'mr') return 'प्रशासन अधिकारी';
        if (language === 'hi') return 'प्रशासन अधिकारी';
        return 'Govt Administrator';
      default: return role;
    }
  };

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'department': return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'inspector': return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'admin': return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      default: return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const getTranslatedNotifTitle = (notif: any) => {
    if (language === 'mr' && notif.titleMr) return notif.titleMr;
    if (language === 'hi' && notif.titleHi) return notif.titleHi;
    return notif.title;
  };

  const getTranslatedNotifMsg = (notif: any) => {
    if (language === 'mr' && notif.messageMr) return notif.messageMr;
    if (language === 'hi' && notif.messageHi) return notif.messageHi;
    return notif.message;
  };

  const getTranslatedNotifTime = (notif: any) => {
    if (language === 'mr' && notif.timestampMr) return notif.timestampMr;
    if (language === 'hi' && notif.timestampHi) return notif.timestampHi;
    return notif.timestamp;
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Govt Tricolor Accent Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-white to-emerald-600"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Left: Maharashtra Emblem & Title */}
          <div className="flex items-center space-x-2.5 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-50 rounded-xl border border-amber-300 flex items-center justify-center shrink-0 shadow-2xs">
              <span className="text-amber-800 font-extrabold text-lg sm:text-xl tracking-tighter">म</span>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5 text-[10px] sm:text-xs">
                <span className="font-bold text-amber-900 tracking-wide">महाराष्ट्र शासन</span>
                <span className="text-slate-300">|</span>
                <span className="hidden sm:inline font-medium text-slate-600">
                  {language === 'mr' ? 'महाराष्ट्र सरकार' : language === 'hi' ? 'महाराष्ट्र सरकार' : 'Government of Maharashtra'}
                </span>
              </div>
              <h1 className="text-sm sm:text-lg font-bold text-slate-900 tracking-tight leading-tight">
                {language === 'mr' ? 'एकल खिडकी परवाना प्रणाली' : language === 'hi' ? 'एकल खिड़की मंजूरी पोर्टल' : 'Single Window Clearance Platform'}
              </h1>
              <p className="hidden sm:block text-xs text-slate-500 font-medium">
                Maitri Industry Gateway • Ease of Doing Business
              </p>
            </div>
          </div>

          {/* Right: Search, Language Switcher, Notifications, Demo Role Switcher, Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Quick Search Button (Desktop) */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="hidden md:flex items-center space-x-2 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-md border border-slate-200 text-xs transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>{language === 'mr' ? 'शोधा...' : language === 'hi' ? 'खोजें...' : 'Search applications...'}</span>
              <kbd className="bg-white px-1.5 py-0.5 rounded text-[10px] text-slate-400 border border-slate-200">⌘K</kbd>
            </button>

            {/* Quick Search Button (Mobile Icon) */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Multi-Language Dropdown Switcher (English | मराठी | हिंदी) */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowLangMenu(!showLangMenu);
                  setShowNotifMenu(false);
                }}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors"
                title="Select Language"
              >
                <Globe className="w-4 h-4 text-amber-700" />
                <span>{language === 'en' ? 'English' : language === 'mr' ? 'मराठी' : 'हिंदी'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-xl border border-slate-200 z-50 overflow-hidden animate-in fade-in-50 zoom-in-95">
                  <button
                    onClick={() => { setLanguage('en'); setShowLangMenu(false); }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold hover:bg-slate-50 flex items-center justify-between ${language === 'en' ? 'text-amber-800 bg-amber-50' : 'text-slate-700'}`}
                  >
                    <span>English</span>
                    {language === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>}
                  </button>
                  <button
                    onClick={() => { setLanguage('mr'); setShowLangMenu(false); }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold hover:bg-slate-50 flex items-center justify-between ${language === 'mr' ? 'text-amber-800 bg-amber-50' : 'text-slate-700'}`}
                  >
                    <span>मराठी</span>
                    {language === 'mr' && <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>}
                  </button>
                  <button
                    onClick={() => { setLanguage('hi'); setShowLangMenu(false); }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold hover:bg-slate-50 flex items-center justify-between ${language === 'hi' ? 'text-amber-800 bg-amber-50' : 'text-slate-700'}`}
                  >
                    <span>हिंदी</span>
                    {language === 'hi' && <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>}
                  </button>
                </div>
              )}
            </div>

            {/* Notification Drawer Button */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifMenu(!showNotifMenu);
                  setShowLangMenu(false);
                }}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown Backdrop Overlay on Mobile */}
              {showNotifMenu && (
                <div 
                  className="fixed inset-0 z-40 bg-transparent sm:hidden"
                  onClick={() => setShowNotifMenu(false)}
                />
              )}

              {/* Notifications Dropdown Menu (Role-Specific & Translated!) */}
              {showNotifMenu && (
                <div className="absolute right-[-2.5rem] sm:right-0 mt-2 w-[calc(100vw-2rem)] sm:w-96 max-w-sm bg-white rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in-50 zoom-in-95">
                  <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-bold text-slate-800">
                        {language === 'mr' ? `सरकारी सूचना (${unreadCount})` : language === 'hi' ? `सरकारी सूचनाएं (${unreadCount})` : `Govt Notifications (${unreadCount})`}
                      </span>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-[11px] font-medium text-amber-700 hover:text-amber-800 hover:underline flex items-center space-x-1"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        <span>{language === 'mr' ? 'सर्व वाचन केले' : language === 'hi' ? 'सभी पढ़ें' : 'Mark all read'}</span>
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {roleNotifications.map(notif => (
                      <div
                        key={notif.id}
                        onClick={() => markNotificationRead(notif.id)}
                        className={`p-3 hover:bg-slate-50 cursor-pointer transition-colors ${!notif.read ? 'bg-amber-50/40' : ''}`}
                      >
                        <div className="flex items-start space-x-2.5">
                          <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${!notif.read ? 'bg-amber-600' : 'bg-transparent'}`} />
                          <div className="flex-1">
                            <h4 className="text-xs font-semibold text-slate-900">
                              {getTranslatedNotifTitle(notif)}
                            </h4>
                            <p className="text-xs text-slate-600 mt-0.5 leading-normal">
                              {getTranslatedNotifMsg(notif)}
                            </p>
                            <span className="text-[10px] text-slate-400 mt-1 block">
                              {getTranslatedNotifTime(notif)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-2.5 text-center bg-slate-50 border-t border-slate-200">
                    <span className="text-[11px] text-slate-500 font-medium">
                      {language === 'mr' ? 'महाराष्ट्र शासन परवाना प्रणाली' : language === 'hi' ? 'महाराष्ट्र शासन प्रणाली' : 'Maharashtra SWC Portal Alert System'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* DEMO ROLE SWITCHER BUTTON */}
            <button
              onClick={() => setIsRoleModalOpen(true)}
              className="flex items-center space-x-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-xs"
            >
              <UserCheck className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden sm:inline">{language === 'mr' ? 'भूमिका:' : language === 'hi' ? 'भूमिका:' : 'Role:'}</span>
              <span className={`px-1.5 py-0.5 rounded border text-[11px] font-bold ${getRoleBadgeStyle(currentRole)}`}>
                {getRoleLabel(currentRole)}
              </span>
              <span className="hidden sm:inline text-[10px] bg-amber-200 text-amber-900 px-1 rounded font-bold">Demo Switch</span>
            </button>

            {/* Current User Avatar */}
            <div className="hidden lg:flex items-center space-x-2 border-l border-slate-200 pl-3">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                {currentUser.avatar}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-slate-900 leading-tight">{currentUser.name}</span>
                <span className="text-[10px] text-slate-500 leading-tight">{currentUser.designation}</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
