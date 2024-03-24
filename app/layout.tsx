import type { Metadata } from "next";
import { Dosis, Poppins } from "next/font/google";
import Image from "next/image";
import Head from "next/head";
import "./globals.css";

const dosis = Dosis({ subsets: ["latin"], variable: "--font--dosis" });
const poppins = Poppins({ weight: "400", subsets: ["latin"], variable: "--font--poppins" });

export const metadata: Metadata = {
  title: "Meta Diária - Gerenciou de Metas Diárias",
  icons: "icon.png",
  description: "Gerencie seus objetivos diários de forma simples e eficiente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="favicon.ico" type="images/icon.png" />
      </Head>
      <body className={`${poppins.variable} ${dosis.variable} flex items-center flex-col mt-10 bg-neutral-900`}>
        <Image src="/images/logo.png" width={150} height={150} alt="Logo Meta - Diária" />
        {children}
      </body>
    </html>
  );
}
