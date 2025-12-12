'use client'
import {use} from "react";
import {useRouter} from "next/navigation";
import {getLatestUser} from "@/app/data/handleUser";

type ResultPageProps = {
    dataPromise: Promise<Awaited<ReturnType<typeof getLatestUser>>>;
}
export default function ResultPage({dataPromise}: ResultPageProps) {
    const data = use(dataPromise);
    const router = useRouter();
    const score = data.score.points
    return (
        <div className={"flex flex-col items-center justify-center bg-cyan-600"}>
            <h1>Quiz beendet!</h1>
            <p>Dein Score: {score} / 5 </p>
            <button className={"btn"} onClick={() => {
                router.push(`/`)
            }}>
                Start again
            </button>
        </div>
    );
}