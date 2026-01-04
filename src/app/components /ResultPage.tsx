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
                <div className = "card w-[550px] h-[520px] bg-cyan-700 shadow-2xl rounded-2xl" >
                    <div className="card-body space-y-6">
                        <div className="flex flex-col items-center justify-center p-6">
                            <h1  className="text 4xl md:text-4xl lg:text-5xl font-extrabold text-center uppercase p-4 m-6" >
                            Quiz finished!
                        </h1>
                            <p className={"text 4xl md:text-2xl lg:text-2xl font-semibold"}>
                                Your score: {points} / 5
                            </p>
                        </div>

                    </div>
                    <button className={"btn btn-lg m-10"} onClick={() => {
                    router.push(`/`)
                }}>
                    Start again
                </button>
            </div>
        </div>
    );
}