import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MdTrendingDown, MdInsights, MdShare, MdContentCopy, MdCheck,
  MdPriorityHigh, MdRocketLaunch, MdArrowForward
} from 'react-icons/md';
import { HiSparkles } from 'react-icons/hi';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid
} from 'recharts';
import Navbar from '../components/Navbar';
import ResultCard from '../components/ResultCard';
import SummaryCard from '../components/SummaryCard';
import LeadCaptureModal from '../components/LeadCaptureModal';
import { formatCurrency, getPriorityColor } from '../utils/helpers';

// Animated counter component
const AnimatedCounter = ({ target, prefix = '', suffix = '', duration = 2000 }) => {
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
    <span>{prefix}{count.toLocaleString()}{suffix}</span>
  );
};

// Custom tooltip for chart
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 text-xs">
        <p className="text-white font-semibold mb-1">{label}</p>
        <p className="text-slate-400">Current: <span className="text-white">${payload[0]?.value}/mo</span></p>
        <p className="text-green-400">Recommended: <span className="text-white">${payload[1]?.value}/mo</span></p>
      </div>
    );
  }
  return null;
};

const ResultsDashboard = () => {
  const [copied, setCopied] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);

  // Read data from localStorage (set by AuditForm after backend returns it)
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('spendwise_audit_result');
    return saved ? JSON.parse(saved) : null;
  });

  if (!data) {
    return (
      <div className="bg-dark-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-white text-2xl font-bold mb-4">No Audit Data Found</h2>
          <Link to="/audit" className="btn-primary">Run an Audit First</Link>
        </div>
      </div>
    );
  }


  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalSavingsPercent = Math.round((data.projectedMonthlySavings / data.totalMonthlySpend) * 100);

  return (
    <div className="bg-dark-900 min-h-screen">
      <Navbar />

      <div className="container-custom pb-32 relative z-10" style={{ paddingTop: '100px' }}>
        {/* Background orbs */}
        <div className="glow-orb w-[500px] h-[500px] bg-green-600/8 top-0 right-0 fixed pointer-events-none" />
        <div className="glow-orb w-[400px] h-[400px] bg-indigo-600/10 bottom-0 left-0 fixed pointer-events-none" />

        {/* Dashboard header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10"
        >
          <div>
            <span className="section-label mb-3 inline-block">Audit Results</span>
            <h1 className="font-display text-4xl md:text-5xl font-800 text-white mt-3" style={{ fontWeight: 800 }}>
              Your AI Spend <span className="gradient-text">Report</span>
            </h1>
            <p className="text-slate-400 mt-2 text-sm flex items-center gap-2">
              <HiSparkles className="text-indigo-400" />
              {data.toolsAnalyzed} tools analyzed · {data.overpaymentsFound} overpayments found
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={copyLink}
              id="copy-share-link-btn"
              className="btn-secondary flex items-center gap-2 text-sm py-2.5 px-5"
            >
              {copied ? <MdCheck className="text-green-400" /> : <MdContentCopy />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
            <button
              onClick={() => setShowLeadModal(true)}
              id="email-report-btn"
              className="btn-primary flex items-center gap-2 text-sm py-2.5 px-5"
            >
              <MdShare />
              Email Report
            </button>
          </div>
        </motion.div>

        {/* Top stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            {
              label: 'Monthly Spend',
              value: data.totalMonthlySpend,
              prefix: '$',
              suffix: '',
              sub: 'across all tools',
              icon: '💳',
              color: 'from-slate-500/20 to-slate-600/10',
              border: 'border-white/10',
            },
            {
              label: 'Monthly Savings',
              value: data.projectedMonthlySavings,
              prefix: '$',
              suffix: '/mo',
              sub: 'projected savings',
              icon: '💰',
              color: 'from-green-500/20 to-green-600/10',
              border: 'border-green-500/20',
            },
            {
              label: 'Annual Savings',
              value: data.projectedAnnualSavings,
              prefix: '$',
              suffix: '/yr',
              sub: 'projected savings',
              icon: '📈',
              color: 'from-blue-500/20 to-cyan-600/10',
              border: 'border-blue-500/20',
            },
            {
              label: 'Savings %',
              value: totalSavingsPercent,
              prefix: '',
              suffix: '%',
              sub: 'of spend recoverable',
              icon: '⚡',
              color: 'from-indigo-500/20 to-purple-600/10',
              border: 'border-indigo-500/20',
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`stat-card bg-gradient-to-br ${stat.color} border ${stat.border}`}
            >
              <div className="text-2xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-white mb-1">
                <AnimatedCounter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <div className="text-slate-400 text-xs">{stat.sub}</div>
              <div className="text-slate-500 text-xs mt-1 uppercase tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Savings progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MdTrendingDown className="text-green-400 text-xl" />
              <span className="text-white font-semibold">Savings Potential</span>
            </div>
            <span className="text-green-400 font-bold">{totalSavingsPercent}% reducible</span>
          </div>
          <div className="progress-bar mb-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${totalSavingsPercent}%` }}
              transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
              className="progress-fill"
            />
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>Optimal spend: {formatCurrency(data.totalMonthlySpend - data.projectedMonthlySavings)}/mo</span>
            <span>Current: {formatCurrency(data.totalMonthlySpend)}/mo</span>
          </div>
        </motion.div>

        {/* Main dashboard grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Left: Recommendations */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <MdInsights className="text-indigo-400 text-xl" />
              <h2 className="text-white font-semibold text-lg">Recommendations</h2>
              <span className="tag-pill bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs ml-auto">
                {data.recommendations.length} found
              </span>
            </div>
            {data.recommendations.map((rec, i) => (
              <ResultCard key={rec.id} rec={rec} index={i} />
            ))}
          </div>

          {/* Right: Chart + Actions */}
          <div className="space-y-6">
            {/* Spend comparison chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <h3 className="text-white font-semibold mb-1 text-sm">Spend Comparison</h3>
              <p className="text-slate-500 text-xs mb-5">Current vs Recommended</p>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data.spendBreakdown} barGap={4} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.2}/>
                    </linearGradient>
                    <linearGradient id="colorRecommended" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00ffa3" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#00ffa3" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: '#64748b', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    angle={-30}
                    textAnchor="end"
                    height={45}
                  />
                  <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                  <Bar dataKey="spend" name="Current" radius={[4, 4, 0, 0]}>
                    {data.spendBreakdown.map((_, i) => (
                      <Cell key={i} fill="url(#colorCurrent)" />
                    ))}
                  </Bar>
                  <Bar dataKey="recommended" name="Recommended" radius={[4, 4, 0, 0]}>
                    {data.spendBreakdown.map((_, i) => (
                      <Cell key={i} fill="url(#colorRecommended)" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-4 mt-2 justify-center">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm bg-indigo-500/60" />
                  <span className="text-slate-500 text-xs">Current</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm" style={{ background: 'rgba(0,255,163,0.5)' }} />
                  <span className="text-slate-500 text-xs">Recommended</span>
                </div>
              </div>
            </motion.div>


          </div>
        </div>

        {/* AI Summary */}
        <div className="mb-8">
          <SummaryCard aiSummary={data.aiSummary} />
        </div>

        {/* Dynamic Business Logic (Credex Promo & Optimized Message) */}
        {data.projectedMonthlySavings > 500 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 p-8 glass-card border-indigo-500/50 bg-indigo-500/10 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-3 flex items-center justify-center gap-2">
              <HiSparkles className="text-indigo-400" />
              Unlock these savings instantly with Credex
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto text-sm leading-relaxed">
              Credex is the premium secondary market for discounted AI infrastructure credits. 
              Instead of paying retail for your optimized stack, you can fulfill these exact recommendations through Credex and stack your savings even higher.
            </p>
            <a href="https://credex.rocks" target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all">
              Claim Discounted Credits on Credex <MdArrowForward />
            </a>
          </motion.div>
        )}

        {data.projectedMonthlySavings < 100 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 p-6 glass-card border-green-500/50 bg-green-500/10 text-center"
          >
            <h3 className="text-xl font-bold text-green-400 mb-2">You're already highly optimized!</h3>
            <p className="text-slate-300 text-sm">Your current AI stack is lean and efficient. We did not find any major overlaps or overspending in your current setup. Keep up the great operational discipline!</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <p className="text-slate-400 text-sm mb-4">Ready to implement these changes?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowLeadModal(true)}
              className="btn-primary flex items-center justify-center gap-2"
            >
              <HiSparkles />
              Get Full Report by Email
            </button>
            <Link to="/audit" className="btn-secondary flex items-center justify-center gap-2">
              Run New Audit
              <MdArrowForward />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Lead capture modal */}
      {showLeadModal && <LeadCaptureModal onClose={() => setShowLeadModal(false)} auditData={data} />}
    </div>
  );
};

export default ResultsDashboard;
