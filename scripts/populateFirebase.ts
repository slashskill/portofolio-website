import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import * as dotenv from 'dotenv';

// Load environment variables from .env file if it exists
dotenv.config();

// Firebase configuration from environment variables or a placeholder
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyBsPDhFqSndYWxYv-fKZsK3HzC1knkf_i8",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "homepage-64274.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "homepage-64274",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "homepage-64274.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "646770283178",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:646770283178:web:8416fc035aae04cb01f6d3",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-B019M4D0Y8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Helper function to generate random dates within a range
const randomDate = (start: Date, end: Date): string => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
};

// Helper function to calculate tenure from hire date
const calculateTenure = (hireDate: string): number => {
  const hire = new Date(hireDate);
  const now = new Date();
  return Math.round((now.getTime() - hire.getTime()) / (1000 * 60 * 60 * 24 * 365) * 10) / 10;
};

// Generate realistic HR data with ups and downs over time
const generateRealisticHRData = () => {
  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Product', 'Finance', 'Operations', 'Customer Support'];
  const locations = ['New York', 'San Francisco', 'London', 'Remote', 'Paris', 'Berlin', 'Tokyo', 'Sydney'];
  const genders = ['Male', 'Female', 'Non-binary'];
  const ethnicities = ['Caucasian', 'Asian', 'African American', 'Hispanic', 'Middle Eastern', 'Pacific Islander'];
  const ageBrackets = ['20-29', '30-39', '40-49', '50-59', '60+'];
  
  const data = [];
  let employeeId = 1;

  // Generate data spanning 8 years (2016-2024) with realistic patterns
  
  // 2016-2017: Startup phase - slow growth, high turnover
  for (let i = 0; i < 25; i++) {
    const hireDate = randomDate(new Date('2016-01-01'), new Date('2017-12-31'));
    const department = departments[Math.floor(Math.random() * departments.length)];
    const baseSalary = department === 'Engineering' ? 80000 : 
                      department === 'Sales' ? 70000 : 
                      department === 'Marketing' ? 65000 : 75000;
    
    data.push({
      name: `Employee ${employeeId++}`,
      department,
      location: locations[Math.floor(Math.random() * locations.length)],
      hireDate,
      tenure: calculateTenure(hireDate),
      salary: baseSalary + Math.random() * 20000,
      gender: genders[Math.floor(Math.random() * genders.length)],
      ethnicity: ethnicities[Math.floor(Math.random() * ethnicities.length)],
      ageBracket: ageBrackets[Math.floor(Math.random() * ageBrackets.length)],
      turnoverType: Math.random() < 0.4 ? (Math.random() < 0.7 ? 'Voluntary' : 'Involuntary') : null,
      engagementScore: 3.0 + Math.random() * 1.5 // Lower engagement in early days
    });
  }

  // 2018-2019: Growth phase - rapid hiring, improving retention
  for (let i = 0; i < 45; i++) {
    const hireDate = randomDate(new Date('2018-01-01'), new Date('2019-12-31'));
    const department = departments[Math.floor(Math.random() * departments.length)];
    const baseSalary = department === 'Engineering' ? 95000 : 
                      department === 'Sales' ? 85000 : 
                      department === 'Marketing' ? 75000 : 85000;
    
    data.push({
      name: `Employee ${employeeId++}`,
      department,
      location: locations[Math.floor(Math.random() * locations.length)],
      hireDate,
      tenure: calculateTenure(hireDate),
      salary: baseSalary + Math.random() * 25000,
      gender: genders[Math.floor(Math.random() * genders.length)],
      ethnicity: ethnicities[Math.floor(Math.random() * ethnicities.length)],
      ageBracket: ageBrackets[Math.floor(Math.random() * ageBrackets.length)],
      turnoverType: Math.random() < 0.25 ? (Math.random() < 0.8 ? 'Voluntary' : 'Involuntary') : null,
      engagementScore: 3.5 + Math.random() * 1.2 // Improving engagement
    });
  }

  // 2020: COVID impact - layoffs, remote work, mixed engagement
  for (let i = 0; i < 30; i++) {
    const hireDate = randomDate(new Date('2020-01-01'), new Date('2020-12-31'));
    const department = departments[Math.floor(Math.random() * departments.length)];
    const baseSalary = department === 'Engineering' ? 100000 : 
                      department === 'Sales' ? 90000 : 
                      department === 'Marketing' ? 80000 : 90000;
    
    data.push({
      name: `Employee ${employeeId++}`,
      department,
      location: Math.random() < 0.6 ? 'Remote' : locations[Math.floor(Math.random() * locations.length)], // More remote work
      hireDate,
      tenure: calculateTenure(hireDate),
      salary: baseSalary + Math.random() * 30000,
      gender: genders[Math.floor(Math.random() * genders.length)],
      ethnicity: ethnicities[Math.floor(Math.random() * ethnicities.length)],
      ageBracket: ageBrackets[Math.floor(Math.random() * ageBrackets.length)],
      turnoverType: Math.random() < 0.35 ? (Math.random() < 0.6 ? 'Voluntary' : 'Involuntary') : null, // Higher turnover
      engagementScore: 3.2 + Math.random() * 1.3 // Mixed engagement during COVID
    });
  }

  // 2021: Recovery and growth - strong hiring, better retention
  for (let i = 0; i < 60; i++) {
    const hireDate = randomDate(new Date('2021-01-01'), new Date('2021-12-31'));
    const department = departments[Math.floor(Math.random() * departments.length)];
    const baseSalary = department === 'Engineering' ? 110000 : 
                      department === 'Sales' ? 95000 : 
                      department === 'Marketing' ? 85000 : 95000;
    
    data.push({
      name: `Employee ${employeeId++}`,
      department,
      location: Math.random() < 0.5 ? 'Remote' : locations[Math.floor(Math.random() * locations.length)],
      hireDate,
      tenure: calculateTenure(hireDate),
      salary: baseSalary + Math.random() * 35000,
      gender: genders[Math.floor(Math.random() * genders.length)],
      ethnicity: ethnicities[Math.floor(Math.random() * ethnicities.length)],
      ageBracket: ageBrackets[Math.floor(Math.random() * ageBrackets.length)],
      turnoverType: Math.random() < 0.2 ? (Math.random() < 0.85 ? 'Voluntary' : 'Involuntary') : null, // Lower turnover
      engagementScore: 3.8 + Math.random() * 1.0 // Higher engagement
    });
  }

  // 2022: Tech boom - aggressive hiring, some retention challenges
  for (let i = 0; i < 80; i++) {
    const hireDate = randomDate(new Date('2022-01-01'), new Date('2022-12-31'));
    const department = departments[Math.floor(Math.random() * departments.length)];
    const baseSalary = department === 'Engineering' ? 125000 : 
                      department === 'Sales' ? 105000 : 
                      department === 'Marketing' ? 90000 : 105000;
    
    data.push({
      name: `Employee ${employeeId++}`,
      department,
      location: Math.random() < 0.4 ? 'Remote' : locations[Math.floor(Math.random() * locations.length)],
      hireDate,
      tenure: calculateTenure(hireDate),
      salary: baseSalary + Math.random() * 40000,
      gender: genders[Math.floor(Math.random() * genders.length)],
      ethnicity: ethnicities[Math.floor(Math.random() * ethnicities.length)],
      ageBracket: ageBrackets[Math.floor(Math.random() * ageBrackets.length)],
      turnoverType: Math.random() < 0.3 ? (Math.random() < 0.75 ? 'Voluntary' : 'Involuntary') : null, // Some turnover from tech boom
      engagementScore: 3.6 + Math.random() * 1.1 // Good but not perfect engagement
    });
  }

  // 2023: Market correction - layoffs, cautious hiring, mixed sentiment
  for (let i = 0; i < 40; i++) {
    const hireDate = randomDate(new Date('2023-01-01'), new Date('2023-12-31'));
    const department = departments[Math.floor(Math.random() * departments.length)];
    const baseSalary = department === 'Engineering' ? 120000 : 
                      department === 'Sales' ? 100000 : 
                      department === 'Marketing' ? 85000 : 100000;
    
    data.push({
      name: `Employee ${employeeId++}`,
      department,
      location: Math.random() < 0.45 ? 'Remote' : locations[Math.floor(Math.random() * locations.length)],
      hireDate,
      tenure: calculateTenure(hireDate),
      salary: baseSalary + Math.random() * 35000,
      gender: genders[Math.floor(Math.random() * genders.length)],
      ethnicity: ethnicities[Math.floor(Math.random() * ethnicities.length)],
      ageBracket: ageBrackets[Math.floor(Math.random() * ageBrackets.length)],
      turnoverType: Math.random() < 0.25 ? (Math.random() < 0.7 ? 'Voluntary' : 'Involuntary') : null, // Moderate turnover
      engagementScore: 3.4 + Math.random() * 1.2 // Mixed engagement during uncertainty
    });
  }

  // 2024: Stabilization - steady growth, improving retention
  for (let i = 0; i < 35; i++) {
    const hireDate = randomDate(new Date('2024-01-01'), new Date('2024-12-31'));
    const department = departments[Math.floor(Math.random() * departments.length)];
    const baseSalary = department === 'Engineering' ? 115000 : 
                      department === 'Sales' ? 98000 : 
                      department === 'Marketing' ? 88000 : 98000;
    
    data.push({
      name: `Employee ${employeeId++}`,
      department,
      location: Math.random() < 0.4 ? 'Remote' : locations[Math.floor(Math.random() * locations.length)],
      hireDate,
      tenure: calculateTenure(hireDate),
      salary: baseSalary + Math.random() * 32000,
      gender: genders[Math.floor(Math.random() * genders.length)],
      ethnicity: ethnicities[Math.floor(Math.random() * ethnicities.length)],
      ageBracket: ageBrackets[Math.floor(Math.random() * ageBrackets.length)],
      turnoverType: Math.random() < 0.15 ? (Math.random() < 0.8 ? 'Voluntary' : 'Involuntary') : null, // Lower turnover
      engagementScore: 3.9 + Math.random() * 0.9 // High engagement
    });
  }

  return data;
};

const mockHRData = generateRealisticHRData();

const populateHRData = async () => {
  console.log("Attempting to populate realistic HR data into Firebase Firestore...");
  console.log(`Generated ${mockHRData.length} employee records spanning 8 years`);
  
  const hrCollectionRef = collection(db, 'hrData');

  for (const data of mockHRData) {
    try {
      await addDoc(hrCollectionRef, data);
      console.log(`Successfully added data for ${data.name} (${data.department}, hired ${data.hireDate})`);
    } catch (e) {
      console.error(`Error adding document for ${data.name}:`, e);
    }
  }
  
  console.log("Finished populating realistic HR data.");
  console.log("Data includes realistic patterns:");
  console.log("- Startup phase (2016-2017): High turnover, lower engagement");
  console.log("- Growth phase (2018-2019): Rapid hiring, improving retention");
  console.log("- COVID impact (2020): Layoffs, remote work, mixed engagement");
  console.log("- Recovery (2021): Strong hiring, better retention");
  console.log("- Tech boom (2022): Aggressive hiring, some retention challenges");
  console.log("- Market correction (2023): Layoffs, cautious hiring");
  console.log("- Stabilization (2024): Steady growth, improving retention");
};

populateHRData();
