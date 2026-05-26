import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Calendar, CheckCircle2, Circle, ExternalLink, BookOpen, CheckSquare, ChevronDown } from 'lucide-react';

const RoapMap = ({ roadmap }) => {
  if (!roadmap || !roadmap.weeks) return null;

  // Initialize checklist state
  const [checkedTasks, setCheckedTasks] = useState({});
  // Initialize collapsible week state (keep the 1st week expanded by default)
  const [expandedWeeks, setExpandedWeeks] = useState({ 0: true });

  const totalTasks = roadmap.weeks.reduce((acc, week) => acc + (week.tasks?.length || 0), 0);
  const completedTasks = Object.values(checkedTasks).filter(Boolean).length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const toggleTask = (taskId, e) => {
    e.stopPropagation(); // Avoid triggering week collapse toggling
    setCheckedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const toggleWeek = (wIdx) => {
    setExpandedWeeks(prev => ({
      ...prev,
      [wIdx]: !prev[wIdx]
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90 } }
  };

  return (
    <div className="space-y-6">
      {/* Header with completion meter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/5">
        <div>
          <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400 animate-pulse" />
            Personalized Growth Roadmap
          </h3>
          <p className="text-xs text-slate-400 mt-1">A detailed 4-week learning curriculum designed to bridge extracted gaps</p>
        </div>

        {/* Dynamic Progress Widget */}
        <div className="glass-panel border border-white/10 rounded-2xl p-3 flex items-center gap-4 min-w-[220px]">
          <div className="relative w-11 h-11 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <circle
                className="stroke-white/5"
                strokeWidth="3.5"
                fill="none"
                cx="18"
                cy="18"
                r="15.915"
              />
              <motion.circle
                className="stroke-indigo-400"
                strokeDasharray={`${progressPercentage}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                cx="18"
                cy="18"
                r="15.915"
                initial={{ strokeDasharray: "0, 100" }}
                animate={{ strokeDasharray: `${progressPercentage}, 100` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </svg>
            <span className="absolute text-[9.5px] font-extrabold text-white">{progressPercentage}%</span>
          </div>

          <div className="flex-1 text-left">
            <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Overall Progress</div>
            <div className="text-xs font-extrabold text-white mt-0.5">
              {completedTasks} <span className="text-slate-500">/</span> {totalTasks} Tasks Done
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Week Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative border-l border-indigo-500/10 ml-2.5 md:ml-3 pl-5 md:pl-7 space-y-6 py-1"
      >
        {roadmap.weeks.map((week, wIdx) => {
          const weekTasks = week.tasks || [];
          const weekDoneCount = weekTasks.filter(t => checkedTasks[t.id]).length;
          const isWeekFullyDone = weekTasks.length > 0 && weekDoneCount === weekTasks.length;
          const isOpen = !!expandedWeeks[wIdx];

          return (
            <motion.div 
              key={wIdx}
              variants={cardVariants}
              className="relative group text-left"
            >
              {/* Dot Icon indicator on timeline border */}
              <div 
                onClick={() => toggleWeek(wIdx)}
                className={`absolute left-0 -translate-x-1/2 top-2.5 w-5 h-5 rounded-full border-[3px] flex items-center justify-center transition-all duration-300 z-10 cursor-pointer ${
                  isWeekFullyDone 
                    ? 'bg-indigo-500 border-indigo-400 text-white scale-110 shadow-md shadow-indigo-500/20' 
                    : weekDoneCount > 0 
                      ? 'bg-[#030014] border-indigo-400 text-indigo-400' 
                      : 'bg-[#030014] border-slate-700 text-slate-600 group-hover:border-slate-500'
                }`}
              >
                {isWeekFullyDone ? (
                  <CheckCircle2 className="w-3 h-3" />
                ) : (
                  <div className="w-1 h-1 rounded-full bg-current" />
                )}
              </div>

              {/* Glowing Background Ring on Hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

              <div className="space-y-3 bg-white/[0.01] border border-white/5 hover:border-white/10 rounded-2xl p-4 md:p-5 transition-all duration-300 shadow-sm relative">
                
                {/* Collapsible Header Area */}
                <div 
                  onClick={() => toggleWeek(wIdx)}
                  className="flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-extrabold uppercase text-indigo-400 tracking-widest">Growth Plan</span>
                    <h4 className="font-display text-sm md:text-base font-extrabold text-white mt-0.5 group-hover:text-indigo-300 transition-colors flex items-center gap-2">
                      <ReactMarkdown 
                        components={{
                          p: ({node, ...props}) => <span {...props} />,
                          strong: ({node, ...props}) => <strong className="font-bold text-indigo-300" {...props} />
                        }}
                      >
                        {week.week}
                      </ReactMarkdown>
                    </h4>
                  </div>
                  
                  <div className="flex items-center gap-3 shrink-0">
                    {weekTasks.length > 0 && (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-slate-400">
                        {weekDoneCount} / {weekTasks.length} Checked
                      </span>
                    )}
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-400' : 'rotate-0'}`} />
                  </div>
                </div>

                {/* Collapsible Week Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden space-y-3 pt-3 border-t border-white/5"
                    >
                      {/* Objective */}
                      <div className="text-xs text-slate-400 leading-relaxed text-left max-w-3xl">
                        <ReactMarkdown 
                          components={{
                            strong: ({node, ...props}) => <strong className="font-bold text-indigo-300 bg-indigo-500/5 px-1 py-0.5 rounded" {...props} />,
                            a: ({node, ...props}) => <a className="text-indigo-400 hover:text-indigo-300 underline font-semibold transition-colors" target="_blank" rel="noreferrer" {...props} />
                          }}
                        >
                          {week.objective}
                        </ReactMarkdown>
                      </div>

                      {/* Checkbox tasks list */}
                      {weekTasks.length > 0 && (
                        <div className="bg-white/5 border border-white/5 rounded-xl p-3 md:p-4 space-y-2.5 text-left">
                          <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                            <CheckSquare className="w-3 h-3 text-slate-500" />
                            Actionable Milestones
                          </div>
                          
                          {weekTasks.map((task) => (
                            <div 
                              key={task.id}
                              onClick={(e) => toggleTask(task.id, e)}
                              className={`flex items-start gap-3 p-2 rounded-lg border transition-all cursor-pointer select-none ${
                                checkedTasks[task.id]
                                  ? 'bg-indigo-500/5 border-indigo-500/20 text-slate-300'
                                  : 'bg-transparent border-transparent hover:bg-white/5 text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              <button className="mt-0.5 shrink-0 transition-transform active:scale-95">
                                {checkedTasks[task.id] ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 fill-indigo-500/5" />
                                ) : (
                                  <Circle className="w-3.5 h-3.5 text-slate-600 hover:text-slate-500" />
                                )}
                              </button>
                              
                              <span className={`text-xs leading-relaxed transition-all ${checkedTasks[task.id] ? 'line-through opacity-50 text-slate-500' : ''}`}>
                                <ReactMarkdown 
                                  components={{
                                    p: ({node, ...props}) => <span {...props} />,
                                    strong: ({node, ...props}) => <strong className="font-bold text-indigo-300 bg-indigo-500/5 px-1 py-0.5 rounded" {...props} />,
                                    a: ({node, ...props}) => <a className="text-indigo-400 hover:text-indigo-300 underline font-semibold transition-colors" target="_blank" rel="noreferrer" {...props} />
                                  }}
                                >
                                  {task.text}
                                </ReactMarkdown>
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Resources chips links */}
                      {week.resources && week.resources.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 text-left pt-1">
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-slate-500 uppercase tracking-widest mr-1">
                            <BookOpen className="w-3 h-3 text-slate-500" />
                            Study Guides:
                          </span>
                          
                          {week.resources.map((res, rIdx) => (
                            <a
                              key={rIdx}
                              href={res.url}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/25 hover:text-indigo-400 text-slate-300 transition-all shadow-inner cursor-pointer"
                            >
                              <ReactMarkdown 
                                components={{
                                  p: ({node, ...props}) => <span {...props} />,
                                  strong: ({node, ...props}) => <strong className="font-bold" {...props} />
                                }}
                              >
                                {res.label}
                              </ReactMarkdown>
                              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                            </a>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default RoapMap;
