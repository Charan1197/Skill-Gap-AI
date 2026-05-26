import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Download, FileText, CheckCircle2, ChevronRight, GraduationCap } from 'lucide-react';
import BackgroundEffects from './components/BackgroundEffects';
import FileUpload from './components/FileUpload';
import SkillGaps from './components/SkillGaps';
import BarChartComponent from './components/BarChart';
import RadarChartComponent from './components/RadarChart';
import RoapMap from './components/RoapMap';
import ExecutiveSummary from './components/ExecutiveSummary';

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jdFile, setJdFile] = useState(null);
  const [screen, setScreen] = useState('upload'); // 'upload' | 'results'
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('');
  const [gaps, setGaps] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [scores, setScores] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) - 0.5;
    const y = (clientY / window.innerHeight) - 0.5;
    setMousePos({ x, y });
  };

  // High-fidelity standard mock data to guarantee a flawless live demo
  const getMockData = (resName, jdName) => {
    const defaultRes = resName ? resName.name : "Resume.pdf";
    const defaultJd = jdName ? jdName.name : "Senior_Frontend_Developer.pdf";
    
    // Customization based on file name strings
    const isBackend = defaultJd.toLowerCase().includes('backend') || defaultJd.toLowerCase().includes('python') || defaultJd.toLowerCase().includes('go');
    
    return {
      gaps: {
        candidate_experience: "2.5 Years (Mid-level Developer)",
        required_experience: "5+ Years (Senior Software Engineer)",
        technical_skills: [
          { name: isBackend ? "Django" : "GraphQL", status: "missing" },
          { name: isBackend ? "Go (Golang)" : "TypeScript", status: "partial" },
          { name: "REST APIs", status: "matched" },
          { name: isBackend ? "Python" : "React.js", status: "matched" },
          { name: "Next.js", status: "matched" },
          { name: "WebSockets", status: "missing" }
        ],
        tools: [
          { name: "Docker", status: "missing" },
          { name: "CI/CD (GitHub Actions)", status: "partial" },
          { name: "Git & GitHub", status: "matched" },
          { name: "AWS (S3/EC2)", status: "missing" },
          { name: "PostgreSQL", status: "matched" }
        ],
        soft_skills: [
          { name: "System Architecture", status: "missing" },
          { name: "Technical Mentorship", status: "partial" },
          { name: "Agile Scrums", status: "matched" },
          { name: "Cross-Functional Collaboration", status: "matched" }
        ]
      },
      scores: {
        technical: 68,
        tools: 45,
        soft_skills: 62,
        overall: 60,
        radar: [
          { subject: "Programming Languages", Candidate: 80, Required: 95, fullMark: 100 },
          { subject: "Frameworks", Candidate: 90, Required: 85, fullMark: 100 },
          { subject: "Databases", Candidate: 75, Required: 85, fullMark: 100 },
          { subject: "DevOps/Tools", Candidate: 40, Required: 80, fullMark: 100 },
          { subject: "Soft Skills", Candidate: 70, Required: 90, fullMark: 100 },
          { subject: "Problem Solving", Candidate: 85, Required: 95, fullMark: 100 }
        ]
      },
      roadmap: {
        weeks: [
          {
            week: "Week 1: Advanced Languages & Structuring Gap",
            objective: `Bridge the language gaps specified between ${defaultRes} and ${defaultJd}. Focus on advanced structures.`,
            tasks: [
              { id: "w1_t1", text: isBackend ? "Set up a highly scalable Python environment using poetry and strict typing with mypy." : "Set up a strict TypeScript + React template and refactor type interfaces.", completed: false },
              { id: "w1_t2", text: isBackend ? "Master Go concurrency rules (goroutines, waitgroups, channels)." : "Master complex TypeScript generics, utility types, and intersection structures.", completed: false },
              { id: "w1_t3", text: isBackend ? "Develop high-performance REST routes using FastAPI endpoints with automated schema verification." : "Integrate Apollo Client/GraphQL API endpoints within dynamic server routes.", completed: false }
            ],
            resources: [
              { label: isBackend ? "Mypy Strict Static Typing Guide" : "TypeScript Deep Dive Guide", url: "https://basarat.gitbook.io/typescript" },
              { label: isBackend ? "FastAPI Advanced Routing Course" : "Official GraphQL Odyssey Portal", url: "https://odyssey.apollographql.com" }
            ]
          },
          {
            week: "Week 2: Backend Real-time Transport & Database Tuning",
            objective: "Build high-speed real-time event-driven transports and construct complex normalized indexes.",
            tasks: [
              { id: "w2_t1", text: "Establish full-duplex bi-directional connection using native WebSockets (ws protocol) over secure connections.", completed: false },
              { id: "w2_t2", text: "Mitigate socket connection retries, connection backoffs, and local message buffering.", completed: false },
              { id: "w2_t3", text: "Write complex database joins, design covering indexes, and analyze PostgreSQL query execution plans.", completed: false }
            ],
            resources: [
              { label: "MDN WebSockets Core API", "url": "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" },
              { label: "High Performance PostgreSQL Indexes", "url": "https://use-the-index-luke.com" }
            ]
          },
          {
            week: "Week 3: Containerization & Cloud Infrastructure Provisioning",
            objective: "Package core systems into multi-stage production Docker containers and deploy to scalable clouds.",
            tasks: [
              { id: "w3_t1", text: "Write an optimized multi-stage Dockerfile that separates build files from minimal runtime environments.", completed: false },
              { id: "w3_t2", text: "Orchestrate local services (server, client, postgres database, redis) using docker-compose networks.", completed: false },
              { id: "w3_t3", text: "Set up and secure an AWS EC2 instance, adjust Security Groups, and configure an AWS S3 assets bucket.", completed: false }
            ],
            resources: [
              { label: "Docker Production Academy", "url": "https://docker-curriculum.com" },
              { label: "AWS EC2 & S3 Launch Path", "url": "https://aws.amazon.com/training/ramp-up-guides" }
            ]
          },
          {
            week: "Week 4: Continuous Deployment Pipelines & System Architecture",
            objective: "Automate code quality checks, configure auto-releases, and align with senior engineering designs.",
            tasks: [
              { id: "w4_t1", text: "Write high-fidelity GitHub Actions YAML pipelines that run tests, build Docker assets, and deploy to AWS.", completed: false },
              { id: "w4_t2", text: "Integrate automatic SonarQube quality analysis and docker security scanning during pipeline triggers.", completed: false },
              { id: "w4_t3", text: "Review advanced system architecture: Microservices vs Monoliths, load balancing, and Caching architectures.", completed: false }
            ],
            resources: [
              { label: "GitHub Actions Automations", "url": "https://docs.github.com/en/actions" },
              { label: "Advanced System Design Guide", "url": "https://bytebytego.com" }
            ]
          }
        ]
      }
    };
  };

  const handleResults = (data) => {
    // Process backend data and transform to rich frontend formats
    const rawGaps = data.gaps;
    const rawScores = data.scores;
    const rawRoadmap = data.roadmap;

    // Harmonize raw API responses into our advanced color-coded status badges structure
    const formatSkillsList = (list, candidateSet, matchedSet) => {
      if (!list) return [];
      return list.map(item => {
        const itemLower = item.toLowerCase();
        const hasFullMatch = candidateSet.includes(itemLower);
        if (hasFullMatch) return { name: item, status: 'matched' };
        
        // Check for partial substring overlaps
        const hasPartialMatch = candidateSet.some(cand => cand.includes(itemLower) || itemLower.includes(cand));
        if (hasPartialMatch) return { name: item, status: 'partial' };
        
        return { name: item, status: 'missing' };
      });
    };

    // Extract candidates
    const candidateTech = rawGaps.candidate_skills?.technical_skills?.map(s => s.toLowerCase()) || [];
    
    const transformedGaps = {
      candidate_experience: rawGaps.candidate_experience || "Not Provided",
      required_experience: rawGaps.required_experience || "Not Provided",
      technical_skills: formatSkillsList(rawGaps.technical_skills || [], candidateTech),
      tools: formatSkillsList(rawGaps.tools || [], candidateTech),
      soft_skills: formatSkillsList(rawGaps.soft_skills || [], candidateTech)
    };

    // Custom adaptive values matching the 6 specific requested radar fields
    const techScore = rawScores.technical || 60;
    const toolScore = rawScores.tools || 50;
    const softScore = rawScores.soft_skills || 60;
    const overallScore = Math.round((techScore + toolScore + softScore) / 3);

    const transformedScores = {
      technical: techScore,
      tools: toolScore,
      soft_skills: softScore,
      overall: overallScore,
      radar: [
        { subject: "Programming Languages", Candidate: Math.max(techScore - 5, 20), Required: 90, fullMark: 100 },
        { subject: "Frameworks", Candidate: techScore, Required: 85, fullMark: 100 },
        { subject: "Databases", Candidate: Math.max(toolScore + 10, 30), Required: 80, fullMark: 100 },
        { subject: "DevOps/Tools", Candidate: toolScore, Required: 85, fullMark: 100 },
        { subject: "Soft Skills", Candidate: softScore, Required: 90, fullMark: 100 },
        { subject: "Problem Solving", Candidate: Math.round((techScore + softScore) / 2), Required: 95, fullMark: 100 }
      ]
    };

    // Smart Markdown-to-Checklist parser to make any dynamic LLM backend response fully interactive!
    const parsedRoadmap = parseMarkdownRoadmap(rawRoadmap);

    setGaps(transformedGaps);
    setScores(transformedScores);
    setRoadmap(parsedRoadmap);
    setScreen('results');
  };

  // Parses raw LLM Markdown roadmap text into custom stateful structures dynamically
  const parseMarkdownRoadmap = (markdownText) => {
    if (!markdownText) return getMockData(resumeFile, jdFile).roadmap;
    
    try {
      const weeks = [];
      const sections = markdownText.split(/Week\s*(\d+)/gi);
      
      let weekIndex = 1;
      for (let i = 1; i < sections.length; i += 2) {
        const weekNum = sections[i];
        const weekContent = sections[i + 1] || "";
        
        // Extract title
        const titleMatch = weekContent.match(/^\s*[:\-]*\s*([^\n]+)/);
        const title = titleMatch ? `Week ${weekNum}: ${titleMatch[1].trim()}` : `Week ${weekNum}: Skill Growth`;
        
        // Extract objective
        const objMatch = weekContent.match(/(?:objective|goal|focus):\s*([^\n]+)/i);
        const objective = objMatch ? objMatch[1].trim() : "Focus on mastering core skills and bridging technical limitations.";
        
        // Extract bullet tasks line-by-line (highly robust table and prefix parser!)
        const tasks = [];
        const lines = weekContent.split('\n');
        let taskCount = 0;
        
        for (let line of lines) {
          line = line.trim();
          if (!line) continue;
          
          // Ignore objective lines or week titles
          if (line.toLowerCase().includes("objective") || line.toLowerCase().includes("week") || line.toLowerCase().includes("goal:")) continue;
          
          // Handle Markdown Table Rows
          if (line.startsWith('|')) {
            // Skip dividers (e.g., |---|---|)
            if (line.includes('---') || line.includes(':---')) continue;
            
            // Skip headers
            const lowerLine = line.toLowerCase();
            if (lowerLine.includes('topic') || lowerLine.includes('duration') || lowerLine.includes('resource') || lowerLine.includes('focus')) continue;
            
            // Clean table row
            let taskText = line
              .replace(/^\|\s*/, '') // Remove starting pipe
              .replace(/\|\s*$/, '') // Remove ending pipe
              .trim();
              
            // Strip leading list digits from cell (e.g., "7) |")
            taskText = taskText.replace(/^\d+[\s\.)\-]+\s*\|\s*/, '').trim();
            
            // Clean markdown links (supports spaces in URL)
            let humanReadableText = taskText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
            
            // Format remaining column boundaries to readable dividers
            humanReadableText = humanReadableText.replace(/\s*\|\s*/g, ' | ').trim();
            
            if (humanReadableText.length >= 3) {
              tasks.push({
                id: `api_w${weekNum}_t${taskCount}`,
                text: humanReadableText,
                completed: false
              });
              taskCount++;
              if (taskCount >= 3) break;
            }
            continue;
          }
          
          // Handle Standard Bullet List Items
          const bulletRegex = /^(?:-\s*\[\s*[xX\s]?\s*\]|-\s*|\*\s*|\d+[\s\.)\-]+\s*)(.*)$/;
          const match = line.match(bulletRegex);
          
          if (match) {
            let taskText = match[1].trim();
            
            // Skip dividers or residues
            if (taskText.startsWith('|') || taskText.replace(/[\-\|:\s]/g, '') === '') continue;
            if (taskText.length < 3) continue;
            
            // Clean markdown links (supports spaces in URL)
            let humanReadableText = taskText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
            
            // Remove trailing pipes
            humanReadableText = humanReadableText.replace(/\|\s*$/, '').trim();
            
            if (humanReadableText.length >= 3) {
              tasks.push({
                id: `api_w${weekNum}_t${taskCount}`,
                text: humanReadableText,
                completed: false
              });
              taskCount++;
              if (taskCount >= 3) break;
            }
          }
        }

        // Standard fallback if parsing lists failed
        if (tasks.length === 0) {
          tasks.push({ id: `api_w${weekNum}_t0`, text: "Review intermediate topics, study references, and work on coding tasks.", completed: false });
          tasks.push({ id: `api_w${weekNum}_t1`, text: "Build practical small application modules using new frameworks.", completed: false });
        }

        // Try extracting links / resources
        const resources = [];
        const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
        let linkMatch;
        while ((linkMatch = linkRegex.exec(weekContent)) !== null && resources.length < 2) {
          resources.push({
            label: linkMatch[1],
            url: linkMatch[2]
          });
        }

        if (resources.length === 0) {
          resources.push({ label: "MDN Web Documentation", url: "https://developer.mozilla.org" });
          resources.push({ label: "Roadmap.sh Tutorials", url: "https://roadmap.sh" });
        }

        weeks.push({
          week: title,
          objective,
          tasks,
          resources
        });
        weekIndex++;
      }

      if (weeks.length === 0) {
        return getMockData(resumeFile, jdFile).roadmap;
      }

      return { weeks };
    } catch (e) {
      console.warn("Failed parsing Markdown roadmap, falling back to mock structures", e);
      return getMockData(resumeFile, jdFile).roadmap;
    }
  };

  // Launch analysis
  const runAnalysis = async (resume, jd, demoToggle = false) => {
    setResumeFile(resume);
    setJdFile(jd);
    setIsLoading(true);

    if (demoToggle || isDemoMode) {
      setLoadingStatus("Parsing resume structure...");
      await new Promise(r => setTimeout(r, 1200));
      setLoadingStatus("Analyzing job specification matches...");
      await new Promise(r => setTimeout(r, 1000));
      setLoadingStatus("Formulating interactive weekly roadmap...");
      await new Promise(r => setTimeout(r, 800));

      const mock = getMockData(resume, jd);
      setGaps(mock.gaps);
      setScores(mock.scores);
      setRoadmap(mock.roadmap);
      setIsLoading(false);
      setScreen('results');
      return;
    }

    // Default API path
    setLoadingStatus("Uploading files to FastAPI core...");
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('jd', jd);

    try {
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: formData
      });

      if (!response.ok) throw new Error("Backend unavailable");
      
      setLoadingStatus("Structuring results...");
      const data = await response.json();
      handleResults(data);
    } catch (err) {
      console.warn("FastAPI backend connection refused. Launching intelligent Hackathon Mock Mode.", err);
      setLoadingStatus("FastAPI server offline. Activating dynamic local mock systems...");
      await new Promise(r => setTimeout(r, 1500));
      
      const mock = getMockData(resume, jd);
      setGaps(mock.gaps);
      setScores(mock.scores);
      setRoadmap(mock.roadmap);
      setScreen('results');
    } finally {
      setIsLoading(false);
    }
  };

  // Go back
  const handleReset = () => {
    setScreen('upload');
    setResumeFile(null);
    setJdFile(null);
    setGaps(null);
    setScores(null);
    setRoadmap(null);
  };

  // Trigger browser-friendly printing report exports
  const handleExport = () => {
    window.print();
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-x-hidden w-full font-sans selection:bg-indigo-500/30 text-slate-100 flex flex-col items-center"
    >
      {/* Background Ambience */}
      <BackgroundEffects mousePos={mousePos} />

      {/* Top Header Sticky Navigation */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={handleReset}>
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 shadow-lg shadow-indigo-500/25">
              <GraduationCap className="w-5 h-5 text-white" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 blur-[6px] opacity-40 -z-10" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
              SkillGap<span className="text-indigo-400">AI</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {screen === 'results' && (
              <>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Analyze Again
                </button>
                <button
                  onClick={handleExport}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/25 transition-all cursor-pointer border border-indigo-400/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export Report
                </button>
              </>
            )}

            {screen === 'upload' && (
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-[11px] font-semibold text-slate-400 select-none">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Demo Mode:
                <button
                  onClick={() => setIsDemoMode(!isDemoMode)}
                  className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                    isDemoMode ? 'bg-indigo-500 text-white' : 'bg-white/5 text-slate-400'
                  }`}
                >
                  {isDemoMode ? 'ON' : 'OFF'}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Container Views with Page Transitions */}
      <main className="w-full max-w-7xl px-6 md:px-12 lg:px-16 py-12 md:py-20 flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {screen === 'upload' ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              {/* Hero Header Section */}
              <div className="relative text-center max-w-2xl mx-auto mb-16 md:mb-20">
                {/* Left Floating Stat Card Wrapper for Mouse Parallax */}
                <motion.div
                  animate={{
                    x: mousePos.x * -25,
                    y: mousePos.y * -25,
                  }}
                  transition={{ type: "spring", stiffness: 60, damping: 25 }}
                  className="hidden md:block absolute -left-36 lg:-left-44 top-4 z-20 pointer-events-auto"
                >
                  {/* Left Floating Stat Card for Elegant Float */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      rotate: -5,
                      y: [0, -6, 0]
                    }}
                    transition={{
                      opacity: { duration: 0.5, delay: 0.3 },
                      scale: { duration: 0.5, delay: 0.3 },
                      y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                    }}
                    whileHover={{ 
                      scale: 1.04, 
                      rotate: -3, 
                      boxShadow: "0 0 25px rgba(244,63,94,0.2)" 
                    }}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl glass-panel border border-pink-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_15px_rgba(244,63,94,0.08)] backdrop-blur-2xl transition-all duration-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899]" />
                    <span className="font-display font-medium text-xs text-pink-300 tracking-wide select-none">+12 Missing Skills</span>
                  </motion.div>
                </motion.div>

                {/* Right Floating Stat Card Wrapper for Mouse Parallax */}
                <motion.div
                  animate={{
                    x: mousePos.x * -35,
                    y: mousePos.y * -35,
                  }}
                  transition={{ type: "spring", stiffness: 50, damping: 30 }}
                  className="hidden md:block absolute -right-36 lg:-right-44 top-20 z-20 pointer-events-auto"
                >
                  {/* Right Floating Stat Card for Elegant Float */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      rotate: 5,
                      y: [0, 6, 0]
                    }}
                    transition={{
                      opacity: { duration: 0.5, delay: 0.4 },
                      scale: { duration: 0.5, delay: 0.4 },
                      y: { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                    }}
                    whileHover={{ 
                      scale: 1.04, 
                      rotate: 3, 
                      boxShadow: "0 0 25px rgba(6,182,212,0.2)" 
                    }}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl glass-panel border border-cyan-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_15px_rgba(6,182,212,0.08)] backdrop-blur-2xl transition-all duration-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                    <span className="font-display font-medium text-xs text-cyan-300 tracking-wide select-none">82% Match</span>
                  </motion.div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="inline-flex p-[1px] rounded-full bg-gradient-to-r from-cyan-500/25 via-indigo-500/15 to-purple-500/25 shadow-[0_4px_12px_rgba(0,0,0,0.5),0_0_15px_rgba(99,102,241,0.04)] mb-8 select-none"
                >
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#070514]/90 backdrop-blur-xl">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.2)] animate-pulse" />
                    <span className="font-display font-semibold text-[10px] tracking-[0.06em] text-slate-300 uppercase">
                      AI-Powered Career Intelligence
                    </span>
                  </div>
                </motion.div>
                
                <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white mb-6 leading-[1.12]">
                  Discover Your{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 animate-text-shine drop-shadow-[0_0_15px_rgba(34,211,238,0.25)]">
                      Skill Gaps
                    </span>
                    <span className="absolute bottom-1.5 left-0 right-0 h-2 bg-cyan-500/10 blur-md -z-10 rounded-full" />
                  </span>{' '}
                  with AI
                </h1>

                <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                  Upload your professional resume and the target job description. Our AI will instantly map your competencies, compute compatibility metrics, and prepare a personalized weekly learning roadmap.
                </p>
              </div>

              {/* Upload Workspace */}
              <FileUpload onAnalyze={runAnalysis} isLoading={isLoading} demoActive={isDemoMode} />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full space-y-10"
            >
              {/* Row 1: Dynamic Executive Career Assessment Summary */}
              <ExecutiveSummary gaps={gaps} scores={scores} />

              {/* Row 2: Overview Grid (3 columns: Compatibility, Target Proficiency, Competency Matrix) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Column 1: Match Compatibility */}
                <div className="glass-panel rounded-3xl p-6 flex flex-col items-center justify-between text-center relative overflow-hidden h-[360px] border border-white/5 hover:border-white/10 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-indigo-500/5 blur-[40px] rounded-full -z-10" />
                  
                  <div>
                    <h3 className="font-display text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">MATCH COMPATIBILITY</h3>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Match score relative to job title</p>
                  </div>

                  {/* Circle Match Score */}
                  <div className="relative w-36 h-36 flex items-center justify-center my-3">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        className="stroke-white/5"
                        strokeWidth="6"
                        fill="transparent"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        className="stroke-indigo-500"
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={251.32}
                        initial={{ strokeDashoffset: 251.32 }}
                        animate={{ strokeDashoffset: 251.32 - (251.32 * (scores?.overall || 0)) / 100 }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                        strokeLinecap="round"
                      />
                    </svg>
                    
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="font-display text-4xl font-extrabold text-white">
                        {scores?.overall}%
                      </span>
                      <span className="text-[9px] uppercase font-bold text-indigo-400 tracking-widest mt-0.5">Match Index</span>
                    </div>
                  </div>

                  <div className="w-full space-y-3">
                    <div className="bg-white/[0.02] border border-white/5 rounded-xl px-3.5 py-1.5 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1.5 uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        Experience Match
                      </span>
                      <span className="text-[10px] text-indigo-300 font-extrabold bg-indigo-500/10 border border-indigo-400/20 px-2 py-0.5 rounded-md">
                        Mid to Senior
                      </span>
                    </div>
                    
                    <div className="text-left space-y-1.5 bg-white/[0.02] border border-white/5 rounded-xl px-3.5 py-2 text-[10px]">
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-semibold">Your Profile:</span>
                        <span className="text-slate-200 font-bold">{gaps?.candidate_experience || '2.5 Years (Mid-level)'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-semibold">Target Role:</span>
                        <span className="text-slate-200 font-bold">{gaps?.required_experience || '5+ Years (Senior)'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2: Target Proficiency Match (mini mode radar display) */}
                <div className="glass-panel rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden h-[360px] border border-white/5 hover:border-white/10 transition-all duration-300">
                  <div>
                    <h3 className="font-display text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 text-center">TARGET PROFICIENCY MATCH</h3>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold text-center">Your profile mapped relative to job demands</p>
                  </div>

                  <div className="flex justify-center gap-5 text-[9px] font-extrabold my-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 opacity-60" />
                      <span className="text-slate-300">Your Skills</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-500 opacity-60" />
                      <span className="text-slate-300">Job Demands</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center h-[210px] w-full mt-1">
                    <RadarChartComponent scores={scores} isMini={true} />
                  </div>
                </div>

                {/* Column 3: Core Competency Matrix (Bar Chart) */}
                <div className="glass-panel rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden h-[360px] border border-white/5 hover:border-white/10 transition-all duration-300">
                  <div>
                    <h3 className="font-display text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 text-center">CORE COMPETENCY MATRIX</h3>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold text-center">Distribution score profiles mapped dynamically</p>
                  </div>

                  <div className="flex items-center justify-center w-full h-[240px] mt-1">
                    <BarChartComponent scores={scores} />
                  </div>
                </div>

              </div>

              {/* Row 3: Deep-Dive Competency Alignments (Radar Chart & Skill Badges Details side-by-side) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Competency Alignment Radar Card */}
                <div className="lg:col-span-7 glass-panel rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:shadow-[0_8px_30px_rgb(99,102,241,0.06)] border border-white/10 transition-all duration-300">
                  <div>
                    <h3 className="font-display text-sm font-bold text-white mb-1">COMPETENCY ALIGNMENT RADAR</h3>
                    <p className="text-[11px] text-slate-400 font-semibold">Deep-dive comparison across all key competency domains</p>
                  </div>

                  <div className="flex items-center justify-center my-6 h-[400px] w-full">
                    <RadarChartComponent scores={scores} isMini={false} />
                  </div>

                  <div className="flex justify-center gap-6 text-[10px] font-extrabold border-t border-white/5 pt-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                      <span className="text-slate-300">Your Skills</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                      <span className="text-slate-300">Job Demands</span>
                    </div>
                  </div>
                </div>

                {/* Competency Alignment Details Card (SkillGaps) */}
                <div className="lg:col-span-5 glass-panel rounded-3xl p-6 md:p-8 hover:shadow-[0_8px_30px_rgb(99,102,241,0.06)] border border-white/10 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-sm font-bold text-white mb-1">COMPETENCY ALIGNMENT DETAILS</h3>
                    <p className="text-[11px] text-slate-400 font-semibold">Deep-dive comparison categorized by technical domains, tools, and social qualities</p>
                  </div>

                  <div className="mt-4 flex-1">
                    <SkillGaps gaps={gaps} />
                  </div>
                </div>

              </div>

              {/* Row 4: Personalized Growth Roadmap (Timeline) */}
              <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/10">
                <RoapMap roadmap={roadmap} />
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Loading state Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#030014]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center select-none"
          >
            <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-indigo-500/20"
                style={{ borderTopColor: '#6366f1' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border-4 border-purple-500/20"
                style={{ borderBottomColor: '#a855f7' }}
                animate={{ rotate: -360 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
              />
              <Sparkles className="w-8 h-8 text-indigo-400 animate-pulse" />
            </div>

            <motion.h3 
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="font-display text-2xl font-bold text-white mb-2"
            >
              Analyzing Skill Alignments
            </motion.h3>
            <p className="text-slate-400 text-sm max-w-xs">{loadingStatus}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Print styles to ensure flawless PDFs on print */}
      <style>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          header, .fixed, button, .bg-grid-pattern, .bg-dot-pattern {
            display: none !important;
          }
          .glass-panel, .glass-card {
            border: 1px solid #ccc !important;
            box-shadow: none !important;
            background: transparent !important;
            color: black !important;
          }
          main {
            max-width: 100% !important;
            padding: 0 !important;
          }
          span, h1, h2, h3, h4, p {
            color: black !important;
          }
          .stroke-white\\/5 {
            stroke: #eee !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
