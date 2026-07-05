import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sasmita Mishra — 3D Artist Portfolio",
  description:
    "A quiet, editorial 3D artist portfolio featuring character modeling, environment art, sculpting, and product visualization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
