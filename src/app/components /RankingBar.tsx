'use client'
import {useEffect, useState, useTransition} from "react";
import {getDataForRecentQuestions} from "@/app/data/handleAnswerStatistics";

type QuizStats = {
    totalPlayers: number;
    rank: number;
}

export function RankingBar() {
    const [stats, setStats] = useState<QuizStats | null> (null);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(() => {
            getDataForRecentQuestions().then(setStats);
        })
    }, []);

    if(stats == null || isPending) {
        return <p>Loading data</p>
    }

    return (
        <div className="flex flex-col items-center between h-full px-6 text-center">

            {/* Top Percentage */}
            <div className="mb-6">
                <div className="text-[clamp(1rem,2.5vmin,4rem)] font-extrabold text-green-600">
                    Top {
                    stats
                             ? Math.round(((stats.totalPlayers - stats.rank) / stats.totalPlayers) * 100)
                             : 0} %
                </div>
            </div>

            {/* Vertical Bar */}
            <div className="relative flex-1 w-6 bg-gray-200 rounded-full overflow-hidden mb-6">
                {/* Filled Part */}
                <div
                    className="absolute bottom-0 w-full bg-green-500 transition-all duration-700"
                    style={{ height: `${ stats
                            ? Math.round(((stats.totalPlayers - stats.rank) / stats.totalPlayers) * 100)
                            : 0}%` }}
                />
                {/* Marker */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 w-10 h-1 bg-black"
                    style={{ bottom: `${stats
                            ? Math.round(((stats.totalPlayers - stats.rank) / stats.totalPlayers) * 100)
                            : 0}%` }}
                />
            </div>

            {/* Rank Info */}
            <p className="text-base text-white text-[clamp(1rem,2vmin,4rem)]">
                Platz <span className="font-bold">{stats?.rank}</span> von{" "}
                <span className="font-semibold">{stats?.totalPlayers}</span>
            </p>
        </div>
    )
}
