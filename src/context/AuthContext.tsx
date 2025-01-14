"use client";
import { auth, db } from "@/lib/firebase";
import { AuthUser, UserType } from "@/types";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<any>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const authUser: AuthUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            role: userData.role as UserType,
            userToken: await firebaseUser.getIdToken(),
            name: userData.name,
          };
          setUser(authUser);
          localStorage.setItem("authUser", JSON.stringify(authUser));
        }
      } else {
        setUser(null);
        localStorage.removeItem("authUser");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userRef = doc(db, "users", userCredential.user.uid);
      const userDocSnap = await getDoc(userRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const authUser: AuthUser = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          role: userData.role || "user",
          name: userData.name,
          userToken: await userCredential.user.getIdToken(),
        };

        setUser(authUser);
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setLoading(false);
        return {
          status: true,
          data: { user: authUser },
          message: "User logged in successfully",
        };
      } else {
        throw new Error("User data not found");
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        return {
          status: false,
          error: { msg: error.message },
          message: "Login failed",
        };
      } else {
        return {
          status: false,
          error: { msg: "An unknown error occurred" },
          message: "Login failed",
        };
      }
    }
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;
      const userRef = doc(db, "users", userCredential.user.uid);
      await setDoc(userRef, {
        email: email,
        role: "user",
      });
      const userToken = await userCredential.user.getIdToken();
      const authUser: AuthUser = {
        uid: uid,
        email: userCredential.user.email || "",
        role: "user",
        userToken: userToken,
      };

      setUser(authUser);
      localStorage.setItem("authUser", JSON.stringify(authUser));

      return {
        status: true,
        data: { user: authUser },
        message: "User registered successfully",
      };
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        return {
          status: false,
          error: { msg: error.message },
          message: "Registration failed",
        };
      } else {
        return {
          status: false,
          error: { msg: "An unknown error occurred" },
          message: "Registration failed",
        };
      }
    }
  };

  const signOutUser = async () => {
    try {
      setUser(null);
      localStorage.removeItem("authUser");
      router.push("/sign-in");
      await signOut(auth);
      toast.success("You have been signed out.");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out. Please try again.");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signOut: signOutUser, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");

  return context;
};
export default AuthContextProvider;
