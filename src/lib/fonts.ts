// ============================================================
// NickStylix - Complete Unicode Font Library
// 100+ Styles for Free Fire, BGMI, Instagram
// ============================================================

const NORMAL_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

// Unicode character maps for each style
const BOLD = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗';
const ITALIC = '𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻0123456789';
const BOLD_ITALIC = '𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯0123456789';
const FRAKTUR = '𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷0123456789';
const DOUBLE_STRUCK = '𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡';
const SCRIPT = '𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏0123456789';
const BOLD_SCRIPT = '𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃0123456789';
const MONO = '𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣0123456789';
const FULLWIDTH = 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ０１２３４５６７８９';

// Superscript & Subscript
const SUPER_MAP: Record<string, string> = {
  'a':'ᵃ','b':'ᵇ','c':'ᶜ','d':'ᵈ','e':'ᵉ','f':'ᶠ','g':'ᵍ','h':'ʰ','i':'ⁱ','j':'ʲ',
  'k':'ᵏ','l':'ˡ','m':'ᵐ','n':'ⁿ','o':'ᵒ','p':'ᵖ','q':'ᑫ','r':'ʳ','s':'ˢ','t':'ᵗ',
  'u':'ᵘ','v':'ᵛ','w':'ʷ','x':'ˣ','y':'ʸ','z':'ᶻ','A':'ᴬ','B':'ᴮ','C':'ᶜ','D':'ᴰ',
  'E':'ᴱ','F':'ᶠ','G':'ᴳ','H':'ᴴ','I':'ᴵ','J':'ᴶ','K':'ᴷ','L':'ᴸ','M':'ᴹ','N':'ᴺ',
  'O':'ᴼ','P':'ᴾ','Q':'Q','R':'ᴿ','S':'ˢ','T':'ᵀ','U':'ᵁ','V':'ⱽ','W':'ᵂ','X':'ˣ',
  'Y':'ʸ','Z':'ᶻ','0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹',
};

const SUB_MAP: Record<string, string> = {
  'a':'ₐ','e':'ₑ','h':'ₕ','i':'ᵢ','j':'ⱼ','k':'ₖ','l':'ₗ','m':'ₘ','n':'ₙ','o':'ₒ',
  'p':'ₚ','r':'ᵣ','s':'ₛ','t':'ₜ','u':'ᵤ','v':'ᵥ','x':'ₓ','0':'₀','1':'₁','2':'₂',
  '3':'₃','4':'₄','5':'₅','6':'₆','7':'₇','8':'₈','9':'₉',
};

// Small Caps
const SMALL_CAPS: Record<string, string> = {
  'a':'ᴀ','b':'ʙ','c':'ᴄ','d':'ᴅ','e':'ᴇ','f':'ꜰ','g':'ɢ','h':'ʜ','i':'ɪ','j':'ᴊ',
  'k':'ᴋ','l':'ʟ','m':'ᴍ','n':'ɴ','o':'ᴏ','p':'ᴘ','q':'Q','r':'ʀ','s':'ꜱ','t':'ᴛ',
  'u':'ᴜ','v':'ᴠ','w':'ᴡ','x':'x','y':'ʏ','z':'ᴢ',
};

// Circled letters
const CIRCLED_UPPER = 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ';
const CIRCLED_LOWER = 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ';

// Upside down
const UPSIDE_DOWN_MAP: Record<string, string> = {
  'a':'ɐ','b':'q','c':'ɔ','d':'p','e':'ǝ','f':'ɟ','g':'ƃ','h':'ɥ','i':'ᴉ','j':'ɾ',
  'k':'ʞ','l':'l','m':'ɯ','n':'u','o':'o','p':'d','q':'b','r':'ɹ','s':'s','t':'ʇ',
  'u':'n','v':'ʌ','w':'ʍ','x':'x','y':'ʎ','z':'z','A':'∀','B':'ᗺ','C':'Ɔ','D':'ᗡ',
  'E':'Ǝ','F':'Ⅎ','G':'ᓮ','H':'H','I':'I','J':'ᒋ','K':'ʞ','L':'⅂','M':'W','N':'N',
  'O':'O','P':'Ԁ','Q':'Q','R':'ᴚ','S':'S','T':'┴','U':'∩','V':'Λ','W':'M','X':'X',
  'Y':'⅄','Z':'Z','0':'0','1':'Ɩ','2':'ᄅ','3':'Ɛ','4':'ㄣ','5':'ϛ','6':'9','7':'ㄥ','8':'8','9':'6',
};

// Mirror/Reverse map
const MIRROR_MAP: Record<string, string> = {
  'a':'ɒ','b':'d','c':'ɔ','d':'b','e':'ɘ','f':'ꟻ','g':'ϱ','h':'ʜ','i':'i','j':'ꞁ',
  'k':'ʞ','l':'l','m':'m','n':'n','o':'o','p':'q','q':'p','r':'ɿ','s':'ƨ','t':'ƚ',
  'u':'u','v':'v','w':'w','x':'x','y':'y','z':'z',
};

// Bubble/Negative circled
const NEGATIVE_CIRCLED = '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩';

// Strikethrough combining character
// Underline combining character

function charConvert(text: string, fromChars: string, toChars: string): string {
  return text.split('').map(char => {
    const idx = fromChars.indexOf(char);
    return idx !== -1 ? toChars[idx] : char;
  }).join('');
}

function mapConvert(text: string, map: Record<string, string>): string {
  return text.split('').map(c => map[c] ?? c).join('');
}

function addCombining(text: string, combiner: string): string {
  return text.split('').map(c => c + combiner).join('');
}

// Border/Decoration styles
function withBorder(text: string, style: number): string {
  const borders = [
    ['꧁༒☬', '☬༒꧂'], ['꧁༺', '༻꧂'], ['꧁✤✦', '✦✤꧂'],
    ['꧁☆彡', '彡☆꧂'], ['【', '】'], ['⟦', '⟧'],
    ['★彡', '彡★'], ['✰', '✰'], ['♛', '♛'],
    ['乂', '乂'], ['🔥', '🔥'], ['⚡', '⚡'],
    ['💀', '💀'], ['👑', '👑'], ['༒', '༒'],
    ['᭄', '᭄'], ['꧁𓆩', '𓆪꧂'], ['꧁𓀐', '𓀐꧂'],
    ['×͜×', '×͜×'], ['ꧧ꧀', '꧀ꧧ'],
    ['『', '』'], ['「', '」'], ['《', '》'],
    ['〖', '〗'], ['⋆', '⋆'], ['◤', '◥'],
    ['▶', '◀'], ['✿', '✿'], ['❀', '❀'],
    ['♡', '♡'],
  ];
  const b = borders[style % borders.length];
  return `${b[0]}${text}${b[1]}`;
}

// ============================================================
// MAIN STYLE DEFINITIONS - 100+ Styles
// ============================================================

export interface FontStyle {
  id: number;
  name: string;
  category: 'Basic' | 'Gamer' | 'Attitude' | 'Cute' | 'Border' | 'Special' | 'Animated';
  preview: string;
  convert: (text: string) => string;
  ffCompatible: boolean;
}

export const FONT_STYLES: FontStyle[] = [
  // ── BASIC UNICODE ────────────────────────────────────────
  { id: 1, name: 'Bold', category: 'Basic', preview: '𝗕𝗼𝗹𝗱', ffCompatible: true,
    convert: (t) => charConvert(t, NORMAL_CHARS.slice(0,52), '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇') },
  { id: 2, name: 'Italic', category: 'Basic', preview: '𝘐𝘵𝘢𝘭𝘪𝘤', ffCompatible: true,
    convert: (t) => charConvert(t, NORMAL_CHARS.slice(0,52), ITALIC) },
  { id: 3, name: 'Bold Italic', category: 'Basic', preview: '𝙱𝚘𝚕𝚍', ffCompatible: true,
    convert: (t) => charConvert(t, NORMAL_CHARS.slice(0,52), BOLD_ITALIC) },
  { id: 4, name: 'Fraktur', category: 'Basic', preview: '𝔉𝔯𝔞𝔨', ffCompatible: false,
    convert: (t) => charConvert(t, NORMAL_CHARS.slice(0,52), FRAKTUR) },
  { id: 5, name: 'Double Struck', category: 'Basic', preview: '𝔻𝕠𝕦𝕓', ffCompatible: false,
    convert: (t) => charConvert(t, NORMAL_CHARS, DOUBLE_STRUCK) },
  { id: 6, name: 'Script', category: 'Basic', preview: '𝒮𝒸𝓇𝒾𝓅𝓉', ffCompatible: true,
    convert: (t) => charConvert(t, NORMAL_CHARS.slice(0,52), SCRIPT) },
  { id: 7, name: 'Bold Script', category: 'Basic', preview: '𝓑𝓸𝓵𝓭', ffCompatible: true,
    convert: (t) => charConvert(t, NORMAL_CHARS.slice(0,52), BOLD_SCRIPT) },
  { id: 8, name: 'Monospace', category: 'Basic', preview: '𝙼𝚘𝚗𝚘', ffCompatible: true,
    convert: (t) => charConvert(t, NORMAL_CHARS, MONO) },
  { id: 9, name: 'Full Width', category: 'Basic', preview: 'Ｆｕｌｌ', ffCompatible: true,
    convert: (t) => charConvert(t, NORMAL_CHARS, FULLWIDTH) },
  { id: 10, name: 'Small Caps', category: 'Basic', preview: 'ꜱᴍᴀʟʟ', ffCompatible: true,
    convert: (t) => mapConvert(t.toLowerCase(), SMALL_CAPS) },
  { id: 11, name: 'Superscript', category: 'Basic', preview: 'ˢᵘᵖᵉʳ', ffCompatible: false,
    convert: (t) => mapConvert(t, SUPER_MAP) },
  { id: 12, name: 'Subscript', category: 'Basic', preview: 'ₛᵤᵦ', ffCompatible: false,
    convert: (t) => mapConvert(t, SUB_MAP) },
  { id: 13, name: 'Strikethrough', category: 'Basic', preview: 'S̶t̶r̶i̶k̶e̶', ffCompatible: true,
    convert: (t) => addCombining(t, '\u0336') },
  { id: 14, name: 'Underline', category: 'Basic', preview: 'U͟n͟d͟e͟r͟', ffCompatible: true,
    convert: (t) => addCombining(t, '\u035F') },
  { id: 15, name: 'Double Underline', category: 'Basic', preview: 'D͟͟o͟͟u͟͟b͟͟', ffCompatible: false,
    convert: (t) => addCombining(addCombining(t, '\u035F'), '\u0333') },
  { id: 16, name: 'Circled', category: 'Basic', preview: 'Ⓒⓘⓡⓒ', ffCompatible: false,
    convert: (t) => t.split('').map(c => {
      const ui = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(c.toUpperCase());
      if (ui >= 0) return c === c.toUpperCase() ? CIRCLED_UPPER[ui] : CIRCLED_LOWER[ui];
      return c;
    }).join('') },
  { id: 17, name: 'Negative Circled', category: 'Basic', preview: '🅝🅔🅖', ffCompatible: false,
    convert: (t) => t.split('').map(c => {
      const ui = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(c.toUpperCase());
      return ui >= 0 ? NEGATIVE_CIRCLED[ui] : c;
    }).join('') },
  { id: 18, name: 'Upside Down', category: 'Special', preview: 'uʍop', ffCompatible: false,
    convert: (t) => mapConvert(t, UPSIDE_DOWN_MAP).split('').reverse().join('') },
  { id: 19, name: 'Mirror', category: 'Special', preview: 'ɿoɿɿiM', ffCompatible: false,
    convert: (t) => mapConvert(t, MIRROR_MAP).split('').reverse().join('') },
  { id: 20, name: 'Wave Dots', category: 'Special', preview: 'Ẇ.ȧ.ṿ.ė', ffCompatible: false,
    convert: (t) => t.split('').join('.') },
  { id: 21, name: 'Spaced Out', category: 'Special', preview: 'S P A C E', ffCompatible: true,
    convert: (t) => t.split('').join(' ') },
  { id: 22, name: 'Zalgo', category: 'Special', preview: 'Z̴̡a̷l̸g̵ọ', ffCompatible: false,
    convert: (t) => t.split('').map(c => c + '\u0327\u0328\u0324').join('') },
  { id: 23, name: 'Tilted', category: 'Special', preview: 'ͲίⅬͲεD', ffCompatible: false,
    convert: (t) => addCombining(t, '\u030A') },
  { id: 24, name: 'Fire Text', category: 'Animated', preview: '🔥T🔥e🔥x🔥t', ffCompatible: true,
    convert: (t) => t.split('').map(c => '🔥' + c).join('') + '🔥' },
  { id: 25, name: 'Star Text', category: 'Special', preview: '★N★A★M★E', ffCompatible: true,
    convert: (t) => t.split('').join('★') },
  { id: 26, name: 'Diamond', category: 'Special', preview: '◆N◆A◆M◆E', ffCompatible: true,
    convert: (t) => t.split('').join('◆') },
  { id: 27, name: 'Arrow Text', category: 'Special', preview: '➤N➤A➤M', ffCompatible: false,
    convert: (t) => t.split('').join('➤') },
  { id: 28, name: 'Crown Text', category: 'Special', preview: '👑N👑A👑M', ffCompatible: false,
    convert: (t) => '👑' + t.split('').join('👑') + '👑' },
  { id: 29, name: 'Skull Text', category: 'Attitude', preview: '☠N☠A☠M', ffCompatible: false,
    convert: (t) => '☠' + t.split('').join('☠') + '☠' },
  { id: 30, name: 'Bold + Script', category: 'Basic', preview: '𝓑𝓸𝓵𝒹', ffCompatible: true,
    convert: (t) => charConvert(t.toUpperCase(), NORMAL_CHARS.slice(0,26), BOLD_SCRIPT.slice(0,26)) },

  // ── GAMER BORDERS ────────────────────────────────────────
  { id: 31, name: 'Flame Border', category: 'Gamer', preview: '꧁༒☬NAME☬༒꧂', ffCompatible: true,
    convert: (t) => `꧁༒☬${t}☬༒꧂` },
  { id: 32, name: 'Dragon Border', category: 'Gamer', preview: '꧁༺NAME༻꧂', ffCompatible: true,
    convert: (t) => `꧁༺${t}༻꧂` },
  { id: 33, name: 'Star Border', category: 'Gamer', preview: '꧁✤✦NAME✦✤꧂', ffCompatible: true,
    convert: (t) => `꧁✤✦${t}✦✤꧂` },
  { id: 34, name: 'Samurai', category: 'Gamer', preview: '꧁☆彡NAME彡☆꧂', ffCompatible: true,
    convert: (t) => `꧁☆彡${t}彡☆꧂` },
  { id: 35, name: 'Egyptian', category: 'Gamer', preview: '꧁𓆩NAME𓆪꧂', ffCompatible: false,
    convert: (t) => `꧁𓆩${t}𓆪꧂` },
  { id: 36, name: 'Double Bracket', category: 'Gamer', preview: '【NAME】', ffCompatible: true,
    convert: (t) => `【${t}】` },
  { id: 37, name: 'Unicode Bracket', category: 'Gamer', preview: '⟦NAME⟧', ffCompatible: false,
    convert: (t) => `⟦${t}⟧` },
  { id: 38, name: 'Star Swoosh', category: 'Gamer', preview: '★彡NAME彡★', ffCompatible: true,
    convert: (t) => `★彡${t}彡★` },
  { id: 39, name: 'Crown King', category: 'Gamer', preview: '♛NAME♛', ffCompatible: true,
    convert: (t) => `♛${t}♛` },
  { id: 40, name: 'Cross Blade', category: 'Gamer', preview: '乂NAME乂', ffCompatible: true,
    convert: (t) => `乂${t}乂` },
  { id: 41, name: 'Skull Eyes', category: 'Gamer', preview: '×͜×NAME×͜×', ffCompatible: true,
    convert: (t) => `×͜×${t}×͜×` },
  { id: 42, name: 'Lightning', category: 'Gamer', preview: '⚡NAME⚡', ffCompatible: true,
    convert: (t) => `⚡${t}⚡` },
  { id: 43, name: 'Blood Skull', category: 'Gamer', preview: '💀NAME💀', ffCompatible: false,
    convert: (t) => `💀${t}💀` },
  { id: 44, name: 'Diamond King', category: 'Gamer', preview: '💎NAME💎', ffCompatible: false,
    convert: (t) => `💎${t}💎` },
  { id: 45, name: 'Pro Gamer', category: 'Gamer', preview: '⚔️NAME⚔️', ffCompatible: false,
    convert: (t) => `⚔️${t}⚔️` },
  { id: 46, name: 'Fire + Bold Script', category: 'Gamer', preview: '🔥𝓝𝓐𝓜𝓔🔥', ffCompatible: true,
    convert: (t) => `🔥${charConvert(t, NORMAL_CHARS.slice(0,52), BOLD_SCRIPT)}🔥` },
  { id: 47, name: 'Dragon + Script', category: 'Gamer', preview: '꧁༺𝒩𝒜𝑀𝐸༻꧂', ffCompatible: true,
    convert: (t) => `꧁༺${charConvert(t, NORMAL_CHARS.slice(0,52), SCRIPT)}༻꧂` },
  { id: 48, name: 'Star + Bold', category: 'Gamer', preview: '★𝗡𝗔𝗠𝗘★', ffCompatible: true,
    convert: (t) => `★${charConvert(t, NORMAL_CHARS.slice(0,52), '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇')}★` },
  { id: 49, name: 'Samurai + Script', category: 'Gamer', preview: '彡𝒩𝒜𝑀𝐸彡', ffCompatible: true,
    convert: (t) => `彡${charConvert(t, NORMAL_CHARS.slice(0,52), SCRIPT)}彡` },
  { id: 50, name: 'Royal Crown', category: 'Gamer', preview: '꧁👑NAME👑꧂', ffCompatible: false,
    convert: (t) => `꧁👑${t}👑꧂` },

  // ── ATTITUDE / KILLER ────────────────────────────────────
  { id: 51, name: 'Devil', category: 'Attitude', preview: '😈NAME😈', ffCompatible: false,
    convert: (t) => `😈${t}😈` },
  { id: 52, name: 'PRO Style', category: 'Attitude', preview: 'ꜰʀᴏ NAME', ffCompatible: true,
    convert: (t) => `ᴘʀᴏ ${mapConvert(t.toLowerCase(), SMALL_CAPS)}` },
  { id: 53, name: 'Killer', category: 'Attitude', preview: 'Ꭷɨłłɇɍ', ffCompatible: false,
    convert: (t) => t.replace(/k/gi,'ꮶ').replace(/i/gi,'ɨ').replace(/l/gi,'ł').replace(/e/gi,'ɇ').replace(/r/gi,'ɍ') },
  { id: 54, name: 'Death Style', category: 'Attitude', preview: 'Ꭰєαтн', ffCompatible: false,
    convert: (t) => t.replace(/d/gi,'Ꭰ').replace(/e/gi,'є').replace(/a/gi,'α').replace(/t/gi,'т').replace(/h/gi,'н') },
  { id: 55, name: 'God Mode', category: 'Attitude', preview: 'ᎶᎾᎠ', ffCompatible: false,
    convert: (t) => t.replace(/g/gi,'Ꮆ').replace(/o/gi,'Ꭷ').replace(/d/gi,'Ꭰ') },
  { id: 56, name: 'BAD BOY', category: 'Attitude', preview: 'ᴮᴬᴰ', ffCompatible: false,
    convert: (t) => mapConvert(t.toUpperCase(), SUPER_MAP) },
  { id: 57, name: 'Flame Attitude', category: 'Attitude', preview: '꧁༒★NAME★༒꧂', ffCompatible: true,
    convert: (t) => `꧁༒★${t}★༒꧂` },
  { id: 58, name: 'Headshot Style', category: 'Attitude', preview: '🎯NAME🎯', ffCompatible: false,
    convert: (t) => `🎯${t}🎯` },
  { id: 59, name: 'Toxic', category: 'Attitude', preview: '☣NAME☣', ffCompatible: true,
    convert: (t) => `☣${t}☣` },
  { id: 60, name: 'Blood Rage', category: 'Attitude', preview: '🩸NAME🩸', ffCompatible: false,
    convert: (t) => `🩸${t}🩸` },
  { id: 61, name: 'Sniper', category: 'Attitude', preview: '🔫NAME🔫', ffCompatible: false,
    convert: (t) => `🔫${t}🔫` },
  { id: 62, name: 'Shield Warrior', category: 'Attitude', preview: '🛡️NAME🛡️', ffCompatible: false,
    convert: (t) => `🛡️${t}🛡️` },
  { id: 63, name: 'Dark Lord', category: 'Attitude', preview: '🖤NAME🖤', ffCompatible: false,
    convert: (t) => `🖤${t}🖤` },
  { id: 64, name: 'Ghost', category: 'Attitude', preview: '👻NAME👻', ffCompatible: false,
    convert: (t) => `👻${t}👻` },
  { id: 65, name: 'Ninja', category: 'Attitude', preview: '🥷NAME🥷', ffCompatible: false,
    convert: (t) => `🥷${t}🥷` },
  { id: 66, name: 'Demon King', category: 'Attitude', preview: '꧁👿NAME👿꧂', ffCompatible: false,
    convert: (t) => `꧁👿${t}👿꧂` },
  { id: 67, name: 'Bold Killer', category: 'Attitude', preview: '⚡𝗞𝗜𝗟𝗟𝗘𝗥⚡', ffCompatible: true,
    convert: (t) => `⚡${charConvert(t, NORMAL_CHARS.slice(0,52), '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇')}⚡` },
  { id: 68, name: 'Cursed', category: 'Attitude', preview: 'C̸u̸r̸s̸e̸d̸', ffCompatible: false,
    convert: (t) => addCombining(t, '\u0338') },
  { id: 69, name: 'King Slayer', category: 'Attitude', preview: '♚NAME♚', ffCompatible: true,
    convert: (t) => `♚${t}♚` },
  { id: 70, name: 'Shadow', category: 'Attitude', preview: '🌑NAME🌑', ffCompatible: false,
    convert: (t) => `🌑${t}🌑` },

  // ── CUTE / AESTHETIC ─────────────────────────────────────
  { id: 71, name: 'Heart Border', category: 'Cute', preview: '♡NAME♡', ffCompatible: true,
    convert: (t) => `♡${t}♡` },
  { id: 72, name: 'Flower', category: 'Cute', preview: '✿NAME✿', ffCompatible: true,
    convert: (t) => `✿${t}✿` },
  { id: 73, name: 'Japanese Cute', category: 'Cute', preview: '꒰NAME꒱', ffCompatible: true,
    convert: (t) => `꒰${t}꒱` },
  { id: 74, name: 'Aesthetic Box', category: 'Cute', preview: '「NAME」', ffCompatible: true,
    convert: (t) => `「${t}」` },
  { id: 75, name: 'Star Sparkle', category: 'Cute', preview: '✨NAME✨', ffCompatible: false,
    convert: (t) => `✨${t}✨` },
  { id: 76, name: 'Moon', category: 'Cute', preview: '🌙NAME🌙', ffCompatible: false,
    convert: (t) => `🌙${t}🌙` },
  { id: 77, name: 'Butterfly', category: 'Cute', preview: '🦋NAME🦋', ffCompatible: false,
    convert: (t) => `🦋${t}🦋` },
  { id: 78, name: 'Pastel', category: 'Cute', preview: '₊˚NAME˚₊', ffCompatible: true,
    convert: (t) => `₊˚${t}˚₊` },
  { id: 79, name: 'Dreamy', category: 'Cute', preview: 'NAME ˊˎ-', ffCompatible: true,
    convert: (t) => `${t} ˊˎ-` },
  { id: 80, name: 'Angel', category: 'Cute', preview: '👼NAME👼', ffCompatible: false,
    convert: (t) => `👼${t}👼` },
  { id: 81, name: 'Rainbow Heart', category: 'Cute', preview: '🌈NAME🌈', ffCompatible: false,
    convert: (t) => `🌈${t}🌈` },
  { id: 82, name: 'Cat', category: 'Cute', preview: '🐱NAME🐱', ffCompatible: false,
    convert: (t) => `🐱${t}🐱` },
  { id: 83, name: 'Soft Glow', category: 'Cute', preview: '°•NAME•°', ffCompatible: true,
    convert: (t) => `°•${t}•°` },
  { id: 84, name: 'Cherry Blossom', category: 'Cute', preview: '🌸NAME🌸', ffCompatible: false,
    convert: (t) => `🌸${t}🌸` },
  { id: 85, name: 'Cloud', category: 'Cute', preview: '☁NAME☁', ffCompatible: true,
    convert: (t) => `☁${t}☁` },
  { id: 86, name: 'Tibetan Decorator', category: 'Cute', preview: 'NAME ིྀ', ffCompatible: true,
    convert: (t) => `${t} ིིྀ` },
  { id: 87, name: 'Wave Aesthetic', category: 'Cute', preview: '〜NAME〜', ffCompatible: true,
    convert: (t) => `〜${t}〜` },
  { id: 88, name: 'Dotted Cute', category: 'Cute', preview: '·.·NAME·.·', ffCompatible: true,
    convert: (t) => `·.·${t}·.·` },
  { id: 89, name: 'Script + Heart', category: 'Cute', preview: '♡𝒩𝒜𝑀𝐸♡', ffCompatible: true,
    convert: (t) => `♡${charConvert(t, NORMAL_CHARS.slice(0,52), SCRIPT)}♡` },
  { id: 90, name: 'Small + Moon', category: 'Cute', preview: '🌙ꜱᴍᴀʟʟ🌙', ffCompatible: false,
    convert: (t) => `🌙${mapConvert(t.toLowerCase(), SMALL_CAPS)}🌙` },

  // ── BORDER COMBOS ────────────────────────────────────────
  ...Array.from({length: 20}, (_, i) => ({
    id: 91 + i,
    name: `Border Style ${i + 1}`,
    category: 'Border' as const,
    preview: withBorder('NAME', i),
    ffCompatible: i < 10,
    convert: (t: string) => withBorder(t, i),
  })),

  // ── SPECIAL COMBOS ───────────────────────────────────────
  { id: 111, name: 'Bold + Fire Border', category: 'Gamer', preview: '🔥𝗡𝗮𝗺𝗲🔥', ffCompatible: true,
    convert: (t) => `🔥${charConvert(t, NORMAL_CHARS.slice(0,52), '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇')}🔥` },
  { id: 112, name: 'Script + Dragon', category: 'Gamer', preview: '꧁༺𝒩𝒜𝑀𝐸༻꧂', ffCompatible: true,
    convert: (t) => `꧁༺${charConvert(t, NORMAL_CHARS.slice(0,52), BOLD_SCRIPT)}༻꧂` },
  { id: 113, name: 'Death + Skull', category: 'Attitude', preview: '💀𝘿𝙚𝙖𝙩𝙝💀', ffCompatible: false,
    convert: (t) => `💀${charConvert(t, NORMAL_CHARS.slice(0,52), BOLD_ITALIC)}💀` },
  { id: 114, name: 'FF Killer', category: 'Gamer', preview: '꧁⚡NAME⚡꧂', ffCompatible: true,
    convert: (t) => `꧁⚡${t}⚡꧂` },
  { id: 115, name: 'God of War', category: 'Attitude', preview: '⚔️𝑮𝑶𝑫⚔️', ffCompatible: false,
    convert: (t) => `⚔️${charConvert(t, NORMAL_CHARS.slice(0,52), BOLD_ITALIC)}⚔️` },
];

export const CATEGORIES = ['All', 'Basic', 'Gamer', 'Attitude', 'Cute', 'Border', 'Special', 'Animated'];

export function getStylesByCategory(category: string): FontStyle[] {
  if (category === 'All') return FONT_STYLES;
  return FONT_STYLES.filter(s => s.category === category);
}

export function getFFCompatibleStyles(): FontStyle[] {
  return FONT_STYLES.filter(s => s.ffCompatible);
}

export function generateAllStyles(text: string): Array<{style: FontStyle, result: string}> {
  if (!text.trim()) return [];
  return FONT_STYLES.map(style => ({
    style,
    result: style.convert(text),
  }));
}

// Invisible/Zero-width characters for FF names
export const INVISIBLE_CHARS = {
  hangulFiller: 'ㅤ',
  zeroWidth: '\u200B',
  zeroWidthNoBreak: '\uFEFF',
  thinSpace: '\u2009',
  hairSpace: '\u200A',
  wordJoiner: '\u2060',
};

export function generateInvisibleName(times: number = 3): string {
  return INVISIBLE_CHARS.hangulFiller.repeat(times);
}