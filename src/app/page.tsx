'use client';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NameInput from '@/components/NameInput';
import StyleGrid from '@/components/StyleGrid';
import SymbolPicker from '@/components/SymbolPicker';

const GamingTools = dynamic(() => import('@/components/GamingTools'), { ssr: false });
const AITools = dynamic(() => import('@/components/AITools'), { ssr: false });
const TrendingNames = dynamic(() => import('@/components/TrendingNames'), { ssr: false });
const NameBattle = dynamic(() => import('@/components/NameBattle'), { ssr: false });
const FavoritesList = dynamic(() => import('@/components/FavoritesList'), { ssr: false });

const STATS = [
  { value: '100+', label: 'Font Styles', icon: '✦' },
  { value: 'Free', label: 'Forever', icon: '🎁' },
  { value: 'No', label: 'Login Needed', icon: '🔓' },
  { value: '⚡', label: 'Instant Results', icon: '⚡' },
];

const FAQ_ITEMS = [
  { q: 'How to get stylish name for Free Fire?', a: 'Type your name in NickStylix, choose from 100+ Unicode styles, and copy. Paste directly in your Free Fire profile name!' },
  { q: 'Best stylish name generator for FF 2025?', a: 'NickStylix offers 100+ Unicode font styles, AI name generator, FF optimizer (12 char limit), invisible characters, and much more — all free!' },
  { q: 'What is invisible character for Free Fire name?', a: 'Invisible characters like ㅤ (Hangul Filler) appear blank in Free Fire names, creating unique spacing effects. Find them in our Gaming → Invisible tab.' },
  { q: 'Can I use these names on Instagram?', a: 'Yes! All our styles work on Instagram bio and username. Use the bio generator for a complete Instagram aesthetic!' },
  { q: 'How to copy Unicode stylish name?', a: 'Click any name card to copy it instantly to your clipboard. Then paste it anywhere — FF, BGMI, Instagram, WhatsApp!' },
  { q: 'Does it work on mobile?', a: 'Yes! NickStylix is mobile-first. Works perfectly on Android and iOS browsers.' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gaming-dark grid-bg">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 pb-20">
        {/* Hero */}
        <section className="py-12 text-center space-y-6">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-xs bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full border border-purple-500/30 mb-4 font-medium">
              🔥 #1 Stylish Name Generator 2025
            </span>
            <h1 className="responsive-hero text-4xl md:text-5xl font-black text-white leading-tight">
              Generate{' '}
              <span className="gradient-text">Stylish Names</span>
              <br />
              for Free Fire & Instagram
            </h1>
            <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
              100+ Unicode font styles • AI name generator • FF optimizer
              <br />
              <span className="text-purple-400">Free • Instant • No login required</span>
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="grid grid-cols-4 gap-3">
            {STATS.map((stat, i) => (
              <div key={i} className="glass-purple rounded-2xl p-3 text-center">
                <p className="text-xl font-black gradient-text">{stat.value}</p>
                <p className="text-gray-500 text-xs">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Main Tool */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="space-y-6">
          <NameInput />
          <SymbolPicker />
          <StyleGrid />
        </motion.section>

        {/* Separator */}
        <div className="my-16 border-t border-white/5" />

        {/* Gaming Tools */}
        <GamingTools />
        <div className="my-16 border-t border-white/5" />

        {/* AI Tools */}
        <AITools />
        <div className="my-16 border-t border-white/5" />

        {/* Trending */}
        <TrendingNames />
        <div className="my-16 border-t border-white/5" />

        {/* Battle */}
        <NameBattle />
        <div className="my-16 border-t border-white/5" />

        {/* Favorites */}
        <FavoritesList />

        {/* FAQ - SEO */}
        <section className="mt-16 space-y-4">
          <h2 className="text-xl font-black text-white">❓ Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <details key={i} className="glass border border-white/5 rounded-2xl p-4 group">
                <summary className="text-white font-medium cursor-pointer list-none flex items-center justify-between">
                  {item.q}
                  <span className="text-gray-500 ml-2">▾</span>
                </summary>
                <p className="text-gray-400 text-sm mt-3 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}