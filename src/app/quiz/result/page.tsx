import {Suspense} from "react";
import QuizPage from "@/app/components /Quiz";
import {getLatestUser} from "@/app/data/handleUser";

export default async function Page() {
    const dataPromise = getLatestUser()
    return (
        <div className={"flex items-center justify-center bg-cyan-600"}>
            <Suspense fallback={<p className={"text-center mt-6"}> ...Loading </p>}>
                <QuizPage dataPromise = {dataPromise}/>
            </Suspense>
        </div>
    );
}
