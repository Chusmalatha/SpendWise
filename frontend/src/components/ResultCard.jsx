import { motion } from 'framer-motion';
import { MdTrendingDown, MdTrendingUp, MdArrowForward } from 'react-icons/md';

const ResultCard = ({ rec, index }) => {
  const isSaving = rec.savings > 0;
  const isUpgrade = rec.quality === 'upgrade';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`glass-card p-6 group hover:shadow-lg transition-all duration-300 ${
        isSaving ? 'hover:border-green-500/30' : 'hover:border-purple-500/30'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {rec.tags.map((tag) => (
              <span
                key={tag}
                className={`tag-pill border text-xs ${
                  isSaving
                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                    : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {isSaving ? (
          <div className="flex items-center gap-1 text-green-400 bg-green-500/10 px-3 py-1.5 rounded-xl border border-green-500/20">
            <MdTrendingDown size={16} />
            <span className="font-bold text-sm">{rec.savingsPercent}% cheaper</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-purple-400 bg-purple-500/10 px-3 py-1.5 rounded-xl border border-purple-500/20">
            <MdTrendingUp size={16} />
            <span className="font-bold text-sm">Better quality</span>
          </div>
        )}
      </div>

      {/* Tool comparison */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 bg-white/4 rounded-xl p-4 border border-white/8">
          <div className="text-slate-500 text-xs mb-1.5 uppercase tracking-wider">Current</div>
          <div className="text-white font-semibold text-sm mb-1">{rec.currentTool}</div>
          <div className="text-slate-300 font-bold">${rec.currentCost}<span className="text-slate-500 font-normal text-xs">/mo</span></div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <MdArrowForward className="text-white text-sm" />
          </div>
          {isSaving && (
            <span className="text-green-400 text-xs font-bold">-${rec.savings}/mo</span>
          )}
        </div>

        <div className={`flex-1 rounded-xl p-4 border ${
          isSaving
            ? 'bg-green-500/8 border-green-500/20'
            : 'bg-purple-500/8 border-purple-500/20'
        }`}>
          <div className="text-slate-500 text-xs mb-1.5 uppercase tracking-wider">Recommended</div>
          <div className={`font-semibold text-sm mb-1 ${isSaving ? 'text-green-300' : 'text-purple-300'}`}>
            {rec.recommendedTool}
          </div>
          <div className={`font-bold ${isSaving ? 'text-green-400' : 'text-purple-400'}`}>
            ${rec.recommendedCost}<span className="text-slate-500 font-normal text-xs">/mo</span>
          </div>
        </div>
      </div>

      {/* Reason */}
      <p className="text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">
        💡 {rec.reason}
      </p>

      {/* Annual savings */}
      {isSaving && rec.savings > 0 && (
        <div className="mt-4 bg-green-500/5 border border-green-500/15 rounded-xl p-3 flex items-center justify-between">
          <span className="text-slate-500 text-xs">Annual savings potential</span>
          <span className="text-green-400 font-bold">${rec.savings * 12}/year</span>
        </div>
      )}
    </motion.div>
  );
};

export default ResultCard;
