// ============================================================
// NickStylix AI Engine - Local rule-based AI (No API needed)
// ============================================================

// ────── LARGE NAME DATABASES ──────────────────────────────

const MOOD_NAMES = {
  angry: [
    'xXBloodRageXx','💀WrathGod💀','꧁DemonKillerꨄ꧂','☠DeathStrike☠','🔥AngerFire🔥',
    '×AngrySoul×','༒DeathAngel༒','★RageWarrior★','꧁Destroyer꧂','🩸BloodThirst🩸',
    'KillerInstinct','꧁꫸AngerBeast꫸꧂','💢MadGunner💢','⚡WrathStorm⚡','꧁☠RAGE☠꧂',
    'DeadlyForce','BloodSeeker','AngerUnleashed','FuriousBeast','WrathOfGod',
  ],
  cool: [
    '꧁CoolBreeze꧂','★SilverWolf★','IceBluez','🌊CoolWaves🌊','𝓒𝓸𝓸𝓵𝓚𝓲𝓷𝓰',
    'FrostMaster','❄CoolFire❄','𝕮𝖔𝖔𝖑𝕲𝖚𝖞','CoolHunter','★IceKing★',
    '꧁FrostBite꧂','ColdBlood','SilverGhost','IceBreaker','FrostyKiller',
    'CoolVibes','BlueFrost','SubZero','IceDragon','CoolSniper',
  ],
  silent: [
    '𝓢𝓲𝓵𝓮𝓷𝓽𝓚𝓲𝓵𝓵𝓮𝓻','ShadowHunter','GhostWalker','꧁SilentDeath꧂','🌑SilentKill🌑',
    'QuietStorm','ThePhantom','SilentAssassin','GhostMode','ShadowBlade',
    'Invisible','UnseenKiller','SilentSniper','PhantomGhost','DarkSilence',
    'SilentFire','GhostKing','QuietKiller','ShadowSoul','SilentHunter',
  ],
  pro: [
    '꧁༒ProKiller༒꧂','𝓟𝓻𝓸𝓖𝓪𝓶𝓮𝓻','★ProSniper★','ElitePlayer','꧁ProMaster꧂',
    'GodLevel','ProHunter','EliteKiller','MasterBlaster','ProGodz',
    '⚔ProWarrior⚔','EliteSniper','ProDestroyer','GodOfWar','ProLegend',
    'TopPlayer','BeastMode','EliteGamer','ProKing','MasterKiller',
  ],
  cute: [
    '꒰CutiePie꒱','♡SweetHeart♡','✿FlowerGirl✿','🌸CherryBlossom🌸','꧁AngellFace꧂',
    'PrettyKiller','CuteDevil','SwaggerQueen','LovelyBeast','CutePro',
    '🦋ButterflyQueen🦋','SweetSniper','CuteWarrior','GirlGamer','PinkKiller',
    'CuteFire','SweetDestroyer','LovelyKiller','CuteGod','PrettyPro',
  ],
  killer: [
    '꧁☬KILLER☬꧂','💀HeadshotKing💀','⚡KillerInstinct⚡','GodOfKills','DeathDealer',
    'KillStreakGod','HeadshotMachine','NightKiller','SilentKiller','BeastKiller',
    '★KillerElite★','BloodKiller','InstantKill','KillCommand','DeathKiller',
    'KillerMode','PureKiller','BornKiller','TrueKiller','MasterKiller',
  ],
};

const PRO_TEMPLATES = [
  '꧁{name}OP꧂','★{name}Pro★','{name}TheKing','꧁༒{name}༒꧂',
  '⚡{name}⚡','🔥{name}🔥','꧁{name}꧂','×{name}×',
  '{name}YT','{name}Gaming','{name}FF','{name}Official',
  'Pro{name}','God{name}','King{name}','Elite{name}',
];

const BIO_TEMPLATES = {
  ff: [
    '🎮 Free Fire Player | 💀 {kills}+ Kills | ⚡ Headshot King\n🏆 Diamond Rank | 🔥 Pro Rusher\n📌 Follow for Gaming Tips',
    '👑 {name} | FF Pro Player 🎯\n💥 Top 1 Booyah Machine\n⚔️ Guild: ProKillers | DM for Collab',
    '🔫 Sniper God | 🎯 99% Headshot Rate\n💀 {name} - Born to Kill\n🏆 Gold Rank | India 🇮🇳',
  ],
  ig: [
    '✨ {name} | Content Creator 🎮\n🎯 Gaming + Tech | India 🇮🇳\n📧 DM for collab | Follow for daily posts',
    '🌟 Living my best life ✨\n🎮 Gamer | Creator | Explorer\n💫 {name} | Follow the journey',
    '🔥 {name} Official ✓\n🎯 Gamer by heart | Creator by choice\n🇮🇳 India | 💻 Tech Enthusiast',
  ],
  attitude: [
    "😈 I'm {name} | Don't Test Me 🔥\n💀 Haters are my motivators\n👑 Born to Rule | Made to Win",
    '⚡ {name} The Untouchable\n🖤 Too Cool for Basic People\n💎 Elite Not Average | Pro Life',
    "🔥 {name} | Attitude is Everything\n👊 I don't compete — I dominate\n💀 Silence is my weapon",
  ],
};

const MEANING_PARTS = {
  prefixes: ['The one who', 'Born to be', 'A soul of', 'Master of', 'Destroyer of', 'King of', 'Child of'],
  actions: ['conquers', 'dominates', 'rules', 'destroys', 'leads', 'inspires', 'protects'],
  qualities: ['fire', 'darkness', 'light', 'power', 'wisdom', 'courage', 'destiny', 'shadows', 'storms'],
};

const ROAST_TEMPLATES = [
  (n: string) => `${n}JiKaChota`,
  (n: string) => `${n}NoobPlayer`,
  (n: string) => `${n}KaBot`,
  (n: string) => `Noob${n}Ji`,
  (n: string) => `${n}404NotFound`,
  (n: string) => `${n}StillLearning`,
  (n: string) => `Bhai${n}Gaya`,
  (n: string) => `${n}LoserMode`,
];

const PERSONALITY_NAMES: Record<string, string[]> = {
  aggressive: ['BloodRaider','WarBeast','StormKiller','AggroGod','FullSend'],
  strategic: ['ShadowMind','TacticalGod','BrainSniper','SmartKiller','StrategyKing'],
  social: ['FriendlyFire','GuildLeader','TeamPlayer','ProCollab','SocialGod'],
  competitive: ['RankGrinder','TopChaser','EloClimber','ProLeague','WinOrDie'],
  creative: ['ArtKiller','UniqueStyle','CreativeGod','StylishPro','TrendSetter'],
};

// ────── AI FUNCTIONS ──────────────────────────────────────

export type Mood = 'angry' | 'cool' | 'silent' | 'pro' | 'cute' | 'killer';

export function generateByMood(mood: Mood): string[] {
  return MOOD_NAMES[mood] || MOOD_NAMES.cool;
}

export function calculateUniqueScore(name: string): { score: number; verdict: string; tips: string[] } {
  let score = 50;
  const tips: string[] = [];

  // Check unicode diversity
  const hasUnicode = /[^\x00-\x7F]/.test(name);
  if (hasUnicode) score += 15; else tips.push('Add Unicode font style for +15 score');

  // Check symbol usage
  const hasSymbols = /[☆★♡♛꧁꧂༒✦彡×]/.test(name);
  if (hasSymbols) score += 10; else tips.push('Add border symbols for +10 score');

  // Check length (optimal 6-12)
  const len = name.replace(/[^\x00-\x7F]/g, 'XX').length;
  if (len >= 6 && len <= 12) score += 10;
  else if (len < 4) { score -= 10; tips.push('Name too short, add more characters'); }
  else if (len > 16) { score -= 5; tips.push('Name too long, shorten it'); }

  // Check emoji usage
  const hasEmoji = /[\u{1F300}-\u{1F9FF}]/u.test(name);
  if (hasEmoji) score += 5; else tips.push('Add an emoji for +5 uniqueness');

  // Check all-caps
  const isAllCaps = name === name.toUpperCase() && /[A-Z]/.test(name);
  if (isAllCaps) score += 5;

  // Check common patterns (reduce score)
  const commonPatterns = ['xXx','pro','noob','king','god'];
  const hasCommon = commonPatterns.some(p => name.toLowerCase().includes(p));
  if (hasCommon) { score -= 10; tips.push('Avoid very common words like "pro", "god", "king"'); }

  score = Math.max(10, Math.min(100, score));

  let verdict = '';
  if (score >= 85) verdict = '🔥 Legendary! Ultra Unique!';
  else if (score >= 70) verdict = '⚡ Epic! Very Unique!';
  else if (score >= 55) verdict = '✅ Good! Fairly Unique';
  else if (score >= 40) verdict = '⚠️ Average. Can be improved';
  else verdict = '❌ Too Common. Needs work!';

  return { score, verdict, tips };
}

export function findSimilarNames(name: string): string[] {
  const results: string[] = [];
  const base = name.replace(/[^a-zA-Z]/g, '');

  // Prefix/suffix variations
  const prefixes = ['Pro', 'God', 'King', 'Dark', 'Shadow', 'Elite', 'Top', 'Real', 'The', 'Ultra'];
  const suffixes = ['YT', 'FF', 'Gaming', 'Pro', 'Official', 'HD', 'OP', 'GG', 'TM'];
  const borders = ['꧁', '★', '⚡', '🔥', '×', '♛'];

  prefixes.slice(0, 5).forEach(p => results.push(`${p}${base}`));
  suffixes.slice(0, 5).forEach(s => results.push(`${base}${s}`));
  borders.slice(0, 3).forEach(b => results.push(`${b}${base}${b}`));
  results.push(`${base}TheKing`, `${base}God`, `Pro${base}`, `The${base}`);

  return [...new Set(results)].slice(0, 15);
}

export function generateMeaning(name: string): string {
  const base = name.replace(/[^a-zA-Z]/g, '') || 'this name';
  const prefix = MEANING_PARTS.prefixes[base.charCodeAt(0) % MEANING_PARTS.prefixes.length];
  const action = MEANING_PARTS.actions[base.charCodeAt(Math.min(1, base.length-1)) % MEANING_PARTS.actions.length];
  const quality = MEANING_PARTS.qualities[base.charCodeAt(Math.min(2, base.length-1)) % MEANING_PARTS.qualities.length];
  return `"${name}" means: ${prefix} ${action} all ${quality}. A powerful warrior name that commands respect and fear. In gaming culture, this name represents unstoppable strength and skill.`;
}

export function createNickname(realName: string): string[] {
  const base = realName.replace(/[^a-zA-Z]/g, '');
  const short = base.slice(0, Math.min(4, base.length));
  const results = [
    `${short}YT`, `${short}Pro`, `${short}Gaming`, `The${short}`,
    `${short}Official`, `${short}FF`, `Pro${short}`, `God${short}`,
    `King${short}`, `${short}OP`,
  ];
  return results;
}

export function generateBio(name: string, style: 'ff' | 'ig' | 'attitude'): string {
  const templates = BIO_TEMPLATES[style];
  const template = templates[Math.floor(Math.random() * templates.length)];
  return template
    .replace(/{name}/g, name)
    .replace(/{kills}/g, String(Math.floor(Math.random() * 5000 + 1000)));
}

export function generateRoastName(name: string): string[] {
  const base = name.replace(/[^a-zA-Z0-9]/g, '') || 'Player';
  return ROAST_TEMPLATES.map(fn => fn(base));
}

export function personalityToName(traits: string[]): string[] {
  const results: string[] = [];
  traits.forEach(trait => {
    const names = PERSONALITY_NAMES[trait.toLowerCase()] || PERSONALITY_NAMES.competitive;
    results.push(...names.slice(0, 3));
  });
  return [...new Set(results)].slice(0, 12);
}

export function checkAvailability(name: string): { ff: boolean; ig: boolean; score: number } {
  const clean = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  const commonNames = ['player','gamer','king','pro','god','boss','sniper','killer','master','elite'];
  const isCommon = commonNames.some(c => clean.includes(c));
  const isShort = clean.length <= 4;
  const hasNumbers = /\d/.test(clean);
  const ffAvailable = !isCommon || hasNumbers;
  const igAvailable = !isCommon && clean.length > 5;
  const score = isCommon ? 30 : hasNumbers ? 65 : isShort ? 50 : 80;
  return { ff: ffAvailable, ig: igAvailable, score };
}

// FF-specific optimizer
export function optimizeForFF(name: string): Array<{name: string; length: number; compatible: boolean}> {
  const results = [];
  // Raw name
  results.push({ name, length: [...name].length, compatible: [...name].length <= 12 });
  // Shortened with border
  if (name.length > 8) {
    const short = name.slice(0, 6);
    results.push({ name: `꧁${short}꧂`, length: [...`꧁${short}꧂`].length, compatible: true });
    results.push({ name: `★${short}★`, length: [...`★${short}★`].length, compatible: true });
  }
  // With symbols
  results.push({ name: `⚡${name}⚡`, length: [...`⚡${name}⚡`].length, compatible: [...`⚡${name}⚡`].length <= 12 });
  results.push({ name: `꧁${name}꧂`, length: [...`꧁${name}꧂`].length, compatible: [...`꧁${name}꧂`].length <= 12 });
  return results.slice(0, 8);
}

// Guild name generator
export function generateGuildNames(theme: string): string[] {
  const bases = theme ? [theme, theme.slice(0,5), theme.slice(0,3).toUpperCase()] : ['Shadow','Elite','Storm','Fire','Blood'];
  const suffixes = ['Squad','Guild','Clan','Legion','Brotherhood','Force','Alliance','Empire'];
  const results: string[] = [];
  bases.forEach(b => {
    suffixes.slice(0,3).forEach(s => results.push(`꧁${b}${s}꧂`));
  });
  return results.slice(0, 12);
}

// Clan tag creator
export function generateClanTags(base: string): string[] {
  const b = (base || 'PRO').slice(0, 4).toUpperCase();
  return [`[${b}]`, `{${b}}`, `|${b}|`, `★${b}★`, `꧁${b}꧂`, `【${b}】`, `《${b}》`, `⟦${b}⟧`];
}

// Trending names (changes daily based on date)
export function getTrendingNames(): string[] {
  const day = new Date().getDate();
  const allTrending = [
    ['꧁༒☬KILLER☬༒꧂','★ShadowWolf★','⚡GodOfFF⚡','BloodKing','SilentSniper'],
    ['🔥ProHunter🔥','★EliteGamer★','꧁DarkKnight꧂','GhostMode','HeadshotKing'],
    ['💀WrathGod💀','⚔️WarBeast⚔️','꧁IceKing꧂','StormBreaker','NightKiller'],
    ['🌑ShadowBeast🌑','★KillerGod★','꧁ProMaster꧂','BloodMoon','DeathStrike'],
    ['⚡LightningKing⚡','★FireBeast★','꧁DemonSlayer꧂','SilentWolf','EliteHunter'],
  ];
  return allTrending[day % allTrending.length];
}

export function getNameOfDay(): string {
  const names = ['꧁༒☬LegendKiller☬༒꧂','★EliteGodOfFF★','⚡SilentDestroyer⚡','꧁ProWarriorElite꧂','BloodMoonKing'];
  return names[new Date().getDate() % names.length];
}