'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../_providers/UserContext";

type Card = {
    _id: string;
    user: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const Page = () => {
    const { user } = useUser()
    const router = useRouter();
    const [cards, setCards] = useState<Card[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const getFlashcards = async () => {
            if (!user?.token) return;

            const response = await fetch("http://localhost:8080/get-card", {
                method: 'GET',
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${user.token}`,
                },
            })

            if (response.status === 401) {
                localStorage.removeItem("token");
                router.push("/login");
                return;
            }

            if (!response.ok) {
                console.error("Failed to fetch cards", response.status);
                return;
            }

            const data = await response.json()
            setCards(data)
        }
        getFlashcards();
    }, [user?.token])

    const handleRedirect = (id: string) => {
        router.push(`/card/${id}`)
    }

    return (
        <div className="list">
            <style>{`
                .list {
                    min-height: 100vh; padding: 40px 24px;
                    background: radial-gradient(circle at 20% 20%, #1e1b4b, #0a0a0a 70%);
                    color: #fff; font-family: system-ui, sans-serif;
                }
                .inner { max-width: 900px; margin: 0 auto; }
                .search {
                    width: 100%; padding: 14px 18px; margin-bottom: 28px;
                    border-radius: 14px; border: 1px solid #3f3f46;
                    background: #18181b; color: #fff; font-size: 16px; outline: none;
                    transition: border-color .2s, box-shadow .2s;
                }
                .search:focus { border-color: #6366f1; box-shadow: 0 0 0 4px rgba(99, 102, 241, .2); }
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
                @keyframes rise {
                    from { opacity: 0; transform: translateY(24px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <div className="inner">
                <input
                    className="search"
                    placeholder="card name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="grid">
                    {cards
                        .filter((card) => (card.name ?? "").toLowerCase().includes(search.toLowerCase()))
                        .map((card, i) => (
                            <div
                                className="tile"
                                key={card._id}
                                style={{ animationDelay: `${i * 70}ms` }}
                                onClick={() => handleRedirect(card._id)}
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