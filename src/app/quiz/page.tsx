'use client'
import { useState } from "react";
import {useRouter} from "next/navigation";
import QuizCard from "@/app/components /QuizCard";

export default function QuizPage() {
    const questions = [
        {
            question: "Was ist die Hauptstadt von Bayern?",
            options: ["Nürnberg", "München", "Augsburg", "Regensburg"],
            correctAnswer: "München",
        },
        {
            question: "Welche Sprache wird in Next.js verwendet?",
            options: ["Python", "C++", "TypeScript", "Ruby"],
            correctAnswer: "TypeScript",
        },
    ];

    const router = useRouter();
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);

    const handleNext = (isCorrect: boolean) => {
        if (isCorrect) setScore((s) => s + 1);
        setCurrent((c) => c + 1);
    };
    if (current >= questions.length) {
        return (
            <div className={"flex flex-col items-center justify-center bg-cyan-600"}>
                <h1>Quiz beendet!</h1>
                <p>Dein Score: {score} / {questions.length} </p>
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
                question={q.question}
                options={q.options}
                correctAnswer={q.correctAnswer}
                onNext={handleNext}
            />
        </div>
    );
}
