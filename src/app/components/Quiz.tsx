'use client';
import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getQuizQestions } from '@/app/data/getQuizData';
import QuizCard from '@/app/components/QuizCard';
import { deleteUser, setUserAnswer, setUserQuizFinished } from '@/app/data/handleUser';
import QuizFeedback from '@/app/components/QuizFeedback';
import { useInactivityTimeout } from '@/app/util/useInactivityTimeout';
import { mapDBQuestionToQuizQuestion } from '@/app/util/mapDBQuestionToQuiz';

type QuizPageProps = {
  dataPromise: Promise<Awaited<ReturnType<typeof getQuizQestions>>>;
};

export default function QuizPage({ dataPromise }: QuizPageProps) {
  useInactivityTimeout(60000 * 3);
  const router = useRouter();
  const data = use(dataPromise);
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const quizQuestions = data.map(mapDBQuestionToQuizQuestion);
  const isFinished = current >= data.length;
  const hasQuestions = data.length > 0;

  const question = quizQuestions[current];

  const handleNextAnswer = (isCorrect: boolean, selectedIndex: number) => {
    setAnswered(true);
    setSelectedIndex(selectedIndex);
    setUserAnswer(question.id, isCorrect);
  };

  const handleNextQuestion = () => {
    setCurrent((c) => c + 1);
    setAnswered(false);
  };

  const handleStartNew = async () => {
    deleteUser();
    setAnswered(false);
  };

  useEffect(() => {
    if (isFinished) {
      console.log('data and is finished: ' + data);
      setUserQuizFinished();
      router.push('/quiz/result');
    }
  }, [isFinished, router]);

  if (!hasQuestions) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Keine Fragen gefunden (quizId falsch oder DB leer).</p>
        <button
          className="btn flex-1 py-[clamp(0.5rem,2vmin,3rem)] text-[clamp(0.9rem,2.2vmin,3rem)] bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl shadow-lg transition-all"
          onClick={() => {
            handleStartNew();
            router.push(`/`);
          }}
        >
          Start new
        </button>
      </div>
    );
  }

  if (isFinished) {
    return <p>Quiz beendet</p>;
  }

  if (!answered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-600 to-slate-800 p-4">
        <div className="w-full max-w-[90vmin] aspect-[4/3]">
          <QuizCard question={question} questionCount={current + 1} onNext={handleNextAnswer} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-600 to-slate-800 p-4">
        <div className="w-full max-w-[90vmin] aspect-[4/3]">
          <QuizFeedback
            question={question}
            selectedIndex={selectedIndex}
            onNext={handleNextQuestion}
          />
        </div>
      </div>
    );
  }
}
