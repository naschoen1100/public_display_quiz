'use client'
import React, { useState } from "react";

type QuizCardProps = {
    question: string;
    options: string[];
    correctAnswer: string;
    onNext: (isCorrect: boolean) => void;
};

export default function QuizCard({ question, options, correctAnswer, onNext }: QuizCardProps) {
    const [selected, setSelected] = useState<string | null>(null);
    const [answered, setAnswered] = useState(false);

    const handleAnswer = (option: string) => {
        setSelected(option);
        setAnswered(true);
    };

    const handleNext = () => {
        const isCorrect = selected === correctAnswer;
        onNext(isCorrect);
        setSelected(null);
        setAnswered(false);
    };

    return (
        <div className="flex items-center justify-center bg-cyan-600">
            <div className = "card bg-cyan-600" >
                <div className="card-body">
                    <h2 className="card-title">{question}</h2>
                    <ul className={"list"}>
                       {options.map((option) =>
                           <button className={`btn w-full text-lg m-2 ${
                               selected === option ? "btn-info" : "btn"}`}
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

);
}
