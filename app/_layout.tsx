import { Slot } from 'expo-router';
import { RouterProvider } from '@/router';

export default function RootLayout() {
  return (
    <RouterProvider>
      <Slot />
    </RouterProvider>
  );
}
