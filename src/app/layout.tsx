import type { Metadata } from 'next';
import '../src/index.css';

export const metadata: Metadata = {
  title: 'Events with Shalom | Luxury Wedding & Events',
  description: 'Luxury wedding and event planning, curated beautifully for your most meaningful celebrations.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
