'use client'
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type User = { token: string; id: string; username: string };

type UserContextType = {
    user: User | null;
    ready: boolean;
    login: (token: string) => boolean;
    logout: () => void;
};

const UserContext = createContext<UserContextType>({
    user: null,
    ready: false,
    login: () => false,
    logout: () => {},
});

const parseToken = (token: string): User | null => {
    try {
        const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
        const payload = JSON.parse(atob(base64));
        if (payload.exp && payload.exp * 1000 < Date.now()) return null;
        return { token, id: payload.id, username: payload.username };
    } catch {
        return null;
    }
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const saved = window.localStorage.getItem("token");
        if (saved) {
            const parsed = parseToken(saved);
            if (parsed) setUser(parsed);
            else window.localStorage.removeItem("token");
        }
        setReady(true);
    }, []);

    const login = (token: string) => {
        const parsed = parseToken(token);
        if (!parsed) return false;
        window.localStorage.setItem("token", token);
        setUser(parsed);
        return true;
    };

    const logout = () => {
        window.localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, ready, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);