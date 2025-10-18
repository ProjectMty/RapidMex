import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// ✅ Fuente principal (Google Fonts)
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

// ✅ Metadata global del sitio
export const metadata: Metadata = {
  title: "RapidMex | Envíos a México",
  description:
    "La mejor opción para enviar paquetes desde USA o Canadá a cualquier parte de México.",
  icons: {
    icon: "/rm.png",
  },
};

// ✅ Layout base de toda la app
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <meta
          name="google-site-verification"
          content="google84b6dd71c0c9ba3a.html"
        />
      </head>
      <body className={`${poppins.variable} antialiased bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
