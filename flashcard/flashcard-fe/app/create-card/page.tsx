'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../_providers/UserContext";

const Page = () => {
    const { user, ready, logout } = useUser()
    const router = useRouter()
    const [name, setName] = useState("");
    const [words, setWords] = useState([{ mnword: "", enword: "" }]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // not logged in -> go to login
    useEffect(() => {
        if (ready && !user) router.push("/login")
    }, [ready, user])

    const updateWords = (value: string, targetIndex: number, field: string) => {
        setWords(words.map((word, index) =>
            targetIndex === index ? { ...word, [field]: value } : word
        ));
    };

    const addWord = () => setWords([...words, { mnword: "", enword: "" }]);

    const createFlashcard = async () => {
        setError("")
        if (!user?.token) { setError("You are not logged in."); return }
        if (!name.trim()) { setError("Card name is required."); return }

        const cleanWords = words.filter(w => w.mnword.trim() && w.enword.trim())
        if (cleanWords.length === 0) { setError("Add at least one complete word pair."); return }

        setLoading(true)
        try {
            const response = await fetch("http://localhost:8080/create-card", {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ name: name.trim(), words: cleanWords })
            })

            if (response.status === 401) {
                logout();
                router.push("/login");
                return;
            }

            const data = await response.json().catch(() => ({}))
            if (!response.ok) {
                setError(data.error || `Failed (${response.status})`)
                return;
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
        <div className="create">
            <style>{`
                .create {
                    min-height: 100vh; padding: 40px 24px;
                    background: radial-gradient(circle at 20% 20%, #1e1b4b, #0a0a0a 70%);
                    color: #fff; font-family: system-ui, sans-serif;
                    display: flex; justify-content: center;
                }
                .panel { width: 100%; max-width: 520px; animation: pop .5s ease; }
                @keyframes pop {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .field {
                    width: 100%; padding: 14px 16px; border-radius: 12px;
                    border: 1px solid #3f3f46; background: #18181b; color: #fff;
                    font-size: 16px; outline: none;
                    transition: border-color .2s, box-shadow .2s;
                }
                .field:focus { border-color: #6366f1; box-shadow: 0 0 0 4px rgba(99, 102, 241, .2); }
                .title { font-size: 18px; margin-bottom: 20px; }
                .row {
                    display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
                    margin-top: 12px; animation: pop .4s ease;
                }
                .actions { display: flex; gap: 12px; margin-top: 24px; }
                .act {
                    flex: 1; padding: 14px; border-radius: 12px; border: none;
                    background: #27272a; color: #fff; font-size: 15px; cursor: pointer;
                    transition: transform .2s, background .2s, opacity .2s;
                }
                .act:hover:not(:disabled) { transform: translateY(-3px); background: #3f3f46; }
                .act:active:not(:disabled) { transform: scale(.96); }
                .act:disabled { opacity: .5; cursor: not-allowed; }
                .act.main { background: linear-gradient(90deg, #6366f1, #a855f7); }
                .error { color: #fca5a5; font-size: 14px; margin-top: 16px; }
                .back { background: none; border: none; color: #a5b4fc; cursor: pointer; padding: 0 0 16px; font-size: 14px; }
            `}</style>

            <div className="panel">
                <button className="back" onClick={() => router.push("/card")}>← Back to cards</button>
                <input
                    className="field title"
                    placeholder="card name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {words.map((word, index) => (
                    <div className="row" key={index}>
                        <input
                            className="field"
                            placeholder="mn word"
                            value={word.mnword}
                            onChange={(e) => updateWords(e.target.value, index, "mnword")}
                        />
                        <input
                            className="field"
                            placeholder="en word"
                            value={word.enword}
                            onChange={(e) => updateWords(e.target.value, index, "enword")}
                        />
                    </div>
                ))}
                <div className="actions">
                    <button className="act" onClick={addWord}>Add word</button>
                    <button className="act main" onClick={createFlashcard} disabled={loading}>
                        {loading ? "Saving..." : "Create flashcard"}
                    </button>
                </div>
                {error && <div className="error">{error}</div>}
            </div>
        </div>
    );
};

export default Page;