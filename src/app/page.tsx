import SpinningWheel from "@/app/components /SpinningWheel";
import {Suspense, useEffect, useState} from "react";
import getData from "@/app/api/getQuizData";

export default function EntryPage () {
    const dataPromise = getData();
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
