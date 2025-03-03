import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tennis Court Booking",
  description: "A modern platform for booking tennis courts and joining open sessions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen`}>
        <Providers>
          <header className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <a href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      Tennis Court Booking
                    </a>
                  </div>
                  <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <a
                      href="/"
                      className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-gray-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Home
                    </a>
                    <a
                      href="/open-sessions"
                      className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-gray-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Open Sessions
                    </a>
                    <a
                      href="/open-sessions/create"
                      className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-gray-100 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Create Session
                    </a>
                  </nav>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Demo Mode
                  </div>
                </div>
              </div>
            </div>
          </header>
          <main>{children}</main>
          <footer className="bg-white dark:bg-gray-800 mt-12">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                Tennis Court Booking Demo Application
              </p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
