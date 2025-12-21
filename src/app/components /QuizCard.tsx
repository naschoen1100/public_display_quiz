'use client'
import React, {useState} from "react";
import {UIQuestion} from "@/app/types/types";
import {deleteUser, updateUserScore} from "@/app/data/handleUser";
import {useRouter} from "next/navigation";

export type QuizCardProps = {
    question: UIQuestion;
    questionCount: number;
    onNext: (isCorrect: boolean, selected: number) => void;
};

export default function QuizCard({question, questionCount, onNext}: QuizCardProps) {
    const [selected, setSelected] = useState<number>(0);
    const [answered, setAnswered] = useState(false);
    const router = useRouter();

    const handleAnswer = (option: string) => {
        setSelected( question.answers.indexOf(option));
        setAnswered(true);
    };

    const handleNext = async () => {
        const isCorrect = selected === question.correctAnswer;
        if (isCorrect){
            await updateUserScore()
        }
        onNext(isCorrect, selected);
        setAnswered(false);
    };

    const handleStartNew = async () => {
        deleteUser()
        setAnswered(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-8500 p-4">
            <div className = "card w-[550px] h-[520px] bg-cyan-700 shadow-2xl rounded-2xl" >
                <div className="card-body  space-y-6">
                    <div className={"flex flex-col items-center justify-center"}>
                        <h2 className="card-title ">{question.text}</h2>
                    <div className="grid overflow-y-scroll grid-rows-4 gap-4 mt-8">
                       {question.answers.map((option) =>
                           <button className={`btn w-[500px] h-14 text-lg justify-start${
                               answered && selected === question.answers.indexOf(option)? " btn-info " : " btn"}`}
                               key={option}
                               onClick={() => {
                                   handleAnswer(option)
                               }}
                           >
                               {option}
                           </button>)
                       }
                    </div>

                        <div className=" space-y-4 m-6">
                            <div className="flex justify-center items-center pt-4">
                                <button
                                    className={"btn w-full text-lg m-2 "}
                                    onClick={() => {
                                        handleStartNew()
                                        router.push(`/`)
                                    }}>
                                    Start new
                                </button>
                                <button
                                className={"btn w-full text-lg m-2 "}
                                onClick={() => handleNext()}
                                disabled={!answered}>
                                Next
                            </button>

                            </div>
                            <progress
                                className="progress w-full"
                                value={100*(questionCount/5)}
                                max={100}
                            />
                            <p className="text-sm text-center opacity-70"> Frage {questionCount} von 5</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>

);
}
