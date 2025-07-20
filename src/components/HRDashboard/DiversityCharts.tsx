import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DiversityData {
  name: string;
  value: number;
}

interface DiversityChartsProps {
  genderData: DiversityData[];
  ethnicityData: DiversityData[];
  ageBracketData: DiversityData[];
}

const COLORS = [
  '#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#00BCD4', '#FF5722', '#795548',
  '#607D8B', '#E91E63', '#3F51B5', '#009688', '#FFC107', '#8BC34A', '#FFEB3B'
];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="12" fontWeight="bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
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
          {payload[0].name}
        </p>
        <p style={{ margin: '0', color: payload[0].payload.fill }}>
          {`Count: ${payload[0].value}`}
        </p>
        <p style={{ margin: '0', color: payload[0].payload.fill }}>
          {`Percentage: ${((payload[0].value / payload[0].payload.total) * 100).toFixed(1)}%`}
        </p>
      </div>
    );
  }
  return null;
};

const DiversityCharts: React.FC<DiversityChartsProps> = ({ genderData, ethnicityData, ageBracketData }) => {
  return (
    <div className="diversity-charts-container">
      <h3>Diversity & Inclusion</h3>
      <div className="charts-row">
        <div className="chart-item">
          <h4>Gender Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={110}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={2}
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ 
                  paddingTop: '10px',
                  color: 'var(--text-color)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-item">
          <h4>Ethnicity Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ethnicityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={110}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={2}
              >
                {ethnicityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ 
                  paddingTop: '10px',
                  color: 'var(--text-color)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-item">
          <h4>Age Bracket Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ageBracketData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={110}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={2}
              >
                {ageBracketData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ 
                  paddingTop: '10px',
                  color: 'var(--text-color)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DiversityCharts;
