'use client'

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../_providers/UserContext";

export default function SignUp() {
    const router = useRouter()
    const { login } = useUser()
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleValues = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    const handleSignUp = async () => {
        setError("")
        if (!values.username.trim() || !values.email.trim() || !values.password) {
            setError("Fill in username, email and password.")
            return
        }

        setLoading(true)
        try {
            const response = await fetch("http://localhost:8080/sign-up", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })

            const data = await response.json().catch(() => ({}))
            console.log("SIGNUP RESPONSE:", data)

            if (!response.ok) {
                setError(data.error || data.message || `Sign up failed (${response.status})`)
                return
            }

            if (typeof data.token === "string" && login(data.token)) {
                router.push("/card")
            } else {
                setError("Invalid token received from server.")
            }
        } catch (err) {
            console.error(err)
            setError("Cannot reach the server. Is the backend running on port 8080?")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="page">
            <style>{`
                .page {
                    min-height: 100vh; padding: 40px 24px; display: flex;
                    align-items: center; justify-content: center;
                    background: radial-gradient(circle at 20% 20%, #1e1b4b, #0a0a0a 70%);
                    color: #fff; font-family: system-ui, sans-serif;
                }
                .panel { width: 100%; max-width: 380px; display: flex; flex-direction: column; gap: 12px; }
                .field {
                    width: 100%; padding: 14px 16px; border-radius: 12px;
                    border: 1px solid #3f3f46; background: #18181b; color: #fff;
                    font-size: 16px; outline: none; transition: border-color .2s, box-shadow .2s;
                }
                .field:focus { border-color: #6366f1; box-shadow: 0 0 0 4px rgba(99,102,241,.2); }
                .btn {
                    padding: 14px; border-radius: 12px; border: none; cursor: pointer; color: #fff;
                    font-size: 15px; background: linear-gradient(90deg, #6366f1, #a855f7);
                }
                .btn:disabled { opacity: .5; cursor: not-allowed; }
                .error { color: #fca5a5; font-size: 14px; }
                .link { background: none; border: none; color: #a5b4fc; cursor: pointer; font-size: 14px; }
            `}</style>
            <div className="panel">
                <h1>Sign Up</h1>
                <input className="field" placeholder="username" name="username" value={values.username} onChange={handleValues} />
                <input className="field" placeholder="email" name="email" value={values.email} onChange={handleValues} />
                <input className="field" placeholder="password" type="password" name="password" value={values.password}
                    onChange={handleValues} onKeyDown={(e) => e.key === "Enter" && handleSignUp()} />
                <button className="btn" onClick={handleSignUp} disabled={loading}>
                    {loading ? "Signing up..." : "Sign up"}
                </button>
                {error && <div className="error">{error}</div>}
                <button className="link" onClick={() => router.push("/login")}>Already have an account? Login</button>
            </div>
        </div>
    );
}