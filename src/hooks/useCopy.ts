'use client';
import { useState, useCallback } from 'react';
import { copyToClipboard, playCopySound, vibrate } from '@/lib/utils';
import { useStore } from '@/lib/store';

export function useCopy() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { soundEnabled, vibrationEnabled, incrementCopy } = useStore();

  const copy = useCallback(async (text: string, id: string = text) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedId(id);
      if (soundEnabled) playCopySound();
      if (vibrationEnabled) vibrate([30, 20, 30]);
      incrementCopy(text);
      setTimeout(() => setCopiedId(null), 2000);
    }
    return success;
  }, [soundEnabled, vibrationEnabled, incrementCopy]);

  return { copy, copiedId, isCopied: (id: string) => copiedId === id };
}