"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";

export default function QuizDetailPage({ params }) {
  const resolvedParams = use(params);

  const supabase = createClient();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (!quizId) return;

    async function fetchQuizData() {
      const numericId = (quizId);

      const { data: quizData } = await supabase
        .from("quiz")
        .select("*")
        .eq("id", numericId)
        .single();

      setQuiz(quizData);

      const { data: qData } = await supabase
        .from("quizQuestions")
        .select("*")
        .eq("quizId", numericId)
        .order("questionOrder", { ascending: true });

      if (qData && qData.length > 0) {
        const qIds = qData.map((q) => q.id);
        const { data: optData } = await supabase
          .from("questionOptions")
          .select("*")
          .in("questionId", qIds);

        setQuestions(
          qData.map((q) => ({
            ...q,
            options: (optData || []).filter((opt) => opt.questionId === q.id),
          }))
        );
      }
    }

    fetchQuizData();
  }, [quizId, supabase]);

  if (!quiz) return null;

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <Link href="/get-quiz">
        <Button variant="outline" size="sm">
          ← Back to Quizzes
        </Button>
      </Link>

      <h1 className="text-3xl font-bold">{quiz.name}</h1>

      <div className="space-y-6">
        {questions.map((q, qIndex) => (
          <div key={q.id} className="space-y-4 rounded-lg border bg-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {qIndex + 1}. {q.question}
              </h2>
              <span className="rounded bg-muted px-2 py-1 text-xs">
                {q.point} {q.point === 1 ? "point" : "points"}
              </span>
            </div>

            <div className="space-y-2">
              {q.options?.map((opt) => (
                <div
                  key={opt.id}
                  className={`flex items-center justify-between rounded-md border p-3 text-sm ${
                    opt.isCorrect
                      ? "border-green-500/30 bg-green-500/10"
                      : "bg-muted/30"
                  }`}
                >
                  <span>{opt.option}</span>
                  {opt.isCorrect && (
                    <span className="text-xs font-semibold text-green-600">
                      Correct
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}