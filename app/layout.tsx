import { Poppins, Inter, Merriweather } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});

export const metadata = {
  title: "Payng - School Payment System",
  description: "Manage school fees and payments seamlessly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${inter.variable} ${merriweather.variable}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
