import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ModalProvider } from '@/provider/modal-provider'
import { ToastProvider } from '@/provider/toast-provider'
import { CatalogProvider } from '../context/CatalogContext';
import { ThemeProvider } from '@/provider/theme-provider'

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="en">
      <body className={inter.className}>
        <CatalogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <ToastProvider />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </CatalogProvider>
      </body>
    </html>
  )
}
