"use client";
import {use, useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {getQuizNames} from "@/app/data/getQuizData";
import {createUserWithScore} from "@/app/data/handleUser";
import Button from "@/app/components /Button";
import { SpinWheel } from "react-spin-wheel"
import "react-spin-wheel/dist/index.css"

type SpinningWheelProps = {
    dataPromise: Promise<Awaited<ReturnType<typeof getQuizNames>>>;
    }

export default function SpinningWheel({dataPromise}: SpinningWheelProps) {
    const data = use(dataPromise);
    const router = useRouter();
    const [mustSpin, setMustSpin] = useState(false);
    const [button1Pressed, setButton1Pressed] = useState(false);
    const [button2Pressed, setButton2Pressed] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const handleSpin = () => {
        const randomIndex = Math.floor(Math.random() * data.length);
        setPrizeNumber(randomIndex);
        setMustSpin(true);
    };


    const handleStop = async () => {
        setMustSpin(false);
        const selectedQuizID =  data[prizeNumber].id;
        console.log("selectedQuizId: " + selectedQuizID);
        await createUserWithScore(selectedQuizID)
        router.push(`/quiz`);
    };

    const handleOnClickButton1 = () => {
        if (button2Pressed) {
            handleSpin();
        }
        else { (setButton1Pressed(true));
        }
    }

    const handleOnClickButton2 = () => {
        if (button1Pressed) {
            handleSpin();
        }
        else { (setButton2Pressed(true));
        }
    }

    const labels: string[] = data.map(q => q.title);

    return (
    <div className="flex flex-col items-center justify-center p-10">
        <div className= "w-full max-w-[85vmin] aspect-square flex items-center justify-center">
            <SpinWheel
                items={labels}
                itemColors={["#9ae600", "#5ea500"]}
                borderColor="#000"
                spinTime={3000}
                onFinishSpin={handleStop}
            />
        </div>
    </div>
);
}
