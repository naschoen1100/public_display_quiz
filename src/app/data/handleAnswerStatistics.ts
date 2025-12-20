'use server'
import prisma from "../../../prisma/prisma";
import {getLatestUser} from "@/app/data/handleUser";

export async function getUserScore () {
    const userid = await getLatestUser()
    if (!userid) {
        throw new Error("User not found")
    }
    const data = await prisma.user.findFirst({
        where: {
            id: userid.id
        },
        include: {
            score: true,
        }
    })
    return data
}

export async function getDataPerQuestion (questionId: number) {
    const answerCount = await prisma.userAnswer.count({
        where: {
            id: questionId,
            user: {
                completedAt: {not: null},
            }
        }
    })
    const correctCount = await prisma.userAnswer.count({
        where: {
            id: questionId,
            isCorrect: true,
            user: {
                completedAt: { not: null },
            },
        }
    })
    return correctCount/answerCount
}