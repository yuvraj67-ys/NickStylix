export default function Footer() {
  const links = [
    { label: 'Free Fire Name Generator', href: '#generator' },
    { label: 'Stylish Font Generator', href: '#generator' },
    { label: 'BGMI Name Generator', href: '#gaming' },
    { label: 'Instagram Username Generator', href: '#generator' },
    { label: 'AI Name Generator', href: '#ai-tools' },
    { label: 'Guild Name Generator', href: '#gaming' },
  ];

  return (
    <footer className="border-t border-white/5 bg-gaming-card mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-black text-xl mb-3 gradient-text">NickStylix</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              World&apos;s best stylish name generator for Free Fire, BGMI, and Instagram.
              Generate 100+ unique Unicode font styles instantly for free.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <div className="space-y-2">
              {links.map(link => (
                <a key={link.label} href={link.href} className="block text-gray-500 text-sm hover:text-purple-400 transition-colors">{link.label}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">About</h4>
            <p className="text-gray-500 text-sm">NickStylix provides free stylish name generation tools. No login required. Works offline.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Free','No Login','Offline','100+ Styles','Mobile Friendly'].map(tag => (
                <span key={tag} className="text-xs bg-purple-600/10 text-purple-400 px-2 py-1 rounded-full border border-purple-500/20">{tag}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-gray-600 text-sm">&copy; 2025 NickStylix • Free Stylish Name Generator • Made with ❤️ for Gamers</p>
        </div>
      </div>
    </footer>
  );
}