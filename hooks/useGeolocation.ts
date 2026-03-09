'use client';
import { useState, useEffect } from 'react';

interface GeoState {
  loading: boolean;
  city: string | null;
  country: string | null;
  error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeoState>({ loading: true, city: null, country: null, error: null });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({ loading: false, city: null, country: null, error: 'Geolocation not supported' });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await res.json();
          setState({
            loading: false,
            city: data.city || data.locality || null,
            country: data.countryName || null,
            error: null,
          });
        } catch {
          setState({ loading: false, city: null, country: null, error: 'Geocoding failed' });
        }
      },
      (err) => {
        setState({ loading: false, city: null, country: null, error: err.message });
      }
    );
  }, []);

  return state;
}
