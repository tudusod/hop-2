"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const handleValues = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data);
                return;
            }
            window.localStorage.setItem("token", data.token);
            router.push("/");
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input 
                placeholder="email" 
                name="email" 
                value={values.email} 
                onChange={(e) => handleValues(e)} 
            />
            <input 
                type="password"
                placeholder="password" 
                name="password" 
                value={values.password} 
                onChange={(e) => handleValues(e)} 
            />
            
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}