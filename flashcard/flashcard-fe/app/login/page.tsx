'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../_providers/UserContext";

const Page = () => {
    const { login } = useUser()
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const submit = async () => {
        setError("")
        if (!username.trim() || !password) { setError("Enter username and password."); return }

        setLoading(true)
        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ username: username.trim(), password }),
            })
            const data = await response.json().catch(() => ({}))
            console.log("LOGIN RESPONSE:", data)

            if (!response.ok) {
                setError(data.error || data.message || `Failed (${response.status})`)
                return
            }

            const token = data.token || data.accessToken
            if (typeof token !== "string" || !login(token)) {
                setError("Server did not return a valid token. Check the console.")
                return
            }
            router.push("/card")
        } catch (e) {
            console.error(e)
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
            `}</style>
            <div className="panel">
                <h1>Login</h1>
                <input className="field" placeholder="username" value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                <input className="field" type="password" placeholder="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && submit()} />
                <button className="btn" onClick={submit} disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
                {error && <div className="error">{error}</div>}
            </div>
        </div>
    )
}

export default Page;