import {useEffect, useState, useTransition} from "react";
import {getUserScore, getUserScoreNumber} from "@/app/data/handleAnswerStatistics";

type UserScore = Awaited<ReturnType<typeof getUserScore>>;

export default function Score () {
    const [stats, setStats] = useState<UserScore | null > (null);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(() => {
            console.log("in transition")
            getUserScore().then(setStats);
        })
    }, []);

    if(stats == null || stats.score==null || isPending) {
        return <p>Loading data</p>
    }

    return (
        <div className= "flex flex-col items-center justify-center">
            <p>   🏆 {stats.score.points} / 3 </p>
        </div>
    )
}