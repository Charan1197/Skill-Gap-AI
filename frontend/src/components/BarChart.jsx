import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BarChartComponent = ({ scores }) => {
  if (!scores) return null;

  const data = [
    { category: "Technical", score: scores.technical },
    { category: "Tools & DevOps", score: scores.tools },
    { category: "Soft Skills", score: scores.soft_skills },
  ];

  // Beautiful custom glass tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel border border-white/10 rounded-xl p-3 shadow-xl backdrop-blur-md">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{payload[0].payload.category}</p>
          <p className="text-sm font-extrabold text-white">
            Score Index: <span className="text-indigo-400">{payload[0].value}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[180px]">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
          <defs>
            <linearGradient id="barGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.85} />
              <stop offset="100%" stopColor="#a855f7" stopOpacity={0.15} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.03)" vertical={false} />
          <XAxis 
            dataKey="category" 
            stroke="rgba(255, 255, 255, 0.3)" 
            tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 10, fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            domain={[0, 100]} 
            stroke="rgba(255, 255, 255, 0.3)"
            tick={{ fill: 'rgba(255, 255, 255, 0.4)', fontSize: 9 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.02)', radius: 8 }} />
          <Bar 
            dataKey="score" 
            fill="url(#barGlow)" 
            radius={[8, 8, 0, 0]}
            maxBarSize={45}
            stroke="#818cf8"
            strokeWidth={1}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
