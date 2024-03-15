import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Container } from "@/components/container";
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
        <Container>{children}</Container>
      </body>
    </html>
  );
}
