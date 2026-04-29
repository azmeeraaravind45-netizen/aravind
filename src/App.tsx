import React from "react";
import { SnakeGame } from "./components/SnakeGame";
import { MusicPlayer } from "./components/MusicPlayer";
import { motion } from "motion/react";
import { Terminal, Database, Activity } from "lucide-react";

export default function App() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden screen-tear">
      <div className="static-overlay" />
      
      {/* Background Matrix-like Grid */}
      <div className="fixed inset-0 z-0 bg-[#020204]">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#00ffff 1px, transparent 1px), linear-gradient(90deg, #00ffff 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />
        <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-glitch-magenta/5 to-transparent" />
      </div>

      <header className="relative z-10 w-full max-w-7xl mb-12 flex flex-col md:flex-row justify-between items-end border-b-2 border-glitch-cyan/30 pb-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-glitch-cyan font-mono text-[10px] tracking-widest uppercase mb-1">
            <Database className="h-3 w-3" /> System Status: UNSTABLE
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic glitch-text text-glitch-magenta">
            VOID_RUNNER.OS
          </h1>
        </div>
        <div className="mt-4 md:mt-0 font-mono text-[10px] text-glitch-cyan/60 uppercase tracking-[0.5em] text-right">
          <div className="flex items-center justify-end gap-2">
             <Activity className="h-3 w-3" /> FEED_SYNC: ACTIVE
          </div>
          <div className="mt-1">LATENCY: 14ms // CORE: NULL</div>
        </div>
      </header>

      <main className="relative z-10 w-full max-w-7xl flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Module 01: Music Interface */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 w-full"
        >
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="h-4 w-4 text-glitch-magenta" />
            <span className="font-mono text-xs text-glitch-magenta uppercase tracking-widest">Audio_Subsystem</span>
          </div>
          <MusicPlayer />
          
          <div className="mt-8 p-4 bg-glitch-magenta/5 border border-glitch-magenta/20 font-mono text-[9px] uppercase leading-relaxed text-glitch-magenta/40">
            <p>// WARNING: FREQUENCY ANOMALY DETECTED</p>
            <p>// RETRO-CAUSAL SIGNAL EXTRACTION IN PROGRESS</p>
            <p className="mt-2 text-glitch-magenta/60">{">"} BITRATE_LIMIT: UNBOUNDED</p>
            <div className="w-full bg-glitch-magenta/20 h-1 mt-2">
               <motion.div 
                 animate={{ x: ["0%", "80%", "0%"] }}
                 transition={{ repeat: Infinity, duration: 2 }}
                 className="w-1/5 h-full bg-glitch-magenta"
               />
            </div>
          </div>
        </motion.div>

        {/* Module 02: Central Simulation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-8 w-full flex justify-center"
        >
          <div className="w-full flex flex-col items-center">
             <div className="w-full flex items-center justify-between px-2 mb-2">
                <span className="font-mono text-[10px] text-glitch-cyan/40">SIMULATION_04 // GRID_RES: 20x20</span>
                <span className="font-mono text-[10px] text-glitch-cyan/40">AUTH: ROOT_ACCESS</span>
             </div>
             <SnakeGame />
          </div>
        </motion.div>
      </main>

      {/* Decorative Machine Frames */}
      <div className="fixed bottom-0 left-0 p-4 z-10 pointer-events-none opacity-20">
        <div className="w-32 h-32 border-l-2 border-b-2 border-glitch-cyan" />
      </div>
      <div className="fixed top-0 right-0 p-4 z-10 pointer-events-none opacity-20">
        <div className="w-32 h-32 border-r-2 border-t-2 border-glitch-magenta" />
      </div>
    </div>
  );
}
