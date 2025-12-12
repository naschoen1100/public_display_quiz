import prisma from "../../../lib/prisma";

export async function getFullQuizData() {
    const data = await prisma.quiz.findMany({
        include: {
            questions: true
        }
        }
    );
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

export async function getQuizQestions (userId: number) {
    const quizIdObject = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            quizId: true,
        }
    })
    if (!quizIdObject) {
        throw new Error(`User with id ${userId} not found`);
    }

    const data = await prisma.quiz.findMany({
        where: {
            id: quizIdObject.quizId
        }
    })

    console.log("Quiz Qestions: " + data);
    return data;
}
