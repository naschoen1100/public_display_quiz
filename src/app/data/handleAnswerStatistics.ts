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

export async function getDataForRecentQuestions() {
    const user = await getLatestUser();
    //answeredCount = anzahl der bisher beantworteten Fragen des aktuellen Users
    const answeredCount = await prisma.userAnswer.count({
        where: {
            userId: user.id,
        },
    });
    // Score des aktuellen Users um den vergleichen zu können
    const myPoints = await prisma.userAnswer.count({
        where: {
            userId: user.id,
            isCorrect: true,
        },
    });
    // Anzahl an Player, die das aktuelle Quiz zu ende gespielt haben
    const totalPlayers = await prisma.user.count({
        where: {
            quizId: user.quizId,
            completedAt: { not: null },
        },
    });
    // alle user die das aktuelle Quiz gespielt haben mit ihren richtigen Antworten
    const users = await prisma.user.findMany({
        where: {
            quizId: user.quizId,
        },
        select: {
            id: true,
            answers: {
                orderBy: { createdAt: "asc" },
                take: answeredCount,
                where: { isCorrect: true },
            },
        },
    });
    //vergleich und filter der eigenen Punkte mit der Anzahl an richtigen Antworten pro user, der das aktuelle Quiz gespielt hat
    const betterPlayers = users.filter(
        (u) => u.answers.length > myPoints
    ).length;
    //rank = betterPlayers + 1, weil count bei 0 anfängt
    const rank = totalPlayers - (betterPlayers);
    console.log("rank", rank);
    console.log("totalPlayers", totalPlayers);
    return {totalPlayers, rank};
}