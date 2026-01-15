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
            <div className="modal-box max-w-[min(90vw,42rem)] bg-neutral text-neutral-content">
                <h3 className="font-bold text-[clamp(1.2rem,3vmin,2.2rem)] text-center mb-4">
                    Your Ranking:
                </h3>

                {loading ? (
                    <p>Loading data…</p>
                ) : (
                    <div className="flex flex-col items-center h-full px-6 text-center">
                        {/* Top Percentage */}
                        <div className="mb-6">
                            <div className="text-[clamp(1rem,2.5vmin,4rem)] font-extrabold text-green-600">
                                Top {topPercent} %
                            </div>
                        </div>

                        {/* Vertical Bar */}
                        <div className="relative flex-1 w-6 bg-gray-200 rounded-full overflow-hidden mb-6">
                            <div
                                className="absolute bottom-0 w-full bg-green-500 transition-all duration-700"
                                style={{ height: `${topPercent}%` }}
                            />
                            <div
                                className="absolute left-1/2 -translate-x-1/2 w-10 h-1 bg-black"
                                style={{ bottom: `${topPercent}%` }}
                            />
                        </div>

                        {/* Rank Info */}
                        <p className="text-base text-white text-[clamp(1rem,2vmin,4rem)]">
                            place <span className="font-bold">{(stats?.betterPlayers ?? 0) + 1}</span> of{" "}
                            <span className="font-semibold">{stats?.totalPlayers ?? 0}</span>
                        </p>
                    </div>
                )}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button type="button" onClick={closeModal}>close</button>
            </form>
        </dialog>
    );
}
