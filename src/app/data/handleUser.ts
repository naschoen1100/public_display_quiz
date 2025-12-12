import prisma from "../../../lib/prisma";

export async function createUserWithScore(quizId: number) {
    await prisma.user.create({
        data: {
            quizId: quizId,
            score: {
                create: {}
            }
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
    console.log("get latestet User data: " + data);
    return data || undefined;
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

export async function getUserScore () {
    const userid = getLatestUser()
    const data = await prisma.user.findFirst({
        where: {
            id: userid,
        },
        include: {
            score: true,
        }
    })
}