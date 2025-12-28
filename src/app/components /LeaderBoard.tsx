'use client'

import {useEffect, useState, useTransition} from "react";
import {getDataForRecentQuestions} from "@/app/data/handleAnswerStatistics";

type QuizStats = {
    totalPlayers: number;
    rank: number;
}

export default function LeaderBoard () {
    const [stats, setStats] = useState<QuizStats> ();
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(() => {
            getDataForRecentQuestions().then(setStats);
        })
    }, []);

    if(!stats && !isPending) {
        return <p>Loading data</p>
    }

    return (
        <div className="flex items-center justify-center bg-cyan-700">
            <progress
                className="progress w-60 h-3 rotate-270"
                value={stats?.rank}
                max={stats?.totalPlayers}
            />
        </div>
    )
}