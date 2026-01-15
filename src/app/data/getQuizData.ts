"use server";
import prisma from "../../../prisma/prisma";
import {getLatestUser} from "@/app/data/handleUser";

export async function getFullQuizData() {
    const data = await prisma.quiz.findMany({
        include: {
            questions: {
                include: {
                    answers: true,
                    }
                }
            }
        }
    );
    console.log("full quiz data: ", data);
    return data;
}

export async function getQuizNames(){
    const data = await prisma.quiz.findMany({
        select: {
            id: true,
            title: true,
            questions: false,
        }
    });
    return data;
}

export async function getQuizQestions () {
    const user = await getLatestUser();
    if (!user) {
        throw new Error("User not found");
    }
    const userId = user.id
    const quizIdObject = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            quizId: true,
        }
    })
    if (!quizIdObject?.quizId) {
        throw new Error(`No quizId set for user ${userId}`);
    }

    const data = await prisma.question.findMany({
        where: {
            quizId: quizIdObject.quizId
        },
        include: {
            answers: true
        }
    })
    return data;
}
