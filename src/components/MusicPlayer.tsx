import React, { useState, useRef, useEffect } from "react";
import { DUMMY_TRACKS } from "../constants";
import { Play, Pause, SkipForward, SkipBack, Info, Radio } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
      />

      <div className="relative bg-black border-4 border-glitch-magenta p-6 shadow-magenta">
         {/* Static Border Accent */}
         <div className="absolute top-0 right-0 w-8 h-8 bg-glitch-magenta flex items-center justify-center">
            <Radio className="h-4 w-4 text-black" />
         </div>

         <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
               {/* Pixel Art Placeholder */}
               <div className="w-20 h-20 bg-glitch-magenta/20 border-2 border-glitch-magenta flex flex-wrap p-2 gap-1 items-center justify-center shrink-0">
                  {[...Array(9)].map((_, i) => (
                     <motion.div 
                        key={i}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ repeat: Infinity, duration: Math.random() * 2 + 1 }}
                        className="w-4 h-4 bg-glitch-magenta" 
                     />
                  ))}
               </div>

               <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[9px] text-glitch-magenta mb-1 font-mono tracking-[0.3em] uppercase">
                     <span className="bg-glitch-magenta text-black px-1">TRACK_LOG</span> STREAMING_0{currentTrackIndex + 1}
                  </div>
                  <h3 className="text-2xl font-bold font-mono tracking-tighter text-white uppercase italic leading-none">
                    {currentTrack.title}
                  </h3>
                  <p className="text-glitch-cyan text-xs font-mono mt-1 uppercase opacity-80">
                    SRC: {currentTrack.artist}
                  </p>
               </div>
            </div>

            {/* Progress Bar (Glitched) */}
            <div className="relative h-4 bg-glitch-magenta/10 border border-glitch-magenta/30 p-1 flex items-center">
               <motion.div 
                  className="h-full bg-glitch-magenta relative"
                  style={{ width: `${progress}%` }}
               >
                  <div className="absolute top-0 right-0 w-1 h-full bg-white animate-pulse" />
               </motion.div>
               <div className="absolute inset-0 flex justify-between px-2 items-center pointer-events-none">
                  <span className="text-[8px] font-mono text-white/40">00:00</span>
                  <span className="text-[8px] font-mono text-white/40">DATA_LIMIT</span>
               </div>
            </div>

            <div className="flex items-center justify-between">
               <div className="flex gap-4">
                  <button 
                    onClick={prevTrack}
                    className="p-2 border border-glitch-cyan/40 text-glitch-cyan hover:bg-glitch-cyan hover:text-black transition-colors"
                  >
                    <SkipBack className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="px-6 py-2 bg-glitch-magenta text-white font-black uppercase tracking-widest hover:scale-105 transition-transform"
                  >
                    {isPlaying ? "[ HALT ]" : "[ PLAY ]"}
                  </button>
                  <button 
                    onClick={nextTrack}
                    className="p-2 border border-glitch-cyan/40 text-glitch-cyan hover:bg-glitch-cyan hover:text-black transition-colors"
                  >
                    <SkipForward className="h-5 w-5" />
                  </button>
               </div>

               <div className="hidden sm:flex items-center gap-2 text-glitch-cyan/60">
                 <Info className="h-4 w-4" />
                 <span className="text-[8px] font-mono uppercase tracking-widest">Metadata_Verified</span>
               </div>
            </div>
         </div>
      </div>

      {/* Track Listing (Matrix Style) */}
      <div className="flex flex-col gap-1 font-mono text-[10px] uppercase tracking-wider">
         <div className="px-2 py-1 bg-glitch-cyan/10 text-glitch-cyan border-l-2 border-glitch-cyan mb-2">
            DIRECTORY: /SYSTEM/TRACKS/AI_GEN
         </div>
         {DUMMY_TRACKS.map((track, i) => (
           <button
             key={track.id}
             onClick={() => setCurrentTrackIndex(i)}
             className={`flex items-center gap-3 px-3 py-2 transition-all ${
               i === currentTrackIndex 
                ? "bg-glitch-cyan text-void font-bold translate-x-2" 
                : "text-white/40 hover:text-white hover:bg-white/5"
             }`}
           >
             <span className="opacity-50">0{i+1}</span>
             <span className="flex-1 text-left truncate">{track.title}</span>
             {i === currentTrackIndex && isPlaying && <motion.div animate={{ opacity: [1, 0, 1] }} className="w-1.5 h-1.5 bg-void" />}
           </button>
         ))}
      </div>
    </div>
  );
};
