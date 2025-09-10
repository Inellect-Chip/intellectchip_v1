import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import { Poppins } from "next/font/google";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import RedirectCapture from "@/components/auth/RedirectCapture";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Intellect Chip",
  description: "Intellect Chip",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider signInUrl="/login" signUpUrl="/register">
      <html lang="en">
        <body
          suppressHydrationWarning
          className={`${poppins.variable} antialiased min-h-screen flex flex-col`}
        >
          <RedirectCapture />
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
