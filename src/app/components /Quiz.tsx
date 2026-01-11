'use client'
import {use, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {getQuizQestions} from "@/app/data/getQuizData";
import QuizCard from "@/app/components /QuizCard";
import {setUserAnswer, setUserQuizFinished} from "@/app/data/handleUser";
import QuizFeedback from "@/app/components /QuizFeedback";
import {useInactivityTimeout} from "@/app/util/useInactivityTimeout";
import {mapDBQuestionToQuizQuestion} from "@/app/util/mapDBQuestionToQuiz";

type QuizPageProps = {
    dataPromise: Promise<Awaited<ReturnType<typeof getQuizQestions>>>;
}

export default function  QuizPage({dataPromise}: QuizPageProps) {
    useInactivityTimeout(60000*3);
    const router = useRouter();
    const data = use(dataPromise);
    const [current, setCurrent] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const quizQuestions = data.map(mapDBQuestionToQuizQuestion);
    const isFinished = current >= data.length

    const handleNextAnswer = (isCorrect: boolean, selectedIndex: number) => {
        setAnswered(true);
        setSelectedIndex(selectedIndex);
        setUserAnswer(question.id, isCorrect);
    };

    const handleNextQuestion = ()=> {
        setCurrent((c) => c + 1);
        setAnswered(false)
    }

    useEffect(() => {
        if (isFinished) {
            router.push("/quiz/result");
        }
    }, [isFinished, router]);

    if(isFinished) {
        setUserQuizFinished()
        return <p>Quiz beendet</p>
    }
    const question = quizQuestions[current];
    if (!answered){
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-600 to-slate-800 p-4">
                <div className="w-full max-w-[90vmin] aspect-[4/3]">
                <QuizCard
                    question={question}
                    questionCount={current + 1}
                    onNext={handleNextAnswer}
                />
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-600 to-slate-800 p-4">
               <div className="w-full max-w-[90vmin] aspect-[4/3]">
                   <QuizFeedback question={question} selectedIndex={selectedIndex} onNext={handleNextQuestion}/>
               </div>
            </div>
        )
    }

}
