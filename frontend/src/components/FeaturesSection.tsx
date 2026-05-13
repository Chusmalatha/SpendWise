import { motion } from 'framer-motion';
import {
  MdAutoAwesome, MdSavings, MdCompare, MdSpeed, MdSecurity
} from 'react-icons/md';
import { useInView } from '../hooks/useHooks';

const ICON_MAP = {
  MdAutoAwesome, MdSavings, MdCompare, MdSpeed, MdSecurity
};

const FEATURES = [
  {
    icon: 'MdAutoAwesome',
    title: 'AI-Powered Analysis',
    description: 'Our GPT-4 powered engine deeply analyzes your tool stack to find overlaps, redundancies, and smarter alternatives with surgical precision.',
    gradient: 'from-purple-500/20 to-indigo-500/20',
    iconColor: '#a78bfa',
    glowColor: 'rgba(167, 139, 250, 0.2)',
  },
  {
    icon: 'MdSavings',
    title: 'Instant Savings Calculator',
    description: 'See your projected monthly and annual savings before switching. No guesswork — hard numbers based on real pricing data updated weekly.',
    gradient: 'from-green-500/20 to-teal-500/20',
    iconColor: '#00ffa3',
    glowColor: 'rgba(0, 255, 163, 0.2)',
  },
  {
    icon: 'MdCompare',
    title: 'Smart Recommendations',
    description: 'Get personalized tool recommendations ranked by ROI, implementation effort, and capability match for your specific use cases.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: '#00d4ff',
    glowColor: 'rgba(0, 212, 255, 0.2)',
  },

  {
    icon: 'MdSpeed',
    title: 'Real-Time Pricing',
    description: 'Our database tracks pricing changes across 40+ AI tools weekly. Get alerts when a tool you use changes their pricing.',
    gradient: 'from-orange-500/20 to-amber-500/20',
    iconColor: '#fb923c',
    glowColor: 'rgba(251, 146, 60, 0.2)',
  },
  {
    icon: 'MdSecurity',
    title: 'Privacy First',
    description: 'Your data never leaves our encrypted pipeline. No data sold, no vendor sharing. Enterprise SSO and SOC 2 compliant.',
    gradient: 'from-teal-500/20 to-emerald-500/20',
    iconColor: '#2dd4bf',
    glowColor: 'rgba(45, 212, 191, 0.2)',
  },
];

const FeatureCard = ({ feature, index }) => {
  const { ref, inView } = useInView(0.1);
  const Icon = ICON_MAP[feature.icon];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-card p-7 group cursor-default"
    >
      <div
        className={`feature-icon-wrapper bg-gradient-to-br ${feature.gradient}`}
        style={{ boxShadow: `0 0 20px ${feature.glowColor}` }}
      >
        {Icon && <Icon size={24} style={{ color: feature.iconColor }} />}
      </div>
      <h3 className="font-display font-700 text-lg text-white mb-3" style={{ fontWeight: 700 }}>
        {feature.title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="features" className="relative py-28 bg-dark-900 overflow-hidden">
      {/* Background */}
      <div className="glow-orb w-[500px] h-[500px] bg-indigo-600/10 top-0 right-0" />
      <div className="glow-orb w-[400px] h-[400px] bg-purple-600/10 bottom-0 left-0" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label mb-4">Why SpendWise AI</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-800 text-white mb-5 mt-4"
            style={{ fontWeight: 800 }}
          >
            Everything you need to{' '}
            <span className="gradient-text">spend smarter</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            Purpose-built for startup founders and engineering teams who want data-driven
            decisions about their AI investments.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Bottom stat banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 glass-card p-8 rounded-3xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '40+', label: 'AI Tools Monitored', icon: '🤖' },
              { value: '$2.3M+', label: 'Savings Identified', icon: '💰' },
              { value: '4,800+', label: 'Audits Completed', icon: '✅' },
              { value: '33%', label: 'Avg Savings Found', icon: '📉' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl mb-1">{stat.icon}</div>
                <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-slate-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
