import { motion } from 'framer-motion';
import { MdAdd, MdAutoAwesome, MdInsights, MdRocketLaunch, MdCheck } from 'react-icons/md';
import { useInView } from '../hooks/useHooks';

const STEPS = [
  {
    step: '01',
    title: 'Add Your AI Tools',
    description: "List all the AI tools your team uses — ChatGPT, Claude, Cursor, APIs, everything. Takes 2 minutes.",
    icon: MdAdd,
    color: '#6366f1',
    glow: 'rgba(99, 102, 241, 0.3)',
    bg: 'from-indigo-500/20 to-indigo-600/10',
  },
  {
    step: '02',
    title: 'AI Analyzes Your Stack',
    description: 'Our AI engine maps your tools against 40+ alternatives, pricing tiers, and capability overlaps.',
    icon: MdAutoAwesome,
    color: '#a78bfa',
    glow: 'rgba(167, 139, 250, 0.3)',
    bg: 'from-purple-500/20 to-purple-600/10',
  },
  {
    step: '03',
    title: 'Get Your Savings Report',
    description: 'Receive a prioritized list of recommendations with exact dollar savings and implementation steps.',
    icon: MdInsights,
    color: '#00ffa3',
    glow: 'rgba(0, 255, 163, 0.3)',
    bg: 'from-green-500/20 to-green-600/10',
  },
  {
    step: '04',
    title: 'Implement Savings',
    description: 'Follow the step-by-step guides to implement savings at your own pace.',
    icon: MdCheck,
    color: '#00d4ff',
    glow: 'rgba(0, 212, 255, 0.3)',
    bg: 'from-cyan-500/20 to-cyan-600/10',
  },
];

const HowItWorks = () => {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="how-it-works" className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #030712 0%, #0a0f1e 50%, #030712 100%)' }}>
      {/* Background effects */}
      <div className="glow-orb w-[600px] h-[600px] bg-indigo-600/8 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div ref={ref} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label mb-4">How It Works</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-800 text-white mb-5 mt-4"
            style={{ fontWeight: 800 }}
          >
            From audit to savings{' '}
            <span className="gradient-text">in minutes</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-lg max-w-xl mx-auto"
          >
            No lengthy onboarding. No sales calls. Just drop in your tools and let the AI do the work.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="text-center group"
                >
                  {/* Step icon */}
                  <div className="relative inline-block mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.bg} border border-white/10 flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110`}
                      style={{ boxShadow: `0 0 30px ${step.glow}` }}
                    >
                      <Icon size={28} style={{ color: step.color }} />
                    </div>
                    {/* Step number badge */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                  </div>

                  {/* Step label */}
                  <div className="text-xs font-bold tracking-widest text-indigo-400 mb-2 uppercase">
                    Step {step.step}
                  </div>
                  <h3 className="font-display font-700 text-lg text-white mb-3" style={{ fontWeight: 700 }}>
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Time estimate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-3 glass px-6 py-3 rounded-full border border-white/10">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-slate-300 text-sm">Average time to first insights: <strong className="text-white">4 minutes</strong></span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
