'use client'
import {use} from "react";
import {useRouter} from "next/navigation";
import {getUserScore} from "@/app/data/handleAnswerStatistics";
import {useInactivityTimeout} from "@/app/util/useInactivityTimeout";

type ResultPageProps = {
    dataPromise: Promise<Awaited<ReturnType<typeof getUserScore>>>;
}
export default function ResultPage({dataPromise}: ResultPageProps) {
    useInactivityTimeout(60000*3);
    const data = use(dataPromise);
    const router = useRouter();
    const points = data?.score?.points ?? 0;
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-600 to-slate-800 p-4">
            <div className="card w-full max-w-[70vmin] aspect-[4/3] bg-gradient-to-br from-cyan-700 to-cyan-900 shadow-2xl rounded-2xl p-[clamp(1rem,1.5vmin,2rem)] flex flex-col justify-center items-center gap-[clamp(1rem,2vmin,2rem)]">

                {/* Header */}
                <h1 className="text-[clamp(2rem,4vmin,6rem)] font-extrabold text-center uppercase">
                    Quiz Finished!
                </h1>

                {/* Score */}
                <p className="text-[clamp(1.5rem,3vmin,4rem)] font-semibold text-center text-white">
                    Your score: {points} / 3
                </p>

                {/* Button */}
                <button
                    className="btn py-[clamp(0.6rem,1.5vmin,2.5rem)] text-[clamp(1rem,1.8vmin,4rem)] bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl shadow-lg transition-all mt-[clamp(0.5rem,1vmin,2rem)]"
                    onClick={() => router.push(`/`)}
                >
                    Start Again
                </button>
            </div>
        </div>
    );

}