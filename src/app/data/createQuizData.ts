import prisma from "../../../prisma/prisma";
import quizzes from "./quiz.json"
import {ImportQuizFromJSON} from "@/app/types/types";
export async function importQuizzes() {
    const importQuizzes = quizzes as ImportQuizFromJSON[];
    for (const quiz of importQuizzes) {
        const exists = await prisma.quiz.findUnique({
            where: {
                id: quiz.id
            }
        })
        if (!exists) {
            await prisma.quiz.create({
                data: mapImportQuizToPrisma(quiz)
            });
            console.log("quiz created successfully.");
        }
    }
}

export function mapImportQuizToPrisma(quiz: ImportQuizFromJSON) {
    return {
        title: quiz.title,
        questions: {
            create: quiz.questions.map((question) => ({
                text: question.text,
                answers: {
                    create: question.answers.map((answerText, index) => ({
                        text: answerText,
                        isCorrect: index === question.correctAnswer,
                    })),
                },
            })),
        },
    };
}

export async function clearQuizzes(){
    const importQuizzes = quizzes as ImportQuizFromJSON[];
    for (const quiz of importQuizzes) {
        const exists = await prisma.quiz.findUnique({
            where: {
                id: quiz.id
            }
        })
        if (exists) {
            await prisma.quiz.delete({
                where: {
                    id: quiz.id
                }
            });
            console.log("quiz " + quiz.title + "created successfully.");
        }
    }
}