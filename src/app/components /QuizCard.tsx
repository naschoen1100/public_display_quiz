'use client'
import React, { useState } from "react";
import {UIQuestion} from "@/app/types/types";
import {updateUserScore} from "@/app/data/handleUser";

export type QuizCardProps = {
    question: UIQuestion;
    onNext: (isCorrect: boolean) => void;
};

export default function QuizCard({question, onNext}: QuizCardProps) {
    const [selected, setSelected] = useState<number | null>(null);
    const [answered, setAnswered] = useState(false);

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

    return (
        <div className="flex items-center justify-center bg-cyan-600">
            <div className = "card w-150" >
                <div className="card-body">
                    <div className={"flex flex-col items-center justify-center"}>
                    <h2 className="card-title ">{question.text}</h2>
                    <ul className={"list"}>
                       {question.answers.map((option) =>
                           <button className={`btn w-full text-lg m-2 ${
                               selected === question.answers.indexOf(option)? "btn-info" : "btn"}`}
                               key={option}
                               onClick={() => {
                                   handleAnswer(option)}}
                           >
                               {option}
                           </button>)
                       }
                       <button
                           className={"btn w-full text-lg m-2 "}
                           onClick={() => handleNext()}
                           disabled={!answered}>
                                Next
                       </button>
                   </ul>
                    </div>
                </div>
            </div>
        </div>

);
}
