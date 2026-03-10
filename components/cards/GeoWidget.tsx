'use client';
import { useGeolocation } from '@/hooks/useGeolocation';
import { View } from '@/components/core/View';
import { Text } from '@/components/core/Text';
import { ActivityIndicator } from '@/components/core/ActivityIndicator';

export function GeoWidget() {
  const { loading, city, country, error } = useGeolocation();

  return (
    <View className="p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <Text className="text-white/40 text-xs uppercase tracking-wider mb-2">Location</Text>
      {loading && (
        <View className="flex-row items-center gap-2">
          <ActivityIndicator size="small" color="#6366f1" />
          <Text className="text-white/40 text-sm">Detecting location...</Text>
        </View>
      )}
      {!loading && error && <Text className="text-white/30 text-sm">📍 Location unavailable</Text>}
      {!loading && city && (
        <Text className="text-white text-lg font-semibold">
          🌍 Remote from {city}{country ? `, ${country}` : ''}
        </Text>
      )}
    </View>
  );
}
