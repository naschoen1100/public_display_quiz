'use client';

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { getDataForRecentQuestions } from '@/app/data/handleAnswerStatistics';

type QuizStats = {
  totalPlayers: number;
  betterPlayers: number;
};

type RankingModalProps = {
  open: boolean;
  onClose: () => void;
  onAfterClose: () => void;
  autoCloseMs?: number;
};

export default function RankingModal({
  open,
  onClose,
  onAfterClose,
  autoCloseMs = 4000,
}: RankingModalProps) {
  const [stats, setStats] = useState<QuizStats | null>(null);
  const [isPending, startTransition] = useTransition();
  const hasClosedRef = useRef(false);

  useEffect(() => {
    startTransition(() => {
      getDataForRecentQuestions().then(setStats);
    });
  }, []);

  const topPercent = useMemo(() => {
    if (!stats?.totalPlayers || stats.totalPlayers <= 0) return 0;
    const p = Math.round(((stats.totalPlayers - stats.betterPlayers) / stats.totalPlayers) * 100);
    return Math.max(0, Math.min(100, p));
  }, [stats]);

  //close-Function
  const closeModal = useCallback(() => {
    if (hasClosedRef.current) return;
    hasClosedRef.current = true;

    onClose();
    onAfterClose();
  }, [onClose, onAfterClose]);

  // Auto-close Timer
  useEffect(() => {
    if (!open) return;

    hasClosedRef.current = false;
    const t = setTimeout(closeModal, autoCloseMs);
    return () => clearTimeout(t);
  }, [open, autoCloseMs, closeModal]);

  if (!open) return null;

  return (
    <dialog className="modal modal-open">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/35 backdrop-blur-md" />

      {/* Card */}
      <div
        className="relative -translate-y-[15vh] mt-[8vh] w-[min(92vw,80rem)] rounded-[2.5rem]
               border border-white/25 bg-white/80
               shadow-[0_40px_120px_-50px_rgba(0,0,0,0.45)]
               px-[clamp(1.5rem,4vmin,4rem)]
               py-[clamp(1.25rem,3.5vmin,3.5rem)]
               text-slate-900"
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-[clamp(0.75rem,1.8vmin,1.5rem)]">
          <h3
            className="text-center font-extrabold tracking-tight
                     text-[clamp(2rem,5.3vmin,6rem)] leading-[1.05]"
          >
            Here’s how you performed
          </h3>

          <p
            className="text-center text-cyan-700
                    text-[clamp(1.1rem,3.5vmin,3rem)]"
          >
            You belong to the
          </p>
        </div>

        {/* Content */}
        <div className="mt-[clamp(1.25rem,3vmin,2.75rem)] flex flex-col items-center gap-[clamp(1.25rem,3vmin,3rem)]">
          {/* Big stat */}
          <div className="text-center">
            <div
              className="text-[clamp(3rem,8vmin,8rem)]
                        font-black text-cyan-700 leading-none"
            >
              Top {topPercent}%
            </div>
            <div
              className="mt-[clamp(0.4rem,3vmin,2rem)]
                        text-slate-600 text-[clamp(1.1rem,3vmin,2.5rem)]"
            >
              {topPercent >= 90 ? 'Outstanding!' : topPercent >= 50 ? 'Nice work!' : 'Keep going!'}
            </div>
          </div>

          {/* Progress */}
          <div className="w-full max-w-[min(90vw,55rem)]">
            <div
              className="h-[clamp(0.75rem,1.6vmin,1.25rem)]
                        w-full rounded-full bg-slate-200 overflow-hidden"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-800 transition-all duration-700"
                style={{ width: `${topPercent}%` }}
              />
            </div>

            <div
              className="mt-[clamp(0.5rem,1vmin,0.9rem)]
                        flex justify-between text-slate-500
                        text-[clamp(0.9rem,3vmin,2rem)]"
            >
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Rank */}
          <div className="rounded-[1.5rem] bg-sky-600/45 border border-white/35 px-[clamp(1rem,2.2vmin,2rem)] py-[clamp(0.9rem,2vmin,1.6rem)] text-center w-full max-w-[min(90vw,55rem)]">
            <p className="text-slate-700 text-[clamp(1.3rem,2vmin,3rem)]">
              Place{' '}
              <span className="font-extrabold text-slate-900">
                {(stats?.betterPlayers ?? 0) + 1}
              </span>{' '}
              of <span className="font-bold text-slate-900">{stats?.totalPlayers ?? 0}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Backdrop click closes */}
      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={closeModal} />
      </form>
    </dialog>
  );
}
