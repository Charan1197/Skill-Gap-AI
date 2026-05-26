import React from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, Tooltip, ResponsiveContainer } from 'recharts';

const RadarChartComponent = ({ scores, isMini = false }) => {
  if (!scores || !scores.radar) return null;

  const data = scores.radar;

  // Custom tooltips for overlapping areas
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel border border-white/10 rounded-xl p-3 shadow-xl backdrop-blur-md text-xs">
          <p className="font-bold text-slate-200 mb-1.5 uppercase tracking-wider text-[10px]">
            {payload[0].payload.subject}
          </p>
          <div className="space-y-1">
            <div className="flex justify-between gap-6">
              <span className="text-indigo-300 font-semibold">Your Skill:</span>
              <span className="font-extrabold text-white">{payload[0].value}%</span>
            </div>
            <div className="flex justify-between gap-6">
              <span className="text-cyan-300 font-semibold">Job Demand:</span>
              <span className="font-extrabold text-white">{payload[1]?.value || 90}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const chartHeightClass = isMini ? "min-h-[220px]" : "min-h-[380px]";
  const innerRadius = isMini ? "60%" : "80%";
  const marginSettings = isMini 
    ? { top: 10, right: 20, bottom: 10, left: 20 }
    : { top: 25, right: 45, bottom: 25, left: 45 };
  const labelSettings = isMini
    ? { fill: 'rgba(255, 255, 255, 0.45)', fontSize: 8.5, fontWeight: 600, fontFamily: 'Space Grotesk' }
    : { fill: 'rgba(255, 255, 255, 0.75)', fontSize: 11, fontWeight: 700, fontFamily: 'Space Grotesk' };

  return (
    <div className={`w-full h-full flex items-center justify-center ${chartHeightClass}`}>
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <RadarChart cx="50%" cy="50%" r={innerRadius} data={data} margin={marginSettings}>
          <defs>
            <radialGradient id="candidateGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#818cf8" stopOpacity={0.05} />
            </radialGradient>
            <radialGradient id="requiredGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.02} />
            </radialGradient>
          </defs>
          <PolarGrid stroke="rgba(255, 255, 255, 0.08)" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={labelSettings}
          />
          {!isMini && <Tooltip content={<CustomTooltip />} />}
          <Radar 
            name="Your Skills" 
            dataKey="Candidate" 
            stroke="#818cf8" 
            fill="url(#candidateGlow)" 
            strokeWidth={isMini ? 1.5 : 2}
          />
          <Radar 
            name="Job Demands" 
            dataKey="Required" 
            stroke="#22d3ee" 
            fill="url(#requiredGlow)" 
            strokeWidth={isMini ? 1 : 1.5}
            strokeDasharray={isMini ? "" : "4 4"}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChartComponent;
