'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export function useInactivityTimeout(timeoutMs = 60000) {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      router.push('/');
    }, timeoutMs);
  };

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keydown', 'touchstart', 'scroll'];

    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer(); // Timer beim Mount starten

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, []);

  return null;
}
