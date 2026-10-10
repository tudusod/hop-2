'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../_providers/UserContext";

type Card = {
    _id: string;
    user: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

const Page = () => {
    const { user, ready, logout } = useUser()
    const router = useRouter();
    const [cards, setCards] = useState<Card[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // not logged in -> go to login
    useEffect(() => {
        if (ready && !user) router.push("/login")
    }, [ready, user])

    useEffect(() => {
        const getFlashcards = async () => {
            if (!user?.token) return;

            setLoading(true)
            setError("")
            try {
                const response = await fetch("http://localhost:8080/get-card", {
                    method: 'GET',
                    headers: {
                        "content-type": "application/json",
                        authorization: `Bearer ${user.token}`,
                    },
                })

                if (response.status === 401) {
                    logout();
                    router.push("/login");
                    return;
                }

                if (!response.ok) {
                    setError(`Failed to load cards (${response.status})`)
                    return;
                }

                const data = await response.json()
                setCards(Array.isArray(data) ? data : data.cards ?? [])
            } catch (e) {
                console.error(e)
                setError("Cannot reach the server. Is the backend running on port 8080?")
            } finally {
                setLoading(false)
            }
        }
        getFlashcards();
    }, [user?.token])

    const filtered = cards.filter((card) =>
        (card.name ?? "").toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="list">
            <style>{`
                .list {
                    min-height: 100vh; padding: 40px 24px;
                    background: radial-gradient(circle at 20% 20%, #1e1b4b, #0a0a0a 70%);
                    color: #fff; font-family: system-ui, sans-serif;
                }
                .inner { max-width: 900px; margin: 0 auto; }
                .head { display: flex; gap: 12px; margin-bottom: 28px; }
                .search {
                    flex: 1; padding: 14px 18px;
                    border-radius: 14px; border: 1px solid #3f3f46;
                    background: #18181b; color: #fff; font-size: 16px; outline: none;
                    transition: border-color .2s, box-shadow .2s;
                }
                .search:focus { border-color: #6366f1; box-shadow: 0 0 0 4px rgba(99, 102, 241, .2); }
                .create {
                    padding: 14px 20px; border-radius: 14px; border: none; cursor: pointer;
                    background: linear-gradient(90deg, #6366f1, #a855f7); color: #fff; font-size: 15px;
                }
                .logout {
                    padding: 14px 20px; border-radius: 14px; border: none; cursor: pointer;
                    background: #27272a; color: #fff; font-size: 15px;
                }
                .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 18px; }
                .tile {
                    padding: 28px 20px; border-radius: 18px; cursor: pointer;
                    background: linear-gradient(135deg, #312e81, #4c1d95);
                    font-size: 18px; font-weight: 600; min-height: 110px;
                    display: flex; align-items: center; justify-content: center; text-align: center;
                    opacity: 0; animation: rise .5s ease forwards;
                    transition: transform .25s, box-shadow .25s;
                }
                .tile:hover { transform: translateY(-6px) scale(1.03); box-shadow: 0 16px 40px rgba(124, 58, 237, .4); }
                .tile:active { transform: scale(.97); }
                .msg { color: #a1a1aa; text-align: center; margin-top: 40px; }
                .msg.err { color: #fca5a5; }
                @keyframes rise {
                    from { opacity: 0; transform: translateY(24px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <div className="inner">
                <div className="head">
                    <input
                        className="search"
                        placeholder="card name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="create" onClick={() => router.push("/create-card")}>+ New card</button>
                    <button className="logout" onClick={() => { logout(); router.push("/login") }}>Logout</button>
                </div>

                {!ready && <div className="msg">Loading user...</div>}
                {ready && user && loading && <div className="msg">Loading cards...</div>}
                {error && <div className="msg err">{error}</div>}
                {user && !loading && !error && cards.length === 0 && (
                    <div className="msg">No cards yet. Create your first one!</div>
                )}

                <div className="grid">
                    {filtered.map((card, i) => (
                        <div
                            className="tile"
                            key={card._id}
                            style={{ animationDelay: `${i * 70}ms` }}
                            onClick={() => router.push(`/card/${card._id}`)}
                        >
                            {card.name || "(no name)"}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;