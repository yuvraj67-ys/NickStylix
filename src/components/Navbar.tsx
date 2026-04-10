'use client';
import { motion } from 'framer-motion';
import { Moon, Sun, Volume2, VolumeX, Vibrate, Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { playClickSound, vibrate } from '@/lib/utils';

export default function Navbar() {
  const { darkMode, toggleDarkMode, soundEnabled, toggleSound, vibrationEnabled, toggleVibration } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = (fn: () => void) => {
    if (soundEnabled) playClickSound();
    if (vibrationEnabled) vibrate(30);
    fn();
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-black gradient-text">NickStylix</span>
          <span className="hidden sm:block text-xs bg-purple-600/20 text-purple-400 px-2 py-0.5 rounded-full border border-purple-600/30 font-medium">
            PRO
          </span>
        </motion.div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {['Generator','Gaming','AI Tools','Trending'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(' ','-')}`}
               className="text-sm text-gray-400 hover:text-white transition-colors hover:text-purple-400">
              {item}
            </a>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => handleToggle(toggleVibration)}
            className="p-2 rounded-lg glass text-gray-400 hover:text-purple-400 transition-colors"
            title={vibrationEnabled ? 'Vibration ON' : 'Vibration OFF'}>
            <Vibrate className={`w-4 h-4 ${vibrationEnabled ? 'text-purple-400' : 'text-gray-600'}`} />
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => handleToggle(toggleSound)}
            className="p-2 rounded-lg glass text-gray-400 hover:text-purple-400 transition-colors">
            {soundEnabled ? <Volume2 className="w-4 h-4 text-purple-400" /> : <VolumeX className="w-4 h-4 text-gray-600" />}
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => handleToggle(toggleDarkMode)}
            className="p-2 rounded-lg glass text-gray-400 hover:text-purple-400 transition-colors">
            {darkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg glass">
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass border-t border-white/5 px-4 py-3 flex flex-col gap-3">
          {['Generator','Gaming','AI Tools','Trending'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(' ','-')}`}
               onClick={() => setMenuOpen(false)}
               className="text-sm text-gray-400 hover:text-purple-400 transition-colors py-1">
              {item}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
}