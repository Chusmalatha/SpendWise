import { motion } from 'framer-motion';
import { MdClose, MdDragIndicator } from 'react-icons/md';
import { AI_TOOLS, PLAN_TYPES, USE_CASES } from '../data/mockData';

const ToolCard = ({ tool, index, onUpdate, onRemove, canRemove }) => {
  const handleChange = (field, value) => {
    onUpdate(index, { ...tool, [field]: value });
  };

  const selectedTool = AI_TOOLS.find((t) => t.value === tool.toolName);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="glass-card p-6 relative group"
    >
      {/* Card header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="text-slate-600 cursor-grab group-hover:text-slate-400 transition-colors">
            <MdDragIndicator size={20} />
          </div>
          <div className="flex items-center gap-2">
            {selectedTool && (
              <span className="text-2xl">{selectedTool.icon}</span>
            )}
            <div>
              <div className="text-white font-semibold text-sm">
                {selectedTool?.label || 'Select a Tool'}
              </div>
              {selectedTool && (
                <div className="text-slate-500 text-xs">{selectedTool.company}</div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Tool index badge */}
          <span className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-bold">
            {index + 1}
          </span>

          {/* Remove button */}
          {canRemove && (
            <button
              onClick={() => onRemove(index)}
              id={`remove-tool-${index}`}
              className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-all"
            >
              <MdClose size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Form fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tool Name */}
        <div>
          <label className="block text-slate-400 text-xs font-medium mb-2 uppercase tracking-wider">
            AI Tool
          </label>
          <select
            value={tool.toolName}
            onChange={(e) => handleChange('toolName', e.target.value)}
            id={`tool-name-${index}`}
            className="select-field"
          >
            <option value="">Select a tool...</option>
            {AI_TOOLS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.icon} {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Plan Type */}
        <div>
          <label className="block text-slate-400 text-xs font-medium mb-2 uppercase tracking-wider">
            Plan Type
          </label>
          <select
            value={tool.planType}
            onChange={(e) => handleChange('planType', e.target.value)}
            id={`plan-type-${index}`}
            className="select-field"
          >
            <option value="">Select plan...</option>
            {PLAN_TYPES.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>

        {/* Monthly Spend */}
        <div>
          <label className="block text-slate-400 text-xs font-medium mb-2 uppercase tracking-wider">
            Monthly Spend (per seat)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
            <input
              type="number"
              value={tool.monthlySpend}
              onChange={(e) => handleChange('monthlySpend', e.target.value)}
              placeholder="0"
              min="0"
              id={`monthly-spend-${index}`}
              className="input-field pl-8"
            />
          </div>
        </div>

        {/* Number of Seats */}
        <div>
          <label className="block text-slate-400 text-xs font-medium mb-2 uppercase tracking-wider">
            Number of Seats
          </label>
          <input
            type="number"
            value={tool.seats}
            onChange={(e) => handleChange('seats', e.target.value)}
            placeholder="1"
            min="1"
            id={`seats-${index}`}
            className="input-field"
          />
        </div>

        {/* Use Case */}
        <div className="md:col-span-2">
          <label className="block text-slate-400 text-xs font-medium mb-2 uppercase tracking-wider">
            Primary Use Case
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {USE_CASES.map((uc) => (
              <button
                key={uc.value}
                type="button"
                id={`use-case-${index}-${uc.value}`}
                onClick={() => handleChange('useCase', uc.value)}
                className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-xs font-medium transition-all duration-200 ${
                  tool.useCase === uc.value
                    ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300'
                    : 'bg-white/3 border-white/8 text-slate-400 hover:border-white/20 hover:text-slate-300'
                }`}
              >
                <span className="text-lg">{uc.icon}</span>
                <span className="text-center leading-tight">{uc.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cost summary */}
      {tool.monthlySpend && tool.seats && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-5 pt-5 border-t border-white/5 flex items-center justify-between"
        >
          <span className="text-slate-500 text-sm">Total cost for this tool</span>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-white font-bold">
                ${(parseFloat(tool.monthlySpend) * parseInt(tool.seats || 1)).toFixed(0)}/mo
              </div>
              <div className="text-slate-500 text-xs">
                ${(parseFloat(tool.monthlySpend) * parseInt(tool.seats || 1) * 12).toFixed(0)}/yr
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ToolCard;
