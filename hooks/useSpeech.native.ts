import { useState, useCallback, useRef } from 'react';
import * as Speech from 'expo-speech';

/**
 * NATIVE: expo-speech for text-to-speech.
 *
 * NOTE: expo-speech is TTS (text → audio), not STT (audio → text).
 * For STT on native, use @react-native-voice/voice:
 *   npx expo install @react-native-voice/voice
 *
 * This file provides a compatible API stub using expo-speech for TTS,
 * and marks speech-to-text as unsupported on native (until Voice is added).
 *
 * Install: npx expo install expo-speech @react-native-voice/voice
 */

// Uncomment when @react-native-voice/voice is installed:
// import Voice from '@react-native-voice/voice';

export function useSpeech(onFinalTranscript: (text: string) => void) {
  const [isRecording, setIsRecording] = useState(false);
  const [interim, setInterim] = useState('');
  // Mark as null (unknown) until Voice is set up
  const [supported] = useState<boolean | null>(false);

  const start = useCallback(() => {
    // TODO: replace with Voice.start('en-US') once @react-native-voice/voice is installed
    // Voice.onSpeechResults = (e) => { if (e.value?.[0]) onFinalTranscript(e.value[0]); };
    // Voice.onSpeechPartialResults = (e) => setInterim(e.value?.[0] ?? '');
    // Voice.start('en-US');
    setIsRecording(false);
  }, [onFinalTranscript]);

  const stop = useCallback(() => {
    // Voice.stop();
    setIsRecording(false);
    setInterim('');
  }, []);

  return { isRecording, interim, supported, start, stop };
}
