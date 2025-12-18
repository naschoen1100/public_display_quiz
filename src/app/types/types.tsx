export type Quiz = {
    id: number
    title: string
    questions: Question[]
}

export type Question = {
    text: string
    answers: Answer[]
}

export type Answer = {
    text: string
    isCorrect: boolean
}

export type ImportQuizFromJSON = {
    id: number;
    title: string;
    questions: ImportQuestion[];
};

export type ImportQuestion = {
    text: string;
    answers: string[];
    correctAnswer: number; // Index
};

export type UIQuestion = {
    text: string;
    answers: string[];
    correctAnswer: number;
};