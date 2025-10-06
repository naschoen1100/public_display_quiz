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
        <div
            style={{
        width: 400,
            margin: "auto",
            padding: 24,
            borderRadius: 16,
            backgroundColor: "#f7f7f7",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    }}
>
    <h2 style={{ marginBottom: 16 }}>{question}</h2>

    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    {options.map((option) => (
        <button
            key={option}
        onClick={() => handleAnswer(option)}
        disabled={answered}
        style={{
        padding: "12px 16px",
            borderRadius: 8,
            border: selected === option ? "2px solid #0070f3" : "1px solid #ccc",
            backgroundColor:
        answered && option === correctAnswer
            ? "#b7f7b7"
            : answered && option === selected
                ? "#f7b7b7"
                : "#fff",
            cursor: answered ? "default" : "pointer",
    }}
    >
        {option}
        </button>
    ))}
    </div>

    {answered && (
        <button
            onClick={handleNext}
        style={{
        marginTop: 16,
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
    }}
    >
        Weiter
        </button>
    )}
    </div>
);
}
