import { NextApiRequest, NextApiResponse } from "next";
import path from "node:path";
import * as fs from "node:fs";
//import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // try {
    //     const quizzes = await prisma.quiz.findMany({
    //         include: { questions: true, scores: true }
    //     });
    //     res.status(200).json(quizzes);
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: "Failed to fetch quizzes" });
    // }
    const filePath = path.join(__dirname, '../../../lib/quiz.json');
    try {
        const jsonString = fs.readFileSync(filePath, 'utf8');
        console.log(jsonString);
        res.status(200).json(jsonString);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch quizzes" });
    }
}