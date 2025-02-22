import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import PostProvider from "./contexts/PostContext";
import { AuthProvider } from "./contexts/AuthContexts";

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
            <Header />
            {children}
            <Footer />
          </PostProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
