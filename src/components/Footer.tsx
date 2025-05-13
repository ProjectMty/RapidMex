"use client";

import React from "react";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      {/* Botón flotante de WhatsApp */}
      <a
        href="https://wa.me/12104309802"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
      >
        <FaWhatsapp className="w-8 h-8" />
      </a>

      <footer className="bg-gray-100 py-12 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Logo + Descripción */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Image
                src="/img/Logo.svg"
                alt="RapidMex Logo"
                width={180}
                height={50}
                className="object-contain"
              />
            </div>
            <p className="text-gray-700 text-sm">
              Somos la mejor paquetería para envíos de Estados Unidos a
              cualquier parte de México.
            </p>
          </div>

          {/* Contacto rápido */}
          <div className="flex flex-col gap-4 md:col-span-1">
            <h4 className="font-bold text-gray-800">Quick Contact</h4>
            <a
              href="https://wa.me/12104309802"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-600 text-sm font-semibold hover:underline"
            >
              <FaWhatsapp className="w-4 h-4" /> 210-430-9802
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=info@rapidmex.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 font-semibold underline hover:text-green-900"
            >
              info@rapidmex.com
            </a>

            <div className="flex gap-4 pt-2">
              <a
                href="https://www.instagram.com/rapidmexpaqueteria/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-700"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61575629192546"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Línea final */}
        <div className="mt-12 border-t pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} RapidMex. Todos los derechos
          reservados.
        </div>
      </footer>
    </>
  );
}
