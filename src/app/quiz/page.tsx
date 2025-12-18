import {Suspense} from "react";
import {getQuizQestions} from "@/app/data/getQuizData";
import QuizPage from "@/app/components /Quiz";

export default function Page() {
    const dataPromise = getQuizQestions();

    return (
        <>
            <Suspense fallback={<p className={"text-center mt-6"}> ...Loading </p>}>
                <QuizPage dataPromise = {dataPromise}/>
            </Suspense>
        </>
    );
}
