'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { calculateUniqueScore } from '@/lib/aiEngine';

export default function NameBattle() {
  const [nameA, setNameA] = useState('');
  const [nameB, setNameB] = useState('');
  const [result, setResult] = useState<null | {a: ReturnType<typeof calculateUniqueScore>, b: ReturnType<typeof calculateUniqueScore>, winner: string}>(null);

  const battle = () => {
    if (!nameA || !nameB) return;
    const a = calculateUniqueScore(nameA);
    const b = calculateUniqueScore(nameB);
    const winner = a.score > b.score ? nameA : b.score > a.score ? nameB : '🤝 Draw!';
    setResult({ a, b, winner });
  };

  const colorMap: Record<string, { border: string; text: string; bg: string }> = {
    blue: { border: 'border-blue-500/30', text: 'text-blue-400', bg: 'bg-gaming-card' },
    red: { border: 'border-red-500/30', text: 'text-red-400', bg: 'bg-gaming-card' },
  };

  return (
    <section className="space-y-5">
      <div className="text-center">
        <h2 className="text-2xl font-black text-white">⚔️ Name Battle</h2>
        <p className="text-gray-500 text-sm mt-1">Compare 2 names — Who wins?</p>
      </div>
      <div className="grid grid-cols-5 gap-3 items-center">
        <div className="col-span-2">
          <input type="text" value={nameA} onChange={e => setNameA(e.target.value)}
            placeholder="Name A" className="w-full bg-gaming-card border border-blue-500/30 rounded-xl px-4 py-3 text-white text-center font-bold focus:outline-none focus:border-blue-500/60" />
        </div>
        <div className="col-span-1 flex justify-center">
          <div className="vs-text">VS</div>
        </div>
        <div className="col-span-2">
          <input type="text" value={nameB} onChange={e => setNameB(e.target.value)}
            placeholder="Name B" className="w-full bg-gaming-card border border-red-500/30 rounded-xl px-4 py-3 text-white text-center font-bold focus:outline-none focus:border-red-500/60" />
        </div>
      </div>
      <button onClick={battle} className="btn-primary w-full text-lg">⚔️ BATTLE!</button>
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[{name: nameA, data: result.a, cls: colorMap.blue}, {name: nameB, data: result.b, cls: colorMap.red}].map(({name, data, cls}, idx) => (
                <div key={`battle-${idx}`} className={`${cls.bg} border ${cls.border} rounded-2xl p-4 text-center`}>
                  <p className="text-white font-bold text-lg mb-2">{name}</p>
                  <p className={`text-4xl font-black ${cls.text}`}>{data.score}</p>
                  <p className="text-xs text-gray-400 mt-1">{data.verdict.split('!')[0]}</p>
                </div>
              ))}
            </div>
            <motion.div animate={{ boxShadow: ['0 0 20px rgba(245,158,11,0.3)', '0 0 40px rgba(245,158,11,0.6)', '0 0 20px rgba(245,158,11,0.3)'] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-5 text-center">
              <p className="text-yellow-400 text-sm font-bold mb-1">🏆 WINNER</p>
              <p className="text-white text-2xl font-black">{result.winner}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}