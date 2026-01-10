'use client'

import {UIQuestion} from "@/app/types/types";
import Feedback from "@/app/components /Feedback";
import LeaderBoard from "@/app/components /LeaderBoard";

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
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-600 to-slate-800 p-4">
            <div className="card w-[550px] min-h-[550px]  bg-cyan-700  shadow-xl rounded-2xl">
                <div className="card-body flex flex-col gap-4">
                    <div className="flex-1 flex flex-col gap-4">
                    {/* Feedback Header */}
                    <div
                        className={`text-center font-bold text-lg py-2 rounded-lg
                            ${isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
                              `}
                    >
                        {isCorrect ? "right Answer" : "wrong Answer"}
                    </div>

                    {/* Answers (kompakt) */}
                    <div className= "flex space-x-2">
                        <div className= "flex flex-col">
                        {/* Question */}
                        <div className="text-sm font-semibold text-slate-300 justify-center text-center p-5">
                            {question.text}
                        </div>
                        <div className="flex-10 space-y-2">
                            {question.answers.map((answer, index) => {
                                const isCorrectAnswer = index === question.correctAnswer;
                                const isSelected = index === selectedIndex;

                                return (
                                    <div
                                        key={index}
                                        className={`px-3 py-2 rounded-md text-sm border
                                            ${isCorrectAnswer ? "border-green-400 bg-green-600 font-bold" : ""}
                                            ${isSelected && !isCorrectAnswer ? "border-red-400 bg-red-500 font-bold" : ""}
                                            ${!isCorrectAnswer && !isSelected ? "border-slate-200 bg-slate-600 font-bold" : ""}
                                          `}
                                    >
                                        {answer}
                                    </div>
                                );
                            })}
                            {/* Feedback Text */}

                        </div>
                        </div>
                        <div className="w-20 flex items-center justify-center mt-30">
                          <LeaderBoard/>
                        </div>
                    </div>
                </div>
                    {/* Footer */}
                    <div className="flex flex-col pt-2 p-4 ">
                        <div className="text-sm text-slate-300 justify-center text-center p-4" >
                            <Feedback questionId={question.id}/>
                        </div>
                        <button className="btn w-full" onClick={() => handleNext() }>
                            Next question
                        </button>
                </div>
            </div>
        </div>
        </div>

    );

}