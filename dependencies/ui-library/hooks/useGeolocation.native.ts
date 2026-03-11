import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

interface GeoState {
  loading: boolean;
  city: string | null;
  country: string | null;
  error: string | null;
}

/**
 * NATIVE: uses expo-location with reverse geocoding
 * Install: npx expo install expo-location
 */
export function useGeolocation() {
  const [state, setState] = useState<GeoState>({ loading: true, city: null, country: null, error: null });

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setState({ loading: false, city: null, country: null, error: 'Permission denied' });
          return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        const [geo] = await Location.reverseGeocodeAsync({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
        setState({
          loading: false,
          city: geo.city || geo.district || null,
          country: geo.country || null,
          error: null,
        });
      } catch (e: unknown) {
        setState({ loading: false, city: null, country: null, error: String(e) });
      }
    })();
  }, []);

  return state;
}
