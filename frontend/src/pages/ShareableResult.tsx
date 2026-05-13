import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdShare, MdContentCopy, MdCheck, MdTrendingDown, MdArrowForward } from 'react-icons/md';
import { HiSparkles } from 'react-icons/hi';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid
} from 'recharts';
import Navbar from '../components/Navbar';
import ResultCard from '../components/ResultCard';
import { MOCK_DASHBOARD_DATA } from '../data/mockData';
import { formatCurrency } from '../utils/helpers';
import { fetchAudit } from '../api/api';

const ShareableResult = () => {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadResult = async () => {
      if (!id) return;

      // Special case for demo
      if (id === 'demo') {
        setData(MOCK_DASHBOARD_DATA);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await fetchAudit(id);
        setData(result);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch shared result:", err);
        setError(true);
        setLoading(false);
      }
    };

    loadResult();
  }, [id]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="bg-dark-900 min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full"
        />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-dark-900 min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <div className="text-6xl mb-6">🏜️</div>
          <h2 className="text-white text-2xl font-bold mb-4">Report Not Found</h2>
          <p className="text-slate-400 mb-8 max-w-md">This report may have expired or the link is incorrect.</p>
          <Link to="/audit" className="btn-primary">Run Your Own Audit</Link>
        </div>
      </div>
    );
  }

  const totalSavingsPercent = Math.round((data.projectedMonthlySavings / data.totalMonthlySpend) * 100);

  return (
    <div className="bg-dark-900 min-h-screen">
      <Navbar />

      <div className="container-custom pb-32 max-w-4xl relative z-10" style={{ paddingTop: '100px' }}>
        {/* Background orbs */}
        <div className="glow-orb w-[500px] h-[500px] bg-green-600/8 top-0 right-0 fixed pointer-events-none" />

        {/* Public badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <span className="tag-pill bg-green-500/10 text-green-400 border border-green-500/20 text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block animate-pulse" />
              Public Report
            </span>
            <span className="text-slate-500 text-xs font-mono">ID: {id}</span>
          </div>
          <button
            onClick={copyLink}
            id="share-copy-btn"
            className="btn-secondary flex items-center gap-2 text-sm py-2 px-4"
          >
            {copied ? <MdCheck className="text-green-400" /> : <MdShare />}
            {copied ? 'Copied!' : 'Share'}
          </button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <HiSparkles className="text-white text-lg" />
            </div>
            <span className="font-display font-700 text-lg" style={{ fontWeight: 700 }}>
              <span className="gradient-text">SpendWise</span>
              <span className="text-white"> AI</span>
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-800 text-white mb-4" style={{ fontWeight: 800 }}>
            AI Spend Analysis Report
          </h1>
          <p className="text-slate-400 text-lg">
            A team found <span className="text-green-400 font-bold">{formatCurrency(data.projectedMonthlySavings)}/month</span> in savings opportunities
          </p>
        </motion.div>

        {/* Key metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Tools Analyzed', value: data.toolsAnalyzed, icon: '🤖', suffix: '' },
            { label: 'Savings Found', value: `$${data.projectedMonthlySavings}`, icon: '💰', suffix: '/mo', isStr: true },
            { label: 'Annual Savings', value: `$${data.projectedAnnualSavings.toLocaleString()}`, icon: '📈', suffix: '/yr', isStr: true },
            { label: 'Reduction', value: totalSavingsPercent, icon: '⚡', suffix: '%' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="stat-card text-center"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-white">
                {stat.isStr ? stat.value : stat.value}
                {!stat.isStr && <span className="text-sm text-slate-400">{stat.suffix}</span>}
                {stat.isStr && <span className="text-sm text-slate-400">{stat.suffix}</span>}
              </div>
              <div className="text-slate-500 text-xs mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Savings progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-semibold flex items-center gap-2">
              <MdTrendingDown className="text-green-400" />
              Spend Reduction Potential
            </span>
            <span className="gradient-text-green font-bold">{totalSavingsPercent}%</span>
          </div>
          <div className="progress-bar mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${totalSavingsPercent}%` }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="progress-fill"
            />
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>Optimized: {formatCurrency(data.totalMonthlySpend - data.projectedMonthlySavings)}/mo</span>
            <span>Current: {formatCurrency(data.totalMonthlySpend)}/mo</span>
          </div>
        </motion.div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass-card p-6 mb-8"
        >
          <h3 className="text-white font-semibold mb-1">Tool-by-Tool Comparison</h3>
          <p className="text-slate-500 text-xs mb-5">Current spend vs recommended</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data.spendBreakdown} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 12 }}
                labelStyle={{ color: '#fff' }}
              />
              <Bar dataKey="spend" name="Current" radius={[4, 4, 0, 0]}>
                {data.spendBreakdown.map((_, i) => (
                  <Cell key={i} fill="rgba(99,102,241,0.6)" />
                ))}
              </Bar>
              <Bar dataKey="recommended" name="Recommended" radius={[4, 4, 0, 0]}>
                {data.spendBreakdown.map((_, i) => (
                  <Cell key={i} fill="rgba(0,255,163,0.5)" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recommendations */}
        <div className="mb-10">
          <h2 className="text-white font-semibold text-xl mb-5 flex items-center gap-2">
            <HiSparkles className="text-indigo-400" />
            Recommendations
          </h2>
          <div className="space-y-4">
            {data.recommendations.map((rec, i) => (
              <ResultCard key={rec.id} rec={rec} index={i} />
            ))}
          </div>
        </div>

        {/* Privacy notice */}
        <div className="bg-white/2 border border-white/5 rounded-xl p-4 text-slate-500 text-xs text-center mb-8">
          🔒 Company name and contact details are hidden from this public report for privacy.
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-8 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.08) 100%)' }}
        >
          <h3 className="text-white font-semibold text-2xl mb-3">
            Find savings like this for your team
          </h3>
          <p className="text-slate-400 mb-6">Free audit. No credit card. Results in 4 minutes.</p>
          <Link
            to="/audit"
            id="shareable-start-audit-btn"
            className="btn-primary inline-flex items-center gap-2 text-base py-4 px-8"
          >
            <HiSparkles />
            Start My Free Audit
            <MdArrowForward />
          </Link>
          <div className="mt-4 flex justify-center gap-6 text-slate-500 text-xs">
            <span>✅ Free forever</span>
            <span>🔒 Private & secure</span>
            <span>⚡ 4-minute results</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ShareableResult;
