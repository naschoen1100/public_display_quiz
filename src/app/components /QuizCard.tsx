'use client'
import React, {useState} from "react";
import {UIQuestion} from "@/app/types/types";
import {updateUserScore} from "@/app/data/handleUser";
import {useRouter} from "next/navigation";

export type QuizCardProps = {
    question: UIQuestion;
    onNext: (isCorrect: boolean) => void;
};

export default function QuizCard({question, onNext}: QuizCardProps) {
    const [selected, setSelected] = useState<number | null>(null);
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
        onNext(isCorrect)
        setSelected(null);
        setAnswered(false);
    };

    const handleStartNew = async () => {
        //todo delete db entry for this user
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-8500 p-4">
            <div className = "card w-[550px] h-[520px] bg-base-100 shadow-2xl rounded-2xl" >
                <div className="card-body space-y-6">
                    <div className={"flex flex-col items-center justify-center"}>
                        <h2 className="card-title ">{question.text}</h2>
                    <div className="grid overflow-y-scroll grid-rows-4 gap-4 mt-8">
                       {question.answers.map((option) =>
                           <button className={`btn w-[500px] h-14 text-lg justify-start${
                               selected === question.answers.indexOf(option)? " btn-info " : " btn"}`}
                               key={option}
                               onClick={() => {
                                   handleAnswer(option)}}
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
                                className="progress progress-primary w-full"
                                value={40}
                                max={100}
                            />
                            <p className="text-sm text-center opacity-70">Frage 2 von 5</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>

);
}
