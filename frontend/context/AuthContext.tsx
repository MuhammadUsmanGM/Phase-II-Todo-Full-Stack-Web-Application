"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Import js-cookie

interface AuthContextType {
  token: string | null;
  userId: string | null;
  userEmail: string | null;
  userName: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  mockLogin: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    // On mount, try to load token from cookies
    const storedToken = Cookies.get("token"); // Use js-cookie to get token
    if (storedToken) {
      try {
        const headerBase64 = storedToken.split(".")[0];
        const payloadBase64 = storedToken.split(".")[1];

        // Check if it's a mock token (algorithm "none" - insecure)
        const header = JSON.parse(atob(headerBase64));
        if (header?.alg === "none") {
          console.warn("Invalid mock token detected, removing it");
          Cookies.remove("token");
          return;
        }

        const decodedPayload = JSON.parse(atob(payloadBase64));
        const sub = decodedPayload.sub; // 'sub' claim holds user ID
        const email = decodedPayload.email; // 'email' claim holds user email if available
        const name = decodedPayload.name || decodedPayload.firstName || decodedPayload.lastName; // 'name' claim holds user name if available
        const exp = decodedPayload.exp; // 'exp' claim holds expiration time

        // Check if token is expired
        if (exp && Date.now() >= exp * 1000) {
          console.warn("Token is expired, removing it");
          Cookies.remove("token");
          return;
        }

        setToken(storedToken);
        setUserId(sub);
        setUserEmail(email || null); // Set email if available
        setUserName(name || null); // Set name if available
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
    const email = decodedPayload.email; // Extract email from token
    const name = decodedPayload.name || decodedPayload.firstName || decodedPayload.lastName; // Extract name from token
    setToken(newToken);
    setUserId(sub);
    setUserEmail(email || null); // Set email if available
    setUserName(name || null); // Set name if available
    setIsAuthenticated(true);
    router.push("/dashboard"); // Redirect to dashboard after login
  };

  // Mock login for testing without backend
  const mockLogin = () => {
    // Only allow mock login in development environment
    if (process.env.NODE_ENV !== "development" && !process.env.NEXT_PUBLIC_ALLOW_MOCK_LOGIN) {
      console.error("Mock login is only allowed in development");
      return;
    }

    // Create a mock JWT with a fake user ID
    const mockPayload = {
      sub: "1", // Mock user ID
      email: "test@gmail.com",
      name: "Test User", // Mock user name
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 24 hours from now
      isMock: true // Add a flag to indicate this is a mock token
    };

    // Encode the payload as base64 (simplified - not a true JWT but works for testing)
    const header = btoa(JSON.stringify({ alg: "none", typ: "JWT" }));
    const payload = btoa(JSON.stringify(mockPayload));
    const signature = btoa("fake-signature"); // In a real JWT, signature would be calculated

    const mockToken = `${header}.${payload}.${signature}`;

    Cookies.set("token", mockToken, { expires: 7 });
    setToken(mockToken);
    setUserId("1");
    setUserEmail("test@gmail.com"); // Set mock email
    setUserName("Test User"); // Set mock name
    setIsAuthenticated(true);
    router.push("/dashboard");
  };

  const logout = () => {
    Cookies.remove("token"); // Remove token from cookies
    setToken(null);
    setUserId(null);
    setUserEmail(null); // Clear email
    setUserName(null); // Clear name
    setIsAuthenticated(false);
    router.push("/"); // Redirect to landing page after logout
  };

  return (
    <AuthContext.Provider
      value={{ token, userId, userEmail, userName, isAuthenticated, login, logout, mockLogin, isLoading }}
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
