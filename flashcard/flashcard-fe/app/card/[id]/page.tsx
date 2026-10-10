'use client'
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "../../_providers/UserContext";

type Word = {
    _id: string;
    mnWord: string;
    enWord: string;
}

type Card = {
    _id: string;
    name: string;
}

type Result = "correct" | "wrong" | "revealed";

const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

const Page = () => {
    const { user, ready, logout } = useUser()
    const router = useRouter()
    const params = useParams<{ id: string }>()
    const id = params.id

    const [card, setCard] = useState<Card | null>(null)
    const [words, setWords] = useState<Word[]>([])
    const [index, setIndex] = useState(0)
    const [flipped, setFlipped] = useState(false)
    const [guess, setGuess] = useState("")
    const [result, setResult] = useState<"correct" | "wrong" | null>(null)
    const [results, setResults] = useState<Record<string, Result>>({})
    const [finished, setFinished] = useState(false)
    const [showMn, setShowMn] = useState(true) // true: see Mongolian, guess English
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (ready && !user) router.push("/login")
    }, [ready, user])

    useEffect(() => {
        const load = async () => {
            if (!user?.token || !id) return
            setLoading(true)
            setError("")
            const headers = {
                "content-type": "application/json",
                authorization: `Bearer ${user.token}`,
            }
            try {
                const [cardRes, wordsRes] = await Promise.all([
                    fetch(`http://localhost:8080/get-card?cardId=${id}`, { headers }),
                    fetch(`http://localhost:8080/get-card-words/${id}`, { headers }),
                ])

                if (cardRes.status === 401 || wordsRes.status === 401) {
                    logout()
                    router.push("/login")
                    return
                }
                if (!cardRes.ok || !wordsRes.ok) {
                    setError("Card not found.")
                    return
                }

                setCard(await cardRes.json())
                setWords(await wordsRes.json())
            } catch (e) {
                console.error(e)
                setError("Cannot reach the server. Is the backend running on port 8080?")
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [user?.token, id])

    const current = words[index]
    const question = current ? (showMn ? current.mnWord : current.enWord) : ""
    const answer = current ? (showMn ? current.enWord : current.mnWord) : ""

    // focus the input on every new word
    useEffect(() => {
        if (!flipped) inputRef.current?.focus()
    }, [index, flipped, finished])

    const resetCard = () => {
        setFlipped(false)
        setGuess("")
        setResult(null)
    }

    const go = (step: number) => {
        resetCard()
        setIndex((i) => Math.min(Math.max(i + step, 0), words.length - 1))
    }

    const record = (value: Result) => {
        if (!current) return
        setResults((prev) => (prev[current._id] ? prev : { ...prev, [current._id]: value }))
    }

    const checkGuess = () => {
        if (!current || flipped || !guess.trim()) return
        if (normalize(guess) === normalize(answer)) {
            setResult("correct")
            record("correct")
            setFlipped(true)
        } else {
            setResult("wrong")
            record("wrong")
            // let the shake animation replay on repeated wrong guesses
            setTimeout(() => setResult((r) => (r === "wrong" ? null : r)), 600)
        }
    }

    const showAnswer = () => {
        if (!current) return
        if (!flipped) record("revealed")
        setFlipped(!flipped)
    }

    const next = () => {
        if (index >= words.length - 1) {
            setFinished(true)
        } else {
            go(1)
        }
    }

    const restart = () => {
        resetCard()
        setResults({})
        setIndex(0)
        setFinished(false)
    }

    const toggleDirection = () => {
        setShowMn(!showMn)
        restart()
    }

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key !== "Enter") return
        if (flipped) next()
        else checkGuess()
    }

    const score = Object.values(results).filter((r) => r === "correct").length

    return (
        <div className="study">
            <style>{`
                .study {
                    min-height: 100vh; padding: 40px 24px;
                    background: radial-gradient(circle at 20% 20%, #1e1b4b, #0a0a0a 70%);
                    color: #fff; font-family: system-ui, sans-serif;
                    display: flex; justify-content: center;
                }
                .panel { width: 100%; max-width: 520px; }
                .top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
                .back, .mode { background: none; border: none; color: #a5b4fc; cursor: pointer; padding: 0; font-size: 14px; }
                .title { font-size: 22px; margin-bottom: 8px; }
                .meta { display: flex; justify-content: space-between; color: #a1a1aa; font-size: 14px; margin-bottom: 20px; }
                .bar { height: 4px; background: #27272a; border-radius: 4px; margin-bottom: 20px; overflow: hidden; }
                .bar > div { height: 100%; background: linear-gradient(90deg, #6366f1, #a855f7); transition: width .3s; }

                /* flip animation */
                .scene { perspective: 1200px; height: 260px; cursor: pointer; }
                .inner {
                    position: relative; width: 100%; height: 100%;
                    transition: transform .6s cubic-bezier(.4, .2, .2, 1);
                    transform-style: preserve-3d;
                }
                .inner.flipped { transform: rotateY(180deg); }
                .face {
                    position: absolute; inset: 0; border-radius: 20px;
                    backface-visibility: hidden; -webkit-backface-visibility: hidden;
                    display: flex; flex-direction: column; align-items: center; justify-content: center;
                    font-size: 32px; font-weight: 600; text-align: center; padding: 24px;
                    transition: box-shadow .3s;
                }
                .front { background: linear-gradient(135deg, #312e81, #4c1d95); }
                .back-face { background: linear-gradient(135deg, #0f766e, #1d4ed8); transform: rotateY(180deg); }
                .face small { font-size: 13px; font-weight: 400; color: #ddd6fe; margin-top: 16px; }
                .scene:hover .inner:not(.flipped) { transform: translateY(-4px); }
                .scene.correct .face { box-shadow: 0 0 0 3px #4ade80, 0 0 40px rgba(74, 222, 128, .35); }
                .scene.wrong { animation: shake .5s; }
                .scene.wrong .face { box-shadow: 0 0 0 3px #f87171, 0 0 40px rgba(248, 113, 113, .35); }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20% { transform: translateX(-10px); }
                    40% { transform: translateX(10px); }
                    60% { transform: translateX(-8px); }
                    80% { transform: translateX(8px); }
                }

                .field {
                    width: 100%; padding: 14px 16px; border-radius: 12px; margin-top: 20px;
                    border: 1px solid #3f3f46; background: #18181b; color: #fff;
                    font-size: 16px; outline: none; transition: border-color .2s, box-shadow .2s;
                }
                .field:focus { border-color: #6366f1; box-shadow: 0 0 0 4px rgba(99, 102, 241, .2); }
                .field:disabled { opacity: .5; }
                .feedback { min-height: 22px; margin-top: 12px; font-size: 14px; }
                .good { color: #86efac; }
                .bad { color: #fca5a5; }
                .actions { display: flex; gap: 12px; margin-top: 12px; }
                .act {
                    flex: 1; padding: 14px; border-radius: 12px; border: none;
                    background: #27272a; color: #fff; font-size: 15px; cursor: pointer;
                    transition: transform .2s, background .2s, opacity .2s;
                }
                .act:hover:not(:disabled) { transform: translateY(-3px); background: #3f3f46; }
                .act:disabled { opacity: .4; cursor: not-allowed; }
                .act.main { background: linear-gradient(90deg, #6366f1, #a855f7); }
                .msg { color: #a1a1aa; margin-top: 20px; }
                .err { color: #fca5a5; margin-top: 20px; }
                .done { text-align: center; padding: 40px 20px; border-radius: 20px; background: linear-gradient(135deg, #312e81, #4c1d95); }
                .done h2 { font-size: 28px; margin-bottom: 8px; }
                .done p { color: #ddd6fe; margin-bottom: 20px; }
            `}</style>

            <div className="panel">
                <div className="top">
                    <button className="back" onClick={() => router.push("/card")}>← Back to cards</button>
                    <button className="mode" onClick={toggleDirection}>
                        {showMn ? "Mongolian → English" : "English → Mongolian"} ⇄
                    </button>
                </div>

                {loading && <div className="msg">Loading...</div>}
                {error && <div className="err">{error}</div>}

                {!loading && !error && card && words.length === 0 && (
                    <>
                        <div className="title">{card.name}</div>
                        <div className="msg">This card has no words.</div>
                    </>
                )}

                {!loading && !error && card && words.length > 0 && !finished && current && (
                    <>
                        <div className="title">{card.name}</div>
                        <div className="meta">
                            <span>{index + 1} / {words.length}</span>
                            <span>Score: {score}</span>
                        </div>
                        <div className="bar"><div style={{ width: `${((index + 1) / words.length) * 100}%` }} /></div>

                        <div className={`scene ${result ?? ""}`} onClick={showAnswer}>
                            <div className={`inner ${flipped ? "flipped" : ""}`}>
                                <div className="face front">
                                    {question}
                                    <small>{showMn ? "Mongolian" : "English"} · click to flip</small>
                                </div>
                                <div className="face back-face">
                                    {answer}
                                    <small>{showMn ? "English" : "Mongolian"}</small>
                                </div>
                            </div>
                        </div>

                        <input
                            ref={inputRef}
                            className="field"
                            placeholder={`Type the ${showMn ? "English" : "Mongolian"} word...`}
                            value={guess}
                            disabled={flipped}
                            onChange={(e) => setGuess(e.target.value)}
                            onKeyDown={onKeyDown}
                        />

                        <div className="feedback">
                            {result === "correct" && <span className="good">Correct! 🎉 Press Enter for the next one.</span>}
                            {result === "wrong" && <span className="bad">Not quite, try again or show the answer.</span>}
                            {!result && flipped && <span className="bad">Answer revealed. Press Enter for the next one.</span>}
                        </div>

                        <div className="actions">
                            <button className="act" onClick={checkGuess} disabled={flipped || !guess.trim()}>Check</button>
                            <button className="act" onClick={showAnswer}>{flipped ? "Hide answer" : "Show answer"}</button>
                        </div>
                        <div className="actions">
                            <button className="act" onClick={() => go(-1)} disabled={index === 0}>← Previous</button>
                            <button className="act main" onClick={next}>
                                {index >= words.length - 1 ? "Finish" : "Next →"}
                            </button>
                        </div>
                    </>
                )}

                {!loading && !error && card && finished && (
                    <div className="done">
                        <h2>{score} / {words.length}</h2>
                        <p>correct on the first try</p>
                        <div className="actions">
                            <button className="act" onClick={() => router.push("/card")}>All cards</button>
                            <button className="act main" onClick={restart}>Try again</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;