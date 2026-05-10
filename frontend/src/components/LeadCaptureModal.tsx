import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdClose, MdCheck } from 'react-icons/md';
import { HiSparkles } from 'react-icons/hi';
import { captureLeadAndEmail } from '../api/api';

const TEAM_SIZES = ['Just me', '2-5', '6-15', '16-50', '51+'];
const ROLES = ['Founder/CEO', 'CTO', 'Engineering Lead', 'Developer', 'Product Manager', 'Other'];

const LeadCaptureModal = ({ onClose, auditData }) => {
  const [form, setForm] = useState({ email: '', company: '', role: '', teamSize: '', _honeypot: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = 'Email required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (!form.company) errs.company = 'Company name required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check for abuse protection (bots auto-fill hidden fields)
    if (form._honeypot) {
      console.warn("Bot detected via honeypot. Rejecting silently.");
      setSubmitted(true);
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await captureLeadAndEmail(
        form.email,
        form.company,
        form.role,
        form.teamSize,
        auditData
      );
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      setErrorMessage("We couldn't send your report right now. Please check your internet connection or try again later.");
      setShowErrorPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {/* ── Backdrop ── */}
      <motion.div
        key="lead-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 3000,
          background: 'rgba(3, 7, 18, 0.9)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 16px',
          overflowY: 'auto',
        }}
      >
        {/* ── Modal Panel ── */}
        <motion.div
          key="lead-modal-panel"
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ duration: 0.28, type: 'spring', damping: 22, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '460px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
            flexShrink: 0,
          }}
        >
          {/* Gradient top bar */}
          <div style={{ height: '3px', background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #00d4ff)' }} />

          {!submitted ? (
            <div style={{ padding: '28px' }}>

              {/* Header row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0,
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 20px rgba(99,102,241,0.4)',
                  }}>
                    <HiSparkles style={{ color: '#fff', fontSize: '18px' }} />
                  </div>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: '15px' }}>Get Your Full Report</div>
                    <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '6px' }}>
                      We'll email you a secure link to your full report.
                    </p>
                  </div>
                </div>

                {/* Honeypot field (hidden from real users, visible to bots) */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <label htmlFor="_honeypot">Do not fill this out if you are human</label>
                  <input
                    type="text"
                    id="_honeypot"
                    name="_honeypot"
                    value={form._honeypot}
                    onChange={(e) => setForm({ ...form, _honeypot: e.target.value })}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>

                {/* Close */}
                <button
                  id="lead-modal-close-btn"
                  onClick={onClose}
                  style={{
                    width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                    color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginLeft: '8px',
                  }}
                >
                  <MdClose size={16} />
                </button>
              </div>

              <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.6', marginBottom: '22px' }}>
                We'll send your detailed savings report with step-by-step implementation guides directly to your inbox.
              </p>

              <form onSubmit={handleSubmit}>

                {/* Email */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', color: '#64748b', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Work Email *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                    id="lead-email"
                    className="input-field"
                    style={errors.email ? { borderColor: 'rgba(239,68,68,0.5)' } : {}}
                  />
                  {errors.email && <p style={{ color: '#f87171', fontSize: '11px', marginTop: '4px' }}>{errors.email}</p>}
                </div>

                {/* Company */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', color: '#64748b', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Acme Corp"
                    id="lead-company"
                    className="input-field"
                    style={errors.company ? { borderColor: 'rgba(239,68,68,0.5)' } : {}}
                  />
                  {errors.company && <p style={{ color: '#f87171', fontSize: '11px', marginTop: '4px' }}>{errors.company}</p>}
                </div>

                {/* Role */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', color: '#64748b', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Your Role
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    id="lead-role"
                    className="select-field"
                  >
                    <option value="">Select role...</option>
                    {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                {/* Team Size */}
                <div style={{ marginBottom: '22px' }}>
                  <label style={{ display: 'block', color: '#64748b', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Team Size
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
                    {TEAM_SIZES.map((size) => (
                      <button
                        key={size}
                        type="button"
                        id={`lead-team-${size}`}
                        onClick={() => setForm({ ...form, teamSize: size })}
                        style={{
                          padding: '9px 4px',
                          borderRadius: '10px',
                          fontSize: '12px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          background: form.teamSize === size ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.04)',
                          border: form.teamSize === size ? '1px solid rgba(99,102,241,0.5)' : '1px solid rgba(255,255,255,0.08)',
                          color: form.teamSize === size ? '#a5b4fc' : '#94a3b8',
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="lead-submit-btn"
                  className="btn-primary"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <HiSparkles />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send My Free Report'}
                </button>

                <p style={{ textAlign: 'center', color: '#475569', fontSize: '11px' }}>
                  🔒 We never share your data with AI tool vendors
                </p>
              </form>
            </div>
          ) : (
            /* ── Success state ── */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ padding: '48px 28px', textAlign: 'center' }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12, delay: 0.1 }}
                style={{
                  width: '64px', height: '64px', borderRadius: '50%', margin: '0 auto 20px',
                  background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <MdCheck style={{ color: '#4ade80', fontSize: '28px' }} />
              </motion.div>
              <h3 style={{ color: '#fff', fontWeight: 600, fontSize: '20px', marginBottom: '10px' }}>Report on its way! 🚀</h3>
              <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
                We'll send your personalized savings report to{' '}
                <strong style={{ color: '#fff' }}>{form.email}</strong> within 5 minutes.
              </p>
              <button
                onClick={onClose}
                className="btn-primary"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                Back to Dashboard
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
    
    {/* Error Popup Overlay */ }
  <AnimatePresence>
    {showErrorPopup && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 3000,
          background: 'rgba(3, 7, 18, 0.9)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          style={{
            background: '#111827',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '24px',
            padding: '32px',
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}
        >
          <div style={{
            width: '60px', height: '60px', background: 'rgba(239, 68, 68, 0.1)',
            borderRadius: '50%', display: 'flex', alignItems: 'center',
            justifyContent: 'center', margin: '0 auto 20px'
          }}>
            <span style={{ fontSize: '24px' }}>❌</span>
          </div>
          <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Transmission Error</h3>
          <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
            {errorMessage}
          </p>
          <button
            onClick={() => setShowErrorPopup(false)}
            style={{
              width: '100%', padding: '14px', background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171',
              borderRadius: '14px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
    </>
  );
};

export default LeadCaptureModal;
