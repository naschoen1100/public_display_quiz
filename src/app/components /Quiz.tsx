'use client'
import {use, useState} from "react";
import {useRouter} from "next/navigation";
import QuizCard from "@/app/components /QuizCard";
import {QuizQuestion} from "@/app/types/types";
import {getFullQuizData} from "@/app/data/getQuizData";

type QuizPageProps = {
    dataPromise: Promise<Awaited<ReturnType<typeof getFullQuizData>>>;
}
export default function QuizPage({dataPromise}: QuizPageProps) {
    const router = useRouter();
    const data = use(dataPromise);
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);

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
