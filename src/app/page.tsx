import SpinningWheel from "@/app/components /SpinningWheel";
import { Suspense } from "react";
import { getQuizNames } from "@/app/data/getQuizData";
import { importQuizzes } from "@/app/data/createQuizData";
export const dynamic = "force-dynamic";

export default async function EntryPage() {
  const dataPromise = getQuizNames();
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center p-[4vmin] bg-gradient-to-br from-slate-600 to-slate-800">
        <h1 className="font-extrabold text-center uppercase text-cyan-500 text-[clamp(1rem,10vmin,17rem)]">
          Test your Password Security knowledge
        </h1>
        <h2 className="font-semibold text-center text-white text-[clamp(1rem,6vmin,12rem)]">
          Spin the Wheel
        </h2>
        <section className=" mt-[3vmin]  w-full flex justify-center">
          <div className="  w-full max-w-[75vmin] lg:max-w-[65vmin] 2xl:max-w-[70vmin] aspect-square flex items-center justify-center">
            <Suspense
              fallback={
                <p className="text-center mt-6 text-[clamp(1rem,3vmin,2rem)]">
                  {" "}
                  ...Loading{" "}
                </p>
              }
            >
              <SpinningWheel dataPromise={dataPromise} />
            </Suspense>
          </div>
        </section>
      </div>
    </>
  );
}
