import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Sound effects via Web Audio API (no external files)
let audioCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)(); }
    catch { return null; }
  }
  return audioCtx;
}

export function playClickSound() {
  const ctx = getAudioCtx(); if (!ctx) return;
  const o = ctx.createOscillator(); const g = ctx.createGain();
  o.connect(g); g.connect(ctx.destination);
  o.frequency.setValueAtTime(600, ctx.currentTime);
  o.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
  g.gain.setValueAtTime(0.3, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
  o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.1);
}

export function playCopySound() {
  const ctx = getAudioCtx(); if (!ctx) return;
  const o = ctx.createOscillator(); const g = ctx.createGain();
  o.connect(g); g.connect(ctx.destination);
  o.frequency.setValueAtTime(800, ctx.currentTime);
  o.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.15);
  g.gain.setValueAtTime(0.4, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
  o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.15);
}

export function playErrorSound() {
  const ctx = getAudioCtx(); if (!ctx) return;
  const o = ctx.createOscillator(); const g = ctx.createGain();
  o.type = 'sawtooth'; o.connect(g); g.connect(ctx.destination);
  o.frequency.setValueAtTime(200, ctx.currentTime);
  g.gain.setValueAtTime(0.3, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
  o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.2);
}

// Vibration
export function vibrate(pattern: number | number[] = 50) {
  if (typeof window !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

// Copy to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback
    const el = document.createElement('textarea');
    el.value = text; el.style.position = 'fixed'; el.style.opacity = '0';
    document.body.appendChild(el); el.focus(); el.select();
    const success = document.execCommand('copy');
    document.body.removeChild(el);
    return success;
  }
}

// Voice input
export function startVoiceInput(onResult: (text: string) => void, onEnd: () => void): (() => void) | null {
  if (typeof window === 'undefined') return null;
  const SR = window.SpeechRecognition || (window as typeof window & { webkitSpeechRecognition: typeof SpeechRecognition }).webkitSpeechRecognition;
  if (!SR) return null;
  const recognition = new SR();
  recognition.lang = 'en-IN'; recognition.continuous = false; recognition.interimResults = false;
  recognition.onresult = (e: SpeechRecognitionEvent) => { onResult(e.results[0][0].transcript); };
  recognition.onend = onEnd;
  recognition.start();
  return () => recognition.stop();
}

// Name length in FF characters (each non-ASCII counts as 2)
export function getFFLength(name: string): number {
  let len = 0;
  for (const char of name) {
    len += char.charCodeAt(0) > 127 ? 2 : 1;
  }
  return len;
}

// Generate unique ID
export function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// Debounce
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
}