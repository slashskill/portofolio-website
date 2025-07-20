import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface HeadcountData {
  date: string;
  headcount: number;
}

interface HeadcountTrendChartProps {
  data: HeadcountData[];
}

const HeadcountTrendChart: React.FC<HeadcountTrendChartProps> = ({ data }) => {
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
            {`Date: ${label}`}
          </p>
          <p style={{ margin: '0', color: '#8884d8' }}>
            {`Headcount: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <h3>Headcount Trend Over Time</h3>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <defs>
            <linearGradient id="headcountGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
          <XAxis 
            dataKey="date" 
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
          <Area 
            type="monotone" 
            dataKey="headcount" 
            stroke="#8884d8" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#headcountGradient)" 
            activeDot={{ r: 8, stroke: '#8884d8', strokeWidth: 2, fill: '#fff' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HeadcountTrendChart;
