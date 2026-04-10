'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { TrendingUp, Trophy, Plus } from 'lucide-react';
import { getTrendingNames, getNameOfDay } from '@/lib/aiEngine';
import { useStore } from '@/lib/store';
import { useCopy } from '@/hooks/useCopy';
import { generateId } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function TrendingNames() {
  const [submitName, setSubmitName] = useState('');
  const { copyCount, userNames, submitName: submitToStore, favorites } = useStore();
  const { copy, isCopied } = useCopy();

  const trending = getTrendingNames();
  const nameOfDay = getNameOfDay();

  const topCopied = Object.entries(copyCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const handleCopy = async (text: string) => {
    await copy(text, text);
    toast.success('Copied! 🔥', { duration: 1200, style: { background: '#1a1a2e', color: '#fff' } });
  };

  const handleSubmit = () => {
    if (!submitName.trim()) return;
    submitToStore({ id: generateId(), name: submitName, styleName: 'User Submitted', timestamp: Date.now(), likes: 0 });
    setSubmitName('');
    toast.success('Name submitted! 🎉', { style: { background: '#1a1a2e', color: '#fff' } });
  };

  return (
    <section id="trending" className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-black text-white">🔥 Trending Names</h2>
        <p className="text-gray-500 text-sm mt-1">Updated daily • Community favorites</p>
      </div>

      {/* Name of the Day */}
      <motion.div animate={{ boxShadow: ['0 0 20px rgba(245,158,11,0.2)', '0 0 40px rgba(245,158,11,0.4)', '0 0 20px rgba(245,158,11,0.2)'] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="bg-gradient-to-r from-yellow-600/10 to-orange-600/10 border border-yellow-500/30 rounded-2xl p-5 text-center">
        <p className="text-yellow-400 text-xs font-bold mb-2">⭐ NAME OF THE DAY</p>
        <p className="text-white text-2xl font-black">{nameOfDay}</p>
        <button onClick={() => handleCopy(nameOfDay)}
          className="mt-3 px-6 py-2 bg-yellow-500/20 text-yellow-400 rounded-xl text-sm font-medium hover:bg-yellow-500/30 transition-colors border border-yellow-500/30">
          {isCopied(nameOfDay) ? '✓ Copied!' : '📋 Copy This Name'}
        </button>
      </motion.div>

      {/* Trending today */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-orange-400" />
          <h3 className="text-white font-bold">Trending Today</h3>
        </div>
        {trending.map((name, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3 glass border border-white/5 rounded-xl p-3">
            <span className="text-gray-500 text-sm font-mono w-5">#{i + 1}</span>
            <p className="text-white font-bold flex-1">{name}</p>
            <div className="flex items-center gap-1 mr-2">
              <span className="text-xs text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full">🔥 Hot</span>
            </div>
            <button onClick={() => handleCopy(name)}
              className={`text-xs px-3 py-1 rounded-lg transition-colors ${isCopied(name) ? 'bg-green-500/10 text-green-400' : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20'}`}>
              {isCopied(name) ? '✓' : 'Copy'}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Most Copied Leaderboard */}
      {topCopied.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <h3 className="text-white font-bold">Most Copied (Your Session)</h3>
          </div>
          {topCopied.map(([name, count], i) => (
            <div key={i} className="flex items-center gap-3 glass border border-white/5 rounded-xl p-3">
              <span className="text-yellow-400 font-bold text-sm">#{i+1}</span>
              <p className="text-white flex-1 text-sm truncate">{name}</p>
              <span className="text-gray-500 text-xs">{count}× copied</span>
            </div>
          ))}
        </div>
      )}

      {/* User Submissions */}
      <div className="space-y-3">
        <h3 className="text-white font-bold flex items-center gap-2"><Plus className="w-4 h-4 text-green-400" /> Submit Your Name</h3>
        <div className="flex gap-2">
          <input type="text" value={submitName} onChange={e => setSubmitName(e.target.value)}
            placeholder="Your stylish name..."
            className="flex-1 bg-gaming-card border border-gaming-border rounded-xl px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/60 text-sm" />
          <button onClick={handleSubmit}
            className="px-4 py-2.5 bg-green-500/10 text-green-400 rounded-xl border border-green-500/20 hover:bg-green-500/20 transition-colors text-sm font-medium">
            Submit
          </button>
        </div>
        {userNames.slice(0,5).map((n, i) => (
          <div key={i} className="flex items-center justify-between glass border border-white/5 rounded-xl p-3">
            <p className="text-white text-sm">{n.name}</p>
            <button onClick={() => handleCopy(n.name)} className="text-xs text-purple-400 bg-purple-500/10 px-3 py-1 rounded-lg">{isCopied(n.name) ? '✓' : 'Copy'}</button>
          </div>
        ))}
      </div>
    </section>
  );
}