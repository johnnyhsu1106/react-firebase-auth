import { createContext, useContext, useState, useEffect } from 'react';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  updatePassword,
  signInWithEmailAndPassword,
  signOut, 
  sendPasswordResetEmail,
  onAuthStateChanged 
} from "firebase/auth";

import app from '../firebase';

const auth = getAuth(app);
const AuthContext = createContext();

const useAuthContext = () => {
  const auth = useContext(AuthContext);
  if (auth === undefined) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return auth;
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
  };

  const changePassword = (password) => {
    if (!user) {
      return new Promise((_, reject) => {
        reject('User is null');
      })
    }
    return updatePassword(user, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  
  const value = {
    user,
    login,
    logout,
    signup, 
    resetPassword,
    changePassword,
  };


  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

export { useAuthContext, AuthProvider };