import SpinningWheel from "@/app/components /SpinningWheel";
import {Suspense} from "react";
import {getQuizNames} from "@/app/data/getQuizData";
export const dynamic = "force-dynamic";

export default async function EntryPage () {
    const dataPromise = getQuizNames();
    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-600 to-slate-800 p-4">
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-center uppercase p-4 text-cyan-600">
                    Welcome!
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
