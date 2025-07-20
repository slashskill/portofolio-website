import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth, db } from '../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

interface UserProfile {
  email: string;
  displayName?: string;
  bio?: string;
  favoriteProjects: string[]; // Array of project IDs or titles
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  addFavoriteProject: (projectId: string) => Promise<void>;
  removeFavoriteProject: (projectId: string) => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const createUserProfile = async (user: User) => {
    const userRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        email: user.email,
        displayName: user.email?.split('@')[0] || '', // Default display name from email
        bio: '',
        favoriteProjects: [],
      });
      setUserProfile({ email: user.email || '', displayName: user.email?.split('@')[0] || '', bio: '', favoriteProjects: [] });
    } else {
      setUserProfile(docSnap.data() as UserProfile);
    }
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (currentUser) {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, updates);
      setUserProfile((prev) => prev ? { ...prev, ...updates } : null);
    }
  };

  const signup = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await createUserProfile(userCredential.user);
    return userCredential;
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const addFavoriteProject = async (projectId: string) => {
    if (currentUser) {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        favoriteProjects: arrayUnion(projectId),
      });
      setUserProfile((prev) => prev ? { ...prev, favoriteProjects: [...prev.favoriteProjects, projectId] } : null);
    }
  };

  const removeFavoriteProject = async (projectId: string) => {
    if (currentUser) {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        favoriteProjects: arrayRemove(projectId),
      });
      setUserProfile((prev) => prev ? { ...prev, favoriteProjects: prev.favoriteProjects.filter(id => id !== projectId) } : null);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await createUserProfile(user);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
    signup,
    login,
    logout,
    addFavoriteProject,
    removeFavoriteProject,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
