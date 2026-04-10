'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Brain, Smile, Zap, Star, Hash, MessageSquare, Laugh, User } from 'lucide-react';
import { 
  generateByMood, calculateUniqueScore, findSimilarNames, generateBio,
  createNickname, generateMeaning, generateRoastName, personalityToName,
  checkAvailability, type Mood 
} from '@/lib/aiEngine';
import { useStore } from '@/lib/store';
import { useCopy } from '@/hooks/useCopy';
import toast from 'react-hot-toast';

const MOODS: {id: Mood, label: string, color: string}[] = [
  { id: 'angry', label: '😡 Angry', color: 'red' },
  { id: 'cool', label: '😎 Cool', color: 'blue' },
  { id: 'silent', label: '🌑 Silent', color: 'gray' },
  { id: 'pro', label: '⚡ Pro', color: 'yellow' },
  { id: 'cute', label: '🌸 Cute', color: 'pink' },
  { id: 'killer', label: '💀 Killer', color: 'red' },
];

const PERSONALITY_OPTIONS = [
  {id:'aggressive', label:'⚔️ Aggressive'}, {id:'strategic', label:'🧠 Strategic'},
  {id:'social', label:'🤝 Social'}, {id:'competitive', label:'🏆 Competitive'},
  {id:'creative', label:'🎨 Creative'},
];

export default function AITools() {
  const [tab, setTab] = useState<'mood'|'score'|'similar'|'bio'|'nick'|'meaning'|'roast'|'quiz'>('mood');
  const [selectedMood, setSelectedMood] = useState<Mood>('cool');
  const [moodNames, setMoodNames] = useState<string[]>([]);
  const [bioStyle, setBioStyle] = useState<'ff'|'ig'|'attitude'>('ff');
  const [bio, setBio] = useState('');
  const [nicknames, setNicknames] = useState<string[]>([]);
  const [meaning, setMeaning] = useState('');
  const [roastNames, setRoastNames] = useState<string[]>([]);
  const [similarNames, setSimilarNames] = useState<string[]>([]);
  const [scoreData, setScoreData] = useState<ReturnType<typeof calculateUniqueScore> | null>(null);
  const [availability, setAvailability] = useState<ReturnType<typeof checkAvailability> | null>(null);
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [personalityNames, setPersonalityNames] = useState<string[]>([]);
  const { inputName } = useStore();
  const { copy, isCopied } = useCopy();

  const handleCopy = async (text: string) => {
    await copy(text, text);
    toast.success('Copied! 🤖', { duration: 1200, style: { background: '#1a1a2e', color: '#fff' } });
  };

  const tabs = [
    {id:'mood',label:'😤 Mood',icon:Smile},{id:'score',label:'⭐ Score',icon:Star},
    {id:'similar',label:'🔍 Similar',icon:Hash},{id:'bio',label:'📝 Bio',icon:MessageSquare},
    {id:'nick',label:'🎭 Nick',icon:User},{id:'meaning',label:'📖 Meaning',icon:Brain},
    {id:'roast',label:'😂 Roast',icon:Laugh},{id:'quiz',label:'🧠 Quiz',icon:Zap},
  ] as const;

  return (
    <section id="ai-tools" className="space-y-5">
      <div className="text-center">
        <h2 className="text-2xl font-black text-white">🤖 AI Name Studio</h2>
        <p className="text-gray-500 text-sm mt-1">Smart tools — No internet needed</p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-4 gap-1.5">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`py-2 px-1 rounded-xl text-xs font-medium transition-all border ${tab === t.id ? 'bg-purple-600/20 text-purple-300 border-purple-500/40' : 'glass text-gray-500 border-white/5 hover:text-gray-300'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Mood Names */}
      {tab === 'mood' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {MOODS.map(m => (
              <button key={m.id} onClick={() => setSelectedMood(m.id)}
                className={`py-2 rounded-xl text-sm font-medium border transition-all ${selectedMood === m.id ? 'bg-purple-600/20 border-purple-500/40 text-white' : 'glass border-white/5 text-gray-400'}`}>
                {m.label}
              </button>
            ))}
          </div>
          <button onClick={() => setMoodNames(generateByMood(selectedMood))}
            className="btn-primary w-full">Generate {selectedMood.toUpperCase()} Names ⚡</button>
          {moodNames.length > 0 && (
            <div className="grid grid-cols-1 gap-2">
              {moodNames.map((name, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between glass border border-white/5 rounded-xl p-3">
                  <p className="text-white font-bold">{name}</p>
                  <button onClick={() => handleCopy(name)}
                    className={`text-xs px-3 py-1 rounded-lg transition-colors ${isCopied(name) ? 'text-green-400 bg-green-500/10' : 'text-purple-400 bg-purple-500/10 hover:bg-purple-500/20'}`}>
                    {isCopied(name) ? '✓' : 'Copy'}
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Unique Score */}
      {tab === 'score' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <button onClick={() => { setScoreData(calculateUniqueScore(inputName || 'TestName')); setAvailability(checkAvailability(inputName || 'TestName')); }}
            className="btn-primary w-full">Analyze: "{inputName || 'TestName'}"</button>
          {scoreData && (
            <div className="space-y-4">
              {/* Score bar */}
              <div className="bg-gaming-card border border-gaming-border rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold text-lg">Unique Score</span>
                  <span className={`text-3xl font-black ${scoreData.score >= 70 ? 'text-green-400' : scoreData.score >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {scoreData.score}
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${scoreData.score}%` }}
                    className={`h-full rounded-full ${scoreData.score >= 70 ? 'bg-green-500' : scoreData.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                </div>
                <p className="text-white font-semibold">{scoreData.verdict}</p>
                <div className="space-y-2">
                  {scoreData.tips.map((tip, i) => <p key={i} className="text-yellow-400 text-sm">💡 {tip}</p>)}
                </div>
              </div>
              {/* Availability */}
              {availability && (
                <div className="bg-gaming-card border border-gaming-border rounded-2xl p-4">
                  <p className="text-white font-bold mb-3">📊 Availability Check</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className={`rounded-xl p-3 border ${availability.ff ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                      <p className="text-xs text-gray-400">Free Fire</p>
                      <p className={`font-bold ${availability.ff ? 'text-green-400' : 'text-red-400'}`}>{availability.ff ? '✅ Likely Available' : '⚠️ Maybe Taken'}</p>
                    </div>
                    <div className={`rounded-xl p-3 border ${availability.ig ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                      <p className="text-xs text-gray-400">Instagram</p>
                      <p className={`font-bold ${availability.ig ? 'text-green-400' : 'text-red-400'}`}>{availability.ig ? '✅ Try it!' : '⚠️ Very Common'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}

      {/* Similar Names */}
      {tab === 'similar' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <button onClick={() => setSimilarNames(findSimilarNames(inputName || 'Gamer'))}
            className="btn-primary w-full">Find Similar to "{inputName || 'Gamer'}"</button>
          {similarNames.map((name, i) => (
            <div key={i} className="flex items-center justify-between glass border border-white/5 rounded-xl p-3">
              <p className="text-white">{name}</p>
              <button onClick={() => handleCopy(name)} className="text-xs text-purple-400 bg-purple-500/10 px-3 py-1 rounded-lg">{isCopied(name) ? '✓' : 'Copy'}</button>
            </div>
          ))}
        </motion.div>
      )}

      {/* Bio Generator */}
      {tab === 'bio' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="flex gap-2">
            {(['ff','ig','attitude'] as const).map(s => (
              <button key={s} onClick={() => setBioStyle(s)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${bioStyle === s ? 'bg-purple-600/20 border-purple-500/40 text-white' : 'glass border-white/5 text-gray-400'}`}>
                {s === 'ff' ? '🎮 FF' : s === 'ig' ? '📸 IG' : '😈 Attitude'}
              </button>
            ))}
          </div>
          <button onClick={() => setBio(generateBio(inputName || 'Player', bioStyle))}
            className="btn-primary w-full">Generate Bio ✨</button>
          {bio && (
            <div className="bg-gaming-card border border-gaming-border rounded-2xl p-4 space-y-3">
              <pre className="text-white text-sm whitespace-pre-wrap font-sans">{bio}</pre>
              <button onClick={() => handleCopy(bio)}
                className="w-full py-2 bg-purple-500/10 text-purple-400 rounded-xl text-sm hover:bg-purple-500/20 transition-colors">
                {isCopied(bio) ? '✓ Copied!' : '📋 Copy Bio'}
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* Nickname Creator */}
      {tab === 'nick' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <button onClick={() => setNicknames(createNickname(inputName || 'Yuvraj'))}
            className="btn-primary w-full">Create Nicknames for "{inputName || 'Yuvraj'}"</button>
          {nicknames.map((n, i) => (
            <div key={i} className="flex items-center justify-between glass border border-white/5 rounded-xl p-3">
              <p className="text-white font-medium">{n}</p>
              <button onClick={() => handleCopy(n)} className="text-xs text-purple-400 bg-purple-500/10 px-3 py-1 rounded-lg">{isCopied(n) ? '✓' : 'Copy'}</button>
            </div>
          ))}
        </motion.div>
      )}

      {/* Meaning Generator */}
      {tab === 'meaning' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <button onClick={() => setMeaning(generateMeaning(inputName || 'Shadow'))}
            className="btn-primary w-full">Discover Meaning of "{inputName || 'Shadow'}"</button>
          {meaning && (
            <div className="bg-gaming-card border border-purple-500/20 rounded-2xl p-5">
              <p className="text-purple-300 text-sm leading-relaxed">{meaning}</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Roast Names */}
      {tab === 'roast' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-3">
            <p className="text-yellow-400 text-xs">😂 Just for fun! Roast your name in a funny way</p>
          </div>
          <button onClick={() => setRoastNames(generateRoastName(inputName || 'Noob'))}
            className="w-full py-3 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-400 font-medium hover:bg-orange-500/20 transition-colors">
            😂 Roast "{inputName || 'Noob'}"
          </button>
          {roastNames.map((n, i) => (
            <div key={i} className="flex items-center justify-between glass border border-white/5 rounded-xl p-3">
              <p className="text-yellow-300">{n}</p>
              <button onClick={() => handleCopy(n)} className="text-xs text-orange-400 bg-orange-500/10 px-3 py-1 rounded-lg">{isCopied(n) ? '✓' : 'Copy'}</button>
            </div>
          ))}
        </motion.div>
      )}

      {/* Personality Quiz */}
      {tab === 'quiz' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <p className="text-gray-400 text-sm">Select your gaming personality:</p>
          <div className="grid grid-cols-2 gap-2">
            {PERSONALITY_OPTIONS.map(opt => (
              <button key={opt.id} onClick={() => setSelectedTraits(prev => prev.includes(opt.id) ? prev.filter(p => p !== opt.id) : [...prev, opt.id])}
                className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${selectedTraits.includes(opt.id) ? 'bg-purple-600/20 border-purple-500/40 text-white' : 'glass border-white/5 text-gray-400'}`}>
                {opt.label}
              </button>
            ))}
          </div>
          <button onClick={() => setPersonalityNames(personalityToName(selectedTraits.length ? selectedTraits : ['competitive']))}
            className="btn-primary w-full">Get My Names 🧠</button>
          {personalityNames.map((n, i) => (
            <div key={i} className="flex items-center justify-between glass border border-white/5 rounded-xl p-3">
              <p className="text-white font-medium">{n}</p>
              <button onClick={() => handleCopy(n)} className="text-xs text-purple-400 bg-purple-500/10 px-3 py-1 rounded-lg">{isCopied(n) ? '✓' : 'Copy'}</button>
            </div>
          ))}
        </motion.div>
      )}
    </section>
  );
}