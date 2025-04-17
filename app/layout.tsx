import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { ThemeProvider } from '../components/theme-provider'
import { Toaster } from '../components/ui/sonner'
import { ny } from '../lib/utils'
import '../app/styles/globals.css'
import { EmailsContextProvider } from '@/context/emailsContext'
import { ClerkProvider } from '@clerk/nextjs'
import ChatbotLayout from '@/components/chatbot/chatbot-layout'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})
export const metadata: Metadata = {
  title: 'Infinity SAAS',
  description: 'Infinity SAAS',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>

    <html lang="en" suppressHydrationWarning>
      <body
        className={ny(
          'bg-background min-h-screen font-sans antialiased',
          fontSans.variable,
        )}
      >
         <ChatbotLayout>

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <EmailsContextProvider>{children}</EmailsContextProvider>
          <Toaster />
        </ThemeProvider>
    </ChatbotLayout>

      </body>
    </html>
    </ClerkProvider>
  )
}
