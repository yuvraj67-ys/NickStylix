'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Copy, Check, Target, Users, Tag, Zap, Eye } from 'lucide-react';
import { optimizeForFF, generateGuildNames, generateClanTags } from '@/lib/aiEngine';
import { useStore } from '@/lib/store';
import { useCopy } from '@/hooks/useCopy';
import { INVISIBLE_CHARS } from '@/lib/fonts';
import toast from 'react-hot-toast';

const PRO_TEMPLATES = [
  '꧁༒☬ProKiller☬༒꧂','★SilentKing★','꧁EliteSniper꧂','🔥GodOfFF🔥',
  '⚡BloodRage⚡','꧁DarkHunter꧂','★HeadshotKing★','💀WrathGod💀',
  '꧁ShadowBeast꧂','★DeathStrike★','꧁FireStorm꧂','⚡KillStreak⚡',
];

export default function GamingTools() {
  const [tab, setTab] = useState<'ff'|'guild'|'clan'|'pro'|'invisible'>('ff');
  const [guildTheme, setGuildTheme] = useState('');
  const [clanBase, setClanBase] = useState('');
  const { inputName, setInputName } = useStore();
  const { copy, isCopied } = useCopy();

  const ffResults = inputName ? optimizeForFF(inputName) : [];
  const guildResults = generateGuildNames(guildTheme);
  const clanResults = generateClanTags(clanBase || inputName || 'PRO');

  const handleCopy = async (text: string) => {
    await copy(text, text);
    toast.success('Copied! 🎮', { duration: 1500, style: { background: '#1a1a2e', color: '#fff' } });
  };

  const tabs = [
    { id: 'ff', label: '🎯 FF Optimizer', icon: Target },
    { id: 'guild', label: '⚔️ Guild Names', icon: Users },
    { id: 'clan', label: '🏷️ Clan Tags', icon: Tag },
    { id: 'pro', label: '👑 Pro Templates', icon: Zap },
    { id: 'invisible', label: '👻 Invisible', icon: Eye },
  ] as const;

  return (
    <section id="gaming" className="space-y-5">
      <div className="text-center">
        <h2 className="text-2xl font-black text-white">🎮 Gaming Special Tools</h2>
        <p className="text-gray-500 text-sm mt-1">Free Fire • BGMI • Guild • Clan</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${tab === t.id ? 'bg-purple-600/20 text-purple-300 border-purple-500/40' : 'glass text-gray-400 border-white/5'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* FF Optimizer */}
      {tab === 'ff' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <p className="text-sm text-gray-500">Optimized versions of your name for Free Fire (max 12 chars)</p>
          {!inputName && <p className="text-yellow-400 text-sm">⚠️ Type a name above first</p>}
          {ffResults.map((item, i) => (
            <div key={i} className="flex items-center gap-3 bg-gaming-card border border-gaming-border rounded-xl p-3">
              <div className="flex-1">
                <p className="text-white font-bold">{item.name}</p>
                <p className={`text-xs ${item.compatible ? 'text-green-400' : 'text-red-400'}`}>
                  {item.length} chars • {item.compatible ? '✓ FF Ready' : '✗ Too Long'}
                </p>
              </div>
              <button onClick={() => handleCopy(item.name)}
                className={`p-2 rounded-lg transition-colors ${isCopied(item.name) ? 'bg-green-500/10 text-green-400' : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20'}`}>
                {isCopied(item.name) ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          ))}
        </motion.div>
      )}

      {/* Guild Names */}
      {tab === 'guild' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <input type="text" value={guildTheme} onChange={e => setGuildTheme(e.target.value)}
            placeholder="Enter theme (e.g. Shadow, Fire, Elite...)"
            className="w-full bg-gaming-card border border-gaming-border rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/60" />
          <div className="grid grid-cols-2 gap-2">
            {guildResults.map((name, i) => (
              <button key={i} onClick={() => handleCopy(name)}
                className="card-hover glass border border-white/5 rounded-xl p-3 text-left relative group">
                <p className="text-white text-sm font-medium">{name}</p>
                {isCopied(name) && <Check className="w-3 h-3 text-green-400 absolute top-2 right-2" />}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Clan Tags */}
      {tab === 'clan' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <input type="text" value={clanBase} onChange={e => setClanBase(e.target.value)}
            placeholder="Clan base (max 4 chars, e.g. PRO)"
            maxLength={4}
            className="w-full bg-gaming-card border border-gaming-border rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/60" />
          <div className="grid grid-cols-2 gap-2">
            {clanResults.map((tag, i) => (
              <button key={i} onClick={() => handleCopy(tag)}
                className="card-hover glass border border-white/5 rounded-xl p-3 text-center">
                <p className="text-purple-300 text-lg font-bold">{tag}</p>
                {isCopied(tag) && <span className="text-green-400 text-xs">Copied!</span>}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Pro Templates */}
      {tab === 'pro' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-2">
          {PRO_TEMPLATES.map((tmpl, i) => (
            <div key={i} className="card-hover glass border border-white/5 rounded-xl p-3 flex items-center justify-between">
              <p className="text-white text-sm font-bold flex-1 break-all">{tmpl}</p>
              <div className="flex gap-1 ml-2">
                <button onClick={() => setInputName(tmpl.replace(/[꧁꧂★⚡🔥💀]/g,'').trim())}
                  className="text-xs text-blue-400 hover:text-blue-300 px-2 py-1 rounded-lg bg-blue-500/10">Use</button>
                <button onClick={() => handleCopy(tmpl)}
                  className="text-xs text-purple-400 hover:text-purple-300 px-2 py-1 rounded-lg bg-purple-500/10">Copy</button>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Invisible Characters */}
      {tab === 'invisible' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
            <p className="text-blue-300 font-semibold text-sm">💡 FF Trick</p>
            <p className="text-gray-400 text-xs mt-1">Use invisible characters in your FF name to create unique spacing effects</p>
          </div>
          {Object.entries(INVISIBLE_CHARS).map(([key, val]) => (
            <div key={key} className="flex items-center justify-between glass border border-white/5 rounded-xl p-3">
              <div>
                <p className="text-white text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                <p className="text-gray-500 text-xs">Unicode: U+{val.charCodeAt(0).toString(16).toUpperCase().padStart(4,'0')}</p>
              </div>
              <button onClick={() => handleCopy(val)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${isCopied(val) ? 'bg-green-500/10 text-green-400' : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20'}`}>
                {isCopied(val) ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          ))}
          {/* Invisible name generator */}
          <div className="bg-gaming-card border border-gaming-border rounded-xl p-4 space-y-3">
            <p className="text-white font-semibold text-sm">Generate Invisible Name</p>
            <div className="flex gap-2">
              {[1,2,3,4,5].map(n => (
                <button key={n} onClick={() => handleCopy(INVISIBLE_CHARS.hangulFiller.repeat(n))}
                  className="flex-1 py-2 glass rounded-xl text-xs text-gray-400 hover:text-purple-400 hover:border-purple-500/30 border border-white/5">
                  ×{n}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}