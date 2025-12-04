import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Industrial Machinery Solutions",
  description:
    "High-quality machinery for wood, metal, glass, and aluminum processing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
