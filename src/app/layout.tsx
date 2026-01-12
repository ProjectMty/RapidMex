import type { Metadata } from "next";
import "./globals.css";

// ✅ Fuente principal (Google Fonts)


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
      <body className= "font-[Poppins] antialiased bg-gray-50">
        {children}
      </body>
    </html>
  );
}
