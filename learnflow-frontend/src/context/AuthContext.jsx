import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as authService from "../services/auth.service.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const refreshUser = useCallback(async () => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      return currentUser;
    } catch (error) {
      if (error.status === 401) {
        setUser(null);
        return null;
      }

      setAuthError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    const loadUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (active) {
          setUser(currentUser);
          setAuthError(null);
        }
      } catch (error) {
        if (active) {
          if (error.status === 401) {
            setUser(null);
            setAuthError(null);
          } else {
            setAuthError(error);
          }
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    loadUser();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => {
      setUser(null);
      setAuthError(null);
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () =>
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, []);

  const login = useCallback(async (email, password) => {
    const authenticatedUser = await authService.login(email, password);
    setUser(authenticatedUser);
    setAuthError(null);
    return authenticatedUser;
  }, []);

  const signup = useCallback(async (details) => {
    const authenticatedUser = await authService.signup(details);
    setUser(authenticatedUser);
    setAuthError(null);
    return authenticatedUser;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    setAuthError(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      authError,
      login,
      signup,
      logout,
      refreshUser,
    }),
    [user, isLoading, authError, login, signup, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
