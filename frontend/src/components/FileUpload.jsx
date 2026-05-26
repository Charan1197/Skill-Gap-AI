import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileUp, FileText, CheckCircle, Trash2, ArrowRight } from 'lucide-react';

const FileUpload = ({ onAnalyze, isLoading, demoActive }) => {
  const [resume, setResume] = useState(null);
  const [jd, setJd] = useState(null);
  const [dragResume, setDragResume] = useState(false);
  const [dragJd, setDragJd] = useState(false);

  const resumeInputRef = useRef(null);
  const jdInputRef = useRef(null);

  // File size format utility
  const formatBytes = (bytes, decimals = 2) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const handleDrag = (e, type, isOver) => {
    e.preventDefault();
    e.stopPropagation();
    if (type === 'resume') {
      setDragResume(isOver);
    } else {
      setDragJd(isOver);
    }
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    if (type === 'resume') {
      setDragResume(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type === 'application/pdf') {
        setResume(file);
      }
    } else {
      setDragJd(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type === 'application/pdf') {
        setJd(file);
      }
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      if (type === 'resume') {
        setResume(file);
      } else {
        setJd(file);
      }
    }
  };

  const triggerInput = (type) => {
    if (type === 'resume') {
      resumeInputRef.current.click();
    } else {
      jdInputRef.current.click();
    }
  };

  const handleRemove = (e, type) => {
    e.stopPropagation();
    if (type === 'resume') {
      setResume(null);
      if (resumeInputRef.current) resumeInputRef.current.value = '';
    } else {
      setJd(null);
      if (jdInputRef.current) jdInputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    if (resume && jd) {
      onAnalyze(resume, jd);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto space-y-10">
      {/* Symmetrical Behind-the-Cards Ambient Lights */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden rounded-3xl">
        {/* Left Side Glow */}
        <div className="absolute top-[10%] left-[10%] w-[320px] h-[220px] rounded-full bg-cyan-500/4 blur-[90px]" />
        {/* Right Side Glow */}
        <div className="absolute bottom-[10%] right-[10%] w-[320px] h-[220px] rounded-full bg-purple-500/4 blur-[90px]" />
        {/* Center Connecting Glow */}
        <div className="absolute top-[30%] left-[30%] w-[380px] h-[180px] rounded-full bg-indigo-500/3 blur-[100px]" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
      >
        {/* Card 1: Resume Upload */}
        <motion.div 
          variants={itemVariants}
          onClick={() => !resume && triggerInput('resume')}
          onDragOver={(e) => handleDrag(e, 'resume', true)}
          onDragLeave={(e) => handleDrag(e, 'resume', false)}
          onDrop={(e) => handleDrop(e, 'resume')}
          className={`relative group rounded-3xl p-8 cursor-pointer flex flex-col items-center justify-center text-center glass-card-premium min-h-[285px] border border-dashed transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(99,102,241,0.1)] ${
            resume 
              ? 'border-indigo-500/30 bg-indigo-950/10 shadow-[0_0_20px_rgba(99,102,241,0.1)]' 
              : dragResume 
                ? 'border-indigo-400 bg-indigo-500/15 shadow-xl shadow-indigo-500/10 scale-[1.01]' 
                : 'border-white/10 hover:border-indigo-500/25'
          }`}
        >
          {/* Invisible input file */}
          <input 
            type="file" 
            ref={resumeInputRef} 
            onChange={(e) => handleFileChange(e, 'resume')}
            accept=".pdf"
            className="hidden" 
          />

          <AnimatePresence mode="wait">
            {resume ? (
              <motion.div 
                key="resume-selected"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="space-y-4 w-full flex flex-col items-center"
              >
                <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-400/20 text-indigo-400 shadow-inner">
                  <FileText className="w-8 h-8" />
                  <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 border-2 border-[#030014]">
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                  </span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-slate-200 text-sm truncate max-w-[240px]">{resume.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">{formatBytes(resume.size)} • PDF Format</p>
                </div>
                <button
                  onClick={(e) => handleRemove(e, 'resume')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/30 transition-all cursor-pointer mt-2"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove File
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="resume-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 group-hover:text-indigo-400 text-slate-400 transition-all">
                  <FileUp className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-slate-200 text-base">Your Resume</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-[200px] mx-auto leading-relaxed">
                    Drag and drop your professional resume, or <span className="text-indigo-400 font-semibold group-hover:underline">browse files</span>
                  </p>
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-600 tracking-wider">
                  Supports PDF only (Max 5MB)
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Card 2: Job Description Upload */}
        <motion.div 
          variants={itemVariants}
          onClick={() => !jd && triggerInput('jd')}
          onDragOver={(e) => handleDrag(e, 'jd', true)}
          onDragLeave={(e) => handleDrag(e, 'jd', false)}
          onDrop={(e) => handleDrop(e, 'jd')}
          className={`relative group rounded-3xl p-8 cursor-pointer flex flex-col items-center justify-center text-center glass-card-premium min-h-[285px] border border-dashed transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(99,102,241,0.1)] ${
            jd 
              ? 'border-indigo-500/30 bg-indigo-950/10 shadow-[0_0_20px_rgba(99,102,241,0.1)]' 
              : dragJd 
                ? 'border-indigo-400 bg-indigo-500/15 shadow-xl shadow-indigo-500/10 scale-[1.01]' 
                : 'border-white/10 hover:border-indigo-500/25'
          }`}
        >
          {/* Invisible input file */}
          <input 
            type="file" 
            ref={jdInputRef} 
            onChange={(e) => handleFileChange(e, 'jd')}
            accept=".pdf"
            className="hidden" 
          />

          <AnimatePresence mode="wait">
            {jd ? (
              <motion.div 
                key="jd-selected"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="space-y-4 w-full flex flex-col items-center"
              >
                <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-400/20 text-indigo-400 shadow-inner">
                  <FileText className="w-8 h-8" />
                  <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 border-2 border-[#030014]">
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                  </span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-slate-200 text-sm truncate max-w-[240px]">{jd.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">{formatBytes(jd.size)} • PDF Format</p>
                </div>
                <button
                  onClick={(e) => handleRemove(e, 'jd')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/30 transition-all cursor-pointer mt-2"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove File
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="jd-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 group-hover:text-indigo-400 text-slate-400 transition-all">
                  <FileUp className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-slate-200 text-base">Job Description</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-[200px] mx-auto leading-relaxed">
                    Drag and drop target job description PDF, or <span className="text-indigo-400 font-semibold group-hover:underline">browse files</span>
                  </p>
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-600 tracking-wider">
                  Supports PDF only (Max 5MB)
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* "Roadmap Ready" Bottom Right Floating Chip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 0 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -4, 0],
          boxShadow: [
            "0 0 10px rgba(34,211,238,0.15)",
            "0 0 20px rgba(34,211,238,0.3)",
            "0 0 10px rgba(34,211,238,0.15)"
          ]
        }}
        transition={{
          opacity: { duration: 0.4, delay: 0.6 },
          scale: { duration: 0.4, delay: 0.6 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute -bottom-4 right-2 z-10 flex items-center gap-1.5 px-3 py-1 bg-cyan-950/30 border border-cyan-400/30 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.15)] select-none backdrop-blur-md"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400"></span>
        </span>
        <span className="text-[9px] font-bold text-cyan-300 uppercase tracking-widest">Roadmap Ready</span>
      </motion.div>

      {/* Main Analysis trigger CTA */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col items-center justify-center gap-4 pt-4"
      >
        <button
          onClick={handleSubmit}
          disabled={!resume || !jd || isLoading}
          className={`group relative flex items-center gap-2.5 px-10 py-4.5 rounded-2xl text-sm font-bold tracking-wider transition-all duration-500 overflow-hidden ${
            resume && jd 
              ? 'text-white cursor-pointer border border-cyan-400/30 shadow-[0_4px_20px_rgba(99,102,241,0.15)]' 
              : 'bg-white/5 border border-white/10 text-slate-500 cursor-not-allowed'
          }`}
        >
          {resume && jd ? (
            <>
              {/* Static / Default state background */}
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 transition-opacity duration-500 group-hover:opacity-0" />
              {/* Animated hover gradient sweep background */}
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 bg-[length:200%_auto] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-text-shine" />
              {/* High intensity glowing ambient neon ring behind button on hover */}
              <span className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 blur-xl opacity-0 group-hover:opacity-60 -z-10 transition-all duration-500 group-hover:scale-105" />
            </>
          ) : null}
          <span className="relative z-10 flex items-center gap-2 select-none">
            Analyze Skill Match
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </span>
        </button>
        
        {demoActive && (
          <p className="text-slate-500 text-[11px] font-semibold italic animate-pulse">
            Hackathon local mock mode active - instant analysis will trigger.
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default FileUpload;
