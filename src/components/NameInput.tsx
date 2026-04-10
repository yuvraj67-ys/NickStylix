'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, X, Shuffle, AlertCircle } from 'lucide-react';
import { useState, useCallback, useRef } from 'react';
import { useStore } from '@/lib/store';
import { startVoiceInput, playClickSound, vibrate } from '@/lib/utils';

const FF_LIMIT = 12;

const RANDOM_NAMES = [
  'Shadow','Phantom','Ghost','Storm','Blaze','Frost','Viper','Titan','Rex',
  'Nova','Zephyr','Axel','Raven','Drake','Axon','Nyx','Orion','Kira','Vega',
];

export default function NameInput() {
  const { inputName, setInputName, soundEnabled, vibrationEnabled, recentSearches } = useStore();
  const [isListening, setIsListening] = useState(false);
  const stopVoiceRef = useRef<(() => void) | null>(null);

  const charCount = [...inputName].length;
  const isOverLimit = charCount > FF_LIMIT;
  const percentage = Math.min((charCount / FF_LIMIT) * 100, 100);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
  };

  const handleClear = () => {
    setInputName('');
    if (soundEnabled) playClickSound();
    if (vibrationEnabled) vibrate(30);
  };

  const handleRandom = () => {
    const name = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];
    setInputName(name);
    if (soundEnabled) playClickSound();
    if (vibrationEnabled) vibrate([20, 10, 20]);
  };

  const handleVoice = useCallback(() => {
    if (isListening) { stopVoiceRef.current?.(); setIsListening(false); return; }
    const stop = startVoiceInput(
      (text) => { setInputName(text); setIsListening(false); },
      () => setIsListening(false)
    );
    if (stop) { stopVoiceRef.current = stop; setIsListening(true); }
    if (soundEnabled) playClickSound();
  }, [isListening, soundEnabled, setInputName]);

  return (
    <div className="w-full space-y-4">
      {/* Main input */}
      <div className="relative group">
        <motion.div
          animate={{ boxShadow: inputName ? '0 0 30px rgba(124,58,237,0.3)' : '0 0 0px rgba(0,0,0,0)' }}
          className="relative rounded-2xl overflow-hidden"
        >
          <input
            type="text"
            value={inputName}
            onChange={handleChange}
            placeholder="✦ Type your name here..."
            className="w-full bg-gaming-card border border-gaming-border rounded-2xl px-6 py-5 text-2xl font-bold text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/60 transition-all pr-32"
          />
          {/* Action buttons */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <AnimatePresence>
              {inputName && (
                <motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}
                  onClick={handleClear} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                  <X className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>
            <motion.button whileTap={{ scale: 0.9 }} onClick={handleRandom}
              className="p-2 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors" title="Random Name">
              <Shuffle className="w-4 h-4" />
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={handleVoice}
              className={`p-2 rounded-lg transition-colors ${isListening ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20'}`}
              title="Voice Input">
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Character counter */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          {isOverLimit && <AlertCircle className="w-4 h-4 text-red-400" />}
          <span className={`text-sm font-semibold ${isOverLimit ? 'text-red-400' : charCount > 8 ? 'text-yellow-400' : 'text-gray-400'}`}>
            FF Limit: {charCount}/{FF_LIMIT}
          </span>
          {!isOverLimit && charCount > 0 && (
            <span className="text-xs text-green-400">✓ FF Compatible</span>
          )}
          {isOverLimit && <span className="text-xs text-red-400">Too long for FF!</span>}
        </div>
        {/* Progress bar */}
        <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${percentage}%` }}
            className={`h-full rounded-full transition-colors ${isOverLimit ? 'bg-red-500' : percentage > 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
          />
        </div>
      </div>

      {/* Recent searches */}
      {recentSearches.length > 0 && !inputName && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-wrap gap-2">
          <span className="text-xs text-gray-500 self-center">Recent:</span>
          {recentSearches.slice(0, 5).map(name => (
            <button key={name} onClick={() => setInputName(name)}
              className="text-xs px-3 py-1 glass rounded-full text-gray-400 hover:text-purple-400 hover:border-purple-500/30 transition-colors border border-white/5">
              {name}
            </button>
          ))}
        </motion.div>
      )}

      {/* Voice listening indicator */}
      <AnimatePresence>
        {isListening && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-red-400 text-sm">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            🎤 Listening... Speak your name
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}