import SpinningWheel from "@/app/components /SpinningWheel";
import {Suspense} from "react";
import {getQuizNames} from "@/app/data/getQuizData";
export const dynamic = "force-dynamic";

export default async function EntryPage () {
    const dataPromise = getQuizNames();
    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center p-[4vmin] bg-gradient-to-br from-slate-600 to-slate-800">
                <h1 className="font-extrabold text-center uppercase text-cyan-700 text-[clamp(3rem,10vmin,12rem)]">
                    Welcome!
                </h1>
                <div className="mt-[2vmin] w-[80vmin] max-w-[90vmin] aspect-square">
                    <Suspense fallback={<p className="text-center mt-6 text-[clamp(1rem,3vmin,2rem)]"> ...Loading </p>}>
                        <SpinningWheel dataPromise = {dataPromise}/>
                    </Suspense>
                </div>
            </div>
        </>
    )
}
