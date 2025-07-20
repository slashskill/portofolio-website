export interface Project {
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  technologies: string[];
  imageUrl: string;
  slug: string; // Unique identifier for URL
  liveDemoLink?: string;
  viewCodeLink?: string;
}

export const projects: Project[] = [
  /*{
    title: 'Power BI Dashboard',
    description: 'An interactive dashboard providing insights into business metrics.',
    longDescription: 'This project involved creating a dynamic and interactive Power BI dashboard to visualize key performance indicators (KPIs) for a business. It integrates data from various sources, allowing users to filter and drill down into specific metrics for deeper analysis. The dashboard was designed with user experience in mind, providing clear and actionable insights.',
    features: [
      'Interactive data visualizations',
      'Multi-source data integration',
      'Customizable filters and slicers',
      'Drill-through capabilities for detailed analysis',
      'Responsive design for various devices',
    ],
    technologies: ['Power BI', 'DAX', 'SQL Server'],
    imageUrl: '/gallery-images/powerbi.png',
    slug: 'power-bi-dashboard',
    liveDemoLink: '#',
    viewCodeLink: '#',
  },*/
  {
    title: 'Python Automation Script',
    description: 'A script to automate repetitive tasks and improve efficiency.',
    longDescription: 'This Python script was developed to automate a series of repetitive data processing tasks, significantly reducing manual effort and potential for errors. It handles data extraction, transformation, and loading (ETL) from various file formats, performs complex calculations, and generates reports. The script is designed for robustness and easy configuration.',
    features: [
      'Automated data extraction and processing',
      'Support for multiple file formats (CSV, Excel, JSON)',
      'Error handling and logging',
      'Configurable parameters for different workflows',
      'Generates summary reports',
    ],
    technologies: ['Python', 'Pandas', 'OpenPyXL', 'Requests'],
    imageUrl: '/gallery-images/python.png',
    slug: 'python-automation-script',
    liveDemoLink: '#',
    viewCodeLink: '#',
  },
  {
    title: 'SQL Database Management',
    description: 'A robust database solution for storing and retrieving data.',
    longDescription: 'This project focused on designing, implementing, and managing a relational database system using SQL. It involved creating optimized schemas, writing complex queries for data retrieval and manipulation, and ensuring data integrity and security. The database supports a web application, providing efficient data storage and retrieval for user information and application content.',
    features: [
      'Optimized relational database schema design',
      'Complex SQL queries for data analysis',
      'Data integrity constraints and indexing',
      'User authentication and authorization tables',
      'Scalable and maintainable database structure',
    ],
    technologies: ['SQL', 'PostgreSQL', 'DBeaver'],
    imageUrl: '/gallery-images/sql.png',
    slug: 'sql-database-management',
    liveDemoLink: '#',
    viewCodeLink: '#',
  },
  {
    title: 'Interactive HR Dashboard',
    description: 'A comprehensive HR dashboard with interactive analytics and predictive modules.',
    longDescription: 'This project consolidates data from various HR sources into a single source of truth, enabling HR professionals to make strategic, data-driven decisions. It includes features such as narrative insights, global filters, KPI banners, headcount trend charts, turnover analysis, diversity & inclusion metrics, compensation equity analysis, and predictive attrition risk modeling.',
    features: [
      'Narrative Insights (Executive Summary)',
      'Global Filter Bar',
      'KPI Banners',
      'Headcount Trend Chart',
      'Turnover Analysis Chart',
      'Diversity & Inclusion Donut Charts',
      'Compensation Equity Dashboard',
      'Predictive Attrition Risk Module',
    ],
    technologies: ['React', 'Material UI', 'Recharts', 'Machine Learning'],
    imageUrl: '/gallery-images/hr-dashboard.png', // Replace with actual image
    slug: 'interactive-hr-dashboard',
    liveDemoLink: '/hr-dashboard', // Link to the HR Dashboard
    viewCodeLink: '#',
  },
];
