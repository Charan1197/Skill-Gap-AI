import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, XCircle, Award, Wrench, Users } from 'lucide-react';

const SkillGaps = ({ gaps }) => {
  if (!gaps) return null;

  // Calculates match ratios
  const getCategoryStats = (skillsList) => {
    if (!skillsList || skillsList.length === 0) return { matched: 0, total: 0, percentage: 0 };
    const total = skillsList.length;
    const matched = skillsList.filter(s => s.status === 'matched').length;
    const partial = skillsList.filter(s => s.status === 'partial').length;
    // Partial counts as half match for metric convenience
    const score = matched + (partial * 0.5);
    const percentage = Math.round((score / total) * 100);
    return { matched, total, percentage };
  };

  const categories = [
    {
      title: "Technical Skills",
      icon: <Award className="w-4 h-4 text-indigo-400" />,
      skills: gaps.technical_skills || [],
      stats: getCategoryStats(gaps.technical_skills)
    },
    {
      title: "DevOps & Tools",
      icon: <Wrench className="w-4 h-4 text-purple-400" />,
      skills: gaps.tools || [],
      stats: getCategoryStats(gaps.tools)
    },
    {
      title: "Soft Skills",
      icon: <Users className="w-4 h-4 text-cyan-400" />,
      skills: gaps.soft_skills || [],
      stats: getCategoryStats(gaps.soft_skills)
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'matched':
        return <CheckCircle2 className="w-3.5 h-3.5 mr-1 shrink-0" />;
      case 'partial':
        return <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />;
      case 'missing':
      default:
        return <XCircle className="w-3.5 h-3.5 mr-1 shrink-0" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'matched':
        return 'badge-match';
      case 'partial':
        return 'badge-partial';
      case 'missing':
      default:
        return 'badge-missing';
    }
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
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >

      <div className="space-y-4">
        {categories.map((cat, idx) => (
          <motion.div 
            key={idx}
            variants={cardVariants}
            className="glass-panel rounded-2xl p-5 border border-white/5 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  {cat.icon}
                </div>
                <h4 className="font-display text-sm font-bold text-slate-200">{cat.title}</h4>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-slate-400">
                  {cat.stats.matched} / {cat.stats.total} Alignments
                </span>
                
                {/* Visual mini progress track */}
                <div className="w-16 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" 
                    style={{ width: `${cat.stats.percentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Staggered badge layout */}
            <div className="flex flex-wrap gap-2.5">
              {cat.skills.length > 0 ? (
                cat.skills.map((skill, sIdx) => (
                  <motion.span
                    key={sIdx}
                    whileHover={{ scale: 1.04, y: -1 }}
                    className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold select-none capitalize transition-shadow shadow-sm hover:shadow-md cursor-default ${getStatusClass(skill.status)}`}
                  >
                    {getStatusIcon(skill.status)}
                    {skill.name}
                  </motion.span>
                ))
              ) : (
                <span className="text-xs text-slate-500 italic">No skills extracted for this category.</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillGaps;
