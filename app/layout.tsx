import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { AuthProvider } from "./contexts/AuthContexts";
import { ToastProvider } from "./contexts/ToastContext";
import FetchPostsProvider from "./contexts/FetchPostsContext";

export const metadata: Metadata = {
  title: "tbadul",
  description:
    "منصة تهدف الى تسهيل عمليات التبادل والتبرع والمساعدة بين طلبة الجامعات",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <meta
          name="google-site-verification"
          content="mWyngtNR-ZvTSI67dm5KqFVRWiEboa4vAoKPxT0bcqI"
        />
        <AuthProvider>
          <FetchPostsProvider>
            <ToastProvider>
              <Header />
              {children}
              <Footer />
            </ToastProvider>
          </FetchPostsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
