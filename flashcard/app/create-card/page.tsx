'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../_providers/UserContext";

const Page = () => {
    const { user } = useUser()
    const router = useRouter()
    const [name, setName] = useState("");
    const [words, setWords] = useState([
        {
            mnword: "",
            enword: "",
        },
    ]);

    const updateWords = (value: string, targetIndex: number, field: string) => {
        const updatedWords = words.map((word, index) => {
            if (targetIndex === index) {
                return { ...word, [field]: value };
            } else {
                return word;
            }
        });

        setWords(updatedWords);
    };

    const addWord = () => {
        setWords([
            ...words,
            {
                mnword: "",
                enword: "",
            },
        ]);
    };

    const createFlashcard = async () => {
        if (!user?.token) return;

        const response = await fetch("http://localhost:8080/create-card", {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
                name: name,
                words: words
            })
        })

        if (response.status === 401) {
            localStorage.removeItem("token");
            router.push("/login");
            return;
        }

        if (!response.ok) {
            const errorBody = await response.text();
            console.error("Failed to create card", response.status, errorBody);
            return;
        }

        const data = await response.json()
        console.log("CREATED:", data)
        router.push("/card")
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
                    transition: transform .2s, background .2s;
                }
                .act:hover { transform: translateY(-3px); background: #3f3f46; }
                .act:active { transform: scale(.96); }
                .act.main { background: linear-gradient(90deg, #6366f1, #a855f7); }
            `}</style>

            <div className="panel">
                <input
                    className="field title"
                    placeholder="card name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {words.map((word, index) => {
                    return (
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
                    );
                })}
                <div className="actions">
                    <button className="act" onClick={addWord}>Add word</button>
                    <button className="act main" onClick={createFlashcard}>Create flashcard</button>
                </div>
            </div>
        </div>
    );
};

export default Page;