import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { HRDocument } from '../types'; // Import HRDocument interface

export const fetchHRData = async () => {
  try {
    const hrCollectionRef = collection(db, 'hrData'); // Assuming your HR data is in a collection named 'hrData'
    const querySnapshot = await getDocs(hrCollectionRef);
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<HRDocument, 'id'>) // Cast to HRData without id, then add id
    }));
    console.log("Fetched HR Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching HR data:", error);
    return [];
  }
};

// You can add more functions here for specific queries, e.g., by department, date range, etc.
// For example:
/*
export const fetchHRDataByDepartment = async (department: string) => {
  try {
    const hrCollectionRef = collection(db, 'hrData');
    const q = query(hrCollectionRef, where("department", "==", department));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return data;
  } catch (error) {
    console.error("Error fetching HR data by department:", error);
    return [];
  }
};
*/
