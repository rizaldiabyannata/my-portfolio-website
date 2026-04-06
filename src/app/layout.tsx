import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import Header from "./components/Header";
import SocialLinks from "./components/SocialLinks";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rizaldi Abyannata | Backend-focused Full-Stack Developer",
  description:
    "Dark-first editorial tech portfolio for Rizaldi Abyannata, focused on backend systems, full-stack delivery, and practical product execution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetBrainsMono.variable} bg-background font-sans text-foreground antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <footer className="px-4 pb-10 pt-4 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-7xl">
              <SocialLinks />
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
