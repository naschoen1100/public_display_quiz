import {useRouter} from "next/navigation";

export default function QuizResult (score: number, questions: string[]) {
    const router = useRouter();
    return (
        <div className= {"flex flex-col items-center justify-center bg-cyan-600"}>
            <h1>Quiz beendet!</h1>
            <p>Dein Score: {score} / {questions.length}</p>
            <button className={"btn"} onClick={() => {router.push(`/`)}}>
                Start again
            </button>
        </div>
    );
}