import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdRocketLaunch, MdTrendingDown, MdAutoAwesome } from 'react-icons/md';
import { HiSparkles } from 'react-icons/hi';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-dark-900">
      {/* Background orbs — contained, no overflow */}
      <div className="glow-orb w-[500px] h-[500px] bg-indigo-600/20 top-[-150px] left-[-150px]" />
      <div className="glow-orb w-[450px] h-[450px] bg-purple-600/15 top-[100px] right-[-200px]" />
      <div className="glow-orb w-[350px] h-[350px] bg-cyan-600/10 bottom-[-80px] left-[35%]" />

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container-custom relative z-10 pb-20" style={{ paddingTop: '100px' }}>
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* ─── LEFT: Content ─── */}
          <div className="max-w-xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="section-label inline-flex items-center gap-2 text-xs">
                <HiSparkles className="text-yellow-400 shrink-0" />
                <span>Product of the Day — Product Hunt 🚀</span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-8 text-white"
            >
              Stop{' '}
              <span className="gradient-text">Overspending</span>
              <br />
              on AI Tools
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed mb-10 max-w-lg"
            >
              The first AI-powered spend auditor for startups.{' '}
              <span className="text-white font-semibold">Audit your stack in minutes</span> and reclaim wasted capital.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link
                to="/audit"
                id="hero-start-audit-btn"
                className="btn-primary flex items-center justify-center gap-2 text-base py-4 px-8"
              >
                <MdRocketLaunch className="text-lg shrink-0" />
                Start Free Audit
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center gap-8"
            >
              {[
                { value: '$2.3M+', label: 'Savings Found' },
                { value: '4,800+', label: 'Audits Run' },
                { value: '40+', label: 'AI Tools Tracked' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold gradient-text-green">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ─── RIGHT: Visual Dashboard Card ─── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex flex-col gap-4"
          >
            {/* Main audit card — floats gently */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="glass-card p-6 rounded-2xl shadow-glass w-full"
            >
              {/* Card header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-slate-400 text-xs">Your AI Spend Audit</p>
                  <h3 className="text-2xl font-bold text-white mt-0.5">$389 / month</h3>
                </div>
                <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl px-3 py-1.5">
                  <MdTrendingDown className="text-green-400 text-base shrink-0" />
                  <span className="text-green-400 font-bold text-xs">33% saveable</span>
                </div>
              </div>

              {/* Tool rows */}
              <div className="space-y-2 mb-5">
                {[
                  { name: 'OpenAI API',     cost: '$150', flag: 'Overpriced', flagColor: 'bg-red-500/10 text-red-400 border-red-500/20' },
                  { name: 'GitHub Copilot', cost: '$76',  flag: 'Redundant',  flagColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
                  { name: 'ChatGPT Pro',    cost: '$80',  flag: 'Optimal',    flagColor: 'bg-green-500/10 text-green-400 border-green-500/20' },
                  { name: 'Gemini Team',    cost: '$48',  flag: 'Overlap',    flagColor: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
                ].map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/3 border border-white/5"
                  >
                    <span className="text-slate-300 text-sm font-medium">{tool.name}</span>
                    <div className="flex items-center gap-2.5">
                      <span className="text-white font-semibold text-sm">{tool.cost}</span>
                      <span className={`tag-pill border text-[10px] ${tool.flagColor}`}>{tool.flag}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Recommendation banner */}
              <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-xl p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0">
                    <MdAutoAwesome className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[11px]">AI Recommendation</p>
                    <p className="text-white font-semibold text-xs">Switch 2 tools → save $127/mo</p>
                  </div>
                </div>
                <span className="gradient-text-green font-bold text-lg">$127</span>
              </div>
            </motion.div>

            {/* ─── Two mini stat cards side by side (below main card) ─── */}
            <div className="grid grid-cols-2 gap-4">
              {/* Mini card 1 */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                className="glass-card p-4 border border-green-500/20 bg-gradient-to-br from-green-500/10 to-emerald-500/5 rounded-2xl"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">💸</span>
                  <span className="text-white text-xs font-semibold">OpenAI API</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[11px]">$150/mo</span>
                  <span className="text-green-400 text-xs font-bold">$110 saved</span>
                </div>
                <p className="text-slate-500 text-[11px] mt-1">Switch to Anthropic API</p>
              </motion.div>

              {/* Mini card 2 */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="glass-card p-4 border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-2xl"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📊</span>
                  <span className="text-white text-xs font-semibold">Monthly Savings</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[11px]">$127/mo</span>
                  <span className="text-cyan-400 text-xs font-bold">$1,524/yr</span>
                </div>
                <p className="text-slate-500 text-[11px] mt-1">Identified for your team</p>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
