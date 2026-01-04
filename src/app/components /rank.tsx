'use client'

import {useEffect, useState, useTransition} from "react";
import {getDataForRecentQuestions} from "@/app/data/handleAnswerStatistics";

type QuizStats = {
    totalPlayers: number;
    rank: number;
}

export default function Rank () {
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
        <div className= "flex flex-col items-center justify-center">
            <p className="text 4xl md:text-2xl lg:text-2xl font-semibold">Ranking: {stats?.rank}</p>
        </div>
    )
}