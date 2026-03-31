import type { Metadata } from 'next';
import './globals.css';
import { ClientProviders } from '@/components/ClientProviders';
import { Navigation } from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'WorldTracker — Country Comparison Platform',
  description: 'Track and compare country performance across healthcare, education, economy, safety, environment and infrastructure.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        <ClientProviders>
          <Navigation />
          <main>{children}</main>
        </ClientProviders>
      </body>
    </html>
  );
}
