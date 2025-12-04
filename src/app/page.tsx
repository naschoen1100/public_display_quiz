import SpinningWheel from "@/app/components /SpinningWheel";

export default function EntryPage () {
    return (
        <>
            <div className={"flex flex-col items-center justify-center bg-cyan-600"}>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-center uppercase p-4 text-cyan-900">
                    Willkommen!
                </h1>
                <div className="mt-2">
                    <SpinningWheel />
                </div>
            </div>
        </>
    )
}
