import { Question, UIQuestion } from "@/app/types/types";

export function mapDBQuestionToQuizQuestion(question: Question): UIQuestion {
    return {
        id: question.id,
        text: question.text,
        answers: question.answers.map(a => a.text),
        correctAnswer: question.answers.findIndex(a => a.isCorrect),
    };
}