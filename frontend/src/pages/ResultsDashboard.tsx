import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MdInsights,
  MdShare,
  MdContentCopy,
  MdCheck,
  MdRocketLaunch,
  MdArrowForward,
  MdBarChart,
} from 'react-icons/md';
import { HiSparkles } from 'react-icons/hi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from 'recharts';

import Navbar from '../components/Navbar';
import ResultCard from '../components/ResultCard';
import SummaryCard from '../components/SummaryCard';
import LeadCaptureModal from '../components/LeadCaptureModal';

import { formatCurrency } from '../utils/helpers';
import { MOCK_DASHBOARD_DATA } from '../data/mockData';

// Animated Counter
const AnimatedCounter = ({
  target,
  prefix = '',
  suffix = '',
  duration = 2000,
}) => {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;

    started.current = true;

    let start = 0;
    const step = target / (duration / 16);

    const timer = setInterval(() => {
      start += step;

      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => {
      clearInterval(timer);
      started.current = false;
    };
  }, [target, duration]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 text-xs border border-white/10 shadow-2xl rounded-xl">
        <p className="text-white font-semibold mb-2">{label}</p>

        <div className="space-y-1">
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">Current:</span>

            <span className="text-indigo-300 font-bold">
              ${payload[0]?.value}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-400">Recommended:</span>

            <span className="text-green-400 font-bold">
              ${payload[1]?.value}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const ResultsDashboard = () => {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);

  // Read from localStorage or use mock data if it's a demo
  const [data] = useState(() => {
    // If explicit demo, or if no local data exists and we are at /results/demo
    if (id === 'demo') {
      return MOCK_DASHBOARD_DATA;
    }
    
    const saved = localStorage.getItem('spendwise_audit_result');
    
    // If no saved data and we are at /results/latest, fallback to demo so it's not empty
    if (!saved && id === 'latest') {
      return MOCK_DASHBOARD_DATA;
    }
    
    return saved ? JSON.parse(saved) : null;
  });

  if (!data) {
    return (
      <div className="bg-dark-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-white text-2xl font-bold mb-4">
            No Audit Data Found
          </h2>

          <Link to="/audit" className="btn-primary">
            Run an Audit First
          </Link>
        </div>
      </div>
    );
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const totalSavingsPercent = Math.round(
    (data.projectedMonthlySavings / data.totalMonthlySpend) * 100
  );

  const stats = [
    {
      label: 'Total Monthly Spend',
      value: data.totalMonthlySpend,
      prefix: '$',
      suffix: '',
      icon: '💳',
      trend: 'Neutral',
      color: 'indigo',
    },
    {
      label: 'Monthly Savings',
      value: data.projectedMonthlySavings,
      prefix: '$',
      suffix: '',
      icon: '💰',
      trend: 'Positive',
      color: 'green',
    },
    {
      label: 'Annual Recovery',
      value: data.projectedAnnualSavings,
      prefix: '$',
      suffix: '',
      icon: '📉',
      trend: 'Positive',
      color: 'cyan',
    },
    {
      label: 'Efficiency Score',
      value: 100 - totalSavingsPercent,
      prefix: '',
      suffix: '%',
      icon: '⚡',
      trend: 'Critical',
      color: 'purple',
    },
  ];

  return (
    <div className="bg-dark-900 min-h-screen overflow-x-hidden">
      <Navbar />

      <div
        className="container-custom max-w-[1380px] mx-auto pb-28 relative z-10 px-4 sm:px-6 lg:px-8"
        style={{ paddingTop: '100px' }}
      >
        {/* Background Glow */}
        <div className="glow-orb w-[600px] h-[600px] bg-indigo-600/5 top-0 right-0 fixed pointer-events-none blur-[120px]" />

        <div className="glow-orb w-[500px] h-[500px] bg-green-600/5 bottom-0 left-0 fixed pointer-events-none blur-[120px]" />

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 border-b border-white/5 pb-8"
        >
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-5">
              <HiSparkles />
              Audit Analysis Complete
            </span>

            <h1
              className="font-display text-4xl md:text-5xl xl:text-6xl text-white leading-tight"
              style={{ fontWeight: 800 }}
            >
              AI Spend{' '}
              <span className="gradient-text">
                Intelligence
              </span>
            </h1>

            <p className="text-slate-400 mt-5 text-base leading-relaxed">
              We analyzed{' '}
              <span className="text-white font-semibold">
                {data.toolsAnalyzed} tools
              </span>{' '}
              in your stack and identified optimization opportunities worth{' '}
              <span className="text-green-400 font-bold">
                {formatCurrency(data.projectedAnnualSavings)}
              </span>{' '}
              annually.
            </p>
          </div>

          {/* Header Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={copyLink}
              className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold flex items-center gap-2 hover:bg-white/10 transition-all text-sm"
            >
              {copied ? (
                <MdCheck className="text-green-400" />
              ) : (
                <MdContentCopy />
              )}

              {copied ? 'Copied' : 'Share'}
            </button>

            <button
              onClick={() => setShowLeadModal(true)}
              className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-bold flex items-center gap-2 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 text-sm"
            >
              <MdShare />
              Get Report
            </button>
          </div>
        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
              }}
              className="glass-card p-6 border border-white/5 hover:border-white/10 transition-all rounded-3xl min-h-[170px] flex flex-col justify-between"
            >
              <div className="flex items-start justify-between mb-5">
                <div
                  className={`w-11 h-11 rounded-2xl bg-${stat.color}-500/10 flex items-center justify-center text-xl`}
                >
                  {stat.icon}
                </div>

                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-white/5 text-slate-500">
                  {stat.trend}
                </span>
              </div>

              <div>
                <div className="text-3xl font-bold text-white mb-2">
                  <AnimatedCounter
                    target={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>

                <div className="text-slate-500 text-xs font-medium uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* MAIN DASHBOARD */}
        <div className="flex flex-col xl:flex-row gap-8 items-start">
          {/* LEFT */}
          <div className="min-w-0 flex-1">
            {/* Left Header */}
            <div className="flex items-center justify-between px-1 min-h-[48px] mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <MdInsights size={20} />
                </div>

                <h2 className="text-white font-bold text-xl tracking-tight">
                  Optimization Roadmap
                </h2>
              </div>

              <div className="text-slate-500 text-xs font-bold tracking-widest">
                {data.recommendations.length} ACTION ITEMS
              </div>
            </div>

            {/* First card stays beside chart */}
            {data.recommendations.length > 0 ? (
              <ResultCard
                key={data.recommendations[0].id}
                rec={data.recommendations[0]}
                index={0}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-10 border-green-500/20 bg-green-500/5 text-center flex flex-col items-center justify-center min-h-[300px]"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                  <MdCheck className="text-3xl text-green-400" />
                </div>
                
                <h3 className="text-white font-bold text-xl mb-3">Your Stack is Optimized</h3>
                
                <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
                  Great job! We analyzed your tools and couldn't find any immediate overpayments or redundancies. You're already using the most cost-effective plans for your scale.
                </p>
                
                <div className="mt-8 flex gap-3">
                  <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-wider">
                    Maximum Efficiency
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT */}
          <div className="space-y-5 self-start min-w-0 w-full xl:w-[390px] shrink-0 sticky top-24">
            {/* Header */}
            <div className="flex items-center justify-between px-1 min-h-[48px]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400">
                  <MdBarChart size={20} />
                </div>

                <h2 className="text-white font-bold text-xl tracking-tight">
                  Financial Delta
                </h2>
              </div>
            </div>

            {/* Chart Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-5 rounded-3xl border border-white/5 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4">
                <div className="text-green-400 text-xs font-bold bg-green-500/10 px-3 py-1 rounded-full">
                  -{totalSavingsPercent}% Spend
                </div>
              </div>

              <h3 className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-4">
                Category Breakdown
              </h3>

              {/* Chart */}
              <div className="h-[270px] w-full mt-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.spendBreakdown}
                    barGap={8}
                    margin={{
                      top: 0,
                      right: 0,
                      left: -25,
                      bottom: 0,
                    }}
                  >
                    <defs>
                      <linearGradient
                        id="colorCurrent"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#818cf8"
                          stopOpacity={1}
                        />

                        <stop
                          offset="100%"
                          stopColor="#4f46e5"
                          stopOpacity={0.6}
                        />
                      </linearGradient>

                      <linearGradient
                        id="colorRecommended"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#4ade80"
                          stopOpacity={1}
                        />

                        <stop
                          offset="100%"
                          stopColor="#16a34a"
                          stopOpacity={0.6}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.03)"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="name"
                      tick={{
                        fill: '#94a3b8',
                        fontSize: 10,
                        fontWeight: 500,
                      }}
                      axisLine={false}
                      tickLine={false}
                      dy={10}
                    />

                    <YAxis
                      tick={{
                        fill: '#64748b',
                        fontSize: 10,
                      }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{
                        fill: 'rgba(255,255,255,0.03)',
                      }}
                    />

                    <Bar
                      dataKey="spend"
                      name="Current"
                      radius={[8, 8, 0, 0]}
                      barSize={16}
                    >
                      {data.spendBreakdown.map((_, i) => (
                        <Cell
                          key={i}
                          fill="url(#colorCurrent)"
                        />
                      ))}
                    </Bar>

                    <Bar
                      dataKey="recommended"
                      name="Recommended"
                      radius={[8, 8, 0, 0]}
                      barSize={16}
                    >
                      {data.spendBreakdown.map((_, i) => (
                        <Cell
                          key={i}
                          fill="url(#colorRecommended)"
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-6 pt-5 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.4)]" />

                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                    Current
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]" />

                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                    Target
                  </span>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            {data.projectedMonthlySavings > 100 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="p-6 rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-purple-600/5 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <h4 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                    <MdRocketLaunch className="text-indigo-400" />
                    Stack Your Savings
                  </h4>

                  <p className="text-slate-400 text-sm leading-relaxed mb-5">
                    Apply these recommendations through
                    discounted credits on{' '}
                    <strong>Credex</strong> and unlock another
                    30% in savings.
                  </p>

                  <a
                    href="https://credex.rocks"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                  >
                    Browse Credex Market
                    <MdArrowForward />
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* REMAINING RECOMMENDATIONS */}
        {data.recommendations.slice(1).length > 0 && (
          <div className="mt-12 space-y-4">
            <h3 className="text-white/50 text-xs font-bold uppercase tracking-[0.2em] px-1 mb-6">
              Additional Optimization Steps
            </h3>
            
            <div className="space-y-4">
              {data.recommendations.slice(1).map((rec, i) => (
                <ResultCard
                  key={rec.id}
                  rec={rec}
                  index={i + 1}
                />
              ))}
            </div>
          </div>
        )}

        {/* AI SUMMARY BELOW DASHBOARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <SummaryCard aiSummary={data.aiSummary} />
        </motion.div>

        {/* FOOTER */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 pt-10 pb-20 border-t border-white/5 text-center"
        >
          <div className="flex flex-col sm:flex-row gap-10 justify-center">
            <button
              onClick={() => setShowLeadModal(true)}
              className="px-8 py-4 rounded-2xl bg-indigo-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20"
            >
              <HiSparkles />
              Generate an emaila3
            </button>

            <Link
              to="/audit"
              className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
            >
              Start New Audit
              <MdArrowForward />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* MODAL */}
      {showLeadModal && (
        <LeadCaptureModal
          onClose={() => setShowLeadModal(false)}
          auditData={data}
        />
      )}
    </div>
  );
};

export default ResultsDashboard;