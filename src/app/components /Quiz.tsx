'use client'
import {use, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Question, UIQuestion} from "@/app/types/types";
import {getQuizQestions} from "@/app/data/getQuizData";
import QuizCard from "@/app/components /QuizCard";

type QuizPageProps = {
    dataPromise: Promise<Awaited<ReturnType<typeof getQuizQestions>>>;
}

function mapDBQuestionToQuizQuestion(question: Question): UIQuestion {
    return {
        text: question.text,
        answers: question.answers.map(a => a.text),
        correctAnswer: question.answers.findIndex(a => a.isCorrect),
    };
}
export default function  QuizPage({dataPromise}: QuizPageProps) {
    const router = useRouter();
    const data = use(dataPromise);
    const [current, setCurrent] = useState(0);
    const quizQuestions = data.map(mapDBQuestionToQuizQuestion);
    const isFinished = current >= data.length


    const handleNext = () => {
        setCurrent((c) => c + 1);
    };
    useEffect(() => {
        if (isFinished) {
            router.push("/quiz/result");
        }
    }, [isFinished, router]);

    if(isFinished) {
        return <p>Quiz beendet</p>
    }
    const question = quizQuestions[current];
    return (
        <div className={"flex items-center justify-center bg-cyan-600"}>
                <QuizCard
                    question={question}
                    onNext={handleNext}
                />
        </div>
    );
}
