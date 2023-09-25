import "./globals.css";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import Nav from "./components/nav";
import ContentWrapper from "./components/content-wrapper";

const inter = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shockwave Media",
  description: "Jefferson Cogay Front-end exam",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div className="flex flex-col md:flex-row">
          <Nav />
          <ContentWrapper>{children}</ContentWrapper>
        </div>
      </body>
    </html>
  );
}
