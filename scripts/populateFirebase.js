"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const dotenv = __importStar(require("dotenv"));
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
const app = (0, app_1.initializeApp)(firebaseConfig);
const db = (0, firestore_1.getFirestore)(app);
const mockHRData = [
  // Engineering Department
  {
    name: "Alice Smith",
    department: "Engineering",
    location: "New York",
    hireDate: "2020-01-15",
    tenure: 4.5,
    salary: 120000,
    gender: "Female",
    ethnicity: "Asian",
    ageBracket: "30-39",
    turnoverType: null,
    engagementScore: 4.5
  },
  {
    name: "Bob Johnson",
    department: "Engineering",
    location: "San Francisco",
    hireDate: "2018-03-01",
    tenure: 6.3,
    salary: 140000,
    gender: "Male",
    ethnicity: "Caucasian",
    ageBracket: "40-49",
    turnoverType: null,
    engagementScore: 3.8
  },
  {
    name: "Charlie Brown",
    department: "Engineering",
    location: "Remote",
    hireDate: "2021-06-20",
    tenure: 3.0,
    salary: 110000,
    gender: "Male",
    ethnicity: "African American",
    ageBracket: "20-29",
    turnoverType: "Voluntary",
    engagementScore: 4.1
  },
  {
    name: "Diana Prince",
    department: "Engineering",
    location: "London",
    hireDate: "2019-11-10",
    tenure: 5.7,
    salary: 95000,
    gender: "Female",
    ethnicity: "Caucasian",
    ageBracket: "30-39",
    turnoverType: null,
    engagementScore: 4.7
  },
  {
    name: "Eve Adams",
    department: "Engineering",
    location: "Remote",
    hireDate: "2022-02-01",
    tenure: 2.4,
    salary: 130000,
    gender: "Female",
    ethnicity: "Hispanic",
    ageBracket: "20-29",
    turnoverType: null,
    engagementScore: 4.0
  },
  {
    name: "Frank White",
    department: "Engineering",
    location: "New York",
    hireDate: "2017-09-01",
    tenure: 7.8,
    salary: 150000,
    gender: "Male",
    ethnicity: "Caucasian",
    ageBracket: "50-59",
    turnoverType: null,
    engagementScore: 4.9
  },
  {
    name: "Grace Lee",
    department: "Engineering",
    location: "San Francisco",
    hireDate: "2023-01-01",
    tenure: 1.5,
    salary: 125000,
    gender: "Female",
    ethnicity: "Asian",
    ageBracket: "20-29",
    turnoverType: null,
    engagementScore: 3.5
  },
  {
    name: "Henry King",
    department: "Engineering",
    location: "Remote",
    hireDate: "2020-04-10",
    tenure: 4.2,
    salary: 115000,
    gender: "Male",
    ethnicity: "African American",
    ageBracket: "30-39",
    turnoverType: null,
    engagementScore: 4.3
  },
  {
    name: "Ivy Chen",
    department: "Engineering",
    location: "London",
    hireDate: "2016-07-01",
    tenure: 8.9,
    salary: 105000,
    gender: "Female",
    ethnicity: "Asian",
    ageBracket: "40-49",
    turnoverType: "Involuntary",
    engagementScore: 4.6
  },
  {
    name: "Jack Green",
    department: "Engineering",
    location: "New York",
    hireDate: "2023-09-15",
    tenure: 0.9,
    salary: 125000,
    gender: "Male",
    ethnicity: "Caucasian",
    ageBracket: "20-29",
    turnoverType: null,
    engagementScore: 3.9
  },
  
  // Marketing Department
  {
    name: "Kate Wilson",
    department: "Marketing",
    location: "New York",
    hireDate: "2021-03-15",
    tenure: 3.2,
    salary: 85000,
    gender: "Female",
    ethnicity: "Caucasian",
    ageBracket: "30-39",
    turnoverType: null,
    engagementScore: 4.2
  },
  {
    name: "Liam O'Connor",
    department: "Marketing",
    location: "London",
    hireDate: "2020-08-20",
    tenure: 4.1,
    salary: 75000,
    gender: "Male",
    ethnicity: "Caucasian",
    ageBracket: "30-39",
    turnoverType: null,
    engagementScore: 3.9
  },
  {
    name: "Maya Patel",
    department: "Marketing",
    location: "Remote",
    hireDate: "2022-11-10",
    tenure: 1.8,
    salary: 80000,
    gender: "Female",
    ethnicity: "Asian",
    ageBracket: "20-29",
    turnoverType: null,
    engagementScore: 4.4
  },
  {
    name: "Noah Rodriguez",
    department: "Marketing",
    location: "San Francisco",
    hireDate: "2019-05-01",
    tenure: 5.2,
    salary: 90000,
    gender: "Male",
    ethnicity: "Hispanic",
    ageBracket: "30-39",
    turnoverType: "Voluntary",
    engagementScore: 3.7
  },
  {
    name: "Olivia Taylor",
    department: "Marketing",
    location: "Paris",
    hireDate: "2021-12-01",
    tenure: 2.6,
    salary: 70000,
    gender: "Female",
    ethnicity: "Caucasian",
    ageBracket: "20-29",
    turnoverType: null,
    engagementScore: 4.1
  },
  
  // Sales Department
  {
    name: "Paul Anderson",
    department: "Sales",
    location: "New York",
    hireDate: "2020-06-15",
    tenure: 4.0,
    salary: 95000,
    gender: "Male",
    ethnicity: "Caucasian",
    ageBracket: "40-49",
    turnoverType: null,
    engagementScore: 4.3
  },
  {
    name: "Quinn Martinez",
    department: "Sales",
    location: "San Francisco",
    hireDate: "2021-09-01",
    tenure: 2.9,
    salary: 100000,
    gender: "Female",
    ethnicity: "Hispanic",
    ageBracket: "30-39",
    turnoverType: null,
    engagementScore: 4.0
  },
  {
    name: "Ryan Thompson",
    department: "Sales",
    location: "London",
    hireDate: "2018-12-10",
    tenure: 5.8,
    salary: 85000,
    gender: "Male",
    ethnicity: "African American",
    ageBracket: "30-39",
    turnoverType: "Voluntary",
    engagementScore: 3.6
  },
  {
    name: "Sophia Garcia",
    department: "Sales",
    location: "Remote",
    hireDate: "2022-03-20",
    tenure: 2.3,
    salary: 90000,
    gender: "Female",
    ethnicity: "Hispanic",
    ageBracket: "20-29",
    turnoverType: null,
    engagementScore: 4.5
  },
  {
    name: "Tom Davis",
    department: "Sales",
    location: "Paris",
    hireDate: "2019-07-01",
    tenure: 5.1,
    salary: 80000,
    gender: "Male",
    ethnicity: "Caucasian",
    ageBracket: "50-59",
    turnoverType: null,
    engagementScore: 4.8
  },
  
  // HR Department
  {
    name: "Uma Singh",
    department: "HR",
    location: "New York",
    hireDate: "2018-04-15",
    tenure: 6.2,
    salary: 95000,
    gender: "Female",
    ethnicity: "Asian",
    ageBracket: "40-49",
    turnoverType: null,
    engagementScore: 4.6
  },
  {
    name: "Victor Chen",
    department: "HR",
    location: "San Francisco",
    hireDate: "2020-10-01",
    tenure: 3.8,
    salary: 100000,
    gender: "Male",
    ethnicity: "Asian",
    ageBracket: "30-39",
    turnoverType: null,
    engagementScore: 4.2
  },
  {
    name: "Wendy Johnson",
    department: "HR",
    location: "London",
    hireDate: "2021-01-15",
    tenure: 3.5,
    salary: 85000,
    gender: "Female",
    ethnicity: "Caucasian",
    ageBracket: "30-39",
    turnoverType: null,
    engagementScore: 4.4
  },
  {
    name: "Xavier Lopez",
    department: "HR",
    location: "Remote",
    hireDate: "2022-05-10",
    tenure: 2.1,
    salary: 90000,
    gender: "Male",
    ethnicity: "Hispanic",
    ageBracket: "20-29",
    turnoverType: null,
    engagementScore: 3.8
  },
  
  // Product Department
  {
    name: "Yara Kim",
    department: "Product",
    location: "New York",
    hireDate: "2019-08-20",
    tenure: 5.0,
    salary: 130000,
    gender: "Female",
    ethnicity: "Asian",
    ageBracket: "30-39",
    turnoverType: null,
    engagementScore: 4.7
  },
  {
    name: "Zack Williams",
    department: "Product",
    location: "San Francisco",
    hireDate: "2020-12-01",
    tenure: 3.6,
    salary: 140000,
    gender: "Male",
    ethnicity: "African American",
    ageBracket: "30-39",
    turnoverType: null,
    engagementScore: 4.1
  },
  {
    name: "Aria Brown",
    department: "Product",
    location: "London",
    hireDate: "2021-06-15",
    tenure: 3.0,
    salary: 110000,
    gender: "Female",
    ethnicity: "Caucasian",
    ageBracket: "20-29",
    turnoverType: "Voluntary",
    engagementScore: 3.9
  },
  {
    name: "Blake Miller",
    department: "Product",
    location: "Remote",
    hireDate: "2022-08-01",
    tenure: 2.0,
    salary: 120000,
    gender: "Male",
    ethnicity: "Caucasian",
    ageBracket: "30-39",
    turnoverType: null,
    engagementScore: 4.3
  },
  
  // Finance Department
  {
    name: "Clara Davis",
    department: "Finance",
    location: "New York",
    hireDate: "2017-11-01",
    tenure: 7.1,
    salary: 110000,
    gender: "Female",
    ethnicity: "Caucasian",
    ageBracket: "40-49",
    turnoverType: null,
    engagementScore: 4.8
  },
  {
    name: "Derek Wilson",
    department: "Finance",
    location: "San Francisco",
    hireDate: "2019-03-15",
    tenure: 5.3,
    salary: 115000,
    gender: "Male",
    ethnicity: "African American",
    ageBracket: "40-49",
    turnoverType: null,
    engagementScore: 4.5
  },
  {
    name: "Eva Rodriguez",
    department: "Finance",
    location: "London",
    hireDate: "2020-07-01",
    tenure: 4.1,
    salary: 95000,
    gender: "Female",
    ethnicity: "Hispanic",
    ageBracket: "30-39",
    turnoverType: null,
    engagementScore: 4.2
  },
  {
    name: "Finn Thompson",
    department: "Finance",
    location: "Remote",
    hireDate: "2021-12-10",
    tenure: 2.6,
    salary: 100000,
    gender: "Male",
    ethnicity: "Caucasian",
    ageBracket: "20-29",
    turnoverType: null,
    engagementScore: 3.7
  }
];
const populateHRData = async () => {
    console.log("Attempting to populate HR data into Firebase Firestore...");
    const hrCollectionRef = (0, firestore_1.collection)(db, 'hrData');
    for (const data of mockHRData) {
        try {
            await (0, firestore_1.addDoc)(hrCollectionRef, data);
            console.log(`Successfully added data for ${data.name}`);
        }
        catch (e) {
            console.error(`Error adding document for ${data.name}:`, e);
        }
    }
    console.log("Finished populating HR data.");
};
populateHRData();
