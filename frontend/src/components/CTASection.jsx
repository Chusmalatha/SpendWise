import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdRocketLaunch } from 'react-icons/md';
import { useInView } from '../hooks/useHooks';

const CTASection = () => {
  const { ref, inView } = useInView(0.2);

  return (
    <section id="pricing" className="relative py-28 overflow-hidden bg-dark-900">
      <div className="glow-orb w-[700px] h-[700px] bg-indigo-600/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="container-custom relative z-10">
        <div ref={ref} className="relative">
          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl p-1"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.5), rgba(139,92,246,0.3), rgba(0,212,255,0.2))',
            }}
          >
            <div className="relative rounded-[22px] overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' }}>
              {/* Grid */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: `linear-gradient(rgba(99,102,241,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.8) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                }}
              />

              <div className="relative z-10 text-center py-24 px-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-6"
                >
                  <span className="section-label">Start Today — It's Free</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="font-display text-5xl md:text-6xl font-900 text-white mb-6 leading-tight"
                  style={{ fontWeight: 900 }}
                >
                  Find your{' '}
                  <span className="gradient-text">$127/month</span>
                  <br />
                  hiding in plain sight
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-slate-400 text-xl max-w-xl mx-auto mb-10"
                >
                  The average startup team finds $127/month in AI tool savings in their first audit.
                  What's yours?
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex justify-center mb-12"
                >
                  <Link
                    to="/audit"
                    id="cta-start-audit-btn"
                    className="btn-primary flex items-center justify-center gap-2 text-lg py-4 px-10 animate-pulse-glow"
                  >
                    <MdRocketLaunch className="text-xl" />
                    Start Free Audit
                  </Link>
                </motion.div>

                {/* Trust badges */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-wrap justify-center items-center gap-6 text-slate-400 text-sm"
                >
                  {[
                    '✅ No credit card required',
                    '🔒 Data encrypted & private',
                    '⚡ Results in 4 minutes',
                    '💸 Free forever plan',
                  ].map((badge) => (
                    <span key={badge} className="flex items-center gap-1">{badge}</span>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
