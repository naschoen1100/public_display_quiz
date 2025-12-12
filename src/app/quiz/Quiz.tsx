'use client'
import {use, useState} from "react";
import {useRouter} from "next/navigation";
import QuizCard from "@/app/components /QuizCard";
import {QuizQuestion, Quiz} from "@/app/types/types";

export default function QuizPage({dataPromise}) {
    const router = useRouter();
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [quiz, setQuiz] = useState<Quiz[]>([]);
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const data = use(dataPromise);

    const handleNext = (isCorrect: boolean) => {
        if (isCorrect) setScore((s) => s + 1);
        setCurrent((c) => c + 1);
    };
    if (current >= 4) {
        router.push("/result");
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
