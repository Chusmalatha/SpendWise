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

import { processAudit } from '../api/api';
import ToolCard from './ToolCard';
import { calculateTotals, formatCurrency } from '../utils/helpers';

interface Tool {
  toolName: string;
  planType: string;
  monthlySpend: string;
  seats: string;
  useCase: string;
}

interface CompanyInfo {
  companyName: string;
  teamSize: string;
  role: string;
  email: string;
}

interface Errors {
  companyName?: string;
  email?: string;
  teamSize?: string;
  tools?: string;
}

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
      const result = await processAudit(
        tools.filter((t) => t.toolName)
      );

      localStorage.setItem(
        'spendwise_audit_result',
        JSON.stringify(result)
      );

      navigate('/results/demo');
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
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <div className="glass-card p-8">
                <h2 className="text-white text-xl font-semibold mb-6">
                  Company Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    type="email"
                    placeholder="Work Email"
                    value={companyInfo.email}
                    onChange={(e) =>
                      setCompanyInfo({
                        ...companyInfo,
                        email: e.target.value,
                      })
                    }
                    className="input-field md:col-span-2"
                  />

                  <input
                    type="text"
                    placeholder="Company Name"
                    value={companyInfo.companyName}
                    onChange={(e) =>
                      setCompanyInfo({
                        ...companyInfo,
                        companyName: e.target.value,
                      })
                    }
                    className="input-field"
                  />

                  <input
                    type="text"
                    placeholder="Your Role"
                    value={companyInfo.role}
                    onChange={(e) =>
                      setCompanyInfo({
                        ...companyInfo,
                        role: e.target.value,
                      })
                    }
                    className="input-field"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              {totals.totalMonthly > 0 && (
                <motion.div className="glass border border-white/10 rounded-2xl p-4 mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                      <MdInfo className="text-indigo-400" />
                    </div>

                    <span className="text-slate-400 text-sm">
                      Total tracked spend
                    </span>
                  </div>

                  <div>
                    <div className="text-white font-bold">
                      {formatCurrency(
                        totals.totalMonthly
                      )}
                      /mo
                    </div>

                    <div className="text-slate-500 text-xs">
                      {formatCurrency(
                        totals.totalAnnual
                      )}
                      /yr
                    </div>
                  </div>
                </motion.div>
              )}

              <AnimatePresence>
                {tools.map((tool, i) => (
                  <motion.div
                    key={i}
                    className="mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
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

              <motion.button
                onClick={addTool}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-4 rounded-2xl border-2 border-dashed border-white/15 text-slate-400 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MdAdd size={20} />
                Add Another AI Tool
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <motion.div className="flex items-center justify-between mt-6">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="btn-secondary flex items-center gap-2"
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
              className="btn-primary flex items-center gap-2"
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