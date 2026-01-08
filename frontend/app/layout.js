import { Inter, Poppins } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import 'leaflet/dist/leaflet.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title: 'BrajPath - Smart Trip Planner for Mathura & Vrindavan',
  description:
    'Plan your spiritual journey to Mathura and Vrindavan with AI-powered itineraries, price protection, and temple discovery. Experience the divine with BrajPath.',
  keywords:
    'Mathura, Vrindavan, trip planner, temple guide, Krishna, Radha, spiritual journey, India tourism',
  authors: [{ name: 'BrajPath Team' }],
  openGraph: {
    title: 'BrajPath - Smart Trip Planner',
    description: 'Plan your spiritual journey to Mathura & Vrindavan',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#1E40AF',
                border: '2px solid #EC4899',
                borderRadius: '12px',
                padding: '16px',
                fontWeight: '500',
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
