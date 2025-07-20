import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../../index.css'; // Assuming global styles are here
import { fetchHRData } from '../../services/hrDataService';
import { HRDocument } from '../../types';
import SparklineChart from './SparklineChart';
import KPIModal from './KPIModal';

// Lazy load heavy chart components
const HeadcountTrendChart = React.lazy(() => import('./HeadcountTrendChart'));
const TurnoverAnalysisChart = React.lazy(() => import('./TurnoverAnalysisChart'));
const DiversityCharts = React.lazy(() => import('./DiversityCharts'));

const HRDashboard: React.FC = () => {
  const [hrData, setHrData] = useState<HRDocument[]>([]); // Use HRDocument for fetched data
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [dateRange, setDateRange] = useState<string>('all');
  const [department, setDepartment] = useState<string>('all');
  const [location, setLocation] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedKPI, setSelectedKPI] = useState<any>(null);

  const getHRData = async () => {
    try {
      setLoading(true);
      setIsRefreshing(true);
      const data = await fetchHRData();
      setHrData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    getHRData();
  }, []);

  const handleRefresh = () => {
    getHRData();
  };

  // Generate sparkline data for KPIs with actual month names
  const generateSparklineData = (kpiType: string) => {
    const baseValues = {
      totalHeadcount: [95, 98, 102, 105, 108, 110, 112, 115, 118, 120],
      turnoverRate: [8.2, 7.8, 7.5, 7.2, 6.9, 6.5, 6.2, 5.9, 5.6, 5.3],
      avgTenure: [2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7],
      timeToHire: [35, 34, 33, 32, 31, 30, 29, 28, 27, 26],
      acceptanceRate: [85, 86, 87, 88, 89, 90, 91, 92, 93, 94],
      engagementScore: [3.8, 3.9, 4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7]
    };
    
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
    
    return baseValues[kpiType as keyof typeof baseValues]?.map((value, index) => ({ 
      value,
      month: monthNames[index] || `Month ${index + 1}`
    })) || [];
  };

  // Handle KPI card click
  const handleKPIClick = (kpiType: string) => {
    const kpiInfo = {
      totalHeadcount: {
        title: 'Total Headcount',
        currentValue: totalHeadcount.toString(),
        description: 'The total number of active employees across all departments and locations.',
        insights: 'This metric helps track overall workforce size and growth trends.',
        historicalData: generateSparklineData('totalHeadcount').map((item) => ({
          date: item.month,
          value: item.value
        })),
        trend: 'up' as const,
        color: 'var(--primary-color)'
      },
      turnoverRate: {
        title: 'Quarterly Turnover Rate',
        currentValue: `${quarterlyTurnoverRate}%`,
        description: 'The percentage of employees who left the organization in the last quarter.',
        insights: 'High turnover rates may indicate issues with employee satisfaction, compensation, or workplace culture.',
        historicalData: generateSparklineData('turnoverRate').map((item) => ({
          date: item.month,
          value: item.value
        })),
        trend: 'down' as const,
        color: 'var(--accent-color)'
      },
      avgTenure: {
        title: 'Average Employee Tenure',
        currentValue: `${avgEmployeeTenure} years`,
        description: 'The average number of years employees have been with the organization.',
        insights: 'Longer tenure often correlates with higher job satisfaction and institutional knowledge.',
        historicalData: generateSparklineData('avgTenure').map((item) => ({
          date: item.month,
          value: item.value
        })),
        trend: 'up' as const,
        color: 'var(--primary-color)'
      },
      timeToHire: {
        title: 'Time to Hire',
        currentValue: timeToHire,
        description: 'The average number of days from job posting to candidate acceptance.',
        insights: 'Faster hiring times can improve candidate experience and reduce recruitment costs.',
        historicalData: generateSparklineData('timeToHire').map((item) => ({
          date: item.month,
          value: item.value
        })),
        trend: 'down' as const,
        color: 'var(--accent-color)'
      },
      acceptanceRate: {
        title: 'Offer Acceptance Rate',
        currentValue: offerAcceptanceRate,
        description: 'The percentage of job offers that are accepted by candidates.',
        insights: 'High acceptance rates suggest competitive compensation and positive employer branding.',
        historicalData: generateSparklineData('acceptanceRate').map((item) => ({
          date: item.month,
          value: item.value
        })),
        trend: 'up' as const,
        color: 'var(--primary-color)'
      },
      engagementScore: {
        title: 'Employee Engagement Score',
        currentValue: employeeEngagementScore,
        description: 'A composite score measuring employee satisfaction, commitment, and motivation.',
        insights: 'Higher engagement scores correlate with better performance, retention, and productivity.',
        historicalData: generateSparklineData('engagementScore').map((item) => ({
          date: item.month,
          value: item.value
        })),
        trend: 'up' as const,
        color: 'var(--accent-color)'
      }
    };

    setSelectedKPI(kpiInfo[kpiType as keyof typeof kpiInfo]);
    setModalOpen(true);
  };

  // Filtered data based on selections (dummy filtering for now)
  const filteredHrData = useMemo(() => {
    return hrData.filter(employee => {
      const matchesDepartment = department === 'all' || employee.department === department;
      const matchesLocation = location === 'all' || employee.location === location;
      // Date range filtering would be more complex, leaving as placeholder for now
      return matchesDepartment && matchesLocation;
    });
  }, [hrData, department, location]); // Removed dateRange as it's not fully implemented yet

  // Dynamically get unique departments and locations from data
  const departments = useMemo(() => ['all', ...new Set(hrData.map(d => d.department))].sort(), [hrData]);
  const locations = useMemo(() => ['all', ...new Set(hrData.map(d => d.location))].sort(), [hrData]);
  const dateRanges = ['all', 'Last 30 Days', 'Last 90 Days', 'Last Year']; // Static for now

  // Calculate KPIs from filtered data
  const totalHeadcount = filteredHrData.length;
  const quarterlyTurnoverRate = (totalHeadcount > 0) ? ((filteredHrData.filter(d => d.turnoverType === 'Voluntary' || d.turnoverType === 'Involuntary').length / totalHeadcount) * 100).toFixed(2) : '0.00';
  const avgEmployeeTenure = (totalHeadcount > 0) ? (filteredHrData.reduce((sum, d) => sum + (d.tenure || 0), 0) / totalHeadcount).toFixed(1) : '0.0';
  const timeToHire = '30 days'; // Placeholder
  const offerAcceptanceRate = '90%'; // Placeholder
  const employeeEngagementScore = '4.2'; // Placeholder

  // Define KPI trends and colors based on business logic
  // For each KPI, we define whether an increase is positive or negative
  const kpiTrends = {
    totalHeadcount: { trend: 'up', isIncreasePositive: true, color: 'var(--primary-color)' },
    turnoverRate: { trend: 'down', isIncreasePositive: false, color: 'var(--accent-color)' },
    avgTenure: { trend: 'up', isIncreasePositive: true, color: 'var(--primary-color)' },
    timeToHire: { trend: 'down', isIncreasePositive: false, color: 'var(--accent-color)' },
    acceptanceRate: { trend: 'up', isIncreasePositive: true, color: 'var(--primary-color)' },
    engagementScore: { trend: 'up', isIncreasePositive: true, color: 'var(--accent-color)' }
  };

  // Helper function to get trend arrow and color based on business logic
  const getTrendIndicator = (kpiType: string) => {
    const trend = kpiTrends[kpiType as keyof typeof kpiTrends];
    const isPositive = trend.isIncreasePositive ? trend.trend === 'up' : trend.trend === 'down';
    const arrow = trend.trend === 'up' ? '↗' : '↘';
    const color = isPositive ? '#4CAF50' : '#f44336';
    return { arrow, color, trend: trend.trend };
  };


  // Prepare data for Headcount Trend Chart
  const headcountTrendData = useMemo(() => {
    const monthlyHeadcount: { [key: string]: number } = {};
    filteredHrData.forEach(employee => {
      const hireDate = new Date(employee.hireDate);
      const monthYear = `${hireDate.getFullYear()}-${(hireDate.getMonth() + 1).toString().padStart(2, '0')}`;
      monthlyHeadcount[monthYear] = (monthlyHeadcount[monthYear] || 0) + 1;
    });

    // Sort by date and accumulate headcount
    const sortedDates = Object.keys(monthlyHeadcount).sort();
    let currentHeadcount = 0;
    const trendData = sortedDates.map(date => {
      currentHeadcount += monthlyHeadcount[date];
      return { date, headcount: currentHeadcount };
    });
    return trendData;
  }, [filteredHrData]);

  // Prepare data for Turnover Analysis Chart
  const turnoverAnalysisData = useMemo(() => {
    const turnoverCounts: { [key: string]: number } = {
      'Voluntary': 0,
      'Involuntary': 0,
      'Other': 0, // For null or undefined turnoverType
    };
    filteredHrData.forEach(employee => {
      if (employee.turnoverType === 'Voluntary') {
        turnoverCounts['Voluntary']++;
      } else if (employee.turnoverType === 'Involuntary') {
        turnoverCounts['Involuntary']++;
      } else {
        turnoverCounts['Other']++;
      }
    });
    return Object.keys(turnoverCounts).map(type => ({
      type,
      count: turnoverCounts[type],
    }));
  }, [filteredHrData]);

  // Prepare data for Diversity & Inclusion Charts
  const genderData = useMemo(() => {
    const counts: { [key: string]: number } = {};
    filteredHrData.forEach(employee => {
      counts[employee.gender] = (counts[employee.gender] || 0) + 1;
    });
    return Object.keys(counts).map(name => ({ name, value: counts[name] }));
  }, [filteredHrData]);

  const ethnicityData = useMemo(() => {
    const counts: { [key: string]: number } = {};
    filteredHrData.forEach(employee => {
      counts[employee.ethnicity] = (counts[employee.ethnicity] || 0) + 1;
    });
    return Object.keys(counts).map(name => ({ name, value: counts[name] }));
  }, [filteredHrData]);

  const ageBracketData = useMemo(() => {
    const counts: { [key: string]: number } = {};
    filteredHrData.forEach(employee => {
      counts[employee.ageBracket] = (counts[employee.ageBracket] || 0) + 1;
    });
    return Object.keys(counts).map(name => ({ name, value: counts[name] }));
  }, [filteredHrData]);


  if (loading) return (
    <div className="hr-dashboard-container">
      <h1 className="hr-dashboard-title">Interactive HR Dashboard</h1>
      <div className="filter-bar">
        <div className="action-controls">
          <Skeleton width={120} height={40} style={{ borderRadius: 12 }} />
        </div>
        <div className="filter-controls">
          <Skeleton width={140} height={40} style={{ borderRadius: 12, marginRight: 16 }} />
          <Skeleton width={140} height={40} style={{ borderRadius: 12, marginRight: 16 }} />
          <Skeleton width={140} height={40} style={{ borderRadius: 12 }} />
        </div>
        <div className="tooltip-controls">
          <Skeleton width={60} height={24} style={{ borderRadius: 12 }} />
        </div>
      </div>
      <div className="kpi-banners">
        {[...Array(6)].map((_, i) => (
          <div className="kpi-card" key={i}>
            <Skeleton height={32} width={80} style={{ margin: '0 auto 0.5rem auto' }} />
            <Skeleton height={16} width={100} style={{ margin: '0 auto' }} />
          </div>
        ))}
      </div>
      <div className="charts-section">
        <h2>Workforce Analytics</h2>
        <div className="chart-container"><Skeleton height={300} /></div>
        <div className="chart-container"><Skeleton height={300} /></div>
        <div className="diversity-charts-container"><Skeleton height={300} /></div>
      </div>
    </div>
  );
  if (error) return <div className="hr-dashboard-container">Error: {error}</div>;

  return (
    <div className="hr-dashboard-container">
      <h1 className="hr-dashboard-title">Interactive HR Dashboard</h1>

      {/* Global Filter Bar with Controls */}
      <div className="filter-bar">
        <div className="action-controls">
          <button 
            className={`refresh-button ${isRefreshing ? 'refreshing' : ''}`}
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <>
                <span className="spinner"></span>
                Refreshing...
              </>
            ) : (
              <>
                <span className="refresh-icon">↻</span>
                Refresh Data
              </>
            )}
          </button>
        </div>
        
        <div className="filter-controls">
          <label>
            Date Range:
            <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
              {dateRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </label>
          <label>
            Department:
            <select value={department} onChange={(e) => setDepartment(e.target.value)}>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </label>
          <label>
            Location:
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </label>
        </div>
        
        {/* Tooltip controls removed - KPIs are now clickable instead */}
      </div>

      {/* KPI Banners */}
      <div className="kpi-banners">
        <div 
          className="kpi-card"
          onClick={() => handleKPIClick('totalHeadcount')}
        >
          <div className="kpi-header">
            <div className="kpi-value">{totalHeadcount}</div>
            <div className="trend-indicator" style={{ color: getTrendIndicator('totalHeadcount').color }}>
              {getTrendIndicator('totalHeadcount').arrow}
            </div>
          </div>
          <div className="kpi-label">Total Headcount</div>
          <div className="sparkline-container">
            <SparklineChart data={generateSparklineData('totalHeadcount')} color={kpiTrends.totalHeadcount.color} />
          </div>
        </div>
        <div 
          className="kpi-card"
          onClick={() => handleKPIClick('turnoverRate')}
        >
          <div className="kpi-header">
            <div className="kpi-value">{quarterlyTurnoverRate}%</div>
            <div className="trend-indicator" style={{ color: getTrendIndicator('turnoverRate').color }}>
              {getTrendIndicator('turnoverRate').arrow}
            </div>
          </div>
          <div className="kpi-label">Quarterly Turnover Rate</div>
          <div className="sparkline-container">
            <SparklineChart data={generateSparklineData('turnoverRate')} color={kpiTrends.turnoverRate.color} />
          </div>
        </div>
        <div 
          className="kpi-card"
          onClick={() => handleKPIClick('avgTenure')}
        >
          <div className="kpi-header">
            <div className="kpi-value">{avgEmployeeTenure}</div>
            <div className="trend-indicator" style={{ color: getTrendIndicator('avgTenure').color }}>
              {getTrendIndicator('avgTenure').arrow}
            </div>
          </div>
          <div className="kpi-label">Avg Employee Tenure (years)</div>
          <div className="sparkline-container">
            <SparklineChart data={generateSparklineData('avgTenure')} color={kpiTrends.avgTenure.color} />
          </div>
        </div>
        <div 
          className="kpi-card"
          onClick={() => handleKPIClick('timeToHire')}
        >
          <div className="kpi-header">
            <div className="kpi-value">{timeToHire}</div>
            <div className="trend-indicator" style={{ color: getTrendIndicator('timeToHire').color }}>
              {getTrendIndicator('timeToHire').arrow}
            </div>
          </div>
          <div className="kpi-label">Time to Hire</div>
          <div className="sparkline-container">
            <SparklineChart data={generateSparklineData('timeToHire')} color={kpiTrends.timeToHire.color} />
          </div>
        </div>
        <div 
          className="kpi-card"
          onClick={() => handleKPIClick('acceptanceRate')}
        >
          <div className="kpi-header">
            <div className="kpi-value">{offerAcceptanceRate}</div>
            <div className="trend-indicator" style={{ color: getTrendIndicator('acceptanceRate').color }}>
              {getTrendIndicator('acceptanceRate').arrow}
            </div>
          </div>
          <div className="kpi-label">Offer Acceptance Rate</div>
          <div className="sparkline-container">
            <SparklineChart data={generateSparklineData('acceptanceRate')} color={kpiTrends.acceptanceRate.color} />
          </div>
        </div>
        <div 
          className="kpi-card"
          onClick={() => handleKPIClick('engagementScore')}
        >
          <div className="kpi-header">
            <div className="kpi-value">{employeeEngagementScore}</div>
            <div className="trend-indicator" style={{ color: getTrendIndicator('engagementScore').color }}>
              {getTrendIndicator('engagementScore').arrow}
            </div>
          </div>
          <div className="kpi-label">Employee Engagement Score</div>
          <div className="sparkline-container">
            <SparklineChart data={generateSparklineData('engagementScore')} color={kpiTrends.engagementScore.color} />
          </div>
        </div>
      </div>

      {/* KPI Modal */}
      <KPIModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        kpiData={selectedKPI}
      />

      {/* Charts Section */}
      <div className="charts-section">
        <h2>Workforce Analytics</h2>
        <Suspense fallback={<div className="chart-container"><Skeleton height={300} /></div>}>
          <HeadcountTrendChart data={headcountTrendData} />
        </Suspense>
        <Suspense fallback={<div className="chart-container"><Skeleton height={300} /></div>}>
          <TurnoverAnalysisChart data={turnoverAnalysisData} />
        </Suspense>
        <Suspense fallback={<div className="diversity-charts-container"><Skeleton height={300} /></div>}>
          <DiversityCharts genderData={genderData} ethnicityData={ethnicityData} ageBracketData={ageBracketData} />
        </Suspense>
      </div>

      {/* Placeholder for Strategic & Predictive Modules (Out of Scope for V1.0) */}
      <div className="strategic-modules-placeholder">
        <h2>Strategic & Predictive Modules (V2.0)</h2>
        <p>Compensation Equity Dashboard and Predictive Attrition Risk Module are planned for future versions.</p>
      </div>
    </div>
  );
};

export default HRDashboard;
