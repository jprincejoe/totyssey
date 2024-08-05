import { createContext, useContext, useState, useEffect } from "react";
import { TUser } from "@/features/auth/types/authTypes";
import { useGetUser } from "@/features/user/hooks/useGetUser";
import LoadingSpinner from "@/components/LoadingSpinner";

type TAuthContext = {
  user: TUser | null;
  login: (user: TUser) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<TAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const { data, isLoading } = useGetUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
    setLoading(isLoading);
  }, [data, isLoading]);

  const login = (user: TUser) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  const value: TAuthContext = {
    user,
    login,
    logout,
    loading,
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
