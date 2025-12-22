'use server'
import prisma from "../../../prisma/prisma";
import {getLatestUser} from "@/app/data/handleUser";

export async function getUserScore () {
    const user = await getLatestUser()
    const data = await prisma.user.findFirst({
        where: {
            id: user.id
        },
        include: {
            score: true,
        }
    })
    return data
}

export async function getDataPerQuestion (questionId: number) {
    const user = await getLatestUser();
    const answerCount = await prisma.userAnswer.count({
        where: {
            questionId: questionId,
            user: {
                completedAt: {not: null},
            }
        }
    })
    const correctCount = await prisma.userAnswer.count({
        where: {
            questionId: questionId,
            isCorrect: true,
            user: {
                completedAt: { not: null },
            },
        }
    })
    console.log("correctCount", correctCount)
    console.log("answerCount", answerCount)
    console.log("percentage", correctCount/answerCount)
    return correctCount/answerCount
}