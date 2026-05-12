import { motion } from 'framer-motion';
import { MdTrendingDown, MdTrendingUp, MdArrowForward, MdInfoOutline, MdPriorityHigh } from 'react-icons/md';
import { getPriorityColor } from '../utils/helpers';

const ResultCard = ({ rec, index }) => {
  const isSaving = rec.savings > 0;
  const isUpgrade = rec.quality === 'upgrade';
  const priorityInfo = getPriorityColor(rec.priority || 'medium');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative overflow-hidden glass-card p-0 group transition-all duration-300 border-l-4 ${
        rec.priority === 'high' ? 'border-l-red-500/50' : 
        rec.priority === 'medium' ? 'border-l-yellow-500/50' : 'border-l-indigo-500/50'
      }`}
    >
      {/* Background Subtle Gradient */}
      <div className={`absolute inset-0 opacity-[0.03] pointer-events-none bg-gradient-to-br ${
        isSaving ? 'from-green-500 to-transparent' : 'from-purple-500 to-transparent'
      }`} />

      <div className="p-6 relative z-10">
        {/* Header: Tags & Priority */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {rec.tags.map((tag) => (
              <span
                key={tag}
                className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                  isSaving
                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                    : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-bold ${priorityInfo.bg} ${priorityInfo.text} ${priorityInfo.border}`}>
            <MdPriorityHigh size={12} />
            {rec.priority?.toUpperCase() || 'MEDIUM'} PRIORITY
          </div>
        </div>

        {/* Tool Comparison: Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 mb-6">
          {/* Current */}
          <div className="bg-white/3 rounded-2xl p-5 border border-white/5 group-hover:border-white/10 transition-colors">
            <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3 opacity-60">Current Setup</div>
            <div className="text-white font-semibold text-base mb-1 leading-tight">{rec.currentTool}</div>
            {rec.currentPlanLabel && <div className="text-slate-400 text-xs mb-3">{rec.currentPlanLabel}</div>}
            <div className="flex items-baseline gap-1">
              <span className="text-slate-200 font-bold text-xl">${rec.currentCost}</span>
              <span className="text-slate-500 text-xs font-normal">/mo</span>
            </div>
          </div>

          {/* Transfer Icon */}
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
              <MdArrowForward className={`text-lg ${isSaving ? 'text-green-400' : 'text-purple-400'}`} />
            </div>
            {isSaving && (
              <div className="text-green-400 text-[10px] font-black uppercase tracking-tighter">
                Save ${rec.savings}
              </div>
            )}
          </div>

          {/* Recommended */}
          <div className={`rounded-2xl p-5 border transition-all duration-300 ${
            isSaving 
              ? 'bg-green-500/5 border-green-500/20 group-hover:border-green-500/40 shadow-[0_0_20px_rgba(34,197,94,0.05)]' 
              : 'bg-purple-500/5 border-purple-500/20 group-hover:border-purple-500/40'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest opacity-60">Recommended</div>
              {isSaving && (
                <div className="flex items-center gap-1 text-green-400 font-bold text-[10px]">
                  <MdTrendingDown size={14} />
                  {rec.savingsPercent}% OFF
                </div>
              )}
            </div>
            <div className={`font-semibold text-base mb-1 leading-tight ${isSaving ? 'text-green-300' : 'text-purple-300'}`}>
              {rec.recommendedTool}
            </div>
            {rec.recommendedPlanLabel && <div className="text-slate-400 text-xs mb-3">{rec.recommendedPlanLabel}</div>}
            <div className="flex items-baseline gap-1">
              <span className={`font-bold text-xl ${isSaving ? 'text-green-400' : 'text-purple-400'}`}>${rec.recommendedCost}</span>
              <span className="text-slate-500 text-xs font-normal">/mo</span>
            </div>
          </div>
        </div>

        {/* Rationale Section */}
        <div className="bg-white/2 rounded-xl p-4 border border-white/5 flex gap-3 items-start">
          <div className="mt-0.5 text-indigo-400 shrink-0">
            <MdInfoOutline size={18} />
          </div>
          <div>
            <h4 className="text-white/80 text-[11px] font-bold uppercase tracking-wider mb-1">Strategic Rationale</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              {rec.reason}
            </p>
          </div>
        </div>

        {/* Footer info: Annual & Quality */}
        {isSaving && (
          <div className="mt-4 flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Annual savings: <span className="text-green-400 font-bold">${rec.savings * 12}/year</span>
            </div>
            <div className="text-[10px] text-slate-600 font-medium">
              Source: Verified Pricing API
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ResultCard;
