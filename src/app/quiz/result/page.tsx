import {Suspense} from "react";
import ResultPage from "@/app/components /ResultPage";
import {getUserScore} from "@/app/data/handleAnswerStatistics";

export const dynamic = "force-dynamic";

export default async function Page() {
    const dataPromise = getUserScore()
    return (
        <>
            <Suspense fallback={<p className={"text-center mt-6"}> ...Loading </p>}>
                <ResultPage dataPromise = {dataPromise}/>
            </Suspense>
        </>
    );
}
