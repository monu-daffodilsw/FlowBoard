'use client';
import { useState, useEffect } from 'react';
import { View } from '@/components/core/View';
import { Text } from '@/components/core/Text';

export function ClockWidget() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setDate(now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <View className="p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <Text className="text-white/40 text-xs uppercase tracking-wider mb-2">Current Time</Text>
      <Text className="text-3xl font-bold text-white tabular-nums" style={{ fontFamily: 'Space Mono, monospace' }}>
        {time || '--:--:--'}
      </Text>
      <Text className="text-white/50 text-sm mt-1">{date}</Text>
    </View>
  );
}
