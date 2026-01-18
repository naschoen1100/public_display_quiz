'use client';

import { UIQuestion } from '@/app/types/types';

type FeedbackProps = {
  question: UIQuestion;
  selectedIndex: number;
  onNext: () => void;
};

export default function QuizFeedback({ question, selectedIndex, onNext }: FeedbackProps) {
  const isCorrect = selectedIndex === question.correctAnswer;
  const handleNext = async (): Promise<void> => {
    onNext();
  };
  return (
    <div className="card w-full max-w-[80vmin] aspect-[4/4] bg-gradient-to-br from-cyan-700 to-cyan-900 shadow-2xl rounded-3xl p-[clamp(1rem,2vmin,3rem)] flex flex-col justify-between overflow-hidden">
      {/* Header: Feedback */}
      <div
        className={`text-center font-bold py-[clamp(0.8rem,4vmin,5rem)] text-[clamp(1.5rem,3vmin,4rem)] -mx-[clamp(1rem,2vmin,3rem)] -mt-[clamp(1rem,2vmin,3rem)] mb-[clamp(1rem,2vmin,3rem)]"
                    ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-200 text-red-700'} shadow-md`}
      >
        {isCorrect ? 'Right Answer' : 'Wrong Answer'}
      </div>

      {/* Body: Question + Answers + Feedback + Leaderboard */}
      <div className="flex flex-1 gap-[clamp(1rem,2vmin,2rem)] mt-[clamp(1rem,2vmin,2rem)]">
        {/* Question + Answers */}
        <div className="flex-1 flex flex-col gap-[clamp(0.5rem,1vmin,1.5rem)]">
          {/* Question */}
          <div className="text-center text-[clamp(1.5rem,3vmin,4rem)] font-semibold text-white p-[clamp(0.5rem,1vmin,1rem)]">
            {question.text}
          </div>

          {/* Answers */}
          <div className="flex flex-col gap-[clamp(0.5rem,1vmin,1rem)]">
            {question.answers.map((answer, index) => {
              const isCorrectAnswer = index === question.correctAnswer;
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={index}
                  className={`px-[clamp(0.5rem,1vmin,1rem)] py-[clamp(0.5rem,1vmin,1.5rem)] rounded-xl text-[clamp(1.2rem,2vmin,3rem)] 
                                                  font-bold transition-all duration-200 transform hover:scale-105
                                                  ${isCorrectAnswer ? 'border-green-400 bg-green-600 text-white' : ''}
                                                  ${isSelected && !isCorrectAnswer ? 'border-red-400 bg-red-500 text-white' : ''}
                                                  ${!isCorrectAnswer && !isSelected ? 'border-slate-300 bg-slate-600 text-white' : ''}`}
                >
                  {answer}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-[clamp(0.5rem,1vmin,1.5rem)] mt-[clamp(1rem,2vmin,2rem)]">
        <button
          className="btn w-full py-[clamp(0.5rem,2.5vmin,3rem)] text-[clamp(1rem,2vmin,3rem)] bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl shadow-lg transition-all"
          onClick={handleNext}
        >
          Next Question
        </button>
      </div>
    </div>
  );
}
