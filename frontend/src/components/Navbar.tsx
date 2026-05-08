import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSparkles, HiMenuAlt3, HiX } from 'react-icons/hi';
import { MdRocketLaunch } from 'react-icons/md';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (href) => {
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ── Fixed Navbar Bar ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: 'rgba(3, 7, 18, 0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 24px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(99,102,241,0.4)',
              }}
            >
              <HiSparkles style={{ color: '#fff', fontSize: '18px' }} />
            </div>
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: '17px',
                letterSpacing: '-0.3px',
                background: 'linear-gradient(135deg, #6366f1 0%, #a78bfa 60%, #00d4ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              SpendWise AI
            </span>
          </Link>

          {/* Desktop nav links — center */}
          <div
            className="hidden lg:flex items-center gap-[2px] absolute left-1/2 -translate-x-1/2"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                style={{
                  padding: '7px 14px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#94a3b8',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'color 0.2s, background 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#94a3b8';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: CTA button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <Link
              to="/audit"
              id="nav-start-audit-btn"
              className="hidden md:inline-flex items-center gap-[7px]"
              style={{

                padding: '9px 20px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#fff',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                boxShadow: '0 0 20px rgba(99,102,241,0.3)',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px rgba(99,102,241,0.6)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(99,102,241,0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <MdRocketLaunch style={{ fontSize: '16px', flexShrink: 0 }} />
              Start Free Audit
            </Link>

            {/* Mobile hamburger */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex items-center justify-center"
              style={{

                width: '38px',
                height: '38px',
                borderRadius: '9px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              {mobileOpen ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile dropdown menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'fixed',
              top: '64px',
              left: 0,
              right: 0,
              zIndex: 999,
              background: 'rgba(3, 7, 18, 0.97)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              padding: '12px 24px 16px',
            }}
          >
            <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  style={{
                    textAlign: 'left',
                    padding: '12px 14px',
                    fontSize: '15px',
                    fontWeight: 500,
                    color: '#cbd5e1',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  {link.label}
                </button>
              ))}
              <Link
                to="/audit"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '8px',
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#fff',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  borderRadius: '10px',
                  textDecoration: 'none',
                }}
              >
                <MdRocketLaunch />
                Start Free Audit
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
