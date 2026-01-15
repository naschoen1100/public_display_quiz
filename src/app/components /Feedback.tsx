'use client'

import {useEffect, useState, useTransition} from "react";
import {getDataPerQuestion} from "@/app/data/handleAnswerStatistics";

type FeedbackProps = {
    questionId: number;
}

export default function Feedback (props: FeedbackProps) {
    const [stats, setStats] = useState<number | null> (null);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(() => {
            getDataPerQuestion(props.questionId).then(setStats);
        })
    }, [props.questionId]);

    if(stats == null || isPending) {
        return <p>Loading data</p>
    }

    return (
        <div className="flex w-full h-full items-center justify-center bg-cyan-700">
            <p className="font-bold">
                {Math.round(stats * 100)}% of the groups before you answered this question correctly
            </p>
        </div>
    )
}