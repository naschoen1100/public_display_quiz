'use client';

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { getDataForRecentQuestions } from "@/app/data/handleAnswerStatistics";

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

export default function RankingModal({open, onClose, onAfterClose, autoCloseMs = 4000,}: RankingModalProps) {
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

    const loading = stats == null || isPending;

    return (
        <dialog className="modal modal-open">
            {/* Overlay + Blur */}
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />

            {/* Card */}
            <div className="relative w-[min(120vw,80rem)] rounded-2xl bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] border border-slate-200 px-8 py-7 text-slate-800">

                {/* Title */}
                <h3 className="text-center font-semibold text-[clamp(1.5rem,3vmin,6rem)]">
                    Here&apos;s how you performed compared to others
                </h3>

                {/* Content */}
                <div className="mt-6 flex flex-col items-center">
                    {loading ? (
                        <p className="text-slate-500">Loading data…</p>
                    ) : (
                        <>
                            {/* Top Percentage */}
                            <div className="mb-5 text-center">
                                <div className="text-[clamp(1.3rem,4vmin,3rem)] font-extrabold text-cyan-600">
                                    You belong to the top {topPercent}%
                                </div>
                            </div>

                            {/* Vertical Bar */}
                            <div className="relative w-7 h-[clamp(9rem,28vmin,20rem)] bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className="absolute bottom-0 w-full bg-cyan-500 transition-all duration-700"
                                    style={{ height: `${topPercent}%` }}
                                />
                                <div
                                    className="absolute left-1/2 -translate-x-1/2 w-10 h-[3px]  bg-slate-800/70 rounded"
                                    style={{ bottom: `${topPercent}%` }}
                                />
                            </div>

                            {/* Subtitle */}
                            <p className="mt-2 text-center font-semibold text-slate-800 text-[clamp(0.9rem,2.5vmin,4.5rem)]">
                                {topPercent>50 ? "Good Job! Keep doing the good work 💪" : "Try harder next time"}
                            </p>

                            {/* Rank Info */}
                            <p className="mt-5 text-slate-800 text-[clamp(0.95rem,2.5vmin,4rem)]">
                                Place{" "}
                                <span className="font-bold text-slate-800">
                                         {(stats?.betterPlayers ?? 0) + 1}
                                 </span>{" "}
                                     of{" "}
                                <span className="font-semibold text-slate-800">
                                    {stats?.totalPlayers ?? 0}
                                 </span>
                            </p>
                        </>
                    )}
                </div>
            </div>

            {/* Backdrop bleibt klickbar */}
            <form method="dialog" className="modal-backdrop">
                <button type="button" onClick={closeModal} />
            </form>
        </dialog>

    );
}
