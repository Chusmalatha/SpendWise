import { Link } from 'react-router-dom';
import { HiSparkles } from 'react-icons/hi';
import { MdEmail } from 'react-icons/md';
import { FaGithub, FaLinkedin, FaProductHunt, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const scrollToSection = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5 bg-dark-900 pt-16 pb-8 overflow-hidden">
      <div className="glow-orb w-[400px] h-[400px] bg-indigo-600/5 bottom-0 left-1/2 -translate-x-1/2" />

      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <HiSparkles className="text-white text-lg" />
              </div>
              <span className="font-display font-800 text-lg">
                <span className="gradient-text">SpendWise</span>
                <span className="text-white"> AI</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
              Helping startup founders and engineering teams stop overpaying for AI tools.
              Audit your stack. Save thousands. Ship faster.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {[
                { icon: FaGithub, href: '#', label: 'GitHub' },
                { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
                { icon: MdEmail, href: '#', label: 'Email' },
                { icon: FaProductHunt, href: '#', label: 'Product Hunt' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/40 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Product</h4>
            <ul className="space-y-3">
              {[
                { label: 'Features', action: () => scrollToSection('#features') },
                { label: 'How It Works', action: () => scrollToSection('#how-it-works') },
                { label: 'FAQ', action: () => scrollToSection('#faq') },
                { label: 'Start Audit', to: '/audit' },
                { label: 'View Demo', to: '/results/demo' },
              ].map((item) => (
                <li key={item.label}>
                  {item.to ? (
                    <Link to={item.to} className="text-slate-400 text-sm hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <button onClick={item.action} className="text-slate-400 text-sm hover:text-white transition-colors">
                      {item.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">AI Tools</h4>
            <ul className="space-y-3">
              {['ChatGPT', 'Claude', 'Cursor', 'GitHub Copilot', 'Gemini', 'Windsurf'].map((tool) => (
                <li key={tool}>
                  <span className="text-slate-400 text-sm hover:text-white transition-colors cursor-default">{tool}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {['About', 'Blog', 'Privacy Policy', 'Terms of Service', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 text-sm hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2025 SpendWise AI. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-slate-500 text-sm">All systems operational</span>
          </div>
          <p className="text-slate-600 text-xs">
            Built for founders, by founders 🚀
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
