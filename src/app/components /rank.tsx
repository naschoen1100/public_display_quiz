'use client'

import {useEffect, useState, useTransition} from "react";
import {getDataForRecentQuestions} from "@/app/data/handleAnswerStatistics";

type QuizStats = {
    totalPlayers: number;
    betterPlayers: number;
}

export default function Rank () {
    const [stats, setStats] = useState<QuizStats | null > (null);
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
        <div className= "flex flex-col items-center justify-center">
            <p className="text font-semibold">You've finished on place  {stats?.betterPlayers + 1} of{" "} {stats?.totalPlayers} players </p>
        </div>
    )
}