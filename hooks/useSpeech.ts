'use client';
import { useState, useRef, useCallback } from 'react';

interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
}
interface SpeechRecognitionEvent {
  resultIndex: number;
  results: { length: number; [i: number]: { isFinal: boolean; [j: number]: { transcript: string } } };
}
type SR = new () => ISpeechRecognition;
declare global { interface Window { SpeechRecognition?: SR; webkitSpeechRecognition?: SR; } }

/**
 * WEB: Web Speech API (SpeechRecognition)
 */
export function useSpeech(onFinalTranscript: (text: string) => void) {
  const [isRecording, setIsRecording] = useState(false);
  const [interim, setInterim] = useState('');
  const [supported, setSupported] = useState<boolean | null>(null);
  const ref = useRef<ISpeechRecognition | null>(null);

  const start = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setSupported(false); return; }
    setSupported(true);
    const r = new SR();
    r.continuous = true; r.interimResults = true; r.lang = 'en-US';
    r.onresult = (e: SpeechRecognitionEvent) => {
      let i = '', f = '';
      for (let idx = e.resultIndex; idx < e.results.length; idx++) {
        const t = e.results[idx][0].transcript;
        if (e.results[idx].isFinal) f += t; else i += t;
      }
      setInterim(i);
      if (f) onFinalTranscript(f);
    };
    r.onend = () => { setIsRecording(false); setInterim(''); };
    r.start(); ref.current = r; setIsRecording(true);
  }, [onFinalTranscript]);

  const stop = useCallback(() => { ref.current?.stop(); setIsRecording(false); setInterim(''); }, []);

  return { isRecording, interim, supported, start, stop };
}
