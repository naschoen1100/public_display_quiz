"use client";
import {use, useState} from "react";
import {useRouter} from "next/navigation";
import {getQuizNames} from "@/app/data/getQuizData";
import {createUserWithScore} from "@/app/data/handleUser";
import { SpinWheel } from "react-spin-wheel"
import {wrapText} from "@/app/util/textWrapper";
import "react-spin-wheel/dist/index.css"

type SpinWheelItem = {
    name: string,
}

type SpinningWheelProps = {
    dataPromise: Promise<Awaited<ReturnType<typeof getQuizNames>>>;
    }

export default function SpinningWheel({dataPromise}: SpinningWheelProps) {
    const data = use(dataPromise);
    const router = useRouter();

    const handleStop = async (result?: string | SpinWheelItem) => {
        if (!result) return;
        const selectedQuizID = (labels.findIndex(item =>
            typeof item === "string"
                ? item === result
                : item === (result as SpinWheelItem).name
        ))+1;
        console.log("selectedQuizId: " + selectedQuizID);
        await createUserWithScore(selectedQuizID)
        router.push(`/quiz`);
    };

    const size = Math.min(window.innerWidth, window.innerHeight) * 0.7;

    const labels: string[] = data.map(q => wrapText(q.title,2));

    return (
    <div className="flex flex-col items-center justify-center p-10">
        <div className= " w-full h-full flex items-center justify-center">
            <SpinWheel
                items={labels}
                size={size}
                spinFontStyle={{
                    fontSize: `${size * 0.05}px`,
                    fontWeight: 700,
                    fill: "#000",
                    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    whiteSpace: "pre-line",
                }}
                spinButtonStyle={{
                    width: `${size * 0.1}px`,   // 25% vom Rad
                    height: `${size * 0.1}px`,  // quadratisch
                    borderRadius: "50%",               // rund
                    fontSize: `${size * 0.03}px`,
                }}
                resetButtonStyle={{
                    width: `${size * 0.1}px`,   // 25% vom Rad
                    height: `${size * 0.1}px`,  // quadratisch
                    borderRadius: "50%",               // rund
                    fontSize: `${size * 0.02}px`,
                }}
                spinItemStyle={{
                    padding: size * 0.02,
                }}
                itemColors={["#9ae600", "#5ea500"]}
                borderColor="#000"
                spinTime={3000}
                onFinishSpin={handleStop}
            />
        </div>
    </div>
);
}
