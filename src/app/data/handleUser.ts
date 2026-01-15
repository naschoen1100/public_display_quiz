"use server";

import prisma from "../../../prisma/prisma";

export async function createUserWithScore(quizId: number) {
    return prisma.user.create({
        data: {
            quizId: quizId,
            score: {
                create: {
                    points: 0
                }
            }
        }
    })
}

export async function setUserQuizFinished() {
    const user = await getLatestUser()
    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            completedAt: new Date()
        }
    })
    console.log("User finished successfully and timestamp added")
}

export async function updateUserQuizId (userId: number, quizId: number) {
    await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            quizId: quizId,
        }
    })
}

export async function getLatestUser() {
    const data = await prisma.user.findFirst({
        select: {
            id: true,
            quizId: true,
            score: true,
        },
        orderBy: {
            id: 'desc',
        }
    })
    if (!data) {
        throw new Error("User not found");
    }
    return data;
}

export async function updateUserScore(){
    const user = await getLatestUser()
    await prisma.score.update({
        where: {
            userId: user.id
        },
        data: {
            points: {increment: 1}
        }
    })
    console.log("updated score..." + JSON.stringify(user))
}

export async function deleteUser() {
    const user = await getLatestUser()
    await prisma.user.delete({
        where: {
            id: user.id
        }
    })
    console.log("user deleted")
}

export async function setUserAnswer(questionId: number, isCorrect: boolean) {
    const user = await getLatestUser()
    await prisma.userAnswer.create({
        data: {
            userId: user.id,
            questionId: questionId,
            isCorrect: isCorrect
        }
    })
}