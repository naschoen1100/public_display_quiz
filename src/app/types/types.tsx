export type QuizEntriesWithoutQuestions = {
    id: number;
    title: string;
};

export type Question = {
    text: string
    answers: string[]
    correctAnswer: number
}

export type Quiz = {
    id: number
    title: string
    questions: Question[]
}