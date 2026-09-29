'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Layers, Plus, Trash2, ArrowDown, MoveUp, MoveDown, Edit2, CheckCircle2 } from 'lucide-react';
import { WorkflowStep } from '@/types';

export const WorkflowBuilder: React.FC = () => {
  const { workflowSteps, updateWorkflowSteps, addToast } = useApp();
  const [steps, setSteps] = useState<WorkflowStep[]>(workflowSteps);

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newSteps = [...steps];
    const temp = newSteps[index];
    newSteps[index] = newSteps[index - 1];
    newSteps[index - 1] = temp;
    // re-index order
    newSteps.forEach((s, i) => s.order = i + 1);
    setSteps(newSteps);
    updateWorkflowSteps(newSteps);
  };

  const handleMoveDown = (index: number) => {
    if (index === steps.length - 1) return;
    const newSteps = [...steps];
    const temp = newSteps[index];
    newSteps[index] = newSteps[index + 1];
    newSteps[index + 1] = temp;
    newSteps.forEach((s, i) => s.order = i + 1);
    setSteps(newSteps);
    updateWorkflowSteps(newSteps);
  };

  const handleDelete = (id: string) => {
    const newSteps = steps.filter(s => s.id !== id);
    newSteps.forEach((s, i) => s.order = i + 1);
    setSteps(newSteps);
    updateWorkflowSteps(newSteps);
  };

  const handleAddStep = () => {
    const newStep: WorkflowStep = {
      id: `wf-${Date.now().toString().slice(-3)}`,
      order: steps.length + 1,
      stepName: 'Third-Party Safety Audit Verification',
      description: 'Independent certified auditor review of high-hazard installation plans.',
      department: 'Directorate of Industrial Safety',
      durationDays: 3,
      isRequired: true,
    };
    const updated = [...steps, newStep];
    setSteps(updated);
    updateWorkflowSteps(updated);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs flex justify-between items-center">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Engine Design</span>
          <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">Visual Workflow Builder & Stage Sequencer</h2>
          <p className="text-xs text-slate-500 font-medium">Reconfigure statutory Single Window clearance stages and departmental routing</p>
        </div>

        <button
          onClick={handleAddStep}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded shadow-xs flex items-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Workflow Step</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs max-w-3xl space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Active Clearance Pipeline Sequence</h3>

        <div className="space-y-3">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex items-center justify-between gap-4 text-xs hover:border-emerald-300 transition-colors">
                <div className="flex items-center space-x-3">
                  <span className="w-7 h-7 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center text-xs shrink-0">
                    {step.order}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{step.stepName}</h4>
                    <p className="text-slate-600 text-xs mt-0.5">{step.description}</p>
                    <div className="flex items-center space-x-3 mt-1 text-[11px] text-slate-500">
                      <span>Nodal: <strong className="text-slate-700">{step.department}</strong></span>
                      <span>SLA: <strong className="text-emerald-700 font-mono">{step.durationDays} Days</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1 shrink-0">
                  <button
                    onClick={() => handleMoveUp(idx)}
                    disabled={idx === 0}
                    className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded disabled:opacity-30"
                    title="Move Step Up"
                  >
                    <MoveUp className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleMoveDown(idx)}
                    disabled={idx === steps.length - 1}
                    className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded disabled:opacity-30"
                    title="Move Step Down"
                  >
                    <MoveDown className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(step.id)}
                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                    title="Delete Step"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {idx < steps.length - 1 && (
                <div className="flex justify-center text-slate-300 my-1">
                  <ArrowDown className="w-4 h-4 text-emerald-600 animate-bounce" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
