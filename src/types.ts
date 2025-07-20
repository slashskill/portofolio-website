export interface HRData {
  name: string;
  department: string;
  location: string;
  hireDate: string; // YYYY-MM-DD
  tenure: number; // in years
  salary: number;
  gender: string;
  ethnicity: string;
  ageBracket: string;
  turnoverType: string | null; // "Voluntary", "Involuntary", or null
  engagementScore: number;
}

export interface HRDocument extends HRData {
  id: string; // Document ID from Firestore
}
