import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pilot Domiciles Map – All U.S. Crew Bases',
  description: 'Interactive map of every airline pilot domicile / crew base in the USA',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
