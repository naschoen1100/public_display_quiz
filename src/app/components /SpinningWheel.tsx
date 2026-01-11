"use client";
import {use, useEffect, useRef, useState} from "react";
import { Wheel } from "react-custom-roulette";
import {useRouter} from "next/navigation";
import {getQuizNames} from "@/app/data/getQuizData";
import {createUserWithScore} from "@/app/data/handleUser";
import {B612} from "next/dist/compiled/@next/font/dist/google";
import Button from "@/app/components /Button";

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
    const containerRef = useRef(null);
    const [size, setSize] = useState(600);
    const handleSpin = () => {
        const randomIndex = Math.floor(Math.random() * data.length);
        setPrizeNumber(randomIndex);
        setMustSpin(true);
    };

    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            const { width, height } = entries[0].contentRect;
            setSize(Math.min(width, height));
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);


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
        <div className= "w-full max-w-[85vmin] aspect-square flex items-center justify-center">
            <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={labels}
                onStopSpinning={handleStop}
                backgroundColors={["#9ae600", "#5ea500"]}

                textColors={["#000"]}
                outerBorderColor={"#000"}
            />
        </div>
        <div className="flex items-center justify-center">
            <Button onClick={handleOnClickButton1} variant={"primary"} disabled={button1Pressed}>
                Lets Play
            </Button>
            <Button onClick={handleOnClickButton2} variant={"primary"} disabled={button2Pressed}>
                Lets Play
            </Button>
        </div>
    </div>
);
}
