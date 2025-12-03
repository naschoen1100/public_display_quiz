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
    const [prizeNumber, setPrizeNumber] = useState(0);

    const handleSpin = () => {
        const randomIndex = Math.floor(Math.random() * data.length);
        setPrizeNumber(randomIndex);
        setMustSpin(true);
    };

    const handleStop = () => {
        setMustSpin(false);
        console.log("Gewonnen:", data[prizeNumber].option);
        router.push(`/quiz`);
    };

    return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 bg-base-100">
        <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            onStopSpinning={handleStop}
            backgroundColors={["#facc15", "#f97316"]}
            textColors={["#000"]}
            outerBorderColor={"#000"}
        />
        <button className="btn btn-primary btn-lg" onClick={handleSpin}>
            Lets Play
        </button>
    </div>
);
}
