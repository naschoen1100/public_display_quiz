'use client';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import { getUserScore } from '@/app/data/handleAnswerStatistics';
import { useInactivityTimeout } from '@/app/util/useInactivityTimeout';
import Rank from '@/app/components/rank';
import { Image } from 'next/dist/client/image-component';

type ResultPageProps = {
  dataPromise: Promise<Awaited<ReturnType<typeof getUserScore>>>;
};
export default function ResultPage({ dataPromise }: ResultPageProps) {
  useInactivityTimeout(60000 * 3);
  const data = use(dataPromise);
  const router = useRouter();
  const points = data?.score?.points ?? 0;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-600 to-slate-800 p-4">
      <div className="card w-full max-w-[70vmin] aspect-[4/4] bg-gradient-to-br from-cyan-700 to-cyan-900 shadow-2xl rounded-2xl p-[clamp(1rem,1.5vmin,2rem)] flex flex-col justify-center items-center gap-[clamp(1rem,2vmin,2rem)]">
        {/* Header */}
        <h1 className="text-white text-[clamp(2rem,4vmin,6rem)] font-extrabold text-center uppercase">
          Quiz Finished!
        </h1>
        {/* Score */}
        <p className="text-[clamp(1.5rem,3vmin,4rem)] font-semibold text-center text-white">
          Your score: {points} / 3
        </p>
        {/* Ranking / Leaderboard */}
        <div className="text-white w-full text-[clamp(1.5rem,3vmin,4rem)]  flex justify-center mt-[clamp(0.5rem,1.5vmin,2rem)]">
          <Rank />
        </div>
        {/* Button */}
        <div className="relative w-full max-w-[200px] aspect-square py-[clamp(1rem,3vmin,3.5rem)]">
          <Image
            src="/QRCode.png"
            alt="QR-Code"
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, 200px"
            priority={false}
          />
        </div>
        <p className=" text-[clamp(1.5rem,3vmin,4rem)] font-semibold text-center text-white">
          If you have 5 minutes, please support my bachelors thesis by filling out the
          questionnaire. Thank you :)
        </p>
        <button
          className="btn py-[clamp(0.6rem,2vmin,3rem)] text-[clamp(1rem,2.5vmin,4rem)] w-[clamp(1rem,25vmin,25rem)] bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-sky-500 hover:to-cyan-500 text-white rounded-xl shadow-lg transition-all mt-[clamp(0.5rem,1vmin,2rem)]"
          onClick={() => router.push(`/`)}
        >
          Start Again
        </button>
      </div>
    </div>
  );
}
