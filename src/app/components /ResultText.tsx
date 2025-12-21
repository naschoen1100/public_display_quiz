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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-8500 p-4">
                <div className = "card w-[550px] h-[520px] bg-base-100 shadow-2xl rounded-2xl" >
                    <div className="card-body space-y-6">
                        <div className={"flex flex-col items-center justify-center"}>
                            <h1  className="text 4xl md:text-4xl lg:text-5xl font-extrabold text-center uppercase p-4 m-6 text-cyan-700" >
                            Quiz beendet!
                        </h1>
                            <p className={"text 4xl md:text-2xl lg:text-2xl font-semibold"}>
                                Dein Score: {points} / 5
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