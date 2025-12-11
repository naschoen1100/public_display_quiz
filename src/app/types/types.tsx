export type QuizEntriesWithoutQuestions = {
    id: number;
    title: string;
};

export type QuizQuestion = {
    text: string
    answers: string[]
    correctAnswer: number
}

export type Quiz = {
    id: number
    title: string
    questions: QuizQuestion[]
}