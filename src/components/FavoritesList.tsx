'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, Download } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useCopy } from '@/hooks/useCopy';
import toast from 'react-hot-toast';

export default function FavoritesList() {
  const { favorites, removeFavorite } = useStore();
  const { copy, isCopied } = useCopy();

  if (favorites.length === 0) return null;

  const exportFavorites = () => {
    const text = favorites.map(f => f.name).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'NickStylix-Favorites.txt';
    a.click(); URL.revokeObjectURL(url);
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-white flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-400 fill-current" /> My Collection ({favorites.length})
        </h2>
        <button onClick={exportFavorites} className="flex items-center gap-1 text-xs text-gray-400 hover:text-white glass px-3 py-1.5 rounded-xl border border-white/5">
          <Download className="w-3 h-3" /> Export
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <AnimatePresence>
          {favorites.map(fav => (
            <motion.div key={fav.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="glass border border-white/5 rounded-2xl p-4 flex items-center gap-3">
              <div className="flex-1">
                <p className="text-white font-bold">{fav.name}</p>
                <p className="text-gray-500 text-xs">{fav.styleName}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { copy(fav.name, fav.id); toast.success('Copied!', { duration: 1000, style: { background: '#1a1a2e', color: '#fff' } }); }}
                  className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${isCopied(fav.id) ? 'bg-green-500/10 text-green-400' : 'bg-purple-500/10 text-purple-400'}`}>
                  {isCopied(fav.id) ? '✓' : 'Copy'}
                </button>
                <button onClick={() => removeFavorite(fav.id)} className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}