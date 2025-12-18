import {Suspense} from "react";
import {getUserScore} from "@/app/data/handleUser";
import ResultPage from "@/app/components /ResultText";

export default async function Page() {
    const dataPromise = getUserScore()
    return (
        <div className={"flex items-center justify-center bg-cyan-600"}>
            <Suspense fallback={<p className={"text-center mt-6"}> ...Loading </p>}>
                <ResultPage dataPromise = {dataPromise}/>
            </Suspense>
        </div>
    );
}
