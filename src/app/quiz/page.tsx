'use client'
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import QuizCard from "@/app/components /QuizCard";
import {QuizQuestion, Quiz} from "@/app/types/types";

export default function QuizPage() {
    const router = useRouter();
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [quiz, setQuiz] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);

    useEffect(() => {
        fetch("/api/quizzes")
            .then(res => res.json())
            .then(data => {
                setQuiz(data);
                setQuestions(data.questions);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleNext = (isCorrect: boolean) => {
        if (isCorrect) setScore((s) => s + 1);
        setCurrent((c) => c + 1);
    };
    if (current >= quiz.length) {
        return (
            <div className={"flex flex-col items-center justify-center bg-cyan-600"}>
                <h1>Quiz beendet!</h1>
                <p>Dein Score: {score} / {quiz.length} </p>
                <button className={"btn"} onClick={() => {
                    router.push(`/`)
                }}>
                    Start again
                </button>
            </div>
        );
    }

    const q = questions[current];
    return (
        <div className={"flex items-center justify-center bg-cyan-600"}>
            <QuizCard
                question={q.text}
                options={q.answers}
                correctAnswer={q.correctAnswer}
                onNext={handleNext}
            />
        </div>
    );
}
