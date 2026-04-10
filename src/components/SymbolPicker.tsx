'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { SYMBOL_CATEGORIES } from '@/lib/symbols';
import { useStore } from '@/lib/store';
import { playClickSound, vibrate } from '@/lib/utils';
import { INVISIBLE_CHARS } from '@/lib/fonts';

export default function SymbolPicker() {
  const [activeCategory, setActiveCategory] = useState('weapons');
  const [addTo, setAddTo] = useState<'prefix' | 'suffix'>('prefix');
  const { prefixSymbols, suffixSymbols, addPrefixSymbol, addSuffixSymbol, removePrefixSymbol, removeSuffixSymbol, clearSymbols, inputName, soundEnabled, vibrationEnabled } = useStore();

  const fullPreview = [...prefixSymbols, inputName || '✦Name✦', ...suffixSymbols].join('');

  const handleSymbol = (sym: string) => {
    if (addTo === 'prefix') addPrefixSymbol(sym);
    else addSuffixSymbol(sym);
    if (soundEnabled) playClickSound();
    if (vibrationEnabled) vibrate(20);
  };

  const handleInvisible = () => {
    addSuffixSymbol(INVISIBLE_CHARS.hangulFiller);
    if (soundEnabled) playClickSound();
  };

  return (
    <div className="bg-gaming-card border border-gaming-border rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-white text-lg">⚡ Symbol Picker</h3>
        {(prefixSymbols.length > 0 || suffixSymbols.length > 0) && (
          <button onClick={clearSymbols} className="text-xs text-red-400 hover:text-red-300 transition-colors">Clear All</button>
        )}
      </div>

      {/* Preview */}
      <div className="bg-black/30 rounded-xl p-3 text-center border border-white/5">
        <p className="text-gray-500 text-xs mb-1">Live Preview</p>
        <p className="text-lg font-bold text-white break-all">{fullPreview}</p>
      </div>

      {/* Add to prefix/suffix toggle */}
      <div className="flex gap-2">
        {(['prefix', 'suffix'] as const).map(pos => (
          <button key={pos} onClick={() => setAddTo(pos)}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all border ${addTo === pos ? 'bg-purple-600/20 text-purple-300 border-purple-500/40' : 'glass text-gray-400 border-white/5'}`}>
            Add to {pos === 'prefix' ? '← Start' : 'End →'}
          </button>
        ))}
      </div>

      {/* Selected symbols display */}
      {(prefixSymbols.length > 0 || suffixSymbols.length > 0) && (
        <div className="space-y-2">
          {prefixSymbols.length > 0 && (
            <div className="flex flex-wrap gap-1 items-center">
              <span className="text-xs text-gray-500">Start:</span>
              {prefixSymbols.map((s, i) => (
                <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="flex items-center gap-0.5 bg-purple-600/10 border border-purple-500/20 rounded-lg px-2 py-0.5 text-sm">
                  {s}
                  <button onClick={() => removePrefixSymbol(i)} className="text-gray-500 hover:text-red-400 ml-1"><X className="w-3 h-3" /></button>
                </motion.span>
              ))}
            </div>
          )}
          {suffixSymbols.length > 0 && (
            <div className="flex flex-wrap gap-1 items-center">
              <span className="text-xs text-gray-500">End:</span>
              {suffixSymbols.map((s, i) => (
                <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="flex items-center gap-0.5 bg-blue-600/10 border border-blue-500/20 rounded-lg px-2 py-0.5 text-sm">
                  {s}
                  <button onClick={() => removeSuffixSymbol(i)} className="text-gray-500 hover:text-red-400 ml-1"><X className="w-3 h-3" /></button>
                </motion.span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {SYMBOL_CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap transition-all border ${activeCategory === cat.id ? 'bg-purple-600/20 text-purple-300 border-purple-500/40' : 'glass text-gray-500 border-white/5'}`}>
            {cat.emoji} {cat.name}
          </button>
        ))}
      </div>

      {/* Symbols grid */}
      <div className="grid grid-cols-8 gap-2">
        {SYMBOL_CATEGORIES.find(c => c.id === activeCategory)?.symbols.map((sym, i) => (
          <motion.button key={i} whileTap={{ scale: 0.8 }} onClick={() => handleSymbol(sym)}
            className="aspect-square flex items-center justify-center glass rounded-xl text-lg hover:bg-purple-600/20 hover:border-purple-500/30 transition-all border border-transparent">
            {sym === INVISIBLE_CHARS.hangulFiller ? <span className="text-xs text-purple-400">ㅤ</span> : sym}
          </motion.button>
        ))}
      </div>

      {/* Invisible char button */}
      <button onClick={handleInvisible}
        className="w-full py-2 glass rounded-xl text-xs text-purple-400 hover:bg-purple-600/10 transition-colors border border-purple-500/20 flex items-center justify-center gap-2">
        <Plus className="w-3 h-3" />
        Add Invisible Space (FF Trick) ㅤ
      </button>
    </div>
  );
}