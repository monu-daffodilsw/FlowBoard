import type { Metadata } from 'next';
import { Space_Mono, DM_Sans } from 'next/font/google';
import './globals.css';

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: 'FlowBoard',
  description: 'Modern project management with kanban, analytics, and real-time tracking.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceMono.variable} ${dmSans.variable} font-sans bg-[#0a0f1e] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
