"use client";

import { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext(null);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && token.includes(".")) {
            try {
                const data = jwtDecode(token);
                setUser(data);
            } catch (error) {
                console.error("Invalid token format");
            }
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);