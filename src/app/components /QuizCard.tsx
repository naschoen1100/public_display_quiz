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
        setSelected(question.answers.indexOf(option));
        setAnswered(true);
    };

    const handleNext = async () => {
        const isCorrect = selected === question.correctAnswer;
        if (isCorrect) {
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
        <div
            className="card w-full max-w-[80vmin] aspect-[4/3] bg-gradient-to-br from-cyan-700 to-cyan-900 shadow-2xl rounded-3xl p-[clamp(1rem,2vmin,3rem)] flex flex-col justify-between"
        >
            {/* Header */}
            <h2 className="card-title text-center text-[clamp(1.5rem,3vmin,4rem)] font-bold text-white justify-center">
                {question.text}
            </h2>

            {/* Antworten */}
            <div
                className="flex-1 flex flex-col justify-center gap-[clamp(1rem,3vmin,5rem)] mt-[clamp(1rem,3vmin,5rem)] overflow-y-auto">
                {question.answers.map((option, index) => (
                    <button
                        key={index}
                        className={`px-[clamp(0.5rem,1vmin,1.5rem)] py-[clamp(0.8rem,2vmin,3rem)] rounded-xl text-[clamp(1rem,2.2vmin,3rem)] font-bold border transition-all duration-200 transform hover:scale-105
            ${
                            answered && selected === index
                                ? "bg-cyan-500 text-white border-cyan-700"
                                : "bg-gray-800 text-white border-gray-300 hover:bg-gray-100"
                        }`}
                        onClick={() => handleAnswer(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-[clamp(0.5rem,1.5vmin,2rem)] mt-[clamp(1rem,2vmin,2rem)]">
                <div className="flex gap-[clamp(0.5rem,1.5vmin,2rem)]">
                    <button
                        className="btn flex-1 py-[clamp(0.5rem,2vmin,4rem)] text-[clamp(0.9rem,2.2vmin,3rem)] bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl shadow-lg transition-all"
                        onClick={() => {
                            handleStartNew();
                            router.push(`/`);
                        }}
                    >
                        Start new
                    </button>
                    <button
                        className="btn flex-1 py-[clamp(0.5rem,2vmin,4rem)] text-[clamp(0.9rem,2.2vmin,3rem)] bg-gradient-to-r from-green-500 to-teal-500 hover:from-teal-500 hover:to-green-500 text-white rounded-xl shadow-lg transition-all"
                        onClick={handleNext}
                        disabled={!answered}
                    >
                        Next
                    </button>
                </div>

                {/* Progress */}
                <progress
                    className="progress h-[clamp(0.5rem,1.5vmin,1.5rem)] rounded-full overflow-hidden"
                    value={(100 * questionCount) / 5}
                    max={100}
                />

                <p className="text-[clamp(0.9rem,2vmin,3rem)] text-center text-white opacity-80">
                    Question {questionCount} of 5
                </p>
            </div>
        </div>
    );
}