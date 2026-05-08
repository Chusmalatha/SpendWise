import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuditPage from './pages/AuditPage';
import ResultsDashboard from './pages/ResultsDashboard';
import ShareableResult from './pages/ShareableResult';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/audit" element={<AuditPage />} />
      <Route path="/results/:id" element={<ResultsDashboard />} />
      <Route path="/result/:id" element={<ShareableResult />} />
      {/* 404 fallback */}
      <Route
        path="*"
        element={
          <div className="min-h-screen bg-dark-900 flex items-center justify-center text-white text-center">
            <div>
              <div className="text-8xl mb-4">🤖</div>
              <h1 className="text-4xl font-bold gradient-text mb-2">404</h1>
              <p className="text-slate-400 mb-6">This page doesn't exist — but your AI savings do.</p>
              <a href="/" className="btn-primary inline-flex items-center gap-2">← Back to SpendWise</a>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
