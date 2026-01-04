"use client";
import {use, useState} from "react";
import { Wheel } from "react-custom-roulette";
import {useRouter} from "next/navigation";
import {getQuizNames} from "@/app/data/getQuizData";
import {createUserWithScore} from "@/app/data/handleUser";

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

    const labels = data.map(q => ({
        option: q.title,
    }));

    return (
    <div className="flex flex-col items-center justify-center p-10">
        <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={labels}
            onStopSpinning={handleStop}
            backgroundColors={["#9ae600", "#5ea500"]}

            textColors={["#000"]}
            outerBorderColor={"#000"}/>
        <div className="flex items-center justify-center">
            <button
                className="btn btn-lg m-5 bg-cyan-600"
                disabled={button1Pressed}
                onClick={() => {handleOnClickButton1()}}
            >
                Lets Play
            </button>
            <button
                className="btn btn-lg m-5 bg-cyan-600"
                disabled={button2Pressed}
                onClick={handleOnClickButton2}
            >
                Lets Play
            </button>
        </div>
    </div>
);
}
