"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Import js-cookie

interface AuthContextType {
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    // On mount, try to load token from cookies
    const storedToken = Cookies.get("token"); // Use js-cookie to get token
    if (storedToken) {
      try {
        const payloadBase64 = storedToken.split(".")[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        const sub = decodedPayload.sub; // 'sub' claim holds user ID
        setToken(storedToken);
        setUserId(sub);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to decode token:", error);
        Cookies.remove("token"); // Remove invalid token
      }
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string) => {
    Cookies.set("token", newToken, { expires: 7 }); // Store token in cookies for 7 days
    const payloadBase64 = newToken.split(".")[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    const sub = decodedPayload.sub;
    setToken(newToken);
    setUserId(sub);
    setIsAuthenticated(true);
    router.push("/"); // Redirect to dashboard after login
  };

  const logout = () => {
    Cookies.remove("token"); // Remove token from cookies
    setToken(null);
    setUserId(null);
    setIsAuthenticated(false);
    router.push("/login"); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider
      value={{ token, userId, isAuthenticated, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
