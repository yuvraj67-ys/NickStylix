export interface SymbolCategory {
  id: string;
  name: string;
  emoji: string;
  symbols: string[];
}

export const SYMBOL_CATEGORIES: SymbolCategory[] = [
  {
    id: 'weapons', name: 'Weapons', emoji: '⚔️',
    symbols: ['⚔️','🗡️','🔫','💣','🏹','🪃','⚙️','🛡️','🔱','☠️','⚰️','🪖','💥','🎯','🧨','🔪','⛏️','🪝','🔩'],
  },
  {
    id: 'fire', name: 'Fire & Power', emoji: '🔥',
    symbols: ['🔥','💥','⚡','✨','💫','🌟','⭐','🌠','☄️','🌪️','🌊','❄️','🌈','🌩️','🌋'],
  },
  {
    id: 'crowns', name: 'Crowns & Gold', emoji: '👑',
    symbols: ['👑','♛','♚','🏆','🥇','💎','💠','🔮','💍','🏅','🎖️','🥈','🎗️','⚜️','🔶'],
  },
  {
    id: 'attitude', name: 'Attitude', emoji: '😈',
    symbols: ['😈','👿','💀','☠️','🤬','😤','💪','🖤','🩸','🔞','⚠️','🚫','❌','🚨','💢'],
  },
  {
    id: 'flags', name: 'Flags', emoji: '🏳️',
    symbols: ['🇮🇳','🇵🇰','🇧🇩','🇳🇵','🇺🇸','🇬🇧','🇷🇺','🇧🇷','🇸🇦','🇦🇪','🇩🇪','🇯🇵','🇨🇳','🇰🇷','🇫🇷'],
  },
  {
    id: 'unicode_borders', name: 'Unicode Borders', emoji: '꧁',
    symbols: ['꧁','꧂','༒','༺','༻','✦','✤','彡','乂','×','✿','❀','★','☆','♡','♥','❤','✰','⚜','卍'],
  },
  {
    id: 'hearts', name: 'Hearts', emoji: '❤️',
    symbols: ['❤️','🖤','💜','💙','🤍','🩷','♡','❣️','💕','💞','💓','💗','💖','💝','🫀'],
  },
  {
    id: 'aesthetic', name: 'Aesthetic', emoji: '✨',
    symbols: ['ꪆ','᭄','꫁','ꦿ','᪦','ꪾ','꧇','꩜','᪩','᪫','᪬','᪭','꩟','ꫛ'],
  },
  {
    id: 'invisible', name: 'Invisible Space', emoji: '⬜',
    symbols: ['ㅤ','\u200B','\u2009','\u200A','\u2060','\uFEFF'],
  },
  {
    id: 'gaming', name: 'Gaming', emoji: '🎮',
    symbols: ['🎮','🕹️','🎯','🏃','🧠','⚡','🔑','🗺️','🏰','🧟','🧛','🦸','🦹','🧙','🧝'],
  },
  {
    id: 'nature', name: 'Nature', emoji: '🌿',
    symbols: ['🌿','🍃','🌺','🌸','🌼','🌻','🌹','🌷','🍀','🌱','🌾','🎋','🎍','🍁','🍂'],
  },
  {
    id: 'special_unicode', name: 'Special Unicode', emoji: '◈',
    symbols: ['◈','◉','◎','◐','◑','◒','◓','◔','◕','◖','◗','◘','◙','◚','◛','◜','◝','◞','◟','◠'],
  },
];

export const ALL_SYMBOLS = SYMBOL_CATEGORIES.flatMap(c => c.symbols);

export function getSymbolsByCategory(categoryId: string): string[] {
  return SYMBOL_CATEGORIES.find(c => c.id === categoryId)?.symbols ?? [];
}