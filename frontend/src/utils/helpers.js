// Utility: format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Utility: format large numbers with K/M suffix
export const formatNumber = (num) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

// Generate a random result ID
export const generateResultId = () => {
  return Math.random().toString(36).substring(2, 9);
};

// Save audit data to localStorage
export const saveAuditToStorage = (data) => {
  try {
    localStorage.setItem('spendwise_audit', JSON.stringify(data));
    localStorage.setItem('spendwise_audit_time', new Date().toISOString());
  } catch (e) {
    console.error('Failed to save audit to localStorage:', e);
  }
};

// Load audit data from localStorage
export const loadAuditFromStorage = () => {
  try {
    const data = localStorage.getItem('spendwise_audit');
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Failed to load audit from localStorage:', e);
    return null;
  }
};

// Save lead capture data
export const saveLeadToStorage = (lead) => {
  try {
    localStorage.setItem('spendwise_lead', JSON.stringify(lead));
  } catch (e) {
    console.error('Failed to save lead to localStorage:', e);
  }
};

// Calculate totals from tool list
export const calculateTotals = (tools) => {
  return tools.reduce((acc, tool) => {
    const seats = parseInt(tool.seats) || 1;
    const spend = parseFloat(tool.monthlySpend) || 0;
    acc.totalMonthly += spend * seats;
    acc.totalAnnual += spend * seats * 12;
    return acc;
  }, { totalMonthly: 0, totalAnnual: 0 });
};

// Get savings color class
export const getSavingsColor = (percent) => {
  if (percent >= 50) return 'text-green-400';
  if (percent >= 20) return 'text-yellow-400';
  if (percent > 0) return 'text-blue-400';
  return 'text-purple-400';
};

// Priority color
export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high': return { text: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' };
    case 'medium': return { text: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20' };
    case 'low': return { text: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' };
    default: return { text: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-gray-400/20' };
  }
};
