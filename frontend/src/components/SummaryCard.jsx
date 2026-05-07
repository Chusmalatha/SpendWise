import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MdAutoAwesome } from 'react-icons/md';
import { HiSparkles } from 'react-icons/hi';

const TYPING_TEXT = `Your team is spending $389/month on AI tools with significant overlap detected.

The biggest savings opportunity is your OpenAI API plan — switching to Anthropic's API for writing and research workloads could save you $110/month immediately.

Your GitHub Copilot subscription also overlaps heavily with Cursor; consolidating to a single coding AI would reduce complexity and cost.

Overall, we identified $127/month in actionable savings without sacrificing any capability.`;

const SummaryCard = () => {
  const [displayText, setDisplayText] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const speed = 18;
    const timer = setInterval(() => {
      if (i < TYPING_TEXT.length) {
        setDisplayText(TYPING_TEXT.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card p-8 relative overflow-hidden"
    >
      {/* Glow bg */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full filter blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-glow-brand">
          <MdAutoAwesome className="text-white text-lg" />
        </div>
        <div>
          <div className="text-white font-semibold">AI Analysis Summary</div>
          <div className="text-slate-500 text-xs flex items-center gap-1.5">
            <HiSparkles className="text-indigo-400 text-xs" />
            Powered by SpendWise AI Engine
          </div>
        </div>
        {!done && (
          <div className="ml-auto flex items-center gap-1.5 text-indigo-400 text-xs">
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-indigo-400"
            />
            Analyzing...
          </div>
        )}
        {done && (
          <div className="ml-auto flex items-center gap-1.5 text-green-400 text-xs bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
            ✅ Analysis complete
          </div>
        )}
      </div>

      {/* Typing text */}
      <div className="relative">
        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
          {displayText}
          {!done && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-0.5 h-4 bg-indigo-400 ml-0.5 align-text-bottom"
            />
          )}
        </p>
      </div>

      {/* Bottom tags */}
      {done && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-5 pt-5 border-t border-white/5 flex flex-wrap gap-2"
        >
          {['4 overlaps found', '$127/mo saveable', '2 redundant tools', 'Implement in <1 hour'].map((tag) => (
            <span
              key={tag}
              className="tag-pill bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default SummaryCard;
