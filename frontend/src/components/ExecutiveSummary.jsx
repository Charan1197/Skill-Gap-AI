import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, AlertTriangle, Compass, Heart } from 'lucide-react';

const ExecutiveSummary = ({ gaps, scores }) => {
  if (!gaps || !scores) return null;

  // Extract matched and missing skill lists dynamically for human explanation
  const matchedTech = gaps.technical_skills?.filter(s => s.status === 'matched').map(s => s.name) || [];
  const matchedTools = gaps.tools?.filter(s => s.status === 'matched').map(s => s.name) || [];
  const allMatched = [...matchedTech, ...matchedTools];

  const missingTech = gaps.technical_skills?.filter(s => s.status === 'missing').map(s => s.name) || [];
  const missingTools = gaps.tools?.filter(s => s.status === 'missing').map(s => s.name) || [];
  const allMissing = [...missingTech, ...missingTools];

  // Empathy coaching recommendations based on overall percentage
  const getEmpathyMessage = (percentage) => {
    if (percentage >= 80) {
      return {
        title: "Excellent Profile Alignment!",
        desc: "You are an outstanding fit for this role. You already possess the majority of required skill sets. Closing the minor gaps listed below will make you an absolute top-tier applicant.",
        color: "border-emerald-500/20 bg-emerald-950/10 text-emerald-400"
      };
    } else if (percentage >= 55) {
      return {
        title: "Solid Foundations Built",
        desc: "You have a very strong core engineering foundation. While there is a transition gap to reach the targeted seniority level, it is highly manageable with a focused learning effort over the next few weeks.",
        color: "border-indigo-500/20 bg-indigo-950/15 text-indigo-300"
      };
    } else {
      return {
        title: "Growth Opportunities Identified",
        desc: "This role represents a significant career advancement opportunity for you. By dedicating structured time to the roadmap below, you can systematically bridge these gaps and prepare yourself for high-level engineering interviews.",
        color: "border-amber-500/20 bg-amber-950/10 text-amber-400"
      };
    }
  };

  const empathy = getEmpathyMessage(scores.overall);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden text-left border border-white/10"
    >
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-indigo-500/5 blur-[80px] rounded-full -z-10" />

      {/* Header */}
      <div className="flex items-center gap-2.5 mb-6 border-b border-white/5 pb-4">
        <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-white tracking-tight">Executive Career Assessment</h3>
          <p className="text-[11px] text-slate-400">Empathy-driven career assessment decoded for human understanding</p>
        </div>
      </div>

      {/* 3-Column Strengths vs Gaps Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1: Empathy Card */}
        <div className={`border rounded-2xl p-5 flex flex-col justify-start relative overflow-hidden leading-relaxed text-xs sm:text-sm ${empathy.color}`}>
          <div className="font-extrabold flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-indigo-400 text-indigo-400" />
            </div>
            <span>{empathy.title}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {empathy.desc}
          </p>
        </div>

        {/* Column 2: What You Have */}
        <div className="space-y-3 bg-[#080710]/40 border border-white/5 rounded-2xl p-5">
          <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            WHAT YOU HAVE (YOUR ASSETS)
          </h4>
          <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
            Your profile demonstrates outstanding capability in these areas. You will easily handle day-to-day responsibilities relating to:
          </p>
          <div className="flex flex-wrap gap-1.5 pt-2">
            {allMatched.length > 0 ? (
              allMatched.slice(0, 5).map((skill, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 capitalize">
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-[11px] text-slate-500 italic">No exact matched skills found. Ready to grow!</span>
            )}
            {allMatched.length > 5 && (
              <span className="text-[10px] text-slate-500 self-center font-bold pl-1">
                +{allMatched.length - 5} more
              </span>
            )}
          </div>
        </div>

        {/* Column 3: What You Lack */}
        <div className="space-y-3 bg-[#080710]/40 border border-white/5 rounded-2xl p-5">
          <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-indigo-400" />
            WHAT YOU LACK (YOUR FOCUS AREAS)
          </h4>
          <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
            To unlock senior proficiency, you should focus on learning these competencies. The hiring team is seeking:
          </p>
          <div className="flex flex-wrap gap-1.5 pt-2">
            {allMissing.length > 0 ? (
              allMissing.slice(0, 5).map((skill, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 capitalize">
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-[11px] text-slate-500 italic">No missing critical skills! Excellent work.</span>
            )}
            {allMissing.length > 5 && (
              <span className="text-[10px] text-slate-500 self-center font-bold pl-1">
                +{allMissing.length - 5} key items
              </span>
            )}
          </div>
        </div>

      </div>

      {/* Quick Action Plan Tip */}
      <div className="mt-6 flex items-start gap-2.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-slate-400 leading-relaxed">
        <Compass className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-300">Your Action Plan:</span> Simply tackle the 4-week timeline below. It isolates these exact missing modules, outlines achievable tasks, and links directly to free high-quality learning resources to bridge your overall match difference.
        </div>
      </div>

    </motion.div>
  );
};

export default ExecutiveSummary;
