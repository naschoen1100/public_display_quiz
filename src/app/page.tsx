import SpinningWheel from "@/app/components /SpinningWheel";

export default function EntryPage () {
    const data = [
        { option: "Thema A" },
        { option: "Thema B" },
        { option: "Thema C" },
        { option: "Thema D" },
    ];
    return (
        <>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-center text-primary uppercase p-4">
                Willkommen!
            </h1>
            <SpinningWheel/>
        </>
    )

}
