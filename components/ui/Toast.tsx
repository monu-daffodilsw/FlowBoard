'use client';
import { useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ToastProps {
  message: string;
  visible: boolean;
  type?: 'success' | 'error' | 'info';
}

export function Toast({ message, visible, type = 'success' }: ToastProps) {
  const colors = {
    success: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300',
    error: 'bg-red-500/20 border-red-500/40 text-red-300',
    info: 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300',
  };

  return (
    <div className={cn(
      'fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl border backdrop-blur-md text-sm font-medium',
      'transition-all duration-300 shadow-lg',
      colors[type],
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
    )}>
      {message}
    </div>
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
