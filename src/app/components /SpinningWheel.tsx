"use client";

import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import {useRouter} from "next/navigation";

export default function SpinningWheel() {
    const data = [
        {option: "Thema A"},
        {option: "Thema B"},
        {option: "Thema C"},
        {option: "Thema D"},
    ];

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

    const handleStop = () => {
        setMustSpin(false);
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

    return (
    <div className="flex flex-col items-center justify-center bg-cyan-600 p-10">
        <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            onStopSpinning={handleStop}
            backgroundColors={["#facc15", "#f97316"]}
            textColors={["#000"]}
            outerBorderColor={"#000"}/>
        <div className="flex items-center justify-center">
            <button
                className="btn btn-lg m-5"
                disabled={button1Pressed}
                onClick={() => {handleOnClickButton1()}}
            >
                Lets Play
            </button>
            <button
                className="btn btn-lg m-5"
                disabled={button2Pressed}
                onClick={handleOnClickButton2}
            >
                Lets Play
            </button>
        </div>
    </div>
);
}
