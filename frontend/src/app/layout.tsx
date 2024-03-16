import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Container } from "@/components/container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brainsoft - Pokemons",
  description: "Frontend Pokemon Application for job application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ToastContainer />
        <Container>{children}</Container>
      </body>
    </html>
  );
}
