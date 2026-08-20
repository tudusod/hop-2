"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase-client";

export default function Home() {
  const supabase = createClient();
  const [quizName, setQuizName] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
      point: 1,
      correctIndex: 0,
      options: ["", "", "", ""],
    },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        point: 1,
        correctIndex: 0,
        options: ["", "", "", ""],
      },
    ]);
  };

  const updateQuestion = (qIndex, field, value) => {
    const updatedQuestion = questions.map((question, index) => {
      return index === qIndex ? { ...question, [field]: value } : question;
    });
    setQuestions(updatedQuestion);
  };
  console.log(questions);

  const updateOption = (qIndex, oIndex, value) => {
    const updatedQuestions = questions.map((question, index) =>
      index === qIndex
        ? {
            ...question,
            options: question.options.map((option, o) =>
              o === oIndex ? value : option,
            ),
          }
        : question,
    );

    setQuestions(updatedQuestions);
  };

  const createQuiz = async () => {
    // console.log(quizName)
    // console.log(questions)
    const response = await supabase
      .from("quiz")
      .insert({
        name: quizName,
      })
      .select("*");
    const quizId = response.data[0].id;

    for (let i = 0; i < questions.length; i++) {
      const response = await supabase
        .from("quizQuestions")
        .insert({
          quizId: quizId,
          question: questions[i].question,
          questionOrder: i + 1,
          point: questions[i].point,
        })
        .select("*");

      console.log(response, 'question response')

      const questionId = response.data[0].id
      for(let j = 0; j < questions[i].options.length; j++){
        await supabase.from('questionOptions').insert({
          questionId: questionId,
          option: questions[i].options[j],
          isCorrect: questions[i].correctIndex === j
        }).select('*')

        console.log(response, 'option respsonse')
      }
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Create quiz</h1>

      <div className="space-y-2">
        <label className="text-sm font-medium">Quiz name</label>
        <Input
          placeholder="My first quiz"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
        />
      </div>

      {questions.map((q, qIndex) => (
        <div key={qIndex} className="space-y-4 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium">Question {qIndex + 1}</h2>
            {/* {questions.length > 1 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeQuestion(qIndex)}
              >
                Remove
              </Button>
            )} */}
          </div>

          <Input
            placeholder="What is the capital of Mongolia?"
            value={q.question}
            onChange={(e) => updateQuestion(qIndex, "question", e.target.value)}
          />

          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground">Points</label>
            <Input
              type="number"
              min="1"
              className="w-24"
              value={q.point}
              onChange={(e) => updateQuestion(qIndex, "point", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Pick the correct answer
            </p>
            {q.options.map((option, oIndex) => (
              <div key={oIndex} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`question-${qIndex}`} // Added name prop for accessibility/radio grouping
                  checked={q.correctIndex === oIndex}
                  onChange={() =>
                    updateQuestion(qIndex, "correctIndex", oIndex)
                  }
                />
                <Input
                  placeholder={`Option ${oIndex + 1}`}
                  value={option}
                  onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={addQuestion}>
          Add question
        </Button>

        <Button variant="outline" onClick={createQuiz}>
          Create quiz
        </Button>
      </div>
    </div>
  );
}
