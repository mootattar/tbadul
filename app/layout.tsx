import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import PostProvider from "./contexts/PostContext";
import { AuthProvider } from "./contexts/AuthContexts";
import { ToastProvider } from "./contexts/ToastContext";

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
        <AuthProvider>
          <PostProvider>
            <ToastProvider>
              <Header />
              {children}
              <Footer />
            </ToastProvider>
          </PostProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
