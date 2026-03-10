import '../global.css';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RouterProvider } from '@/router';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <RouterProvider>
        <Slot />
      </RouterProvider>
    </SafeAreaProvider>
  );
}
