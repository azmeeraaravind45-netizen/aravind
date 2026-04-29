import { useState, useEffect, useCallback, useRef } from "react";
import { Direction, Point, GameState } from "../types";
import { GRID_SIZE, INITIAL_SNAKE } from "../constants";

export const useSnakeGame = (tickRate: number) => {
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: { x: 5, y: 5 },
    direction: "UP",
    score: 0,
    isGameOver: false,
    isPaused: true,
  });

  const directionRef = useRef<Direction>("UP");

  const generateFood = useCallback((snake: Point[]): Point => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const isOnSnake = snake.some(
        (segment) => segment.x === newFood!.x && segment.y === newFood!.y
      );
      if (!isOnSnake) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setGameState({
      snake: INITIAL_SNAKE,
      food: { x: 5, y: 5 },
      direction: "UP",
      score: 0,
      isGameOver: false,
      isPaused: false,
    });
    directionRef.current = "UP";
  };

  const moveSnake = useCallback(() => {
    setGameState((prev) => {
      if (prev.isGameOver || prev.isPaused) return prev;

      const newHead = { ...prev.snake[0] };
      const currentDirection = directionRef.current;

      switch (currentDirection) {
        case "UP": newHead.y -= 1; break;
        case "DOWN": newHead.y += 1; break;
        case "LEFT": newHead.x -= 1; break;
        case "RIGHT": newHead.x += 1; break;
      }

      // Wrap around logic
      if (newHead.x < 0) newHead.x = GRID_SIZE - 1;
      if (newHead.x >= GRID_SIZE) newHead.x = 0;
      if (newHead.y < 0) newHead.y = GRID_SIZE - 1;
      if (newHead.y >= GRID_SIZE) newHead.y = 0;

      // Collision with self
      if (prev.snake.some((s) => s.x === newHead.x && s.y === newHead.y)) {
        return { ...prev, isGameOver: true };
      }

      const newSnake = [newHead, ...prev.snake];
      let newFood = prev.food;
      let newScore = prev.score;

      // Eating food
      if (newHead.x === prev.food.x && newHead.y === prev.food.y) {
        newFood = generateFood(newSnake);
        newScore += 10;
      } else {
        newSnake.pop();
      }

      return {
        ...prev,
        snake: newSnake,
        food: newFood,
        score: newScore,
        direction: currentDirection
      };
    });
  }, [generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
          if (directionRef.current !== "DOWN") directionRef.current = "UP";
          break;
        case "ArrowDown":
        case "s":
          if (directionRef.current !== "UP") directionRef.current = "DOWN";
          break;
        case "ArrowLeft":
        case "a":
          if (directionRef.current !== "RIGHT") directionRef.current = "LEFT";
          break;
        case "ArrowRight":
        case "d":
          if (directionRef.current !== "LEFT") directionRef.current = "RIGHT";
          break;
        case " ":
          setGameState(p => ({ ...p, isPaused: !p.isPaused }));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameState.isGameOver || gameState.isPaused) return;
    const interval = setInterval(moveSnake, tickRate);
    return () => clearInterval(interval);
  }, [moveSnake, tickRate, gameState.isGameOver, gameState.isPaused]);

  return { gameState, resetGame, togglePause: () => setGameState(p => ({...p, isPaused: !p.isPaused})) };
};
