import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const BackgroundEffects = ({ mousePos = { x: 0, y: 0 } }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 35 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1.5,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 10 + 18,
      delay: Math.random() * -15,
      opacity: Math.random() * 0.25 + 0.15
    }));
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#05010f] select-none pointer-events-none">

      {/* Cinematic Base Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(91,33,182,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_35%)]" />

      {/* Animated Premium Grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.16]"
        animate={{
          x: mousePos.x * -8,
          y: mousePos.y * -8,
        }}
        transition={{
          type: "spring",
          stiffness: 30,
          damping: 20,
        }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage:
            'radial-gradient(circle at center, black 40%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(circle at center, black 40%, transparent 100%)',
        }}
      />

      {/* Dot Matrix */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* TOP LEFT PURPLE AURA */}
      <motion.div
        className="absolute top-[-10%] left-[-5%] w-[75vw] h-[75vw] rounded-full bg-purple-500/25 blur-[140px]"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 25, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* BOTTOM RIGHT CYAN AURA */}
      <motion.div
        className="absolute bottom-[-10%] right-[-5%] w-[80vw] h-[80vw] rounded-full bg-cyan-400/22 blur-[150px]"
        animate={{
          x: [0, -25, 20, 0],
          y: [0, 20, -15, 0],
          scale: [1, 0.96, 1.04, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* HERO CYAN CENTER GLOW */}
      <motion.div
        className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[45vw] h-[45vw] rounded-full bg-cyan-400/18 blur-[160px]"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.45, 0.75, 0.45],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* HERO PURPLE CENTER GLOW */}
      <motion.div
        className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[55vw] h-[55vw] rounded-full bg-purple-500/14 blur-[180px]"
        animate={{
          scale: [1, 1.04, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* LOWER INDIGO AMBIENT LIGHT */}
      <motion.div
        className="absolute bottom-[5%] left-[20%] w-[65vw] h-[45vw] rounded-full bg-indigo-500/18 blur-[140px]"
        animate={{
          x: [0, -20, 15, 0],
          y: [0, 15, -15, 0],
          scale: [1, 0.97, 1.03, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* NEURAL NETWORK SVG */}
      <motion.svg
        className="absolute inset-0 w-full h-full opacity-[0.18]"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          x: mousePos.x * -12,
          y: mousePos.y * -12,
        }}
        transition={{
          type: 'spring',
          stiffness: 40,
          damping: 20,
        }}
      >
        <defs>
          <linearGradient id="line1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="line2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* LEFT NETWORK */}
        <path
          d="M -50,180 Q 200,120 300,320 T 650,240"
          fill="none"
          stroke="url(#line1)"
          strokeWidth="1.4"
        />

        <path
          d="M -50,180 Q 200,120 300,320 T 650,240"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="2"
          strokeDasharray="12 120"
          className="animate-pulse-travel"
        />

        <circle
          cx="300"
          cy="320"
          r="3.5"
          fill="#22d3ee"
          className="animate-pulse"
        />

        {/* RIGHT NETWORK */}
        <path
          d="M 1400,100 Q 1050,240 900,410 T 520,340"
          fill="none"
          stroke="url(#line2)"
          strokeWidth="1.4"
        />

        <path
          d="M 1400,100 Q 1050,240 900,410 T 520,340"
          fill="none"
          stroke="#818cf8"
          strokeWidth="2"
          strokeDasharray="15 140"
          className="animate-pulse-travel"
          style={{
            animationDirection: 'reverse',
            animationDuration: '13s',
          }}
        />

        <circle
          cx="900"
          cy="410"
          r="3.5"
          fill="#818cf8"
          className="animate-pulse"
        />
      </motion.svg>

      {/* FLOATING PARTICLES */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-cyan-300/40 shadow-[0_0_10px_rgba(34,211,238,0.55)]"
            style={{
              width: p.size,
              height: p.size,
              top: p.top,
              left: p.left,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.sin(p.id) * 25, 0],
              opacity: [p.opacity, p.opacity * 2.2, p.opacity],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* TOP LIGHT LINE */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* CINEMATIC VIGNETTE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.72)_100%)]" />
    </div>
  );
};

export default BackgroundEffects;