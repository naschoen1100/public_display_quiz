'use client'

import {useEffect, useState, useTransition} from "react";
import {getDataPerQuestion} from "@/app/data/handleAnswerStatistics";

type FeedbackProps = {
    questionId: number;
}

export default function Feedback (props: FeedbackProps) {
    const [stats, setStats] = useState<number> (0);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(() => {
            getDataPerQuestion(props.questionId).then(setStats);
        })
    }, [props.questionId]);

    if(!stats && !isPending) {
        return <p>Loading data</p>
    }

    return (
        <div className="flex items-center justify-center bg-cyan-600">
            <p className="text-2xl font-bold">
                {Math.round(stats * 100)}% haben diese Frage richtig beantwortet
            </p>
        </div>
    )
}