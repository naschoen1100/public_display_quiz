'use client'
import {use, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Question, UIQuestion} from "@/app/types/types";
import {getQuizQestions} from "@/app/data/getQuizData";
import QuizCard from "@/app/components /QuizCard";
import {setUserAnswer, setUserQuizFinished} from "@/app/data/handleUser";
import QuizFeedback from "@/app/components /QuizFeedback";

type QuizPageProps = {
    dataPromise: Promise<Awaited<ReturnType<typeof getQuizQestions>>>;
}

function mapDBQuestionToQuizQuestion(question: Question): UIQuestion {
    return {
        id: question.id,
        text: question.text,
        answers: question.answers.map(a => a.text),
        correctAnswer: question.answers.findIndex(a => a.isCorrect),
    };
}
export default function  QuizPage({dataPromise}: QuizPageProps) {
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
            <>
                <QuizCard
                    question={question}
                    questionCount={current + 1}
                    onNext={handleNextAnswer}
                />
            </>
        );
    }
    else {
        return (
            <>
                <QuizFeedback question={question} selectedIndex={selectedIndex} onNext={handleNextQuestion}/>
            </>
        )
    }

}
