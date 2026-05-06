import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DarkModeContextProvider } from "@/context/DarkMode";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Chat App",
  description: "A Real Time Chat Application",
  icons: {
    icon: ["/favicon.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
       <DarkModeContextProvider>
        {children}
       </DarkModeContextProvider>

      </body>
    </html>
  );
}
