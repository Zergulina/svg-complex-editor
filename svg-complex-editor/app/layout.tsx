import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SVG Complex Editor",
  description: "Advanced SVG Editor for Creating Complex Diagrams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-screen bg-background text-foreground`}
      >
        <header className="h-[60px] w-full border-b flex items-center px-4">
          <div className="text-xl font-bold">SVG Complex Editor</div>
        </header>
        <div className="flex-1 w-full overflow-hidden">
          {children}
        </div>
        <footer className="h-[40px] w-full border-t flex items-center justify-center text-sm text-muted-foreground">
          SVG Complex Editor &copy; {new Date().getFullYear()}
        </footer>
      </body>
    </html>
  );
}
