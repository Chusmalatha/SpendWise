import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdAdd,
  MdArrowForward,
  MdArrowBack,
  MdInfo,
} from 'react-icons/md';
import { HiSparkles } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import { runAudit, ToolInput } from '../utils/auditEngine';
import { processAudit } from '../api/api';
import ToolCard from './ToolCard';
import { calculateTotals, formatCurrency } from '../utils/helpers';
import { Tool, CompanyInfo, Errors } from '../types/types';

const EMPTY_TOOL: Tool = {
  toolName: '',
  planType: '',
  monthlySpend: '',
  seats: '1',
  useCase: '',
};

const STEPS = [
  { id: 1, label: 'Company Info', icon: '🏢' },
  { id: 2, label: 'AI Tools', icon: '🤖' },
  { id: 3, label: 'Review', icon: '✅' },
];

const AuditForm = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(1);

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    companyName: '',
    teamSize: '',
    role: '',
    email: '',
  });

  const [tools, setTools] = useState<Tool[]>([{ ...EMPTY_TOOL }]);

  const [errors, setErrors] = useState<Errors>({});

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [showErrorPopup, setShowErrorPopup] =
    useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const totals = calculateTotals(tools);

  const addTool = (): void => {
    setTools([...tools, { ...EMPTY_TOOL }]);
  };

  const removeTool = (index: number): void => {
    if (tools.length > 1) {
      setTools(tools.filter((_, i) => i !== index));
    }
  };

  const updateTool = (
    index: number,
    updated: Tool
  ): void => {
    const newTools = [...tools];
    newTools[index] = updated;
    setTools(newTools);
  };

  const validateStep1 = (): boolean => {
    const errs: Errors = {};

    if (!companyInfo.companyName.trim()) {
      errs.companyName = 'Company name is required';
    }

    if (!companyInfo.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(companyInfo.email)) {
      errs.email = 'Enter a valid email';
    }

    if (!companyInfo.teamSize) {
      errs.teamSize = 'Team size is required';
    }

    setErrors(errs);

    return Object.keys(errs).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errs: Errors = {};

    const hasValidTool = tools.some(
      (t) => t.toolName && t.monthlySpend
    );

    if (!hasValidTool) {
      errs.tools =
        'Add at least one tool with a name and monthly spend';
    }

    setErrors(errs);

    return Object.keys(errs).length === 0;
  };

  const handleNext = (): void => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;

    setErrors({});
    setStep(step + 1);
  };

  const handleBack = (): void => {
    setErrors({});
    setStep(step - 1);
  };

  const handleSubmit = async (): Promise<void> => {
    setIsSubmitting(true);

    try {
      // 1. Prepare inputs for deterministic engine
      const toolInputs: ToolInput[] = tools
        .filter((t) => t.toolName)
        .map((t) => ({
          toolName: t.toolName,
          planType: t.planType,
          monthlySpend: parseFloat(t.monthlySpend) || 0,
          seats: parseInt(t.seats) || 1,
          useCase: t.useCase,
        }));

      // 2. Run deterministic audit locally
      const auditResult = runAudit(toolInputs);

      // 3. Call backend to get the AI Summary
      // We pass the deterministic result to the backend so the LLM can generate a summary based on it
      const backendResponse = await processAudit(
        tools.filter((t) => t.toolName),
        auditResult
      );

      // 4. Merge results: Use the result returned by backend (which now includes our deterministic data + AI summary)
      const finalResult = backendResponse;

      localStorage.setItem(
        'spendwise_audit_result',
        JSON.stringify(finalResult)
      );

      navigate('/results/latest');
    } catch (error) {
      console.error(error);

      setErrorMessage(
        "We couldn't connect to our AI engine. Please check if the backend is running and try again."
      );

      setShowErrorPopup(true);
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-dark-900 pb-16 relative overflow-hidden"
      style={{ paddingTop: '100px' }}
    >
      {/* Background */}
      <div className="glow-orb w-[500px] h-[500px] bg-indigo-600/15 top-0 left-0" />
      <div className="glow-orb w-[400px] h-[400px] bg-purple-600/10 bottom-0 right-0" />

      <div className="container-custom relative z-10 max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="section-label mb-4">
            AI Spend Audit
          </span>

          <h1 className="font-display text-4xl md:text-5xl font-800 text-white mb-4 mt-4">
            Audit Your{' '}
            <span className="gradient-text">
              AI Stack
            </span>
          </h1>

          <p className="text-slate-400 text-lg max-w-lg mx-auto">
            Add your AI tools below. We'll analyze your
            spend and find savings in under 4 minutes.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-0 mb-10"
        >
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${step === s.id
                    ? 'bg-indigo-500/20 border border-indigo-500/40 text-indigo-300'
                    : step > s.id
                      ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                      : 'bg-white/3 border border-white/8 text-slate-500'
                  }`}
              >
                <span>{step > s.id ? '✅' : s.icon}</span>

                <span className="text-sm hidden sm:block">
                  {s.label}
                </span>
              </div>

              {i < STEPS.length - 1 && (
                <div
                  className={`w-8 h-px ${step > s.id
                      ? 'bg-green-500/30'
                      : 'bg-white/10'
                    }`}
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* Step Content */}
        <div className="min-h-[500px] flex flex-col">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="w-full flex-1"
              >
                <div className="glass-card p-8 border border-white/5">
                  <h2 className="text-white text-xl font-bold mb-8 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-sm">🏢</span> 
                    Company Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                    <div className="md:col-span-2">
                      <label className="block text-slate-400 text-[10px] font-bold mb-3 uppercase tracking-[0.2em]">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        value={companyInfo.email}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                        placeholder="you@company.com"
                        id="audit-email"
                        className={`input-field h-14 ${errors.email ? 'border-red-500/50' : 'border-white/10'}`}
                      />
                      <div className="h-4">
                        {errors.email && <p className="text-red-400 text-[10px] font-bold mt-2 uppercase tracking-wider">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 text-[10px] font-bold mb-3 uppercase tracking-[0.2em]">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        value={companyInfo.companyName}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, companyName: e.target.value })}
                        placeholder="Acme Corp"
                        id="audit-company"
                        className={`input-field h-14 ${errors.companyName ? 'border-red-500/50' : 'border-white/10'}`}
                      />
                      <div className="h-4">
                        {errors.companyName && <p className="text-red-400 text-[10px] font-bold mt-2 uppercase tracking-wider">{errors.companyName}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 text-[10px] font-bold mb-3 uppercase tracking-[0.2em]">
                        Your Role
                      </label>
                      <select
                        value={companyInfo.role}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, role: e.target.value })}
                        id="audit-role"
                        className="select-field h-14 border-white/10"
                      >
                        <option value="">Select your role...</option>
                        {['Founder/CEO', 'CTO', 'Engineering Lead', 'Developer', 'Product Manager', 'Indie Hacker', 'Other'].map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-slate-400 text-[10px] font-bold mb-4 uppercase tracking-[0.2em]">
                        Team Size *
                      </label>
                      <div className="grid grid-cols-5 gap-3">
                        {['1', '2-5', '6-15', '16-50', '51+'].map((size) => (
                          <button
                            key={size}
                            type="button"
                            id={`team-size-${size}`}
                            onClick={() => setCompanyInfo({ ...companyInfo, teamSize: size })}
                            className={`h-12 rounded-xl border text-xs font-bold transition-all duration-300 ${
                              companyInfo.teamSize === size
                                ? 'bg-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-500/20'
                                : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:bg-white/8'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                      <div className="h-4">
                        {errors.teamSize && <p className="text-red-400 text-[10px] font-bold mt-3 uppercase tracking-wider">{errors.teamSize}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="w-full flex-1"
              >
                {totals.totalMonthly > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass border border-white/10 rounded-2xl p-5 mb-6 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                        <MdInfo className="text-indigo-400 text-xl" />
                      </div>

                      <span className="text-slate-400 text-sm font-medium">
                        Total tracked spend
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="text-white text-lg font-bold">
                        {formatCurrency(totals.totalMonthly)}<span className="text-slate-500 text-xs font-medium ml-1">/mo</span>
                      </div>

                      <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mt-0.5">
                        {formatCurrency(totals.totalAnnual)} / year
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="h-10">
                  {errors.tools && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-4"
                    >
                      {errors.tools}
                    </motion.div>
                  )}
                </div>

                <div className="space-y-4">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {tools.map((tool, i) => (
                      <motion.div
                        key={i}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ToolCard
                          tool={tool}
                          index={i}
                          onUpdate={updateTool}
                          onRemove={removeTool}
                          canRemove={tools.length > 1}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <motion.button
                  onClick={addTool}
                  whileHover={{ scale: 1.005, backgroundColor: 'rgba(255,255,255,0.08)' }}
                  whileTap={{ scale: 0.995 }}
                  className="w-full mt-6 py-5 rounded-2xl border-2 border-dashed border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-3 font-bold text-sm tracking-wide"
                >
                  <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center">
                    <MdAdd size={18} />
                  </div>
                  Add Another AI Tool
                </motion.button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="w-full flex-1"
              >
                <div className="glass-card p-8 mb-6 border border-white/5">
                  <h2 className="text-white font-bold text-xl mb-8 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-sm">✅</span> 
                    Review Your Audit
                  </h2>

                  {/* Company summary */}
                  <div className="mb-8 p-6 bg-white/3 rounded-2xl border border-white/8">
                    <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Company Overview</h3>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                      <div className="flex flex-col gap-1">
                        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Company</span>
                        <span className="text-white font-medium">{companyInfo.companyName || '—'}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Team Size</span>
                        <span className="text-white font-medium">{companyInfo.teamSize || '—'}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Role</span>
                        <span className="text-white font-medium">{companyInfo.role || '—'}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Email</span>
                        <span className="text-white font-medium truncate">{companyInfo.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tools summary */}
                  <div className="space-y-3 mb-8">
                    <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Tools To Analyze ({tools.filter(t => t.toolName).length})</h3>
                    {tools.filter(t => t.toolName).map((tool, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/3 rounded-xl border border-white/5 hover:bg-white/5 transition-colors">
                        <span className="text-white text-sm font-bold capitalize">{tool.toolName.replace('-', ' ')}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{tool.planType} · {tool.seats} seat(s)</span>
                          <span className="text-white font-bold text-sm">
                            ${(parseFloat(tool.monthlySpend) * parseInt(tool.seats || '1')).toLocaleString()}/mo
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="bg-gradient-to-br from-indigo-500/20 to-purple-600/10 border border-indigo-500/30 rounded-2xl p-6 flex items-center justify-between shadow-xl shadow-indigo-500/10">
                    <div>
                      <div className="text-indigo-300 text-[10px] font-bold uppercase tracking-wider">Total Monthly Spend</div>
                      <div className="text-3xl font-extrabold text-white mt-1">{formatCurrency(totals.totalMonthly)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-purple-300 text-[10px] font-bold uppercase tracking-wider">Total Annual Spend</div>
                      <div className="text-3xl font-extrabold gradient-text mt-1">{formatCurrency(totals.totalAnnual)}</div>
                    </div>
                  </div>
                </div>

                {/* Privacy note */}
                <div className="flex items-center gap-4 p-5 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl text-slate-400 text-xs mb-8">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🔒</span>
                  </div>
                  <p className="leading-relaxed">
                    Your data is <span className="text-white font-semibold">encrypted</span> and results are generated privately. We never share your stack details with vendors.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <motion.div className="flex items-center justify-between mt-6">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="btn-secondary flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <MdArrowBack />
            Back
          </button>

          {step < 3 ? (
            <button
              onClick={handleNext}
              className="btn-primary flex items-center gap-2"
            >
              Continue
              <MdArrowForward />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-primary flex items-center gap-2 min-w-[180px] justify-center"
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Analyzing...
                </>
              ) : (
                <>
                  <HiSparkles />
                  Run AI Audit
                </>
              )}
            </button>
          )}
        </motion.div>
      </div>

      {/* Error Popup */}
      <AnimatePresence>
        {showErrorPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{
                scale: 0.9,
                opacity: 0,
                y: 20,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
                y: 20,
              }}
              className="glass-card max-w-md w-full p-8 border-red-500/20"
            >
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⚠️</span>
              </div>

              <h3 className="text-white text-xl font-bold text-center mb-2">
                Connection Failed
              </h3>

              <p className="text-slate-400 text-center mb-8">
                {errorMessage}
              </p>

              <button
                onClick={() =>
                  setShowErrorPopup(false)
                }
                className="w-full py-4 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 rounded-2xl font-bold transition-all duration-200"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuditForm;