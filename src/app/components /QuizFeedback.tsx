'use client'

import {UIQuestion} from "@/app/types/types";
import Feedback from "@/app/components /Feedback";

type FeedbackProps = {
    question: UIQuestion;
    selectedIndex: number;
    onNext: () => void;
};

export default function QuizFeedback({question, selectedIndex, onNext}: FeedbackProps) {
    const isCorrect = selectedIndex === question.correctAnswer;
    const handleNext = async (): Promise<void> => {
        onNext()
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-8500 p-4">
            <div className="card w-[550px] h-[520px] bg-cyan-700  shadow-xl rounded-2xl">
                <div className="card-body h-full flex flex-col gap-4">

                    {/* Feedback Header */}
                    <div
                        className={`text-center font-bold text-lg py-2 rounded-lg
              ${isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
            `}
                    >
                        {isCorrect ? "Richtige Antwort!" : "Falsche Antwort"}
                    </div>

                    {/* Question */}
                    <div className="text-sm font-semibold text-slate-300">
                        {question.text}
                    </div>

                    {/* Answers (kompakt) */}
                    <div className="space-y-2">
                        {question.answers.map((answer, index) => {
                            const isCorrectAnswer = index === question.correctAnswer;
                            const isSelected = index === selectedIndex;

                            return (
                                <div
                                    key={index}
                                    className={`px-3 py-2 rounded-md text-sm border
                    ${isCorrectAnswer ? "border-green-400 bg-green-600" : ""}
                    ${isSelected && !isCorrectAnswer ? "border-red-400 bg-red-500" : ""}
                    ${!isCorrectAnswer && !isSelected ? "border-slate-200 bg-slate-600" : ""}
                  `}
                                >
                                    {answer}
                                </div>
                            );
                        })}
                    </div>

                    {/* Feedback Text */}
                    <div className="flex-1  rounded-lg p-3 text-sm text-slate-300">
                        <Feedback questionId={question.id}/>
                    </div>

                    {/* Footer */}
                    <div className="pt-2">
                        <button className="btn w-full" onClick={() => handleNext() }>
                            Nächste Frage
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}