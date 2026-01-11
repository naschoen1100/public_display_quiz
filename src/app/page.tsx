import SpinningWheel from "@/app/components /SpinningWheel";
import {Suspense} from "react";
import {getQuizNames} from "@/app/data/getQuizData";
export const dynamic = "force-dynamic";

export default async function EntryPage () {
    const dataPromise = getQuizNames();
    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center p-[4vmin] bg-gradient-to-br from-slate-600 to-slate-800">
                <h1 className="font-extrabold text-center uppercase text-cyan-700 text-[clamp(1rem,15vmin,30rem)]">
                    Welcome!
                </h1>
                <section className=" mt-[3vmin]  w-full flex justify-center">
                    <div className="  w-full max-w-[75vmin] lg:max-w-[65vmin] 2xl:max-w-[70vmin] aspect-square flex items-center justify-center">
                        <Suspense fallback={<p className="text-center mt-6 text-[clamp(1rem,3vmin,2rem)]"> ...Loading </p>}>
                            <SpinningWheel dataPromise = {dataPromise}/>
                        </Suspense>
                    </div>
                </section>
            </div>
        </>
    )
}
