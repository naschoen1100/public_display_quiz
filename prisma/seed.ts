import prisma from "../lib/prisma";
import quizData from "./quiz.json";
import {Quiz} from "@/app/types/types";

async function main(){
    const quizzes = quizData as Quiz[];
    for (const quiz of quizzes){
        await prisma.quiz.create({
            data: {
                id: quiz.id,
                title: quiz.title,
                questions:{
                    create: quiz.questions.map((question)=>({
                        text: question.text,
                        answers: {
                            create: question.answers.map((answer, index) => ({
                                text: answer,
                                isCorrect: index === question.correctAnswer
                            }))
                        }
                    }))
                }
            }
        })
    }
}