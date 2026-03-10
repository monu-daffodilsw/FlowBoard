import { useState, useCallback, useEffect } from 'react';
import { View } from '@/components/core/View';
import { Text } from '@/components/core/Text';
import { cn } from '@/utils/utils';

interface ToastProps {
  message: string;
  visible: boolean;
  type?: 'success' | 'error' | 'info';
}

/** NATIVE: bottom-pinned toast using absolute positioning */
export function Toast({ message, visible, type = 'success' }: ToastProps) {
  const colors = {
    success: 'bg-emerald-500/20 border-emerald-500/40',
    error: 'bg-red-500/20 border-red-500/40',
    info: 'bg-indigo-500/20 border-indigo-500/40',
  };
  const textColors = {
    success: 'text-emerald-300',
    error: 'text-red-300',
    info: 'text-indigo-300',
  };

  if (!visible) return null;

  return (
    <View
      className={cn(
        'absolute bottom-6 right-4 left-4 px-4 py-3 rounded-xl border',
        colors[type]
      )}
      style={{ zIndex: 50 }}
    >
      <Text className={cn('text-sm font-medium text-center', textColors[type])}>{message}</Text>
    </View>
  );
}

export function useToast() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const show = useCallback((msg: string) => {
    setMessage(msg);
    setVisible(true);
  }, []);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setVisible(false), 2000);
      return () => clearTimeout(t);
    }
  }, [visible]);

  return { visible, message, show };
}
