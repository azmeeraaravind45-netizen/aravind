import { Track } from "./types";

export const GRID_SIZE = 20;
export const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
export const TICK_RATE = 150;

export const DUMMY_TRACKS: Track[] = [
  {
    id: "1",
    title: "Neon Pulse",
    artist: "Synthwave AI",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    color: "from-neon-pink to-neon-purple",
  },
  {
    id: "2",
    title: "Cyber Drift",
    artist: "Chrome Soul",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    color: "from-neon-blue to-neon-purple",
  },
  {
    id: "3",
    title: "Binary Dreams",
    artist: "Vector Ghost",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    color: "from-neon-pink to-neon-blue",
  },
];
