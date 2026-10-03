'use client'
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "../../_providers/UserContext";

type Word = {
    _id: string;
    mnWord: string;
    enWord: string;
}

const Page = () => {
    const { id } = useParams<{ id: string }>()
    const { user } = useUser()
    const router = useRouter()
    const [words, setWords] = useState<Word[]>([])
    const [index, setIndex] = useState(0)
    const [flipped, setFlipped] = useState(false)
    const [guess, setGuess] = useState("")
    const [result, setResult] = useState<"correct" | "wrong" | null>(null)
    const [score, setScore] = useState(0)

    useEffect(() => {
        const getWords = async () => {
            if (!user?.token || !id) return;

            const response = await fetch(`http://localhost:8080/get-card-words/${id}`, {
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
                console.error("Failed to fetch words", response.status);
                return;
            }

            const data = await response.json()
            setWords(data)
        }
        getWords()
    }, [id, user?.token])

    const resetCard = () => {
        setFlipped(false)
        setGuess("")
        setResult(null)
    }

    const next = () => {
        if (index < words.length - 1) {
            resetCard()
            setIndex(index + 1)
        }
    }

    const prev = () => {
        if (index > 0) {
            resetCard()
            setIndex(index - 1)
        }
    }

    const current = words[index]
    const progress = words.length ? ((index + 1) / words.length) * 100 : 0

    const check = () => {
        if (!current || result) return;
        const isCorrect =
            guess.trim().toLowerCase() === current.enWord.trim().toLowerCase()
        setResult(isCorrect ? "correct" : "wrong")
        if (isCorrect) setScore(score + 1)
        setFlipped(true)
    }

    const showAnswer = () => {
        if (!current || result) return;
        setResult("wrong")
        setFlipped(true)
    }

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return;
        if (result) next();
        else check();
    }

    return (
        <div className="wrap">
            <style>{`
                .wrap {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 24px;
                    padding: 24px;
                    background: radial-gradient(circle at 20% 20%, #1e1b4b, #0a0a0a 70%);
                    color: #fff;
                    font-family: system-ui, sans-serif;
                }
                .top { width: 100%; max-width: 420px; }
                .back {
                    background: none; border: none; color: #a5b4fc;
                    cursor: pointer; font-size: 14px; padding: 0 0 12px;
                    transition: transform .2s;
                }
                .back:hover { transform: translateX(-4px); }
                .bar { height: 6px; background: #27272a; border-radius: 99px; overflow: hidden; }
                .fill {
                    height: 100%; border-radius: 99px;
                    background: linear-gradient(90deg, #6366f1, #a855f7);
                    transition: width .4s ease;
                }
                .meta { display: flex; justify-content: space-between; margin-top: 8px; font-size: 13px; color: #a1a1aa; }
                .score { color: #86efac; }

                .scene { width: 100%; max-width: 420px; height: 260px; perspective: 1000px; }
                .enter { animation: slideIn .45s ease; }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(40px) scale(.96); }
                    to { opacity: 1; transform: translateX(0) scale(1); }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20%, 60% { transform: translateX(-8px); }
                    40%, 80% { transform: translateX(8px); }
                }
                .shake { animation: shake .4s ease; }
                .flip {
                    position: relative; width: 100%; height: 100%;
                    transition: transform .6s cubic-bezier(.4, .2, .2, 1);
                    transform-style: preserve-3d;
                }
                .flip.on { transform: rotateY(180deg); }
                .face {
                    position: absolute; inset: 0;
                    display: flex; flex-direction: column;
                    align-items: center; justify-content: center; gap: 10px;
                    border-radius: 20px; padding: 24px; text-align: center;
                    backface-visibility: hidden; -webkit-backface-visibility: hidden;
                    box-shadow: 0 20px 50px rgba(99, 102, 241, .25);
                }
                .front { background: linear-gradient(135deg, #4f46e5, #7c3aed); }
                .back-face { transform: rotateY(180deg); background: linear-gradient(135deg, #db2777, #f97316); }
                .back-face.correct { background: linear-gradient(135deg, #059669, #22c55e); }
                .back-face.wrong { background: linear-gradient(135deg, #dc2626, #be123c); }
                .label { font-size: 12px; letter-spacing: .15em; text-transform: uppercase; opacity: .7; }
                .word { font-size: 38px; font-weight: 700; word-break: break-word; }
                .yours { font-size: 14px; opacity: .85; }

                .guess {
                    width: 100%; max-width: 420px; padding: 14px 16px; border-radius: 12px;
                    border: 1px solid #3f3f46; background: #18181b; color: #fff;
                    font-size: 16px; outline: none; text-align: center;
                    transition: border-color .2s, box-shadow .2s;
                }
                .guess:focus { border-color: #6366f1; box-shadow: 0 0 0 4px rgba(99, 102, 241, .2); }
                .guess:disabled { opacity: .5; }

                .btns { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
                .btn {
                    padding: 12px 24px; border-radius: 12px; border: none;
                    background: #27272a; color: #fff; font-size: 15px; cursor: pointer;
                    transition: transform .2s, background .2s, opacity .2s;
                }
                .btn:hover:not(:disabled) { transform: translateY(-3px); background: #3f3f46; }
                .btn:active:not(:disabled) { transform: scale(.95); }
                .btn:disabled { opacity: .35; cursor: not-allowed; }
                .btn.main { background: linear-gradient(90deg, #6366f1, #a855f7); }
                .empty { color: #a1a1aa; animation: slideIn .5s ease; }
            `}</style>

            <div className="top">
                <button className="back" onClick={() => router.push("/card")}>← Back to cards</button>
                <div className="bar"><div className="fill" style={{ width: `${progress}%` }} /></div>
                <div className="meta">
                    <span className="score">Score: {score}</span>
                    <span>{words.length ? `${index + 1} / ${words.length}` : "0 / 0"}</span>
                </div>
            </div>

            {current ? (
                <>
                    <div className="scene">
                        <div key={current._id} className="enter" style={{ width: "100%", height: "100%" }}>
                            <div className={`flip ${flipped ? "on" : ""} ${result === "wrong" ? "shake" : ""}`}>
                                <div className="face front">
                                    <span className="label">Mongolian</span>
                                    <span className="word">{current.mnWord}</span>
                                    <span className="yours">Type the English word below</span>
                                </div>
                                <div className={`face back-face ${result ?? ""}`}>
                                    <span className="label">
                                        {result === "correct" ? "Correct!" : "English"}
                                    </span>
                                    <span className="word">{current.enWord}</span>
                                    {result === "wrong" && guess.trim() && (
                                        <span className="yours">You wrote: {guess}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <input
                        key={current._id}
                        className="guess"
                        placeholder="your guess in English..."
                        value={guess}
                        onChange={(e) => setGuess(e.target.value)}
                        onKeyDown={handleKey}
                        disabled={!!result}
                        autoFocus
                    />
                </>
            ) : (
                <div className="empty">No words in this card yet.</div>
            )}

            <div className="btns">
                <button className="btn" onClick={prev} disabled={index === 0}>Previous</button>
                <button className="btn" onClick={showAnswer} disabled={!current || !!result}>Show answer</button>
                <button className="btn main" onClick={check} disabled={!current || !!result || !guess.trim()}>Check</button>
                <button className="btn" onClick={next} disabled={index >= words.length - 1}>Next</button>
            </div>
        </div>
    )
}

export default Page;