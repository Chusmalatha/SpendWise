import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { useInView } from '../hooks/useHooks';
import { FAQ_DATA } from '../data/mockData';

const FAQItem = ({ item, index, isOpen, onToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`glass-card overflow-hidden transition-all duration-300 ${isOpen ? 'border-indigo-500/30' : ''}`}
    >
      <button
        id={`faq-item-${index}`}
        onClick={onToggle}
        className="w-full text-left p-6 flex items-center justify-between gap-4"
      >
        <span className={`font-medium text-base transition-colors ${isOpen ? 'text-white' : 'text-slate-300'}`}>
          {item.question}
        </span>
        <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/5 text-slate-400'}`}>
          {isOpen ? <MdExpandLess size={20} /> : <MdExpandMore size={20} />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const { ref, inView } = useInView(0.1);

  return (
    <section id="faq" className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0f1e 0%, #030712 100%)' }}>
      <div className="glow-orb w-[400px] h-[400px] bg-indigo-600/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="container-custom relative z-10">
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label mb-4">FAQ</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-800 text-white mb-5 mt-4"
            style={{ fontWeight: 800 }}
          >
            Questions we get{' '}
            <span className="gradient-text">all the time</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-lg"
          >
            Everything you need to know before running your first audit.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQ_DATA.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-slate-400 text-sm">
            Still have questions?{' '}
            <a href="mailto:hello@spendwise.ai" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              Email us at hello@spendwise.ai
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
