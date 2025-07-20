import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface KPIModalProps {
  isOpen: boolean;
  onClose: () => void;
  kpiData: {
    title: string;
    currentValue: string;
    description: string;
    insights: string;
    historicalData: Array<{ date: string; value: number }>;
    trend: 'up' | 'down' | 'stable';
    color: string;
  } | null;
}

const KPIModal: React.FC<KPIModalProps> = ({ isOpen, onClose, kpiData }) => {
  if (!isOpen || !kpiData) return null;

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return '↗';
      case 'down':
        return '↘';
      default:
        return '→';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return '#4CAF50';
      case 'down':
        return '#f44336';
      default:
        return '#FF9800';
    }
  };

  return (
    <div className="kpi-modal-overlay" onClick={onClose}>
      <div className="kpi-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{kpiData.title}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-content">
          <div className="kpi-summary">
            <div className="current-value">
              <span className="value">{kpiData.currentValue}</span>
              <span 
                className="trend-icon" 
                style={{ color: getTrendColor(kpiData.trend) }}
              >
                {getTrendIcon(kpiData.trend)}
              </span>
            </div>
            <p className="description">{kpiData.description}</p>
            <p className="insights"><strong>Insights:</strong> {kpiData.insights}</p>
          </div>
          
          <div className="historical-chart">
            <h3>Historical Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={kpiData.historicalData}>
                <defs>
                  <linearGradient id={`gradient-${kpiData.title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={kpiData.color} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={kpiData.color} stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={kpiData.color} 
                  strokeWidth={2}
                  fill={`url(#gradient-${kpiData.title})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPIModal; 