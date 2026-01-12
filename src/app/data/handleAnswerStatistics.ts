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
// called in Feedback: gets data only for the current question
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
    // console.log("correctCount", correctCount)
    // console.log("answerCount", answerCount)
    // console.log("percentage", correctCount/answerCount)
    return correctCount/answerCount
}
//called in RankingBar: gets cumulated data for all answered questions
export async function getDataForRecentQuestions() {
    const user = await getLatestUser();
    //answeredCount = Anzahl der bisher beantworteten Fragen des aktuellen Users
    const answeredCount = await prisma.userAnswer.count({
        where: {
            userId: user.id,
        },
    });
    // Score des aktuellen Users, um den vergleichen zu können
    const myPoints = await prisma.userAnswer.count({
        where: {
            userId: user.id,
            isCorrect: true,
        },
    });
    // Anzahl an Player, die das aktuelle Quiz zu Ende gespielt haben
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
            completedAt : {not: null},
        },
        select: {
            id: true,
            answers: {
                orderBy: { createdAt: "asc" },
                take: answeredCount,
                where: {
                    isCorrect: true},
            },
        },
    });
    //vergleich und filter der eigenen Punkte mit der Anzahl an richtigen Antworten pro user, der das aktuelle Quiz gespielt hat
    const betterPlayers = users.filter(
        (u) => u.answers.length > myPoints
    ).length;
    console.log("better players" + betterPlayers);
    console.log("totalPlayers: ", totalPlayers);
    return {totalPlayers, betterPlayers};
}