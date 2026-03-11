'use client';
import { useGeolocation } from '../../hooks/useGeolocation';
import { View } from '../../core/View';
import { Text } from '../../core/Text';
import { ActivityIndicator } from '../../core/ActivityIndicator';

interface GeoWidgetProps {
  label?: string;
  loadingText?: string;
  errorText?: string;
  formatLocation?: (city: string, country: string | null) => string;
}

export function GeoWidget({
  label = 'Location',
  loadingText = 'Detecting location...',
  errorText = '📍 Location unavailable',
  formatLocation = (city, country) => country ? `${city}, ${country}` : city,
}: GeoWidgetProps) {
  const { loading, city, country, error } = useGeolocation();

  return (
    <View className="p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <Text className="text-white/40 text-xs uppercase tracking-wider mb-2">{label}</Text>
      {loading && (
        <View className="flex-row items-center gap-2">
          <ActivityIndicator size="small" color="#6366f1" />
          <Text className="text-white/40 text-sm">{loadingText}</Text>
        </View>
      )}
      {!loading && error && <Text className="text-white/30 text-sm">{errorText}</Text>}
      {!loading && city && (
        <Text className="text-white text-lg font-semibold">
          {formatLocation(city, country)}
        </Text>
      )}
    </View>
  );
}
