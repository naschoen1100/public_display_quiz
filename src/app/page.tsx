import SpinningWheel from "@/app/components /SpinningWheel";
import {useEffect, useState} from "react";

export default function EntryPage () {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/quizzes")
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
                return(
                    <>
                        <div className={"flex flex-col items-center justify-center bg-cyan-600"}>
                            <h3 className={"text-2xl font-bold text-white"}>
                                Error while loading the data
                            </h3>
                        </div>
                    </>
                )
            });
    }, []);

    return (
        <>
            <div className={"flex flex-col items-center justify-center bg-cyan-600"}>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-center uppercase p-4 text-cyan-900">
                    Willkommen!
                </h1>
                <div className="mt-2">
                    <SpinningWheel data={data}/>
                </div>
            </div>
        </>
    )
}
