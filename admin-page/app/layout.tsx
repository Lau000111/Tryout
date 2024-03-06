import type { Metadata } from 'next'
import './globals.css'
import { ModalProvider } from '@/provider/modal-provider'
import { ToastProvider } from '@/provider/toast-provider'
import { CatalogProvider } from '../context/CatalogContext';
import { ThemeProvider } from '@/provider/theme-provider'
import { RestaurantProvider } from '@/provider/modal-catalog-provider';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body >
        <CatalogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <ToastProvider />
            <ModalProvider />
            <RestaurantProvider />
            {children}
          </ThemeProvider>
        </CatalogProvider>
      </body>
    </html>
  )
}

