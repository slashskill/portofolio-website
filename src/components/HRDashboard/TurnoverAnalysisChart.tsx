import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface TurnoverData {
  type: string;
  count: number;
}

interface TurnoverAnalysisChartProps {
  data: TurnoverData[];
}

const TurnoverAnalysisChart: React.FC<TurnoverAnalysisChartProps> = ({ data }) => {
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          backdropFilter: 'blur(10px)'
        }}>
          <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#333' }}>
            {`Type: ${label}`}
          </p>
          <p style={{ margin: '0', color: '#82ca9d' }}>
            {`Count: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Define colors for different turnover types
  const getBarColor = (type: string) => {
    switch (type) {
      case 'Voluntary':
        return '#f44336'; // Red for voluntary turnover
      case 'Involuntary':
        return '#ff9800'; // Orange for involuntary turnover
      default:
        return '#9e9e9e'; // Grey for other
    }
  };

  return (
    <div className="chart-container">
      <h3>Turnover Analysis</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
          <XAxis 
            dataKey="type" 
            tick={{ fontSize: 12, fill: 'var(--text-color)' }}
            axisLine={{ stroke: 'rgba(0, 0, 0, 0.2)' }}
            tickLine={{ stroke: 'rgba(0, 0, 0, 0.2)' }}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: 'var(--text-color)' }}
            axisLine={{ stroke: 'rgba(0, 0, 0, 0.2)' }}
            tickLine={{ stroke: 'rgba(0, 0, 0, 0.2)' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ 
              paddingTop: '10px',
              color: 'var(--text-color)'
            }}
          />
          <Bar 
            dataKey="count" 
            radius={[4, 4, 0, 0]}
            activeBar={{ fill: 'rgba(130, 202, 157, 0.8)' }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.type)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TurnoverAnalysisChart;
