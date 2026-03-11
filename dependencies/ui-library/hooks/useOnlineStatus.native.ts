import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

/**
 * NATIVE: @react-native-community/netinfo
 * Install: npx expo install @react-native-community/netinfo
 */
export function useOnlineStatus() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    // Get initial state
    NetInfo.fetch().then(state => setOnline(state.isConnected ?? true));

    // Subscribe to changes
    const unsub = NetInfo.addEventListener(state => {
      setOnline(state.isConnected ?? true);
    });

    return unsub;
  }, []);

  return online;
}
