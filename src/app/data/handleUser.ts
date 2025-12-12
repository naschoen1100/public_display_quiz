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
    console.log("get latest User data: " + data);
    return data;
}

// export async function getUserScore () {
//     const userid = await getLatestUser()
//     if (!userid) {
//         throw new Error("User not found")
//     }
//     const data = await prisma.user.findFirst({
//         where: {
//             id: userid.id
//         },
//         include: {
//             score: true,
//         }
//     })
//     return data
// }