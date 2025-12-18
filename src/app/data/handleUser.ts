"use server";

import prisma from "../../../prisma/prisma";

export async function createUserWithScore(quizId: number) {
    await prisma.user.create({
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
            score: true,
        },
        orderBy: {
            id: 'desc',
        }
    })
    return data;
}

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

export async function updateUserScore(){
    const user = await getLatestUser()
    if (!user) {
        throw new Error("User not found");
    }
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