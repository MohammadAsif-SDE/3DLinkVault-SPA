import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Folder, Globe, MousePointerClick, Cloud, Share2, Lock } from 'lucide-react';

const FEATURES = [
  {
    id: 1,
    title: "Folder Structure",
    description: "Organize your tabs in a hierarchical folder structure for easy navigation and retrieval.",
    icon: Folder,
  },
  {
    id: 2,
    title: "Access Anywhere",
    description: "Access your saved tabs from any device, anywhere in the world with internet connection.",
    icon: Globe,
  },
  {
    id: 3,
    title: "One-Click Save",
    description: "Save all your current tabs with just one click, no more manual bookmarking.",
    icon: MousePointerClick,
  },
  {
    id: 4,
    title: "Cloud Sync",
    description: "All your tabs are automatically synced to the cloud for seamless access across devices.",
    icon: Cloud,
  },
  {
    id: 5,
    title: "Share Collections",
    description: "Share your tab collections with friends, family, or colleagues with ease.",
    icon: Share2,
  },
  {
    id: 6,
    title: "Secure Storage",
    description: "Your data is encrypted and securely stored, ensuring your browsing privacy.",
    icon: Lock,
  }
];

export const FeaturesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center bg-[#050505] py-20 relative overflow-hidden">
      {/* Background Arc */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[70%] w-[120%] aspect-[2/1] pointer-events-none opacity-20">
        <svg viewBox="0 0 1000 500" className="w-full h-full">
          <path
            d="M 50 450 Q 500 50 950 450"
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          {/* Dots on Arc */}
          {[0.15, 0.5, 0.85].map((pos, i) => {
            const x = 50 + (950 - 50) * pos;
            const y = 450 + (50 - 450) * Math.sin(Math.PI * pos); // Rough approximation
            // Better approximation using quadratic bezier formula: (1-t)^2*P0 + 2(1-t)t*P1 + t^2*P2
            const t = pos;
            const bx = Math.pow(1-t, 2) * 50 + 2 * (1-t) * t * 500 + Math.pow(t, 2) * 950;
            const by = Math.pow(1-t, 2) * 450 + 2 * (1-t) * t * 50 + Math.pow(t, 2) * 450;
            
            return (
              <g key={i}>
                <circle cx={bx} cy={by} r="6" fill="white" />
                <circle cx={bx} cy={by - 40} r="25" fill="none" stroke="white" strokeWidth="0.5" />
                <text x={bx} y={by - 35} textAnchor="middle" fill="white" fontSize="12" fontFamily="monospace">
                  {i === 0 ? '1' : i === 1 ? '8' : '7'}
                </text>
                <line x1={bx} y1={by} x2={bx} y2={by - 15} stroke="white" strokeWidth="0.5" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Central Content */}
      <div className="relative z-10 text-center max-w-2xl px-6 h-48 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-premium uppercase tracking-tight text-white">
              {FEATURES[activeIndex].title}
            </h2>
            <p className="text-lg md:text-xl text-white/50 font-serif italic leading-relaxed">
              {FEATURES[activeIndex].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Loop UI */}
      <div className="mt-12 relative w-full max-w-4xl px-6">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <svg viewBox="0 0 800 200" className="w-full h-full opacity-20">
             <path 
               d="M 250 100 L 550 100 A 40 40 0 0 1 550 180 L 250 180 A 40 40 0 0 1 250 100" 
               fill="none" 
               stroke="white" 
               strokeWidth="1.5"
               strokeLinecap="round"
             />
           </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 relative z-20 max-w-4xl mx-auto">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            const isActive = activeIndex === i;
            return (
              <motion.div
                key={feature.id}
                animate={{ 
                  scale: isActive ? 1.05 : 1,
                  backgroundColor: isActive ? '#1a1a1a' : '#111',
                  borderColor: isActive ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255, 255, 255, 0.05)'
                }}
                className="flex items-center gap-4 px-5 py-3 rounded-full border shadow-2xl cursor-pointer group relative overflow-hidden transition-colors"
                onClick={() => setActiveIndex(i)}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-glow"
                    className="absolute inset-0 bg-blue-500/5 blur-xl"
                  />
                )}
                <div className={`flex-shrink-0 ${isActive ? 'text-blue-500' : 'text-white/20'}`}>
                  <Icon size={16} />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap ${isActive ? 'text-white' : 'text-white/30'}`}>
                  {feature.title}
                </span>
              </motion.div>
            );
          })}
        </div>
        
        {/* Indicators for all features */}
        <div className="flex justify-center gap-3 mt-16">
          {FEATURES.map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                width: activeIndex === i ? 32 : 8,
                backgroundColor: activeIndex === i ? '#3b82f6' : 'rgba(255, 255, 255, 0.1)'
              }}
              className="h-1 rounded-full cursor-pointer transition-all duration-500"
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
