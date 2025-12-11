//import prisma from "../../../lib/prisma";
import path from "node:path";
import fs from "node:fs";
import quiz from "@/app/api/quiz.json";

export default async function getData() {
    console.log(quiz)
    return quiz;
}