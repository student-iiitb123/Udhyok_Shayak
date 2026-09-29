'use client';

import React from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  accentColor?: 'saffron' | 'green' | 'navy' | 'red' | 'purple';
  onClick?: () => void;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  accentColor = 'saffron',
  onClick,
}) => {
  let borderStyle = 'border-slate-200';
  let iconBg = 'bg-slate-50 text-slate-700';

  if (accentColor === 'saffron') {
    borderStyle = 'border-amber-200 hover:border-amber-400';
    iconBg = 'bg-amber-50 text-amber-700 border-amber-200';
  } else if (accentColor === 'green') {
    borderStyle = 'border-emerald-200 hover:border-emerald-400';
    iconBg = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (accentColor === 'red') {
    borderStyle = 'border-red-200 hover:border-red-400';
    iconBg = 'bg-red-50 text-red-700 border-red-200';
  } else if (accentColor === 'navy') {
    borderStyle = 'border-slate-300 hover:border-slate-500';
    iconBg = 'bg-slate-100 text-slate-800 border-slate-300';
  } else if (accentColor === 'purple') {
    borderStyle = 'border-purple-200 hover:border-purple-400';
    iconBg = 'bg-purple-50 text-purple-700 border-purple-200';
  }

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg p-5 border shadow-2xs transition-all ${borderStyle} ${onClick ? 'cursor-pointer hover:shadow-md' : ''}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">{title}</span>
        {icon && (
          <div className={`p-2 rounded-md border ${iconBg}`}>
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-2xl font-extrabold text-slate-900 tracking-tight">{value}</span>
        {trend && (
          <span className={`text-xs font-bold ${trend.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
            {trend.isPositive ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="text-xs text-slate-500 mt-1 font-medium">{subtitle}</p>
      )}
    </div>
  );
};
