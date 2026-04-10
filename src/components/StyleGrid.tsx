'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Copy, Check, Search, Filter } from 'lucide-react';
import { useState, useMemo } from 'react';
import { FONT_STYLES, CATEGORIES, generateAllStyles } from '@/lib/fonts';
import { useStore, SavedName } from '@/lib/store';
import { useCopy } from '@/hooks/useCopy';
import { generateId, vibrate } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function StyleGrid() {
  const { inputName, prefixSymbols, suffixSymbols, filterCategory, setFilterCategory, filterLength, setFilterLength, favorites, addFavorite, removeFavorite, vibrationEnabled } = useStore();
  const { copy, isCopied } = useCopy();
  const [search, setSearch] = useState('');
  const [showFFOnly, setShowFFOnly] = useState(false);

  const fullName = useMemo(() => {
    return prefixSymbols.join('') + inputName + suffixSymbols.join('');
  }, [inputName, prefixSymbols, suffixSymbols]);

  const allStyles = useMemo(() => {
    if (!fullName.trim()) return [];
    return generateAllStyles(fullName);
  }, [fullName]);

  const filtered = useMemo(() => {
    return allStyles.filter(({ style, result }) => {
      if (filterCategory !== 'All' && style.category !== filterCategory) return false;
      if (showFFOnly && !style.ffCompatible) return false;
      if (search && !style.name.toLowerCase().includes(search.toLowerCase())) return false;
      const len = [...result].length;
      if (filterLength === 'short' && len > 10) return false;
      if (filterLength === 'medium' && (len <= 10 || len > 20)) return false;
      if (filterLength === 'long' && len <= 20) return false;
      return true;
    });
  }, [allStyles, filterCategory, showFFOnly, search, filterLength]);

  const handleCopy = async (text: string, id: string) => {
    await copy(text, id);
    toast.success('Copied! 🎉', { duration: 1500, style: { background: '#1a1a2e', color: '#fff', border: '1px solid #7c3aed50' } });
  };

  const handleFavorite = (name: string, styleName: string) => {
    if (favorites.some(f => f.name === name && f.styleName === styleName)) return;
    const id = generateId();
    const saved: SavedName = { id, name, styleName, timestamp: Date.now(), likes: 0 };
    addFavorite(saved);
    if (vibrationEnabled) vibrate([20, 10, 20]);
    toast.success('❤️ Saved to favorites!', { duration: 1500, style: { background: '#1a1a2e', color: '#fff' } });
  };

  if (!inputName.trim()) {
    return (
      <div className="text-center py-20">
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <div className="text-6xl mb-4">✦</div>
        </motion.div>
        <p className="text-gray-500 text-lg">Type your name above to see 100+ stylish versions</p>
        <p className="text-gray-600 text-sm mt-2">Free Fire • BGMI • Instagram • TikTok</p>
      </div>
    );
  }

  return (
    <div className="space-y-6" id="generator">
      {/* Filters */}
      <div className="space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search styles..." className="w-full bg-gaming-card border border-gaming-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/60 transition-colors" />
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <motion.button key={cat} whileTap={{ scale: 0.95 }}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${filterCategory === cat ? 'bg-purple-600/20 text-purple-300 border-purple-500/40' : 'glass text-gray-400 border-white/5 hover:text-white'}`}>
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Length filter + FF filter */}
        <div className="flex gap-2 flex-wrap">
          {(['all','short','medium','long'] as const).map(f => (
            <button key={f} onClick={() => setFilterLength(f)}
              className={`px-3 py-1 rounded-lg text-xs transition-all border ${filterLength === f ? 'bg-blue-600/20 text-blue-300 border-blue-500/40' : 'glass text-gray-500 border-white/5'}`}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
          <button onClick={() => setShowFFOnly(!showFFOnly)}
            className={`px-3 py-1 rounded-lg text-xs transition-all border flex items-center gap-1 ${showFFOnly ? 'bg-orange-600/20 text-orange-300 border-orange-500/40' : 'glass text-gray-500 border-white/5'}`}>
            🎮 FF Only
          </button>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          <span className="text-purple-400 font-semibold">{filtered.length}</span> styles found
        </p>
        <p className="text-xs text-gray-600">Tap to copy ✦</p>
      </div>

      {/* Grid */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.03 } } }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
      >
        <AnimatePresence>
          {filtered.map(({ style, result }) => {
            const copied = isCopied(result);
            const isFav = favorites.some(f => f.name === result);
            return (
              <motion.div
                key={style.id}
                layout
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                className="card-hover group relative bg-gaming-card border border-gaming-border rounded-2xl p-4 cursor-pointer"
                onClick={() => handleCopy(result, result)}
              >
                {/* Style label */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-500 font-medium">{style.name}</span>
                  <div className="flex items-center gap-1">
                    {style.ffCompatible && (
                      <span className="text-xs bg-orange-500/10 text-orange-400 px-1.5 py-0.5 rounded border border-orange-500/20">FF</span>
                    )}
                    <span className={`text-xs px-1.5 py-0.5 rounded border ${
                      style.category === 'Gamer' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      style.category === 'Attitude' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      style.category === 'Cute' ? 'bg-pink-500/10 text-pink-400 border-pink-500/20' :
                      'bg-purple-500/10 text-purple-400 border-purple-500/20'
                    }`}>{style.category}</span>
                  </div>
                </div>

                {/* Converted name */}
                <div className="text-center py-3 min-h-[60px] flex items-center justify-center">
                  <p className="text-xl font-bold text-white break-all leading-relaxed">{result}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                  <span className="text-xs text-gray-600">{[...result].length} chars</span>
                  <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                    <motion.button whileTap={{ scale: 0.8 }}
                      onClick={() => isFav ? removeFavorite(favorites.find(f => f.name === result)?.id ?? '') : handleFavorite(result, style.name)}
                      className={`p-1.5 rounded-lg transition-colors ${isFav ? 'text-red-400 bg-red-400/10' : 'text-gray-500 hover:text-red-400 hover:bg-red-400/10'}`}>
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.8 }}
                      onClick={() => handleCopy(result, result)}
                      className={`p-1.5 rounded-lg transition-colors ${copied ? 'text-green-400 bg-green-400/10' : 'text-gray-500 hover:text-purple-400 hover:bg-purple-400/10'}`}>
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </motion.button>
                  </div>
                </div>

                {/* Copied overlay */}
                <AnimatePresence>
                  {copied && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-green-500/10 rounded-2xl border border-green-500/30 flex items-center justify-center pointer-events-none">
                      <span className="text-green-400 font-bold text-sm">✓ COPIED!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && inputName && (
        <div className="text-center py-10 text-gray-500">No styles match your filter.</div>
      )}
    </div>
  );
}