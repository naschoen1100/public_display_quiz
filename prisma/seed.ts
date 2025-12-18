// import {Quiz} from "../src/app/types/types.jsx";
// import {PrismaClient} from "../src/app/generated/prisma/client";
// import {PrismaPg} from "@prisma/adapter-pg";
// import * as fs from "node:fs";
// import path from "node:path";
//
// async function main(){
//     const adapter = new PrismaPg ({
//         connectionString: process.env.DATABASE_URL,
//     })
//     const quizzes = JSON.parse(
//         fs.readFileSync(path.join(__dirname, "quiz.json"), "utf-8")
//     ) as Quiz[];
//     const prisma = new PrismaClient({adapter})
//     console.log(quizzes);
//     for (const quiz of quizzes){
//         await prisma.quiz.create({
//             data: {
//                 id: quiz.id,
//                 title: quiz.title,
//                 questions:{
//                     create: quiz.questions.map((question)=>({
//                         text: question.text,
//                         answers: {
//                             create: question.answers.map((answer, index) => ({
//                                 text: answer.text,
//                                 isCorrect: index === question.correctAnswer
//                             }))
//                         }
//                     }))
//                 }
//             }
//         })
//     console.log("quiz number: "+ quizzes.indexOf(quiz));
//     }
// }
