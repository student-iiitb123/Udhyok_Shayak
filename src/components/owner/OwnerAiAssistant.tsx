'use client';

import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, HelpCircle, FileText, CheckCircle2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const OwnerAiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Namaskar! I am your AI Single Window Compliance Assistant powered by Maharashtra Industrial Gateway rules database. Ask me about required documents, SLA timelines, subsidy schemes, or license renewal steps.',
      timestamp: 'Just now',
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sampleQuestions = [
    'What documents do I need for Factory License?',
    'Why is my application #MH-IND-1024 pending?',
    'Which approvals do I need for Red category plant?',
    'When is my license due for renewal?',
    'What schemes am I eligible for in Pune MIDC?',
  ];

  const handleSend = (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = 'According to Maharashtra State Industrial Regulations 2026, all applications are tracked under statutory SLA timelines. Please check your Dashboard for official notices.';
      
      const lower = queryText.toLowerCase();
      if (lower.includes('documents') || lower.includes('factory license')) {
        replyText = 'For Factory License Renewal & Expansion under Maharashtra Factories Rules 1963, you require:\n1. Form 1 Application & Manufacturing Flowchart\n2. MIDC Land Title / Lease Deed\n3. MPCB Environmental Form III Effluent Certificate\n4. Architectural Factory Blueprint certified by Chartered Engineer\n5. Fire Safety NOC (Form A).';
      } else if (lower.includes('pending') || lower.includes('mh-ind-1024')) {
        replyText = 'Application #MH-IND-1024 is currently in "Query Raised" status. Senior Inspector Sanjay Deshmukh from Industries Department requested an updated Form III Environmental Compliance Certificate reflecting MPCB 2026 effluent flow limits.';
      } else if (lower.includes('red category') || lower.includes('approvals')) {
        replyText = 'Red Category Industrial units in Maharashtra require:\n1. Consent to Establish (CTE) from MPCB\n2. Environmental Clearance (EC) from State Environment Dept\n3. High Hazard Fire NOC (Form A)\n4. Factory Plan Approval\n5. Hazardous Waste Registration.';
      } else if (lower.includes('renewal')) {
        replyText = 'Your Consent to Operate (CTO) from MPCB is due for renewal on 18 Oct 2026 (24 days remaining). It is recommended to initiate online renewal 30 days prior to avoid statutory penalties.';
      } else if (lower.includes('schemes') || lower.includes('pune')) {
        replyText = 'For Chakan MIDC Pune (Zone B/C Industrial area), your unit is eligible for:\n1. Package Scheme of Incentives (PSI 2026) - 100% Stamp Duty Exemption & 5% Interest Subsidy.\n2. Green Energy Industrial Solar Subsidy (25% capital grant).';
      }

      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">AI Single Window Assistant</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">Maharashtra Regulatory Knowledge Engine</h2>
          <p className="text-xs text-slate-500 font-medium">Instant answers on state acts, rules, documents, and application status</p>
        </div>
        <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded text-xs font-bold border border-amber-300">
          Prototype Knowledge Bot
        </span>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs flex flex-col h-[520px]">
        
        {/* Suggested Prompts Header */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap gap-2 text-xs">
          <span className="text-[11px] font-bold text-slate-500 self-center">Frequent Questions:</span>
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-900 border border-slate-200 hover:border-amber-300 px-2.5 py-1 rounded text-[11px] font-medium transition-all"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Messages Log */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold shadow-xs ${
                msg.sender === 'user' ? 'bg-slate-800 text-white' : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-amber-700" />}
              </div>

              <div className={`max-w-xl p-3.5 rounded-lg text-xs leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-amber-600 text-white rounded-tr-none' 
                  : 'bg-slate-100 text-slate-900 rounded-tl-none border border-slate-200'
              }`}>
                <p className="whitespace-pre-line">{msg.text}</p>
                <span className={`text-[10px] mt-1.5 block ${msg.sender === 'user' ? 'text-amber-100' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 text-slate-400 text-xs italic pl-11">
              <span>Searching Maharashtra statutory regulations database...</span>
            </div>
          )}
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputQuery);
          }}
          className="p-3 border-t border-slate-200 bg-slate-50 flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask AI assistant about clearance rules, documents, or SLA status..."
            className="flex-1 bg-white border border-slate-300 rounded-md px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isTyping}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2 rounded-md shadow-xs transition-all disabled:opacity-50 flex items-center space-x-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Ask</span>
          </button>
        </form>

      </div>

    </div>
  );
};
