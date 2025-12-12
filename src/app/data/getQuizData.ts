import prisma from "../../../lib/prisma";

export async function getFullQuizData() {
    const data = prisma.quiz.findMany();
    console.log("full quiz data: " + data);
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
    console.log("Quiz Names: " + data);
    return data;
}

export function getQuizQestions (userId: number) {
    const quizId = prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            quizId: true,
        }
    })

    const data = prisma.quiz.findMany({
        where: {
            id: quizId
        }
    })

    console.log("Quiz Qestions: " + data);
    return data;
}
