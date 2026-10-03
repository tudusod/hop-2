"use client";

import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import { jwtDecode } from "jwt-decode";

type User = {
  email: string;
  username: string;
  id: string;
  _id: string;
  iat: number;
  token: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const data = jwtDecode<Omit<User, "token">>(token);
    setUser({ ...data, token });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(UserContext);
};