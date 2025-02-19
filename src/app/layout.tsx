import type { Metadata } from 'next';
import './globals.css'; // This will import your global styles, including the custom font
import { ThemeProvider } from '@/providers/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes'
import ModalProvider from '@/providers/modal-provider';
import { Toaster } from '@/components/ui/sonner';
import { BillingProvider } from '@/providers/billing-provider';
import FadeInWrapper from '@/components/FadeInWrapper'; // Import the FadeInWrapper

export const metadata: Metadata = {
  title: 'Genesis',
  description:
    'Genesis: A groundbreaking SaaS platform empowering seamless automation and integration, inspired by the essence of creation.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className="font-zhcn"> {/* Apply custom font class here */}
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <BillingProvider>
              <ModalProvider>
                {/* Wrap the children with the FadeInWrapper to animate */}
                <FadeInWrapper>
                  {children}
                  <Toaster />
                </FadeInWrapper>
              </ModalProvider>
            </BillingProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
