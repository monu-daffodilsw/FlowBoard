'use client';
import { useGeolocation } from '@/hooks/useGeolocation';

export function GeoWidget() {
  const { loading, city, country, error } = useGeolocation();

  return (
    <div className="p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Location</p>
      {loading && (
        <div className="flex items-center gap-2 text-white/40 text-sm">
          <div className="w-3 h-3 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
          Detecting location...
        </div>
      )}
      {!loading && error && (
        <p className="text-white/30 text-sm">📍 Location unavailable</p>
      )}
      {!loading && city && (
        <p className="text-white text-lg font-semibold">
          🌍 Remote from {city}{country ? `, ${country}` : ''}
        </p>
      )}
    </div>
  );
}
