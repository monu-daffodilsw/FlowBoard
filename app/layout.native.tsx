// Metro loads this instead of layout.tsx on native, avoiding next/font/google.
// The actual Expo root layout is app/_layout.tsx.
import { AppRouter } from '@/router/AppRouter';

export default function Layout() {
  return <AppRouter />;
}
