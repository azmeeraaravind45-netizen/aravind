import React, { useRef, useEffect } from "react";
import { useSnakeGame } from "../hooks/useSnakeGame";
import { GRID_SIZE, TICK_RATE } from "../constants";
import { Cpu, Power, Hash, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { gameState, resetGame, togglePause } = useSnakeGame(TICK_RATE);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cellSize = canvas.width / GRID_SIZE;

    // Clear canvas
    ctx.fillStyle = "#020204";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Terminal Grid
    ctx.strokeStyle = "rgba(0, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
      ctx.stroke();
    }

    // Draw Data Point (Food)
    ctx.fillStyle = "#ff00ff";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#ff00ff";
    
    // Pixelated "Food"
    const fX = gameState.food.x * cellSize;
    const fY = gameState.food.y * cellSize;
    ctx.fillRect(fX + 2, fY + 2, cellSize - 4, cellSize - 4);
    
    // Draw Glitched Snake
    gameState.snake.forEach((segment, index) => {
      const x = segment.x * cellSize;
      const y = segment.y * cellSize;
      
      if (index === 0) {
        ctx.fillStyle = "#00ffff";
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#00ffff";
        ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
        
        // Add "eyes" (just pixels)
        ctx.fillStyle = "#020204";
        ctx.fillRect(x + cellSize/4, y + cellSize/4, 2, 2);
        ctx.fillRect(x + 3*cellSize/4 - 2, y + cellSize/4, 2, 2);
      } else {
        ctx.shadowBlur = 0;
        // Alternating segments for "data stream" look
        ctx.fillStyle = index % 2 === 0 ? "#00ffff" : "rgba(0, 255, 255, 0.5)";
        ctx.fillRect(x + 2, y + 2, cellSize - 4, cellSize - 4);
      }
    });

    ctx.shadowBlur = 0;
  }, [gameState]);

  return (
    <div className="relative flex flex-col items-center gap-4 w-full">
      {/* Simulation Header */}
      <div className="flex w-full items-center justify-between bg-glitch-cyan/5 border-2 border-glitch-cyan/20 p-4 font-mono">
        <div className="flex items-center gap-4">
           <div className="flex flex-col">
              <span className="text-[10px] text-glitch-cyan/50 tracking-widest uppercase">Nodes_Consumed</span>
              <span className="text-2xl font-bold text-glitch-cyan flex items-center gap-2">
                <Hash className="h-4 w-4" /> {gameState.score.toString().padStart(4, '0')}
              </span>
           </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={togglePause}
            className="px-4 py-2 bg-glitch-cyan/10 border border-glitch-cyan/40 text-glitch-cyan hover:bg-glitch-cyan hover:text-void transition-colors text-xs font-bold uppercase tracking-tighter"
          >
            {gameState.isPaused ? "[ RUN ]" : "[ HALT ]"}
          </button>
          <button
             onClick={resetGame}
             className="p-2 border border-glitch-magenta/40 text-glitch-magenta hover:bg-glitch-magenta hover:text-void transition-colors"
          >
            <Power className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Grid Viewport */}
      <div className="relative p-2 border-4 border-glitch-cyan/20 bg-void">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-glitch-cyan/40 animate-pulse" />
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="relative block"
          style={{ width: "min(85vw, 400px)", height: "min(85vw, 400px)" }}
        />
        
        <AnimatePresence>
          {(gameState.isGameOver || gameState.isPaused) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-void/80 backdrop-blur-[2px]"
            >
              <div className="text-center p-6 border-2 border-glitch-magenta bg-black relative">
                {/* Glitch Decorative Corners */}
                <div className="absolute -top-1 -left-1 w-4 h-4 bg-glitch-magenta" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-glitch-cyan" />
                
                <h2 className="text-3xl font-black italic mb-2 glitch-text text-white">
                  {gameState.isGameOver ? "CORE_DUMP" : "SYS_PAUSED"}
                </h2>
                <div className="font-mono text-[10px] text-glitch-magenta uppercase mb-6 flex flex-col gap-1">
                   <span>ERROR_CODE: {gameState.isGameOver ? "0xDEADBEEF" : "0xUSERWAIT"}</span>
                   {gameState.isGameOver && <span>LOG_SCORE: {gameState.score}</span>}
                </div>
                
                <button
                  onClick={resetGame}
                  className="w-full py-3 bg-glitch-magenta text-white font-bold uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-glitch-magenta transition-all"
                >
                  {gameState.isGameOver ? "INITIALIZE_REBOOT" : "RESUME_THREAD"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Machine Readout */}
      <div className="w-full grid grid-cols-2 gap-4">
         <div className="p-3 border border-white/5 bg-white/2 rounded font-mono">
            <div className="flex items-center gap-2 text-[9px] text-white/40 uppercase mb-1">
               <Cpu className="h-3 w-3" /> Process_Load
            </div>
            <div className="flex gap-1">
               {[...Array(10)].map((_, i) => (
                 <div key={i} className={`h-1 flex-1 ${i < 7 ? 'bg-glitch-cyan' : 'bg-white/10'}`} />
               ))}
            </div>
         </div>
         <div className="p-3 border border-white/5 bg-white/2 rounded font-mono">
            <div className="flex items-center gap-2 text-[9px] text-white/40 uppercase mb-1">
               <Terminal className="h-3 w-3" /> User_Input
            </div>
            <div className="text-[10px] text-glitch-cyan animate-pulse">{">"} WASD_READY</div>
         </div>
      </div>
    </div>
  );
};
