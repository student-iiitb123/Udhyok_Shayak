'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const GovernmentEcosystem3D = dynamic(
  () => import('@/components/3d/GovernmentEcosystem3D'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[450px] sm:h-[540px] flex flex-col items-center justify-center bg-slate-50/50 rounded-2xl border border-slate-200">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-3"></div>
        <span className="text-xs font-bold text-slate-600">Initializing 3D Government Ecosystem...</span>
      </div>
    ),
  }
);

export const GovernmentEcosystem3DWrapper: React.FC = () => {
  return <GovernmentEcosystem3D />;
};
