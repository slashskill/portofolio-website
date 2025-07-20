import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface SparklineData {
  value: number;
}

interface SparklineChartProps {
  data: SparklineData[];
  color?: string;
  height?: number;
  width?: number;
}

const SparklineChart: React.FC<SparklineChartProps> = ({ 
  data, 
  color = '#8884d8', 
  height = 30, 
  width = 60 
}) => {
  if (!data || data.length === 0) return null;

  // Convert CSS variable to actual color if needed
  const getColor = (colorProp: string) => {
    if (colorProp.startsWith('var(--')) {
      // For CSS variables, we'll use a fallback color
      // In a real implementation, you might want to get the computed style
      return colorProp.includes('primary') ? '#0A2342' : '#FF8C42';
    }
    return colorProp;
  };

  return (
    <div style={{ width: '100%', height: height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={getColor(color)} 
            strokeWidth={2}
            dot={false}
            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SparklineChart; 