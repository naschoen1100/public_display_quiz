import SpinningWheel from "@/app/components /SpinningWheel";
import {Suspense} from "react";
import {getQuizNames} from "@/app/data/getQuizData";
import {importQuizzes} from "@/app/data/createQuizData";
export const dynamic = "force-dynamic";
export default async function EntryPage () {
    //await importQuizzes()
    const dataPromise = getQuizNames();
    return (
        <>
            <div className={"flex flex-col items-center justify-center bg-cyan-600"}>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-center uppercase p-4 text-cyan-900">
                    Willkommen!
                </h1>
                <div className="mt-2">
                    <Suspense fallback={<p className={"text-center mt-6"}> ...Loading </p>}>
                        <SpinningWheel dataPromise = {dataPromise}/>
                    </Suspense>
                </div>
            </div>
        </>
    )
}
