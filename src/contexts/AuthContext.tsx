import firebase from "firebase";
import { auth } from "../service/firebase";
import { createContext, useEffect, useState } from "react";

import { AuthContextProviderType } from "../types/authContextProvider.type";
import { AuthContextType } from "../types/authContext.type";
import { UserType } from "../types/user.type";

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderType) {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account.");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    return () => {
      unsubcribe();
    };
  }, []);

  async function singWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const { user } = await auth.signInWithPopup(provider);

    if (user) {
      const { displayName, photoURL, uid } = user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account.");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }

  return (
    <AuthContext.Provider value={{ user, singWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}
